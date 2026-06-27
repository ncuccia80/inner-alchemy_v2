import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { useGame } from '../game/GameContext';
import { colors } from '../theme';

export function ProfileScreen() {
  const { progressCount, progressTotal, snapshot, resetProgress } = useGame();

  function confirmReset() {
    Alert.alert('Reset progress?', 'This will return the game to the 8 starting primitives.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetProgress }
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>Profile</Text>
      <Text style={styles.title}>Your alchemy so far</Text>

      <View style={styles.statRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{progressCount}</Text>
          <Text style={styles.statLabel}>Discoveries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{progressTotal - progressCount}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Progress summary</Text>
        <Text style={styles.copy}>You have made {snapshot.combinationHistory.length} experiments. Your discoveries are saved locally on this device.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Guardrail</Text>
        <Text style={styles.copy}>
          Inner Alchemy is a reflective game. It is not therapy, psychological assessment, diagnosis, treatment, or a substitute for professional mental health care.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Future premium</Text>
        <Text style={styles.copy}>Expansion packs and advanced modifiers are reserved for later. Nothing is for sale in this MVP.</Text>
      </View>

      <PrimaryButton label="Reset Progress" tone="danger" onPress={confirmReset} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
    paddingBottom: 110,
    gap: 18
  },
  kicker: {
    color: colors.accentCyan,
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
  statRow: {
    flexDirection: 'row',
    gap: 12
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18
  },
  statNumber: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900'
  },
  statLabel: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800'
  },
  panel: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 8
  },
  panelTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  copy: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23
  }
});
