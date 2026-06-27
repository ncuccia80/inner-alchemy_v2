import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { emotionById, emotions, playableRecipeIds } from '../data/content';
import { CombinationResult, GameSnapshot } from '../types/game';
import { resolveCombination } from './resolver';
import { clearSnapshot, createHistoryRecord, initialSnapshot, loadSnapshot, saveSnapshot } from './storage';

type GameContextValue = {
  snapshot: GameSnapshot;
  loading: boolean;
  discoveredSet: Set<string>;
  availableIds: string[];
  progressTotal: number;
  progressCount: number;
  completeOnboarding: () => Promise<void>;
  combine: (inputIds: string[]) => Promise<CombinationResult>;
  resetProgress: () => Promise<void>;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

function getAvailableIds(discoveredIds: string[]) {
  const discoveredCount = discoveredIds.filter((id) => emotionById[id]?.type === 'emotion' && emotionById[id]?.tier > 0).length;
  const latestModifierUnlock = Math.max(0, playableRecipeIds.length - 4);

  return emotions
    .filter((emotion) => {
      if (emotion.futurePremium) {
        return false;
      }
      if (discoveredIds.includes(emotion.id)) {
        return true;
      }
      if (emotion.type !== 'modifier') {
        return false;
      }
      const unlockAt = Math.min(emotion.unlock?.minDiscoveries ?? Number.POSITIVE_INFINITY, latestModifierUnlock);
      return unlockAt <= discoveredCount;
    })
    .map((emotion) => emotion.id);
}

export function GameProvider({ children }: PropsWithChildren) {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(initialSnapshot);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSnapshot()
      .then((loaded) => setSnapshot(loaded))
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(async (next: GameSnapshot) => {
    setSnapshot(next);
    await saveSnapshot(next);
  }, []);

  const combine = useCallback(
    async (inputIds: string[]) => {
      const usableIds = getAvailableIds(snapshot.discoveredIds);
      const result = resolveCombination(inputIds, snapshot.discoveredIds, usableIds);
      const nextDiscovered = result.status === 'new' && result.output
        ? [...snapshot.discoveredIds, result.output.id]
        : snapshot.discoveredIds;

      const next = {
        ...snapshot,
        discoveredIds: nextDiscovered,
        combinationHistory: [
          createHistoryRecord({
            inputs: inputIds,
            output: result.output?.id,
            status: result.status
          }),
          ...snapshot.combinationHistory
        ].slice(0, 80)
      };

      await persist(next);
      return result;
    },
    [persist, snapshot]
  );

  const completeOnboarding = useCallback(async () => {
    const next: GameSnapshot = {
      ...snapshot,
      onboardingComplete: true
    };
    await persist(next);
  }, [persist, snapshot]);

  const resetProgress = useCallback(async () => {
    await clearSnapshot();
    setSnapshot(initialSnapshot);
  }, []);

  const availableIds = useMemo(() => getAvailableIds(snapshot.discoveredIds), [snapshot.discoveredIds]);
  const discoveredSet = useMemo(() => new Set(snapshot.discoveredIds), [snapshot.discoveredIds]);

  const value = useMemo<GameContextValue>(
    () => ({
      snapshot,
      loading,
      discoveredSet,
      availableIds,
      progressTotal: playableRecipeIds.length,
      progressCount: snapshot.discoveredIds.filter((id) => emotionById[id]?.tier > 0 && !emotionById[id]?.futurePremium).length,
      completeOnboarding,
      combine,
      resetProgress
    }),
    [availableIds, combine, completeOnboarding, discoveredSet, loading, resetProgress, snapshot]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside GameProvider');
  }
  return context;
}
