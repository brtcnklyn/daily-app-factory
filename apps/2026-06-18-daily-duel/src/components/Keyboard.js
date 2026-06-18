import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
];

const KEY_BG = {
  correct: '#538d4e',
  present: '#b59f3b',
  absent:  '#3a3a3c',
};

export default function Keyboard({ onKey, letterStates }) {
  return (
    <View style={styles.keyboard}>
      {ROWS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((key) => {
            const state  = letterStates[key];
            const isWide = key === 'ENTER' || key === '⌫';
            return (
              <TouchableOpacity
                key={key}
                style={[styles.key, isWide && styles.wideKey, state && { backgroundColor: KEY_BG[state] }]}
                onPress={() => onKey(key)}
                activeOpacity={0.65}
              >
                <Text style={[styles.keyText, isWide && styles.wideText]}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: { paddingBottom: 16, paddingHorizontal: 4 },
  row: { flexDirection: 'row', justifyContent: 'center', marginVertical: 3 },
  key: {
    backgroundColor: '#818384',
    borderRadius: 6,
    width: 33, height: 52,
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 2.5,
  },
  wideKey:  { width: 52 },
  keyText:  { color: '#fff', fontWeight: '700', fontSize: 13 },
  wideText: { fontSize: 11 },
});
