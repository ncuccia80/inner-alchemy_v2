import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { emotionById } from '../data/content';
import { colors } from '../theme';

type Props = {
  selectedIds: string[];
  onClear: () => void;
};

export function CombineZone({ selectedIds, onClear }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.slots}>
        {[0, 1, 2].map((slot) => {
          const emotion = selectedIds[slot] ? emotionById[selectedIds[slot]] : undefined;
          return (
            <View key={slot} style={[styles.slot, emotion && styles.filledSlot]}>
              <Text style={[styles.slotText, !emotion && styles.emptyText]}>{emotion?.name ?? 'Select'}</Text>
            </View>
          );
        })}
      </View>
      <Pressable onPress={onClear} style={styles.clearButton}>
        <Text style={styles.clearText}>Clear</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12
  },
  slots: {
    flexDirection: 'row',
    gap: 10
  },
  slot: {
    flex: 1,
    minHeight: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  filledSlot: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceStrong
  },
  slotText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center'
  },
  emptyText: {
    color: colors.dim
  },
  clearButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.surface
  },
  clearText: {
    color: colors.muted,
    fontWeight: '800'
  }
});
