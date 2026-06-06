import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DIFFICULTIES, ROUNDS, PERFECT_RATIO, calculateRating } from '../utils/scoring';
import PulseRing from '../components/PulseRing';

export default function GameScreen({ route, navigation }) {
  const { difficulty: diffKey } = route.params;
  const diff = DIFFICULTIES[diffKey];

  const [round, setRound] = useState(0);
  const [scores, setScores] = useState([]);
  const [phase, setPhase] = useState('ready');
  const [currentRating, setCurrentRating] = useState(null);

  const ringScale = useRef(new Animated.Value(0)).current;
  const ratingOpacity = useRef(new Animated.Value(0)).current;
  const startTimeRef = useRef(null);
  const tappedRef = useRef(false);
  const animRef = useRef(null);
  const scoresRef = useRef([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const timer = setTimeout(startPulse, 700);
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      animRef.current?.stop();
    };
  }, []);

  function startPulse() {
    if (!isMounted.current) return;
    ringScale.setValue(0);
    tappedRef.current = false;
    startTimeRef.current = Date.now();
    setPhase('pulsing');
    setCurrentRating(null);
    ratingOpacity.setValue(0);

    animRef.current = Animated.timing(ringScale, {
      toValue: 1,
      duration: diff.duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animRef.current.start(({ finished }) => {
      if (finished && !tappedRef.current && isMounted.current) {
        recordResult({ rating: 'MISS', points: 0, color: '#E74C3C' });
      }
    });
  }

  function handleTap() {
    if (phase !== 'pulsing' || tappedRef.current) return;
    tappedRef.current = true;

    const elapsed = Date.now() - startTimeRef.current;
    const result = calculateRating(elapsed, diff.duration);

    animRef.current?.stop();
    recordResult(result);
  }

  function recordResult(result) {
    if (!isMounted.current) return;

    setCurrentRating(result);
    setPhase('rating');

    Animated.sequence([
      Animated.timing(ratingOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.delay(500),
      Animated.timing(ratingOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start();

    const newScores = [...scoresRef.current, result];
    scoresRef.current = newScores;
    setScores(newScores);

    setTimeout(() => {
      if (!isMounted.current) return;
      const nextRound = newScores.length;
      if (nextRound >= ROUNDS) {
        navigation.replace('Result', { scores: newScores, difficulty: diffKey });
      } else {
        setRound(nextRound);
        startPulse();
      }
    }, 900);
  }

  const totalScore = scores.reduce((acc, s) => acc + s.points, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.metaLabel}>ROUND</Text>
          <Text style={styles.metaValue}>{Math.min(round + 1, ROUNDS)} / {ROUNDS}</Text>
        </View>
        <View style={[styles.diffPill, { borderColor: diff.color + '50' }]}>
          <Text style={[styles.diffPillText, { color: diff.color }]}>{diff.label}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.metaLabel}>SCORE</Text>
          <Text style={styles.metaValue}>{totalScore}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.gameArea}
        onPress={handleTap}
        activeOpacity={1}
      >
        <PulseRing scale={ringScale} color={diff.color} />

        <Animated.View style={[styles.ratingBox, { opacity: ratingOpacity }]}>
          {currentRating && (
            <>
              <Text style={[styles.ratingText, { color: currentRating.color }]}>
                {currentRating.rating}
              </Text>
              <Text style={[styles.ratingPts, { color: currentRating.color }]}>
                +{currentRating.points}
              </Text>
            </>
          )}
        </Animated.View>

        <Text style={styles.instruction}>
          {phase === 'ready' && 'Get ready...'}
          {phase === 'pulsing' && 'TAP!'}
          {phase === 'rating' && ''}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.dotRow}>
          {Array.from({ length: ROUNDS }).map((_, i) => {
            const s = scores[i];
            const isCurrent = !s && i === round;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  s ? { backgroundColor: s.color } : styles.dotEmpty,
                  isCurrent && { borderColor: diff.color, borderWidth: 2 },
                ]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070710' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 8,
  },
  metaLabel: { fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase' },
  metaValue: { fontSize: 26, fontWeight: '900', color: '#FFF', marginTop: 2 },
  diffPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  diffPillText: { fontSize: 13, fontWeight: '700' },
  gameArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBox: {
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    marginTop: 130,
  },
  ratingText: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
  },
  ratingPts: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  instruction: {
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    color: '#333',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: { padding: 28, paddingBottom: 36 },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#1A1A2E',
  },
  dotEmpty: { backgroundColor: 'transparent' },
});
