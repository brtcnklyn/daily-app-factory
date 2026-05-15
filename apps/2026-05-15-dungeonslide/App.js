import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleGameOver = (score) => {
    setFinalScore(score);
    if (score > highScore) setHighScore(score);
    setScreen('gameover');
  };

  return (
    <>
      <StatusBar style="light" />
      {screen === 'home' && (
        <HomeScreen onPlay={() => setScreen('game')} highScore={highScore} />
      )}
      {screen === 'game' && (
        <GameScreen onGameOver={handleGameOver} onHome={() => setScreen('home')} />
      )}
      {screen === 'gameover' && (
        <GameOverScreen
          score={finalScore}
          highScore={highScore}
          onReplay={() => setScreen('game')}
          onHome={() => setScreen('home')}
        />
      )}
    </>
  );
}
