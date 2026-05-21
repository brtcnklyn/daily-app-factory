import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getBestScore } from '../store';

const CHAIN = ['🌱', '🌿', '🌳', '🌸', '🍎', '🌟', '💎', '🏆'];

export default function HomeScreen({ navigation }) {
  const [bestScore, setBestScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setBestScore(getBestScore());
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0fff4" />

      <Text style={styles.logo}>🌱</Text>
      <Text style={styles.title}>Merge & Bloom</Text>
      <Text style={styles.subtitle}>Merge plants, grow your garden!</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Best Score</Text>
        <Text style={styles.scoreValue}>{bestScore.toLocaleString()}</Text>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate('Game')}
        activeOpacity={0.85}
      >
        <Text style={styles.playText}>Play Now 🎮</Text>
      </TouchableOpacity>

      <View style={styles.chainCard}>
        <Text style={styles.chainLabel}>Merge Chain</Text>
        <Text style={styles.chainEmojis}>{CHAIN.join('→')}</Text>
        <Text style={styles.chainSub}>...and 4 more legendary plants!</Text>
      </View>

      <Text style={styles.hint}>
        Tap a plant, then tap an adjacent matching plant to merge!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 72,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1b4332',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#52b788',
    marginBottom: 32,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 48,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#1b4332',
  },
  playButton: {
    backgroundColor: '#40916c',
    borderRadius: 32,
    paddingHorizontal: 56,
    paddingVertical: 18,
    marginBottom: 32,
    shadowColor: '#40916c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 7,
  },
  playText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  chainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  chainLabel: {
    fontSize: 11,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  chainEmojis: {
    fontSize: 20,
    letterSpacing: 0,
    marginBottom: 4,
  },
  chainSub: {
    fontSize: 12,
    color: '#b7e4c7',
  },
  hint: {
    fontSize: 13,
    color: '#95d5b2',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
});
