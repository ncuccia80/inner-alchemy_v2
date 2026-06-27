import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmotionOrb } from '../components/EmotionOrb';
import { emotions, getRecipeForOutput, getTierLabel, emotionById, libraryEmotionIds } from '../data/content';
import { useGame } from '../game/GameContext';
import { colors } from '../theme';
import { Emotion } from '../types/game';

export function LibraryScreen() {
  const { discoveredSet } = useGame();
  const [detail, setDetail] = useState<Emotion | undefined>();

  const libraryItems = useMemo(
    () => emotions
      .filter((emotion) => libraryEmotionIds.includes(emotion.id) && emotion.type === 'emotion')
      .sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)),
    []
  );

  function renderRecipe(emotion: Emotion) {
    const recipe = getRecipeForOutput(emotion.id);
    if (!recipe) {
      return 'Starting primitive';
    }
    return recipe.inputs.map((id) => emotionById[id]?.name ?? id).join(' + ');
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Library</Text>
        <Text style={styles.title}>Every discovered state has a small truth inside it.</Text>
        <View style={styles.grid}>
          {libraryItems.map((emotion, index) => {
            const discovered = discoveredSet.has(emotion.id);
            return (
              <EmotionOrb
                key={emotion.id}
                emotion={emotion}
                index={index}
                compact
                locked={!discovered}
                onPress={() => discovered && setDetail(emotion)}
              />
            );
          })}
        </View>
      </ScrollView>

      <Modal transparent visible={Boolean(detail)} animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.detailCard}>
            <Text style={styles.detailTier}>{detail ? getTierLabel(detail.tier) : ''}</Text>
            <Text style={styles.detailName}>{detail?.name}</Text>
            <Text style={styles.insight}>{detail?.insight}</Text>
            {detail && (
              <View style={styles.recipeBox}>
                <Text style={styles.recipeLabel}>Recipe</Text>
                <Text style={styles.recipeText}>{renderRecipe(detail)}</Text>
              </View>
            )}
            <Pressable onPress={() => setDetail(undefined)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  kicker: {
    color: colors.accentPink,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(3,5,16,0.84)',
    justifyContent: 'center',
    padding: 22
  },
  detailCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: '#11162e',
    padding: 24,
    gap: 14
  },
  detailTier: {
    color: colors.accentCyan,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  detailName: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900'
  },
  insight: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 28
  },
  recipeBox: {
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 6
  },
  recipeLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0
  },
  recipeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  closeButton: {
    marginTop: 8,
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeText: {
    color: colors.background,
    fontWeight: '900',
    fontSize: 16
  }
});
