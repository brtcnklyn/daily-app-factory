import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComboDisplay({ combo }) {
  return (
    <View style={[styles.container, { borderColor: combo.color }]}>
      <Text style={[styles.name, { color: combo.color }]}>{combo.name}</Text>
      <Text style={styles.damage}>⚔️  {combo.damage} dmg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    marginVertical: 4,
  },
  name: {
    fontWeight: '900',
    fontSize: 17,
    letterSpacing: 1,
  },
  damage: {
    color: '#c0c0d8',
    fontSize: 16,
    fontWeight: '700',
  },
});
