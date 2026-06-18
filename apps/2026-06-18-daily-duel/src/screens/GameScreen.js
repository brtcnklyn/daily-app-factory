import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordGrid from '../components/WordGrid';
import Keyboard from '../components/Keyboard';
import { getDailyWord, evaluateGuess } from '../utils/words';

const STATS_KEY = '@daily_duel_stats';
const MAX_GUESSES = 6;

export default function GameScreen({ navigation }) {
  const [guesses, setGuesses]           = useState(Array(MAX_GUESSES).fill(''));
  const [currentRow, setCurrentRow]     = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [letterStates, setLetterStates] = useState({});
  const [shakeRow, setShakeRow]         = useState(-1);
  const [timer, setTimer]               = useState(0);
  const gameOverRef                     = useRef(false);
  const targetWord                      = useRef(getDailyWord()).current;

  useEffect(() => {
    const id = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const saveStats = async (won) => {
    try {
      const raw  = await AsyncStorage.getItem(STATS_KEY);
      const base = raw ? JSON.parse(raw) : { played: 0, won: 0, streak: 0, lastPlayed: '' };
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      base.played += 1;
      if (won) base.won += 1;
      base.streak = won ? (base.lastPlayed === yesterday ? base.streak + 1 : 1) : 0;
      base.lastPlayed = new Date().toDateString();
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(base));
    } catch {}
  };

  const submitGuess = useCallback(() => {
    if (gameOverRef.current) return;
    if (currentGuess.length !== 5) {
      setShakeRow(currentRow);
      setTimeout(() => setShakeRow(-1), 600);
      return;
    }

    const evaluation   = evaluateGuess(currentGuess, targetWord);
    const nextGuesses  = [...guesses];
    nextGuesses[currentRow] = currentGuess;
    setGuesses(nextGuesses);

    const newLetterStates = { ...letterStates };
    const priority = { correct: 3, present: 2, absent: 1 };
    currentGuess.split('').forEach((letter, i) => {
      const prev = newLetterStates[letter];
      const next = evaluation[i];
      if (!prev || priority[next] > priority[prev]) newLetterStates[letter] = next;
    });
    setLetterStates(newLetterStates);

    const won     = currentGuess === targetWord;
    const nextRow = currentRow + 1;
    const lost    = !won && nextRow >= MAX_GUESSES;

    if (won || lost) {
      gameOverRef.current = true;
      saveStats(won);

      const allEvaluations = nextGuesses
        .slice(0, nextRow)
        .map(g => evaluateGuess(g, targetWord));

      setTimeout(() => {
        navigation.replace('Result', {
          won,
          attempts: nextRow,
          word: targetWord,
          allEvaluations,
          time: timer,
        });
      }, 700);
    } else {
      setCurrentRow(nextRow);
      setCurrentGuess('');
    }
  }, [currentGuess, currentRow, guesses, letterStates, timer, targetWord, navigation]);

  const handleKey = (key) => {
    if (gameOverRef.current) return;
    if (key === 'ENTER') { submitGuess(); return; }
    if (key === '⌫')    { setCurrentGuess(g => g.slice(0, -1)); return; }
    if (currentGuess.length < 5) setCurrentGuess(g => g + key);
  };

  const displayGuesses = [...guesses];
  displayGuesses[currentRow] = currentGuess.padEnd(5, ' ');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>DAILY DUEL</Text>
        <View style={styles.timerBadge}>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>
      </View>

      <WordGrid
        guesses={displayGuesses}
        currentRow={currentRow}
        targetWord={targetWord}
        shakeRow={shakeRow}
        submittedCount={currentRow}
      />

      <Keyboard onKey={handleKey} letterStates={letterStates} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#16213e',
  },
  backBtn:     { padding: 4 },
  backText:    { color: '#fff', fontSize: 26 },
  topTitle:    { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 4 },
  timerBadge:  { backgroundColor: '#16213e', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  timerText:   { color: '#4ecca3', fontWeight: '700', fontSize: 14 },
});
