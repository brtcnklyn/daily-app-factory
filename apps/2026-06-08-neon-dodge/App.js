import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';

const SCREENS = {
  home: HomeScreen,
  game: GameScreen,
  leaderboard: LeaderboardScreen,
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [lastScore, setLastScore] = useState(0);

  const navigate = (screenName, params = {}) => {
    if (params.score !== undefined) setLastScore(params.score);
    setScreen(screenName);
  };

  const Screen = SCREENS[screen];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />
      <Screen navigate={navigate} lastScore={lastScore} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
});
