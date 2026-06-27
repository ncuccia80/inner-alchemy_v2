import AsyncStorage from '@react-native-async-storage/async-storage';

import { primitiveEmotionIds } from '../data/content';
import { CombinationRecord, GameSnapshot } from '../types/game';

const STORAGE_KEY = 'inner-alchemy:game-state:v1';

export const initialSnapshot: GameSnapshot = {
  discoveredIds: primitiveEmotionIds,
  combinationHistory: [],
  onboardingComplete: false
};

export async function loadSnapshot(): Promise<GameSnapshot> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return initialSnapshot;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<GameSnapshot>;
    return {
      discoveredIds: parsed.discoveredIds?.length ? parsed.discoveredIds : initialSnapshot.discoveredIds,
      combinationHistory: parsed.combinationHistory ?? [],
      onboardingComplete: Boolean(parsed.onboardingComplete)
    };
  } catch {
    return initialSnapshot;
  }
}

export async function saveSnapshot(snapshot: GameSnapshot) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export async function clearSnapshot() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export function createHistoryRecord(record: Omit<CombinationRecord, 'id' | 'createdAt'>): CombinationRecord {
  return {
    ...record,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString()
  };
}
