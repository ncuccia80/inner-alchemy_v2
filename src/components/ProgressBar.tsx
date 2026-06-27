import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type Props = {
  count: number;
  total: number;
};

export function ProgressBar({ count, total }: Props) {
  const progress = total === 0 ? 0 : Math.min(count / total, 1);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>Discoveries</Text>
        <Text style={styles.count}>
          {count}/{total}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  count: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800'
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.surface,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.accent
  }
});
