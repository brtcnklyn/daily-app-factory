import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [finalScore, setFinalScore] = useState(0);
  const [finalRound, setFinalRound] = useState(0);

  function handleGameOver(score, round) {
    setFinalScore(score);
    setFinalRound(round);
    setScreen('gameover');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {screen === 'home' && (
        <HomeScreen onStart={() => setScreen('game')} />
      )}
      {screen === 'game' && (
        <GameScreen onGameOver={handleGameOver} />
      )}
      {screen === 'gameover' && (
        <GameOverScreen
          score={finalScore}
          round={finalRound}
          onRestart={() => setScreen('game')}
          onHome={() => setScreen('home')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
