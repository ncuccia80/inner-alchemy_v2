import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, getOrbColor } from '../theme';
import { Emotion } from '../types/game';

type Props = {
  emotion: Emotion;
  index?: number;
  selected?: boolean;
  locked?: boolean;
  compact?: boolean;
  onPress?: () => void;
};

export function EmotionOrb({ emotion, index = 0, selected = false, locked = false, compact = false, onPress }: Props) {
  const color = locked ? colors.dim : getOrbColor(index);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={locked ? 'Locked discovery' : emotion.name}
      onPress={locked ? undefined : onPress}
      style={({ pressed }) => [
        styles.pressable,
        compact && styles.compactPressable,
        pressed && styles.pressed,
        selected && styles.selected
      ]}
    >
      <LinearGradient
        colors={locked ? ['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.03)'] : [`${color}dd`, 'rgba(255,255,255,0.08)']}
        style={[styles.orb, compact && styles.compactOrb, selected && { borderColor: color }]}
      >
        <View style={[styles.glow, { backgroundColor: color }]} />
        <Text numberOfLines={2} style={[styles.name, compact && styles.compactName, locked && styles.lockedText]}>
          {locked ? '???' : emotion.name}
        </Text>
        {!compact && (
          <Text style={styles.meta}>{locked ? 'Undiscovered' : emotion.tier === 0 ? 'Primitive' : `Tier ${emotion.tier}`}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '48%',
    minHeight: 116,
    marginBottom: 12,
    borderRadius: 24
  },
  compactPressable: {
    width: '31%',
    minHeight: 92
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92
  },
  selected: {
    shadowColor: colors.accent,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 }
  },
  orb: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 12
  },
  compactOrb: {
    borderRadius: 20,
    padding: 8
  },
  glow: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    opacity: 0.2
  },
  name: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
    textAlign: 'center'
  },
  compactName: {
    fontSize: 14,
    lineHeight: 18
  },
  lockedText: {
    color: colors.dim
  },
  meta: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0
  }
});
