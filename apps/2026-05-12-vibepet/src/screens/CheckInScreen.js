import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { MOODS, saveCheckIn, getCheckIn } from '../utils/storage';

export default function CheckInScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const [existingCheckIn, setExistingCheckIn] = useState(null);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const check = async () => {
        const existing = await getCheckIn(0);
        if (existing) {
          setAlreadyCheckedIn(true);
          setExistingCheckIn(existing);
        } else {
          setAlreadyCheckedIn(false);
          setExistingCheckIn(null);
          setSelectedMood(null);
          setNote('');
        }
      };
      check();
    }, [])
  );

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert('Pick a mood!', 'Please select how you are feeling today.');
      return;
    }
    setSaving(true);
    await saveCheckIn(selectedMood.key, note.trim());
    setSaving(false);
    Alert.alert('Saved! 🎉', 'Your vibe has been recorded. Your pet is happy!', [
      { text: 'View Pet', onPress: () => navigation.navigate('Home') },
    ]);
  };

  if (alreadyCheckedIn && existingCheckIn) {
    const mood = MOODS.find((m) => m.key === existingCheckIn.mood);
    return (
      <View style={[styles.container, styles.doneContainer]}>
        <Text style={styles.doneEmoji}>{mood?.emoji || '✨'}</Text>
        <Text style={styles.doneTitle}>Already checked in!</Text>
        <Text style={styles.doneSubtitle}>
          You felt{' '}
          <Text style={{ fontWeight: '700', color: mood?.color }}>{mood?.label}</Text> today.
        </Text>
        {existingCheckIn.note ? (
          <Text style={styles.doneNote}>"{existingCheckIn.note}"</Text>
        ) : null}
        <Text style={styles.comingBack}>Come back tomorrow to check in again!</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Pick your vibe for today</Text>

        <View style={styles.moodsGrid}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.key}
              style={[
                styles.moodButton,
                selectedMood?.key === mood.key && {
                  backgroundColor: mood.color + '18',
                  borderColor: mood.color,
                },
              ]}
              onPress={() => setSelectedMood(mood)}
              activeOpacity={0.7}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodLabel,
                  selectedMood?.key === mood.key && { color: mood.color, fontWeight: '700' },
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.noteLabel}>Add a note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="What's on your mind today?"
            placeholderTextColor="#ccc"
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={200}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !selectedMood && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving || !selectedMood}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save My Vibe ✨'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },
  doneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#bbb',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  moodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  moodButton: {
    width: '28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 5,
    textAlign: 'center',
  },
  noteSection: {
    marginTop: 28,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  noteInput: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: '#333',
    borderWidth: 1.5,
    borderColor: '#eee',
    minHeight: 90,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#C5C2F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  doneEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  doneTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
  },
  doneSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  doneNote: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  comingBack: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 24,
    textAlign: 'center',
  },
});
