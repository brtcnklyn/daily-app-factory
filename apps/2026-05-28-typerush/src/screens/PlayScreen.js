import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TypingText from '../components/TypingText';
import WPMDisplay from '../components/WPMDisplay';
import ScoreCard from '../components/ScoreCard';
import { getDailyText, calculateWPM, calculateAccuracy, getGrade } from '../utils/texts';
import { saveScore } from '../utils/storage';

export default function PlayScreen({ navigation }) {
  const [phase, setPhase] = useState('idle');
  const [typedText, setTypedText] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [liveWPM, setLiveWPM] = useState(0);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const inputRef = useRef(null);
  const targetText = getDailyText();

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setPhase('idle');
    setTypedText('');
    setElapsed(0);
    setLiveWPM(0);
    setResult(null);
    startTimeRef.current = null;
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => clearInterval(timerRef.current);
    }, [])
  );

  const startChallenge = () => {
    reset();
    const start = Date.now();
    startTimeRef.current = start;
    setPhase('active');
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - start);
    }, 250);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const finishChallenge = useCallback(
    async (typed) => {
      clearInterval(timerRef.current);
      const ms = Date.now() - startTimeRef.current;
      const wpm = calculateWPM(typed.length, ms);
      const accuracy = calculateAccuracy(typed, targetText);
      const grade = getGrade(wpm);
      const scored = { wpm, accuracy, ...grade };
      setResult(scored);
      setPhase('done');
      await saveScore(wpm, accuracy, targetText.length);
    },
    [targetText]
  );

  const handleTextChange = (text) => {
    if (phase !== 'active') return;
    const clamped = text.slice(0, targetText.length);
    setTypedText(clamped);
    const ms = Date.now() - startTimeRef.current;
    setLiveWPM(calculateWPM(clamped.length, ms));
    if (clamped.length >= targetText.length) {
      finishChallenge(clamped);
    }
  };

  const elapsedSeconds = Math.floor(elapsed / 1000);
  const progress = Math.min(typedText.length / targetText.length, 1);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {phase === 'idle' && (
          <View style={styles.idleContainer}>
            <Text style={styles.idleTitle}>Today's Challenge</Text>
            <View style={styles.previewBox}>
              <Text style={styles.previewText}>{targetText}</Text>
            </View>
            <Text style={styles.idleHint}>
              {targetText.split(' ').length} words · {targetText.length} characters
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={startChallenge}>
              <Text style={styles.startButtonText}>⌨️  Start Challenge</Text>
            </TouchableOpacity>
          </View>
        )}

        {phase === 'active' && (
          <View>
            <View style={styles.liveStats}>
              <WPMDisplay wpm={liveWPM} label="Live WPM" size="large" />
              <View style={styles.timerBox}>
                <Text style={styles.timerValue}>{elapsedSeconds}</Text>
                <Text style={styles.timerLabel}>SECONDS</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>
            <Text style={styles.progressHint}>
              {typedText.length} / {targetText.length} characters
            </Text>

            <TypingText targetText={targetText} typedText={typedText} />

            <TextInput
              ref={inputRef}
              style={styles.typingInput}
              value={typedText}
              onChangeText={handleTextChange}
              autoCorrect={false}
              autoCapitalize="none"
              spellCheck={false}
              autoComplete="off"
              placeholder="Type the text above here..."
              placeholderTextColor="#9CA3AF"
              multiline
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => finishChallenge(typedText)}
            >
              <Text style={styles.submitButtonText}>Submit Early</Text>
            </TouchableOpacity>
          </View>
        )}

        {phase === 'done' && result && (
          <View style={styles.doneContainer}>
            <Text style={styles.doneTitle}>Challenge Complete!</Text>

            <ScoreCard
              wpm={result.wpm}
              accuracy={result.accuracy}
              grade={result.grade}
              label={result.label}
              color={result.color}
            />

            <View style={styles.shareBox}>
              <Text style={styles.shareTitle}>Share your score</Text>
              <Text style={styles.shareText}>
                {`⌨️ TypeRush Daily Challenge\n🏆 ${result.wpm} WPM · ${result.accuracy}% accuracy\n🎖️ Grade: ${result.grade} (${result.label})\n📅 ${new Date().toLocaleDateString()}`}
              </Text>
            </View>

            <View style={styles.doneButtons}>
              <TouchableOpacity style={styles.retryBtn} onPress={startChallenge}>
                <Text style={styles.retryBtnText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statsBtn}
                onPress={() => navigation.navigate('Stats')}
              >
                <Text style={styles.statsBtnText}>View Stats</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3FF' },
  content: { padding: 20 },
  idleContainer: { alignItems: 'center' },
  idleTitle: { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 20 },
  previewBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  previewText: { fontSize: 18, color: '#374151', lineHeight: 30, letterSpacing: 0.3 },
  idleHint: { fontSize: 13, color: '#9CA3AF', marginBottom: 28 },
  startButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    paddingHorizontal: 52,
    paddingVertical: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  liveStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerBox: { alignItems: 'center' },
  timerValue: { fontSize: 52, fontWeight: '800', color: '#374151' },
  timerLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '600', letterSpacing: 1 },
  progressTrack: {
    height: 6,
    backgroundColor: '#E9D5FF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#7C3AED', borderRadius: 3 },
  progressHint: { fontSize: 11, color: '#9CA3AF', textAlign: 'right', marginTop: 4 },
  typingInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 2,
    borderColor: '#7C3AED',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
  },
  submitButtonText: { color: '#7C3AED', fontWeight: '700', fontSize: 15 },
  doneContainer: { alignItems: 'center' },
  doneTitle: { fontSize: 26, fontWeight: '800', color: '#1F2937', marginBottom: 4 },
  shareBox: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 18,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  shareTitle: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  shareText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 22,
  },
  doneButtons: { flexDirection: 'row', gap: 12, alignSelf: 'stretch' },
  retryBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  retryBtnText: { color: '#374151', fontWeight: '700', fontSize: 15 },
  statsBtn: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statsBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
