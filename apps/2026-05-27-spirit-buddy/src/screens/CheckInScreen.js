import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MoodButton, { MOODS } from '../components/MoodButton';
import { saveMoodEntry } from '../utils/storage';

export default function CheckInScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote]                 = useState('');

  async function handleSave() {
    if (!selectedMood) {
      Alert.alert('Pick a mood', 'Select how you are feeling today to feed your spirit.');
      return;
    }
    await saveMoodEntry({ mood: selectedMood, note: note.trim() });
    navigation.navigate('Home');
  }

  const selected = MOODS.find(m => m.value === selectedMood);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Your spirit evolves with your energy</Text>

        <View style={styles.moodGrid}>
          {MOODS.map(mood => (
            <MoodButton
              key={mood.value}
              mood={mood}
              selected={selectedMood === mood.value}
              onPress={setSelectedMood}
            />
          ))}
        </View>

        {selected && (
          <View style={[styles.selectedBanner, { borderColor: selected.color }]}>
            <Text style={styles.selectedEmoji}>{selected.emoji}</Text>
            <Text style={[styles.selectedLabel, { color: selected.color }]}>
              Feeling {selected.label}
            </Text>
          </View>
        )}

        <View style={styles.noteSection}>
          <Text style={styles.noteLabel}>Add a note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="What's on your mind today?"
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={3}
            value={note}
            onChangeText={setNote}
            maxLength={200}
          />
          <Text style={styles.charCount}>{note.length}/200</Text>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, !selectedMood && styles.saveBtnDisabled]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Feed your spirit ✨</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8FF' },
  content:   { padding: 24, paddingBottom: 56 },

  title:    { fontSize: 26, fontWeight: '800', color: '#2D1B69', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#999', marginBottom: 32 },

  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },

  selectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 28,
  },
  selectedEmoji: { fontSize: 26, marginRight: 10 },
  selectedLabel: { fontSize: 16, fontWeight: '700' },

  noteSection: { marginBottom: 32 },
  noteLabel:   { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 10 },
  noteInput: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: '#333',
    borderWidth: 1.5,
    borderColor: '#E8E0FF',
    minHeight: 96,
    textAlignVertical: 'top',
  },
  charCount: { textAlign: 'right', color: '#ccc', fontSize: 12, marginTop: 4 },

  saveBtn: {
    backgroundColor: '#6C3CE1',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnDisabled: { opacity: 0.35 },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
