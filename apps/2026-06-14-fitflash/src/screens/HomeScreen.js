import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { generateWorkout, getTodayKey } from '../utils/workoutEngine';
import ExerciseCard from '../components/ExerciseCard';

export default function HomeScreen({ navigation }) {
  const [workout, setWorkout] = useState(null);
  const [streak, setStreak] = useState(0);
  const [todayDone, setTodayDone] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTodayData();
    }, [])
  );

  async function loadTodayData() {
    try {
      const today = getTodayKey();
      const raw = await AsyncStorage.getItem(`workout_${today}`);

      if (raw) {
        const saved = JSON.parse(raw);
        setWorkout(saved.exercises);
        setTodayDone(saved.completed);
      } else {
        const exercises = generateWorkout();
        setWorkout(exercises);
        setTodayDone(false);
        await AsyncStorage.setItem(
          `workout_${today}`,
          JSON.stringify({ exercises, completed: false, date: today })
        );
      }

      const streakRaw = await AsyncStorage.getItem('streak');
      if (streakRaw) setStreak(parseInt(streakRaw, 10));
    } catch (_) {}
  }

  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>⚡ FitFlash</Text>
            <Text style={styles.date}>{dateLabel}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('History')}
            style={styles.historyBtn}
          >
            <Text style={styles.historyIcon}>📊</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakFire}>🔥</Text>
          <View style={styles.streakInfo}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          {todayDone && (
            <View style={styles.donePill}>
              <Text style={styles.donePillText}>✓ Done Today</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionLabel}>TODAY'S WORKOUT</Text>

        {workout && (
          <View style={styles.exerciseList}>
            {workout.map((ex, i) => (
              <ExerciseCard key={i} exercise={ex} />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.startBtn, todayDone && styles.startBtnSecondary]}
          onPress={() => navigation.navigate('Workout', { workout })}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>
            {todayDone ? '🔄  Redo Workout' : '⚡  Start Workout'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.tip}>~4 exercises · No equipment · Any time</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  scroll: { paddingHorizontal: 22, paddingBottom: 44 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
    marginBottom: 24,
  },
  appName: { color: '#F9FAFB', fontSize: 24, fontWeight: '800' },
  date: { color: '#6B7280', fontSize: 13, marginTop: 3 },
  historyBtn: {
    backgroundColor: '#1C1C2E',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2D2D4E',
  },
  historyIcon: { fontSize: 22 },
  streakCard: {
    backgroundColor: '#1C1C2E',
    borderRadius: 22,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FF450033',
  },
  streakFire: { fontSize: 44 },
  streakInfo: {},
  streakNumber: { color: '#FF4500', fontSize: 44, fontWeight: '900', lineHeight: 50 },
  streakLabel: { color: '#9CA3AF', fontSize: 13 },
  donePill: {
    marginLeft: 'auto',
    backgroundColor: '#10B98122',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  donePillText: { color: '#10B981', fontWeight: '700', fontSize: 13 },
  sectionLabel: {
    color: '#4B5563',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  exerciseList: { gap: 10, marginBottom: 28 },
  startBtn: {
    backgroundColor: '#FF4500',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  startBtnSecondary: { backgroundColor: '#374151' },
  startBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: 0.3 },
  tip: { textAlign: 'center', color: '#374151', fontSize: 13 },
});
