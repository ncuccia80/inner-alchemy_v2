import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { getTierLabel } from '../data/content';
import { colors } from '../theme';
import { Emotion } from '../types/game';

type Props = {
  emotion?: Emotion;
  visible: boolean;
  onContinue: () => void;
};

export function DiscoveryModal({ emotion, visible, onContinue }: Props) {
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      scale.setValue(0.92);
      opacity.setValue(0);
      return;
    }

    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
        tension: 80
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true
      })
    ]).start();
  }, [opacity, scale, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <Animated.View style={[styles.cardWrap, { opacity, transform: [{ scale }] }]}>
          <LinearGradient colors={['rgba(255,207,112,0.22)', 'rgba(255,139,200,0.12)', 'rgba(255,255,255,0.08)']} style={styles.card}>
            <View style={styles.burst} />
            <Text style={styles.eyebrow}>New Discovery</Text>
            <Text style={styles.name}>{emotion?.name}</Text>
            <Text style={styles.tier}>{emotion ? getTierLabel(emotion.tier) : ''}</Text>
            <Text style={styles.insight}>{emotion?.insight}</Text>
            <Pressable onPress={onContinue} style={styles.button}>
              <Text style={styles.buttonText}>Continue Exploring</Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(3,5,16,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  cardWrap: {
    width: '100%',
    maxWidth: 420
  },
  card: {
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: 28,
    alignItems: 'center'
  },
  burst: {
    position: 'absolute',
    top: 34,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: colors.accent,
    opacity: 0.12
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  name: {
    marginTop: 16,
    color: colors.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    textAlign: 'center'
  },
  tier: {
    marginTop: 10,
    color: colors.accentCyan,
    fontSize: 14,
    fontWeight: '800'
  },
  insight: {
    marginTop: 18,
    color: colors.text,
    fontSize: 20,
    lineHeight: 29,
    textAlign: 'center'
  },
  button: {
    marginTop: 26,
    width: '100%',
    borderRadius: 18,
    backgroundColor: colors.text,
    paddingVertical: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '900'
  }
});
