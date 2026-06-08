import React from 'react';
import { View, StyleSheet } from 'react-native';

export const OBSTACLE_HEIGHT = 32;

const COLORS = ['#ff3355', '#ff6600', '#ffcc00'];

export default function Obstacle({ left, top, width, colorIndex = 0 }) {
  const color = COLORS[colorIndex % COLORS.length];
  return (
    <View
      style={[
        styles.obstacle,
        { left, top, width, backgroundColor: color, shadowColor: color },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    height: OBSTACLE_HEIGHT,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
});
