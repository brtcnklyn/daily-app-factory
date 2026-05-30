import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STAT_COLORS = {
  STR: '#E74C3C',
  INT: '#9B59B6',
  DEX: '#2ECC71',
  VIT: '#3498DB',
};

export default function StatBar({ label, value }) {
  const color = STAT_COLORS[label] || '#FFD700';
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    color: '#AAAAAA',
    width: 36,
    fontSize: 12,
    fontWeight: 'bold',
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: '#2A2A3E',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    color: '#EAEAEA',
    width: 30,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
