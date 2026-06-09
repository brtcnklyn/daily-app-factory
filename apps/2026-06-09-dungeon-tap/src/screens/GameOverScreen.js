import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

function getRank(floor) {
  if (floor >= 10) return { emoji: '👑', title: 'Legendary Hero' };
  if (floor >= 7)  return { emoji: '⭐', title: 'Champion' };
  if (floor >= 5)  return { emoji: '🏅', title: 'Veteran' };
  if (floor >= 3)  return { emoji: '🎖️', title: 'Adventurer' };
  return            { emoji: '🪦', title: 'Beginner' };
}

export default function GameOverScreen({ data, onRestart }) {
  const { floor, highScore, isNewRecord } = data;
  const rank = getRank(floor);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.skull}>💀</Text>
        <Text style={styles.title}>You Died</Text>
        <Text style={styles.subtitle}>The dungeon claimed another soul...</Text>

        <View style={styles.scoreCard}>
          <Text style={styles.rankEmoji}>{rank.emoji}</Text>
          <Text style={styles.rankTitle}>{rank.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.floorLabel}>Floor Reached</Text>
          <Text style={styles.floorNumber}>{floor}</Text>

          {isNewRecord ? (
            <Text style={styles.newRecord}>🎉 New Personal Best!</Text>
          ) : (
            <Text style={styles.bestLabel}>🏆 Best: Floor {highScore}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.8}>
          <Text style={styles.restartText}>Try Again</Text>
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
    paddingHorizontal: 32,
  },
  skull: {
    fontSize: 72,
    marginBottom: 14,
  },
  title: {
    color: '#e74c3c',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    color: '#7070a0',
    fontSize: 15,
    marginBottom: 32,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  rankEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  rankTitle: {
    color: '#f39c12',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: '#2a2a40',
    marginBottom: 18,
  },
  floorLabel: {
    color: '#7070a0',
    fontSize: 13,
    marginBottom: 4,
  },
  floorNumber: {
    color: '#e8e8f0',
    fontSize: 52,
    fontWeight: 'bold',
    lineHeight: 58,
  },
  newRecord: {
    color: '#f39c12',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  bestLabel: {
    color: '#7070a0',
    fontSize: 14,
    marginTop: 12,
  },
  restartBtn: {
    backgroundColor: '#c0392b',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 56,
    alignItems: 'center',
  },
  restartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
