import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MOODS = [
  { value: 1, emoji: '😴', label: 'Exhausted', color: '#90A4AE' },
  { value: 2, emoji: '😔', label: 'Low',       color: '#7986CB' },
  { value: 3, emoji: '😐', label: 'Okay',      color: '#43A047' },
  { value: 4, emoji: '😊', label: 'Good',      color: '#FF9800' },
  { value: 5, emoji: '🤩', label: 'Amazing',   color: '#FF6B9D' },
];

export default function MoodButton({ mood, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: mood.color,
          backgroundColor: selected ? mood.color : 'transparent',
        },
      ]}
      onPress={() => onPress(mood.value)}
      activeOpacity={0.75}
    >
      <Text style={styles.emoji}>{mood.emoji}</Text>
      <Text style={[styles.label, { color: selected ? '#fff' : mood.color }]}>
        {mood.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    margin: 4,
    minWidth: 60,
  },
  emoji: { fontSize: 28 },
  label: { fontSize: 11, fontWeight: '700', marginTop: 5 },
});
