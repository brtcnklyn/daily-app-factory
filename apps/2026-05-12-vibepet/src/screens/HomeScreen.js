import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PetAvatar from '../components/PetAvatar';
import MoodBadge from '../components/MoodBadge';
import { getCheckIn, getStreak, MOODS } from '../utils/storage';

const PET_EMOJI_FOR_STREAK = (streak) => {
  if (streak >= 15) return '🦋';
  if (streak >= 8) return '🐓';
  if (streak >= 4) return '🐥';
  if (streak >= 1) return '🐣';
  return '🥚';
};

export default function HomeScreen({ navigation }) {
  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const [checkIn, s] = await Promise.all([getCheckIn(0), getStreak()]);
        setTodayCheckIn(checkIn);
        setStreak(s);
      };
      load();
    }, [])
  );

  const currentMood = todayCheckIn ? MOODS.find((m) => m.key === todayCheckIn.mood) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <PetAvatar streak={streak} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Vibe</Text>
        {todayCheckIn ? (
          <View style={styles.checkedInContainer}>
            <MoodBadge mood={currentMood} />
            {todayCheckIn.note ? (
              <Text style={styles.note}>"{todayCheckIn.note}"</Text>
            ) : null}
            <Text style={styles.checkedInText}>All checked in for today!</Text>
          </View>
        ) : (
          <View style={styles.notCheckedIn}>
            <Text style={styles.notCheckedInText}>No check-in yet today</Text>
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={() => navigation.navigate('CheckIn')}
            >
              <Text style={styles.checkInButtonText}>Check In Now ✨</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Journey</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>{PET_EMOJI_FOR_STREAK(streak)}</Text>
            <Text style={styles.statLabel}>Pet Stage</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 14,
  },
  checkedInContainer: {
    alignItems: 'flex-start',
  },
  checkedInText: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 10,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  notCheckedIn: {
    alignItems: 'center',
  },
  notCheckedInText: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 14,
  },
  checkInButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 30,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkInButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 44,
    backgroundColor: '#f0f0f0',
  },
  statValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#6C63FF',
  },
  statEmoji: {
    fontSize: 30,
  },
  statLabel: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 2,
  },
});
