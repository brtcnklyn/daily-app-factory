import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { DIFFICULTIES, ROUNDS } from '../utils/scoring';

export default function HomeScreen({ navigation }) {
  const [difficulty, setDifficulty] = useState('medium');
  const [bests, setBests] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadBests();
    }, [])
  );

  async function loadBests() {
    try {
      const result = {};
      for (const key of Object.keys(DIFFICULTIES)) {
        const val = await AsyncStorage.getItem(`best_${key}`);
        result[key] = val ? parseInt(val, 10) : null;
      }
      setBests(result);
    } catch (_) {}
  }

  const diff = DIFFICULTIES[difficulty];
  const maxScore = ROUNDS * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.logo}>◎ PerfectTap</Text>
          <Text style={styles.tagline}>Tap the ring at the perfect moment</Text>
        </View>

        <View style={styles.preview}>
          <View style={styles.previewOuter} />
          <View style={styles.previewTarget} />
          <View style={styles.previewDot} />
          <Text style={styles.previewLabel}>align → tap</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DIFFICULTY</Text>
          <View style={styles.diffRow}>
            {Object.entries(DIFFICULTIES).map(([key, d]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.diffBtn,
                  difficulty === key && {
                    borderColor: d.color,
                    backgroundColor: d.color + '18',
                  },
                ]}
                onPress={() => setDifficulty(key)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.diffBtnLabel,
                    difficulty === key && { color: d.color },
                  ]}
                >
                  {d.label}
                </Text>
                {bests[key] != null && (
                  <Text style={[styles.diffBtnBest, { color: d.color }]}>
                    {bests[key]}/{maxScore}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.diffDesc}>{diff.description}</Text>
        </View>

        <View style={styles.howTo}>
          <Text style={styles.sectionLabel}>HOW TO PLAY</Text>
          <View style={styles.step}>
            <Text style={styles.stepNum}>1</Text>
            <Text style={styles.stepText}>A ring pulses outward from the center</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNum}>2</Text>
            <Text style={styles.stepText}>Tap when it overlaps the target ring</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNum}>3</Text>
            <Text style={styles.stepText}>Perfect = 100pts · Good = 50pts · Miss = 0</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.playBtn, { backgroundColor: diff.color }]}
          onPress={() => navigation.navigate('Game', { difficulty })}
          activeOpacity={0.85}
        >
          <Text style={styles.playBtnText}>Play Now</Text>
          <Text style={styles.playBtnSub}>{ROUNDS} rounds</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070710' },
  scroll: { padding: 28, paddingBottom: 48 },
  header: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 30, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  tagline: { fontSize: 14, color: '#444', marginTop: 6 },
  preview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    marginBottom: 36,
  },
  previewOuter: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#1A1A2E',
  },
  previewTarget: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#F39C12' + '70',
  },
  previewDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F39C12',
  },
  previewLabel: { position: 'absolute', bottom: 0, fontSize: 12, color: '#333', letterSpacing: 1 },
  section: { marginBottom: 28 },
  sectionLabel: {
    fontSize: 11,
    color: '#444',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  diffRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  diffBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  diffBtnLabel: { fontSize: 15, fontWeight: '700', color: '#333' },
  diffBtnBest: { fontSize: 11, fontWeight: '600' },
  diffDesc: { fontSize: 13, color: '#444', textAlign: 'center' },
  howTo: { marginBottom: 32 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F0F20',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },
  stepText: { flex: 1, fontSize: 14, color: '#555', lineHeight: 20 },
  playBtn: { borderRadius: 24, padding: 22, alignItems: 'center' },
  playBtnText: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  playBtnSub: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4 },
});
