import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WPMDisplay({ wpm, label = 'WPM', size = 'large' }) {
  const isLarge = size === 'large';
  return (
    <View style={styles.container}>
      <Text style={[styles.number, isLarge ? styles.numberLarge : styles.numberSmall]}>
        {wpm}
      </Text>
      <Text style={[styles.label, isLarge ? styles.labelLarge : styles.labelSmall]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  number: { fontWeight: '800', color: '#7C3AED' },
  numberLarge: { fontSize: 60 },
  numberSmall: { fontSize: 28 },
  label: { color: '#6B7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  labelLarge: { fontSize: 13 },
  labelSmall: { fontSize: 10 },
});
