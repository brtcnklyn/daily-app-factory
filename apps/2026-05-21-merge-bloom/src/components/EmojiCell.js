import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const EMOJIS = [
  '🌱', '🌿', '🌳', '🌸', '🍎',
  '🌟', '💎', '🏆', '🔥', '✨',
  '🌈', '👑',
];

const CELL_COLORS = [
  '#d8f3dc', '#b7e4c7', '#95d5b2', '#ffb3c6', '#ffd166',
  '#fff3b0', '#caf0f8', '#ffd60a', '#ff9a8b', '#e0aaff',
  '#a9def9', '#ffd700',
];

export default function EmojiCell({ level, selected, onPress, size }) {
  const isEmpty = level === null;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor: isEmpty ? '#eaf4ed' : CELL_COLORS[level],
        },
        selected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {!isEmpty && (
        <Text style={{ fontSize: size * 0.44 }}>
          {EMOJIS[level]}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    margin: 3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  selected: {
    borderWidth: 3,
    borderColor: '#40916c',
    shadowColor: '#40916c',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.08 }],
  },
});
