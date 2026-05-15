import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EMPTY = 0;
const PLAYER = 1;
const ENEMY = 2;
const COIN = 3;

const TILE_CONFIG = {
  [EMPTY]: { bg: '#13132a', borderColor: '#1a1a35', emoji: null },
  [PLAYER]: { bg: '#0d2b4a', borderColor: '#4a9eff', emoji: '⚔️' },
  [ENEMY]: { bg: '#2e0d0d', borderColor: '#ff4a4a', emoji: '💀' },
  [COIN]: { bg: '#2e2800', borderColor: '#ffd700', emoji: '💰' },
};

export default function Tile({ type, size }) {
  const config = TILE_CONFIG[type] ?? TILE_CONFIG[EMPTY];
  const emojiSize = Math.floor(size * 0.48);

  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          backgroundColor: config.bg,
          borderColor: config.borderColor,
        },
      ]}
    >
      {config.emoji !== null && (
        <Text style={[styles.emoji, { fontSize: emojiSize }]}>
          {config.emoji}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
