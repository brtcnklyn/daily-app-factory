import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MoodPicker({ moods, selected, onSelect }) {
  return (
    <View style={styles.grid}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.id}
          style={[styles.card, selected === mood.id && styles.cardSelected]}
          onPress={() => onSelect(mood.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text style={[styles.label, selected === mood.id && styles.labelSelected]}>
            {mood.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    columnGap: 8,
  },
  card: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#6C63FF',
    backgroundColor: '#EEE9FF',
  },
  emoji: { fontSize: 32 },
  label: { fontSize: 12, color: '#666', marginTop: 6, fontWeight: '500' },
  labelSelected: { color: '#6C63FF', fontWeight: '700' },
});
