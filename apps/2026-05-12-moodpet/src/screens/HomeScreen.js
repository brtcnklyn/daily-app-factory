import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useApp } from '../store';
import PetAvatar from '../components/PetAvatar';
import MoodPicker from '../components/MoodPicker';

export default function HomeScreen() {
  const { todayMood, healthPercent, petLevel, streak, checkInMood } = useApp();
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleMoodSelect = (mood) => {
    checkInMood(mood);
    setShowMoodPicker(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>MoodPet</Text>
          <Text style={styles.date}>{dateStr}</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {streak} day streak</Text>
          </View>
        </View>

        <PetAvatar healthPercent={healthPercent} petLevel={petLevel} />

        <View style={styles.healthCard}>
          <View style={styles.healthRow}>
            <Text style={styles.healthLabel}>Pet Health</Text>
            <Text style={styles.healthPercent}>{healthPercent}%</Text>
          </View>
          <View style={styles.healthBarBg}>
            <View
              style={[styles.healthBarFill, { width: `${healthPercent}%` }]}
            />
          </View>
          <Text style={styles.healthHint}>
            Complete daily habits to keep your pet healthy
          </Text>
        </View>

        {todayMood ? (
          <View style={styles.moodCard}>
            <Text style={styles.moodCardTitle}>Today's Mood</Text>
            <View style={styles.moodRow}>
              <Text style={styles.moodEmoji}>{todayMood.emoji}</Text>
              <View>
                <Text style={styles.moodName}>{todayMood.label}</Text>
                <Text style={styles.moodSub}>Checked in today</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.changeBtn}
              onPress={() => setShowMoodPicker(true)}
            >
              <Text style={styles.changeBtnText}>Update mood</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.checkInButton}
            onPress={() => setShowMoodPicker(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.checkInText}>✨  Check In Today</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {showMoodPicker && (
        <MoodPicker
          onSelect={handleMoodSelect}
          onClose={() => setShowMoodPicker(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#7C3AED',
    letterSpacing: -1,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },
  healthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '88%',
    marginTop: 4,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  healthLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  healthPercent: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7C3AED',
  },
  healthBarBg: {
    height: 12,
    backgroundColor: '#EDE9FE',
    borderRadius: 6,
    overflow: 'hidden',
  },
  healthBarFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 6,
  },
  healthHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  moodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '88%',
    marginTop: 14,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  moodCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 40,
    marginRight: 14,
  },
  moodName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  moodSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  changeBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  changeBtnText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 13,
  },
  checkInButton: {
    marginTop: 28,
    backgroundColor: '#7C3AED',
    paddingVertical: 18,
    paddingHorizontal: 44,
    borderRadius: 50,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  checkInText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
