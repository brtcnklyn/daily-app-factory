import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: W } = Dimensions.get('window');

export default function HomeScreen({ navigate }) {
  const [highScore, setHighScore] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('high_scores')
      .then(stored => {
        if (stored) {
          const scores = JSON.parse(stored);
          if (scores.length > 0) setHighScore(scores[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleNeon}>NEON</Text>
        <Text style={styles.titleDodge}>DODGE</Text>
      </View>

      <Text style={styles.tagline}>HOW LONG CAN YOU SURVIVE?</Text>

      {highScore !== null && (
        <View style={styles.highScoreBox}>
          <Text style={styles.highScoreLabel}>BEST</Text>
          <Text style={styles.highScoreValue}>{highScore}s</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.playBtn}
        onPress={() => navigate('game')}
        activeOpacity={0.85}
      >
        <Text style={styles.playBtnText}>PLAY</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.leaderboardBtn}
        onPress={() => navigate('leaderboard')}
        activeOpacity={0.75}
      >
        <Text style={styles.leaderboardBtnText}>LEADERBOARD</Text>
      </TouchableOpacity>

      <View style={styles.howToPlay}>
        <Text style={styles.howTitle}>HOW TO PLAY</Text>
        <Text style={styles.howText}>
          Tap ◀ ▶ to dodge the falling neon blocks.{'\n'}
          Survive as long as you can — it gets faster!
        </Text>
      </View>

      <View style={styles.decorLeft} />
      <View style={styles.decorRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  titleNeon: {
    color: '#00ffff',
    fontSize: 64,
    fontWeight: 'bold',
    letterSpacing: 12,
    textShadowColor: '#00ffff',
    textShadowRadius: 24,
    textShadowOffset: { width: 0, height: 0 },
  },
  titleDodge: {
    color: '#ff00ff',
    fontSize: 64,
    fontWeight: 'bold',
    letterSpacing: 10,
    marginTop: -16,
    textShadowColor: '#ff00ff',
    textShadowRadius: 24,
    textShadowOffset: { width: 0, height: 0 },
  },
  tagline: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 36,
    textAlign: 'center',
  },
  highScoreBox: {
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 36,
    backgroundColor: 'rgba(0,255,255,0.05)',
  },
  highScoreLabel: {
    color: 'rgba(0,255,255,0.5)',
    fontSize: 12,
    letterSpacing: 4,
  },
  highScoreValue: {
    color: '#00ffff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  playBtn: {
    backgroundColor: '#00ffff',
    borderRadius: 16,
    paddingHorizontal: 64,
    paddingVertical: 20,
    marginBottom: 14,
    width: W - 64,
    alignItems: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
  },
  playBtnText: {
    color: '#0a0a1a',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  leaderboardBtn: {
    borderWidth: 2,
    borderColor: 'rgba(255,0,255,0.5)',
    borderRadius: 14,
    paddingHorizontal: 40,
    paddingVertical: 14,
    marginBottom: 48,
    width: W - 64,
    alignItems: 'center',
  },
  leaderboardBtnText: {
    color: '#ff00ff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  howToPlay: {
    alignItems: 'center',
    opacity: 0.5,
  },
  howTitle: {
    color: '#fff',
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 6,
  },
  howText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  decorLeft: {
    position: 'absolute',
    left: -20,
    top: '20%',
    width: 4,
    height: 80,
    backgroundColor: '#00ffff',
    borderRadius: 2,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  decorRight: {
    position: 'absolute',
    right: -20,
    top: '35%',
    width: 4,
    height: 60,
    backgroundColor: '#ff00ff',
    borderRadius: 2,
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
});
