import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { getRandomQuestions } from '../utils/questions';
import AnswerButton from '../components/AnswerButton';
import TimerBar from '../components/TimerBar';

const TOTAL_TIME = 60;
const TOTAL_QUESTIONS = 10;
const FEEDBACK_DELAY = 600;

export default function QuizScreen({ navigation }) {
  const [questions] = useState(() => getRandomQuestions(TOTAL_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const timerRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          finishQuiz(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(feedbackRef.current);
    };
  }, []);

  const finishQuiz = (finalScore) => {
    clearInterval(timerRef.current);
    navigation.replace('Result', {
      score: finalScore,
      total: TOTAL_QUESTIONS,
      timeUsed: TOTAL_TIME - timeLeft,
    });
  };

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(option);

    const isCorrect = option === questions[currentIndex].answer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    feedbackRef.current = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= TOTAL_QUESTIONS) {
        finishQuiz(newScore);
      } else {
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
        setAnswered(false);
      }
    }, FEEDBACK_DELAY);
  };

  const current = questions[currentIndex];

  const getButtonState = (option) => {
    if (!answered) return 'idle';
    if (option === current.answer) return 'correct';
    if (option === selectedAnswer) return 'wrong';
    return 'idle';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressInfo}>
          <Text style={styles.questionCount}>
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
        <TimerBar timeLeft={timeLeft} totalTime={TOTAL_TIME} />
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(currentIndex / TOTAL_QUESTIONS) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{current.question}</Text>
        </View>

        <View style={styles.answers}>
          {current.options.map((option) => (
            <AnswerButton
              key={option}
              label={option}
              state={getButtonState(option)}
              onPress={() => handleAnswer(option)}
              disabled={answered}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: { padding: 20, paddingTop: 16 },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  questionCount: { fontSize: 14, fontWeight: '600', color: '#A8ADCF' },
  scoreText: { fontSize: 14, fontWeight: '700', color: '#6C63FF' },
  progressTrack: {
    height: 4,
    backgroundColor: '#2D3561',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  body: { flex: 1, padding: 20, justifyContent: 'center' },
  questionCard: {
    backgroundColor: '#16213E',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    minHeight: 120,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  answers: {},
});
