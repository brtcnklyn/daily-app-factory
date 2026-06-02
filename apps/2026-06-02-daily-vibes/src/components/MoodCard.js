import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MoodCard({ mood, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{mood.emoji}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {mood.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardSelected: {
    borderColor: '#7C3AED',
    backgroundColor: '#F5F3FF',
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  labelSelected: {
    color: '#7C3AED',
  },
});
