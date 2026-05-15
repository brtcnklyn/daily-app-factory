import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function GameOverScreen({ score, highScore, onReplay, onHome }) {
  const isNewHigh = score > 0 && score >= highScore;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.skull}>💀</Text>
        <Text style={styles.title}>GAME OVER</Text>

        {isNewHigh && (
          <Text style={styles.newHighBadge}>🏆 Yeni Rekor!</Text>
        )}

        <Text style={styles.scoreNumber}>{score}</Text>
        <Text style={styles.scoreLabel}>PUAN</Text>

        {!isNewHigh && highScore > 0 && (
          <Text style={styles.bestScore}>En iyi: {highScore}</Text>
        )}

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.replayButton} onPress={onReplay} activeOpacity={0.8}>
          <Text style={styles.replayText}>↩  TEKRAR OYNA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={onHome} activeOpacity={0.8}>
          <Text style={styles.homeText}>🏠  Ana Menü</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  skull: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ff4a4a',
    letterSpacing: 4,
    marginBottom: 20,
  },
  newHighBadge: {
    fontSize: 20,
    color: '#ffd700',
    fontWeight: '600',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 90,
  },
  scoreLabel: {
    fontSize: 13,
    color: '#556677',
    letterSpacing: 4,
    marginBottom: 6,
  },
  bestScore: {
    fontSize: 16,
    color: '#ffd700',
    marginTop: 4,
  },
  spacer: {
    height: 48,
  },
  replayButton: {
    backgroundColor: '#4a9eff',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 14,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: '#4a9eff',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  replayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  homeButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a3a4a',
    minWidth: 220,
    alignItems: 'center',
  },
  homeText: {
    fontSize: 18,
    color: '#8899aa',
  },
});
