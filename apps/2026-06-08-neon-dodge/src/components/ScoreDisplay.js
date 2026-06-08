import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreDisplay({ score, level }) {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>SCORE: {score}</Text>
      <Text style={styles.level}>LVL {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 20,
  },
  score: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  level: {
    color: '#ff00ff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
