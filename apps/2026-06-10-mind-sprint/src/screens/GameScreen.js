import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimerBar from '../components/TimerBar';
import ScoreCounter from '../components/ScoreCounter';
import { generateQuestions } from '../utils/questions';

const TOTAL = 10;
const SECS = 5;

export default function GameScreen({ navigation }) {
  // All mutable game data lives in refs to avoid stale closures in timers
  const questions = useRef(generateQuestions(TOTAL)).current;
  const scoreRef = useRef(0);
  const resultsRef = useRef([]);
  const timerRef = useRef(null);
  const advancedRef = useRef(false);
  const idxRef = useRef(0);

  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECS);
  const [picked, setPicked] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  function doAdvance(answer, tl) {
    if (advancedRef.current) return;
    advancedRef.current = true;
    clearInterval(timerRef.current);

    const currentIdx = idxRef.current;
    const q = questions[currentIdx];
    const correct = answer !== null && answer === q.answer;
    const bonus = correct ? Math.round((tl / SECS) * 50) : 0;
    const pts = correct ? 100 + bonus : 0;

    scoreRef.current += pts;
    resultsRef.current.push({ correct, pts, question: q, answer });

    setDisplayScore(scoreRef.current);
    setPicked(answer === null ? '__timeout__' : answer);

    setTimeout(() => {
      const nextIdx = currentIdx + 1;
      if (nextIdx >= TOTAL) {
        navigation.replace('Result', {
          score: scoreRef.current,
          results: [...resultsRef.current],
        });
      } else {
        advancedRef.current = false;
        setPicked(null);
        setTimeLeft(SECS);
        setIdx(nextIdx);
      }
    }, 650);
  }

  useEffect(() => {
    advancedRef.current = false;
    setTimeLeft(SECS);
    setPicked(null);

    let t = SECS;
    timerRef.current = setInterval(() => {
      t -= 1;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current);
        doAdvance(null, 0);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [idx]);

  const q = questions[idx];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.progress}>{idx + 1} / {TOTAL}</Text>
          <ScoreCounter score={displayScore} />
          <Text style={[styles.timer, timeLeft <= 2 && styles.timerUrgent]}>{timeLeft}s</Text>
        </View>

        <TimerBar timeLeft={timeLeft} maxTime={SECS} />

        <View style={styles.questionWrap}>
          <Text style={styles.questionText}>{q.text}</Text>
        </View>

        <View style={styles.choices}>
          {q.choices.map((c, i) => {
            let bg = '#1A1A3A';
            let borderColor = '#2D2B5A';
            if (picked !== null) {
              if (c === q.answer) {
                bg = '#052E16';
                borderColor = '#10B981';
              } else if (c === picked) {
                bg = '#450A0A';
                borderColor = '#EF4444';
              }
            }
            return (
              <TouchableOpacity
                key={i}
                style={[styles.choiceBtn, { backgroundColor: bg, borderColor }]}
                onPress={() => doAdvance(c, timeLeft)}
                disabled={picked !== null}
                activeOpacity={0.75}
              >
                <Text style={styles.choiceText}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A1A' },
  safe: { flex: 1, paddingTop: 8 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  progress: { color: '#64748B', fontSize: 14, fontWeight: '600' },
  timer: { color: '#F8FAFC', fontSize: 20, fontWeight: 'bold', minWidth: 36, textAlign: 'right' },
  timerUrgent: { color: '#EF4444' },
  questionWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  questionText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: -2,
  },
  choices: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 10,
  },
  choiceBtn: {
    paddingVertical: 19,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  choiceText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
});
