import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayKey } from '../utils/workoutEngine';

const REST_SECONDS = 5;
const EXERCISE_SECONDS = 15;

export default function WorkoutScreen({ route, navigation }) {
  const { workout } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIndexes, setCompletedIndexes] = useState([]);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(EXERCISE_SECONDS);
  const [isDone, setIsDone] = useState(false);

  const timerRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    runTimer(isResting ? REST_SECONDS : EXERCISE_SECONDS);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isResting]);

  function runTimer(seconds) {
    clearInterval(timerRef.current);
    setTimer(seconds);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          advance();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function advance() {
    if (isResting) {
      const next = currentIndex + 1;
      if (next >= workout.length) {
        handleFinish();
      } else {
        setIsResting(false);
        setCurrentIndex(next);
      }
    } else {
      markDone();
    }
  }

  function markDone() {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.15, duration: 100, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();

    setCompletedIndexes((prev) => [...prev, currentIndex]);

    if (currentIndex + 1 >= workout.length) {
      handleFinish();
    } else {
      setIsResting(true);
    }
  }

  async function handleFinish() {
    clearInterval(timerRef.current);
    setIsDone(true);

    try {
      const today = getTodayKey();
      const raw = await AsyncStorage.getItem(`workout_${today}`);
      if (raw) {
        const saved = JSON.parse(raw);
        await AsyncStorage.setItem(`workout_${today}`, JSON.stringify({ ...saved, completed: true }));
      }

      const lastRaw = await AsyncStorage.getItem('last_workout_date');
      const streakRaw = await AsyncStorage.getItem('streak');
      const currentStreak = streakRaw ? parseInt(streakRaw, 10) : 0;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split('T')[0];

      const newStreak =
        lastRaw === yesterdayKey || lastRaw === today ? currentStreak + 1 : 1;

      await AsyncStorage.setItem('streak', newStreak.toString());
      await AsyncStorage.setItem('last_workout_date', today);

      const histRaw = await AsyncStorage.getItem('workout_history');
      const history = histRaw ? JSON.parse(histRaw) : [];
      history.unshift({ date: today, exercises: workout.length, streak: newStreak });
      await AsyncStorage.setItem('workout_history', JSON.stringify(history.slice(0, 30)));
    } catch (_) {}
  }

  if (isDone) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.doneScreen}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneTitle}>Workout Complete!</Text>
          <Text style={styles.doneSub}>{workout.length} exercises crushed</Text>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const ex = workout[currentIndex];
  const timerColor = isResting ? '#10B981' : '#FF4500';
  const maxTime = isResting ? REST_SECONDS : EXERCISE_SECONDS;
  const timerProgress = timer / maxTime;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressRow}>
        {workout.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressSeg,
              completedIndexes.includes(i) && styles.progressDone,
              i === currentIndex && !isResting && styles.progressActive,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.exitBtn}>
        <Text style={styles.exitText}>✕  Exit</Text>
      </TouchableOpacity>

      {isResting ? (
        <View style={styles.mainArea}>
          <Text style={styles.restEmoji}>😮‍💨</Text>
          <Text style={styles.restTitle}>Rest</Text>
          <Text style={[styles.timerBig, { color: timerColor }]}>{timer}</Text>
          <Text style={styles.restNext}>
            Next: {workout[currentIndex + 1]?.name || 'Last one!'}
          </Text>
        </View>
      ) : (
        <View style={styles.mainArea}>
          <Text style={styles.exCount}>
            {currentIndex + 1} / {workout.length}
          </Text>
          <Animated.Text style={[styles.exEmoji, { transform: [{ scale: pulseAnim }] }]}>
            {ex.emoji}
          </Animated.Text>
          <Text style={styles.exName}>{ex.name}</Text>
          <Text style={[styles.exReps, { color: timerColor }]}>{ex.reps}</Text>
          <Text style={styles.exInstruction}>{ex.instruction}</Text>
          <Text style={styles.timerSub}>{timer}s remaining</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.doneBtn, isResting && styles.doneBtnRest]}
        onPress={advance}
        activeOpacity={0.85}
      >
        <Text style={styles.doneBtnText}>{isResting ? 'Skip Rest →' : '✓  Done'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  progressRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 22, paddingTop: 16, marginBottom: 4 },
  progressSeg: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#1C1C2E' },
  progressDone: { backgroundColor: '#10B981' },
  progressActive: { backgroundColor: '#FF4500' },
  exitBtn: { paddingHorizontal: 22, paddingVertical: 10 },
  exitText: { color: '#4B5563', fontSize: 14 },
  mainArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  restEmoji: { fontSize: 72, marginBottom: 12 },
  restTitle: { color: '#9CA3AF', fontSize: 22, marginBottom: 4 },
  timerBig: { fontSize: 88, fontWeight: '900', lineHeight: 96 },
  restNext: { color: '#6B7280', fontSize: 16, marginTop: 8 },
  exCount: { color: '#4B5563', fontSize: 14, marginBottom: 12 },
  exEmoji: { fontSize: 80, marginBottom: 14 },
  exName: { color: '#F9FAFB', fontSize: 30, fontWeight: '900', marginBottom: 6 },
  exReps: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  exInstruction: {
    color: '#9CA3AF', fontSize: 15, textAlign: 'center', lineHeight: 22,
    paddingHorizontal: 12, marginBottom: 20,
  },
  timerSub: { color: '#374151', fontSize: 16 },
  doneBtn: {
    margin: 22,
    backgroundColor: '#FF4500',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  doneBtnRest: { backgroundColor: '#1C1C2E', borderWidth: 1, borderColor: '#374151' },
  doneBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  doneScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  doneEmoji: { fontSize: 88, marginBottom: 20 },
  doneTitle: { color: '#F9FAFB', fontSize: 34, fontWeight: '900', marginBottom: 8 },
  doneSub: { color: '#9CA3AF', fontSize: 17, marginBottom: 44 },
  homeBtn: {
    backgroundColor: '#FF4500',
    borderRadius: 20,
    paddingHorizontal: 44,
    paddingVertical: 18,
  },
  homeBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
});
