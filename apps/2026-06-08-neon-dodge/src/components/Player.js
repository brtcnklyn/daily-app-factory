import React from 'react';
import { View, StyleSheet } from 'react-native';

export const PLAYER_SIZE = 50;

export default function Player({ left, top }) {
  return <View style={[styles.player, { left, top }]} />;
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    borderRadius: PLAYER_SIZE / 2,
    backgroundColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 12,
  },
});
