import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DiscoveryModal } from '../components/DiscoveryModal';
import { EmotionOrb } from '../components/EmotionOrb';
import { PrimaryButton } from '../components/PrimaryButton';
import { emotionById } from '../data/content';
import { useGame } from '../game/GameContext';
import { colors } from '../theme';

export function OnboardingScreen() {
  const { combine, completeOnboarding } = useGame();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [message, setMessage] = useState('Tap Fear and Love to make the first discovery.');

  const tutorialIds = ['emo_fear', 'emo_love'];
  const jealousy = emotionById.emo_jealousy;

  function toggle(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= 2) {
        return [current[1], id];
      }
      return [...current, id];
    });
  }

  async function runTutorial() {
    const result = await combine(selectedIds);
    if (result.status === 'new' || result.status === 'known') {
      setShowDiscovery(true);
      setMessage('Jealousy joined your library.');
      return;
    }
    setMessage('For the tutorial, combine Fear with Love.');
  }

  async function finish() {
    setShowDiscovery(false);
    await completeOnboarding();
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Inner Alchemy</Text>
        <Text style={styles.title}>Combine emotions to discover new states of mind.</Text>
        <Text style={styles.copy}>
          This is a reflective game about emotional language. It is not therapy, diagnosis, treatment, or a substitute for professional care.
        </Text>

        <View style={styles.tutorialCard}>
          <Text style={styles.cardTitle}>First experiment</Text>
          <Text style={styles.cardCopy}>{message}</Text>
          <View style={styles.orbRow}>
            {tutorialIds.map((id, index) => (
              <EmotionOrb
                key={id}
                emotion={emotionById[id]}
                index={index}
                selected={selectedIds.includes(id)}
                onPress={() => toggle(id)}
              />
            ))}
          </View>
          <PrimaryButton label="Combine Fear + Love" disabled={selectedIds.length !== 2} onPress={runTutorial} />
        </View>
      </ScrollView>
      <DiscoveryModal emotion={jealousy} visible={showDiscovery} onContinue={finish} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
    gap: 18
  },
  kicker: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  title: {
    color: colors.text,
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '900'
  },
  copy: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24
  },
  tutorialCard: {
    marginTop: 8,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 14
  },
  cardTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900'
  },
  cardCopy: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22
  },
  orbRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  }
});
