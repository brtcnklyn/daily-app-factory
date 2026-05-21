import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { getBestScore } from '../store';

export default function ScoreScreen({ navigation, route }) {
  const { score, prevBest } = route.params;
  const isNewBest = score > prevBest;
  const bestScore = getBestScore();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0fff4" />

      <Text style={styles.icon}>{isNewBest ? '🏆' : '🌸'}</Text>
      <Text style={styles.title}>{isNewBest ? 'New Record!' : 'Game Over'}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Your Score</Text>
        <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
      </View>

      {isNewBest ? (
        <View style={styles.newBestBadge}>
          <Text style={styles.newBestText}>🎉 New personal best!</Text>
        </View>
      ) : (
        <View style={styles.prevBestBadge}>
          <Text style={styles.prevBestText}>Best: {bestScore.toLocaleString()}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.replace('Game')}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryText}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.85}
      >
        <Text style={styles.secondaryText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  icon: {
    fontSize: 88,
    marginBottom: 12,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#1b4332',
    marginBottom: 32,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 72,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  scoreValue: {
    fontSize: 58,
    fontWeight: 'bold',
    color: '#1b4332',
  },
  newBestBadge: {
    backgroundColor: '#d8f3dc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  newBestText: {
    fontSize: 16,
    color: '#2d6a4f',
    fontWeight: '700',
  },
  prevBestBadge: {
    marginBottom: 36,
  },
  prevBestText: {
    fontSize: 16,
    color: '#95d5b2',
    fontWeight: '500',
  },
  primaryBtn: {
    backgroundColor: '#40916c',
    borderRadius: 32,
    paddingHorizontal: 64,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#40916c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 7,
  },
  primaryText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  secondaryBtn: {
    borderWidth: 2,
    borderColor: '#52b788',
    borderRadius: 32,
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  secondaryText: {
    color: '#52b788',
    fontSize: 18,
    fontWeight: '600',
  },
});
