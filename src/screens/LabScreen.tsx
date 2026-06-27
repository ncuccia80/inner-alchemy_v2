import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CombineZone } from '../components/CombineZone';
import { DiscoveryModal } from '../components/DiscoveryModal';
import { EmotionOrb } from '../components/EmotionOrb';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { emotionById } from '../data/content';
import { useGame } from '../game/GameContext';
import { colors } from '../theme';
import { Emotion } from '../types/game';

export function LabScreen() {
  const { availableIds, combine, progressCount, progressTotal } = useGame();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState('Select two emotions and see what emerges.');
  const [discovery, setDiscovery] = useState<Emotion | undefined>();

  const availableEmotions = useMemo(
    () => availableIds.map((id) => emotionById[id]).filter(Boolean).sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)),
    [availableIds]
  );

  function toggle(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= 3) {
        return [current[1], current[2], id];
      }
      return [...current, id];
    });
  }

  async function handleCombine() {
    const result = await combine(selectedIds);
    setMessage(result.message);
    setSelectedIds([]);
    if (result.status === 'new' && result.output) {
      setDiscovery(result.output);
    }
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.kicker}>The Lab</Text>
          <Text style={styles.title}>What does this feeling become?</Text>
          <ProgressBar count={progressCount} total={progressTotal} />
        </View>

        <View style={styles.panel}>
          <CombineZone selectedIds={selectedIds} onClear={() => setSelectedIds([])} />
          <PrimaryButton label="Combine" disabled={selectedIds.length < 2} onPress={handleCombine} />
          <Text style={styles.message}>{message}</Text>
        </View>

        <Text style={styles.sectionTitle}>Available states</Text>
        <View style={styles.grid}>
          {availableEmotions.map((emotion, index) => (
            <EmotionOrb
              key={emotion.id}
              emotion={emotion}
              index={index}
              selected={selectedIds.includes(emotion.id)}
              onPress={() => toggle(emotion.id)}
            />
          ))}
        </View>
      </ScrollView>

      <DiscoveryModal emotion={discovery} visible={Boolean(discovery)} onContinue={() => setDiscovery(undefined)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    padding: 18,
    paddingBottom: 110,
    gap: 18
  },
  header: {
    gap: 12
  },
  kicker: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  title: {
    color: colors.text,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900'
  },
  panel: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 14
  },
  message: {
    minHeight: 22,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
