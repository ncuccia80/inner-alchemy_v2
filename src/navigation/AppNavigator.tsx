import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useGame } from '../game/GameContext';
import { colors } from '../theme';
import { TabKey } from '../types/game';
import { LabScreen } from '../screens/LabScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'lab', label: 'Lab' },
  { key: 'library', label: 'Library' },
  { key: 'profile', label: 'Profile' }
];

export function AppNavigator() {
  const { loading, snapshot } = useGame();
  const [activeTab, setActiveTab] = useState<TabKey>('lab');

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!snapshot.onboardingComplete) {
    return <OnboardingScreen />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.screen}>
        {activeTab === 'lab' && <LabScreen />}
        {activeTab === 'library' && <LibraryScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <Pressable key={tab.key} onPress={() => setActiveTab(tab.key)} style={[styles.tab, active && styles.activeTab]}>
              <Text style={[styles.tabText, active && styles.activeText]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  screen: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
    minHeight: 68,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(12,16,36,0.92)',
    flexDirection: 'row',
    padding: 7,
    gap: 6
  },
  tab: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    backgroundColor: colors.surfaceStrong
  },
  tabText: {
    color: colors.muted,
    fontWeight: '900',
    fontSize: 14
  },
  activeText: {
    color: colors.text
  }
});
