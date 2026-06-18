import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { evaluateGuess } from '../utils/words';

const BG = {
  correct: '#538d4e',
  present: '#b59f3b',
  absent:  '#3a3a3c',
  active:  '#1a1a1e',
  empty:   '#121213',
};

const BORDER = {
  correct: '#538d4e',
  present: '#b59f3b',
  absent:  '#3a3a3c',
  active:  '#888',
  empty:   '#3a3a3c',
};

function Tile({ letter, state }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (letter && letter !== ' ') {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.12, duration: 55, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1,    duration: 55, useNativeDriver: true }),
      ]).start();
    }
  }, [letter]);

  const displayLetter = letter && letter !== ' ' ? letter.toUpperCase() : '';

  return (
    <Animated.View
      style={[
        styles.tile,
        { backgroundColor: BG[state] ?? BG.empty, borderColor: BORDER[state] ?? BORDER.empty },
        { transform: [{ scale }] },
      ]}
    >
      <Text style={styles.letter}>{displayLetter}</Text>
    </Animated.View>
  );
}

export default function WordGrid({ guesses, currentRow, targetWord, shakeRow, submittedCount }) {
  const shakeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shakeRow < 0) return;
    Animated.sequence([
      Animated.timing(shakeX, { toValue:  8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue:  5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [shakeRow]);

  return (
    <View style={styles.grid}>
      {guesses.map((guess, rowIdx) => {
        const isSubmitted = rowIdx < submittedCount;
        const isActive    = rowIdx === currentRow;
        const isShaking   = rowIdx === shakeRow;
        const evaluation  = isSubmitted ? evaluateGuess(guess, targetWord) : null;

        return (
          <Animated.View
            key={rowIdx}
            style={[styles.row, isShaking && { transform: [{ translateX: shakeX }] }]}
          >
            {Array(5).fill(null).map((_, colIdx) => {
              const letter = guess[colIdx] ?? '';
              let state = 'empty';
              if (isSubmitted && evaluation) state = evaluation[colIdx];
              else if (isActive && letter && letter !== ' ') state = 'active';
              return <Tile key={colIdx} letter={letter} state={state} />;
            })}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },
  row:  { flexDirection: 'row', marginVertical: 3 },
  tile: {
    width: 58, height: 58,
    borderRadius: 4, borderWidth: 2,
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 3,
  },
  letter: { color: '#fff', fontSize: 24, fontWeight: '900' },
});
