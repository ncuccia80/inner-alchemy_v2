import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { AppNavigator } from './src/navigation/AppNavigator';
import { GameProvider } from './src/game/GameContext';
import { colors } from './src/theme';

export default function App() {
  return (
    <GameProvider>
      <LinearGradient colors={[colors.backgroundTop, colors.background, colors.backgroundBottom]} style={styles.root}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />
          <AppNavigator />
        </SafeAreaView>
      </LinearGradient>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  safeArea: {
    flex: 1
  }
});
