import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function VibeTag({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tag, selected && styles.tagSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    margin: 4,
  },
  tagSelected: {
    backgroundColor: '#2D1B69',
    borderColor: '#A78BFA',
  },
  text: {
    color: '#6666AA',
    fontSize: 14,
  },
  textSelected: {
    color: '#E2E2FF',
  },
});
