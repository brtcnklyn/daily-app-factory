import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [gameData, setGameData] = useState(null);
  const [highScore, setHighScore] = useState(0);

  const handleStartGame = () => {
    setScreen('game');
  };

  const handleGameOver = ({ floor }) => {
    const isNewRecord = floor > highScore;
    const newHigh = Math.max(highScore, floor);
    setHighScore(newHigh);
    setGameData({ floor, highScore: newHigh, isNewRecord });
    setScreen('gameover');
  };

  const handleRestart = () => {
    setScreen('home');
  };

  return (
    <>
      <StatusBar style="light" />
      {screen === 'home' && (
        <HomeScreen onStart={handleStartGame} highScore={highScore} />
      )}
      {screen === 'game' && (
        <GameScreen onGameOver={handleGameOver} />
      )}
      {screen === 'gameover' && gameData && (
        <GameOverScreen data={gameData} onRestart={handleRestart} />
      )}
    </>
  );
}
