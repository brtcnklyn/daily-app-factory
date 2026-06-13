import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomChallenge } from '../data/challenges';
import ChallengeCard from '../components/ChallengeCard';

export default function ChallengeScreen({ route, navigation }) {
  const { mood } = route.params;
  const [challenge] = useState(() => getRandomChallenge(mood));
  const [completed, setCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function toggleTimer() {
    if (timerActive) {
      clearInterval(intervalRef.current);
      setTimerActive(false);
    } else {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      setTimerActive(true);
    }
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem.toString().padStart(2, '0')}`;
  }

  async function handleComplete() {
    clearInterval(intervalRef.current);
    setTimerActive(false);

    const entry = {
      mood,
      challenge: challenge.title,
      emoji: challenge.emoji,
      timeSpent: formatTime(seconds),
      date: new Date().toISOString(),
    };

    try {
      const raw = await AsyncStorage.getItem('vibecheck_history');
      const history = raw ? JSON.parse(raw) : [];
      history.unshift(entry);
      await AsyncStorage.setItem(
        'vibecheck_history',
        JSON.stringify(history.slice(0, 50))
      );
    } catch (e) {
      console.error('Storage error:', e);
    }

    setCompleted(true);
  }

  async function handleShare() {
    try {
      await Share.share({
        message:
          `I just completed a VibeCheck challenge! 🎯\n\n` +
          `Mood: ${mood} ${challenge.emoji}\n` +
          `Challenge: ${challenge.title}\n` +
          `Time: ${formatTime(seconds)}\n\n` +
          `Try VibeCheck and level up your daily wellness! 💜`,
      });
    } catch (e) {
      console.error('Share error:', e);
    }
  }

  if (completed) {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.completedEmoji}>🎉</Text>
        <Text style={styles.completedTitle}>Challenge Complete!</Text>
        <Text style={styles.completedSub}>
          You invested {formatTime(seconds)} in your wellbeing today.{'\n'}
          Keep the streak going tomorrow!
        </Text>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤 Share Achievement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.moodTag}>
        <Text style={styles.moodTagText}>
          {mood.charAt(0).toUpperCase() + mood.slice(1)} mood challenge
        </Text>
      </View>

      <ChallengeCard challenge={challenge} />

      <View style={styles.timerSection}>
        <Text style={styles.timerLabel}>Time spent</Text>
        <Text style={styles.timerDisplay}>{formatTime(seconds)}</Text>

        <TouchableOpacity
          style={[styles.timerButton, timerActive && styles.timerButtonActive]}
          onPress={toggleTimer}
        >
          <Text style={[styles.timerButtonText, timerActive && styles.timerButtonTextActive]}>
            {timerActive ? '⏸  Pause' : '▶  Start Timer'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleComplete}>
        <Text style={styles.doneButtonText}>✓  Mark as Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0EFFF' },
  content: { padding: 24, paddingBottom: 48 },
  moodTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
  },
  moodTagText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },
  timerSection: {
    alignItems: 'center',
    marginTop: 36,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  timerLabel: { color: '#999', fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },
  timerDisplay: {
    fontSize: 52,
    fontWeight: '800',
    color: '#1A1A2E',
    marginVertical: 8,
    fontVariant: ['tabular-nums'],
  },
  timerButton: {
    marginTop: 8,
    backgroundColor: '#F0EFFF',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  timerButtonActive: { backgroundColor: '#6C63FF' },
  timerButtonText: { color: '#6C63FF', fontWeight: '700', fontSize: 16 },
  timerButtonTextActive: { color: '#fff' },
  doneButton: {
    backgroundColor: '#22C55E',
    borderRadius: 18,
    paddingVertical: 18,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  doneButtonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  completedContainer: {
    flex: 1,
    backgroundColor: '#F0EFFF',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedEmoji: { fontSize: 90 },
  completedTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1A2E',
    marginTop: 20,
  },
  completedSub: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 26,
  },
  shareButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 44,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  shareButtonText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  homeButton: { marginTop: 16, padding: 14 },
  homeButtonText: { color: '#6C63FF', fontSize: 15, fontWeight: '700' },
});
