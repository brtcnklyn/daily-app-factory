import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AURA_EVENTS } from '../utils/auraData';
import { addEvent, updateStreak } from '../utils/storage';

const POSITIVE = AURA_EVENTS.filter(e => e.points > 0);
const NEGATIVE = AURA_EVENTS.filter(e => e.points < 0);

export default function AddEventScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [customEmoji, setCustomEmoji] = useState('⭐');
  const [customLabel, setCustomLabel] = useState('');
  const [customPoints, setCustomPoints] = useState('');

  async function handleSubmit() {
    let event;

    if (isCustom) {
      if (!customLabel.trim()) {
        Alert.alert('Missing info', 'Please describe what happened.');
        return;
      }
      const pts = parseInt(customPoints, 10);
      if (isNaN(pts)) {
        Alert.alert('Invalid points', 'Enter a number like 100 or -50.');
        return;
      }
      event = { emoji: customEmoji || '⭐', label: customLabel.trim(), points: pts };
    } else {
      if (!selected) {
        Alert.alert('Select an event', 'Tap an event card or use Custom Event.');
        return;
      }
      event = { emoji: selected.emoji, label: selected.label, points: selected.points };
    }

    await addEvent(event);
    await updateStreak();
    navigation.navigate('Home');
  }

  function selectPreset(event) {
    setSelected(event);
    setIsCustom(false);
  }

  function activateCustom() {
    setSelected(null);
    setIsCustom(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Log Aura Event</Text>
        <Text style={styles.subtitle}>What happened today?</Text>

        <Text style={styles.sectionLabel}>AURA GAINS ✨</Text>
        <View style={styles.grid}>
          {POSITIVE.map(event => (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.card,
                selected?.id === event.id && !isCustom && styles.cardSelected,
              ]}
              onPress={() => selectPreset(event)}
              activeOpacity={0.75}
            >
              <Text style={styles.cardEmoji}>{event.emoji}</Text>
              <Text style={styles.cardLabel}>{event.label}</Text>
              <Text style={styles.cardPointsPos}>+{event.points}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>AURA DRAINS 💀</Text>
        <View style={styles.grid}>
          {NEGATIVE.map(event => (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.card,
                styles.cardNeg,
                selected?.id === event.id && !isCustom && styles.cardSelected,
              ]}
              onPress={() => selectPreset(event)}
              activeOpacity={0.75}
            >
              <Text style={styles.cardEmoji}>{event.emoji}</Text>
              <Text style={styles.cardLabel}>{event.label}</Text>
              <Text style={styles.cardPointsNeg}>{event.points}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.customToggle, isCustom && styles.customToggleActive]}
          onPress={activateCustom}
          activeOpacity={0.8}
        >
          <Text style={styles.customToggleText}>✏️  Custom Event</Text>
        </TouchableOpacity>

        {isCustom && (
          <View style={styles.customForm}>
            <View style={styles.customRow}>
              <TextInput
                style={styles.emojiInput}
                value={customEmoji}
                onChangeText={setCustomEmoji}
                maxLength={2}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="What happened?"
                placeholderTextColor="#4b5563"
                value={customLabel}
                onChangeText={setCustomLabel}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Points — e.g. 100 or -50"
              placeholderTextColor="#4b5563"
              value={customPoints}
              onChangeText={setCustomPoints}
              keyboardType="numeric"
            />
          </View>
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitText}>Add to Aura Log</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  scroll: { padding: 20, paddingBottom: 60 },

  title: { color: '#ffffff', fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  subtitle: { color: '#6b7280', fontSize: 14, marginBottom: 24, marginTop: 4 },

  sectionLabel: {
    color: '#4b5563',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 12,
    width: '47%',
    borderWidth: 1.5,
    borderColor: '#2d2d4e',
    alignItems: 'center',
  },
  cardNeg: {
    borderColor: '#2d1a1a',
    backgroundColor: '#130808',
  },
  cardSelected: {
    borderColor: '#7c3aed',
    backgroundColor: '#1e0d4a',
  },
  cardEmoji: { fontSize: 30, marginBottom: 6 },
  cardLabel: {
    color: '#d1d5db',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 15,
  },
  cardPointsPos: { color: '#10b981', fontSize: 15, fontWeight: '900' },
  cardPointsNeg: { color: '#ef4444', fontSize: 15, fontWeight: '900' },

  customToggle: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2d2d4e',
    marginBottom: 14,
  },
  customToggleActive: { borderColor: '#7c3aed' },
  customToggleText: { color: '#9ca3af', fontSize: 15, fontWeight: '700' },

  customForm: { gap: 10, marginBottom: 20 },
  customRow: { flexDirection: 'row', gap: 10 },
  emojiInput: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    color: '#ffffff',
    fontSize: 26,
    width: 58,
    textAlign: 'center',
    borderWidth: 1.5,
    borderColor: '#2d2d4e',
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    color: '#ffffff',
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: '#2d2d4e',
  },

  submitBtn: {
    backgroundColor: '#7c3aed',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: { color: '#ffffff', fontSize: 17, fontWeight: '900', letterSpacing: 0.3 },
});
