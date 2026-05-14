import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function DiceRoller({ dice, held, rolled, onToggle }) {
  return (
    <View style={styles.row}>
      {dice.map((value, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.die, held[i] && styles.dieHeld, !rolled && styles.dieUnrolled]}
          onPress={() => onToggle(i)}
          activeOpacity={0.75}
        >
          <Text style={[styles.face, held[i] && styles.faceHeld]}>
            {rolled ? FACES[value] : '?'}
          </Text>
          {held[i] && (
            <View style={styles.holdBadge}>
              <Text style={styles.holdText}>HOLD</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  die: {
    width: 58,
    height: 66,
    backgroundColor: '#16213e',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0f3460',
    position: 'relative',
  },
  dieHeld: {
    borderColor: '#ffd700',
    backgroundColor: '#1e2a10',
  },
  dieUnrolled: {
    opacity: 0.35,
  },
  face: {
    fontSize: 30,
    color: '#e0e0f0',
  },
  faceHeld: {
    color: '#ffd700',
  },
  holdBadge: {
    position: 'absolute',
    bottom: -9,
    backgroundColor: '#ffd700',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  holdText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#1a1a2e',
    letterSpacing: 0.5,
  },
});
