import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MoodPicker from '../components/MoodPicker';

const MOODS = [
  { id: 'happy', emoji: '😄', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'excited', emoji: '🤩', label: 'Excited' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
];

export default function HomeScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function handleGetChallenge() {
    if (!selectedMood) {
      Alert.alert('Pick your vibe!', 'Select how you are feeling first.');
      return;
    }
    navigation.navigate('Challenge', { mood: selectedMood });
  }

  const selectedMoodData = MOODS.find((m) => m.id === selectedMood);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.date}>{today}</Text>
      <Text style={styles.heading}>How are you feeling?</Text>
      <Text style={styles.subheading}>
        Pick your vibe and get a personalized daily challenge
      </Text>

      <MoodPicker moods={MOODS} selected={selectedMood} onSelect={setSelectedMood} />

      {selectedMoodData && (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedText}>
            {selectedMoodData.emoji} Feeling {selectedMoodData.label}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !selectedMood && styles.buttonDisabled]}
        onPress={handleGetChallenge}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Get My Challenge ✨</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyButtonText}>View Past Vibes →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0EFFF' },
  content: { padding: 24, paddingBottom: 48 },
  date: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginTop: 10,
  },
  subheading: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  selectedBadge: {
    alignSelf: 'center',
    backgroundColor: '#EEE9FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: '#6C63FF',
  },
  selectedText: {
    color: '#6C63FF',
    fontWeight: '700',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 18,
    paddingVertical: 18,
    marginTop: 28,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#C4C1FF',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  historyButton: { marginTop: 20, alignItems: 'center', padding: 12 },
  historyButtonText: { color: '#6C63FF', fontSize: 15, fontWeight: '600' },
});
