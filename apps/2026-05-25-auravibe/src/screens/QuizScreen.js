import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateAura } from '../utils/auraEngine';

const QUESTIONS = [
  {
    emoji: '⚡',
    question: "How's your energy right now?",
    options: [
      { label: 'Buzzing! Ready to take on anything', value: 4 },
      { label: 'Pretty good, feeling alive', value: 3 },
      { label: 'Meh, running on fumes', value: 2 },
      { label: 'Completely drained', value: 1 },
    ],
  },
  {
    emoji: '🌊',
    question: "What's your emotional vibe today?",
    options: [
      { label: 'Joyful and at peace', value: 'joy' },
      { label: 'Creative and inspired', value: 'creative' },
      { label: 'Calm but thoughtful', value: 'calm' },
      { label: 'Anxious or stressed', value: 'anxious' },
    ],
  },
  {
    emoji: '🌍',
    question: 'How connected do you feel to others?',
    options: [
      { label: 'Super social, love everyone', value: 'social' },
      { label: 'Selectively connected', value: 'selective' },
      { label: 'In my own world today', value: 'solo' },
      { label: 'Disconnected, need to recharge', value: 'disconnected' },
    ],
  },
];

export default function QuizScreen({ navigation }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = async () => {
    if (selected === null) return;

    const newAnswers = [...answers, selected];

    if (currentQ < QUESTIONS.length - 1) {
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
        Animated.timing(fadeAnim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      });
    } else {
      const aura = calculateAura(newAnswers);
      const entry = {
        ...aura,
        date: new Date().toDateString(),
        timestamp: Date.now(),
      };
      try {
        const raw = await AsyncStorage.getItem('aura_history');
        const history = raw ? JSON.parse(raw) : [];
        history.push(entry);
        await AsyncStorage.setItem('aura_history', JSON.stringify(history));
      } catch (_) {}
      navigation.replace('Result', { aura: entry });
    }
  };

  const q = QUESTIONS[currentQ];
  const progress = (currentQ + 1) / QUESTIONS.length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.progressLabel}>{currentQ + 1} / {QUESTIONS.length}</Text>
      </View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
        <Text style={styles.questionEmoji}>{q.emoji}</Text>
        <Text style={styles.question}>{q.question}</Text>

        <View style={styles.options}>
          {q.options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.option, selected === option.value && styles.optionSelected]}
              onPress={() => setSelected(option.value)}
            >
              <Text style={[styles.optionText, selected === option.value && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <TouchableOpacity
        style={[styles.nextBtn, selected === null && styles.nextBtnDisabled]}
        onPress={handleNext}
        disabled={selected === null}
      >
        <Text style={styles.nextBtnText}>
          {currentQ === QUESTIONS.length - 1 ? 'Reveal My Aura ✨' : 'Next →'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    paddingTop: 56,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: { padding: 8 },
  backText: { color: '#7777aa', fontSize: 16 },
  progressLabel: { color: '#7777aa', fontSize: 13 },
  progressTrack: {
    height: 3,
    backgroundColor: '#1e1e30',
    borderRadius: 2,
    marginBottom: 48,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 2,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  questionEmoji: {
    fontSize: 56,
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 34,
  },
  options: {
    width: '100%',
  },
  option: {
    backgroundColor: '#151525',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#2a2a40',
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: '#2d1060',
    borderColor: '#7c3aed',
  },
  optionText: {
    color: '#9999bb',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  nextBtn: {
    backgroundColor: '#7c3aed',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 36,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  nextBtnDisabled: {
    backgroundColor: '#1e1e30',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
});
