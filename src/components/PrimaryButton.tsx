import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme';

type Props = {
  label: string;
  disabled?: boolean;
  tone?: 'light' | 'danger';
  onPress: () => void;
};

export function PrimaryButton({ label, disabled = false, tone = 'light', onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        tone === 'danger' && styles.danger,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Text style={[styles.text, tone === 'danger' && styles.dangerText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  danger: {
    backgroundColor: 'rgba(255,141,156,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,141,156,0.45)'
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '900'
  },
  dangerText: {
    color: colors.danger
  }
});
