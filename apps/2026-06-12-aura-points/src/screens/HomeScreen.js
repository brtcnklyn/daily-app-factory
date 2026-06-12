import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  saveEntry,
  getTodayEntry,
  getEntries,
  calculateStreak,
} from '../utils/storage';
import AuraDisplay, { getAuraColor } from '../components/AuraDisplay';
import VibeTag from '../components/VibeTag';
import StreakBadge from '../components/StreakBadge';

const VIBE_TAGS = [
  { id: 'productive', label: '🔥 Productive' },
  { id: 'main_character', label: '💫 Main Character' },
  { id: 'chaotic', label: '🌀 Chaotic' },
  { id: 'low_battery', label: '😴 Low Battery' },
  { id: 'glowing_up', label: '✨ Glowing Up' },
  { id: 'sigma', label: '😎 Sigma Mode' },
  { id: 'cozy', label: '🌸 Cozy Era' },
  { id: 'villain', label: '🖤 Villain Arc' },
];

export default function HomeScreen() {
  const [auraScore, setAuraScore] = useState(50);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);
  const [streak, setStreak] = useState(0);
  const [saved, setSaved] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTodayData();
    }, [])
  );

  async function loadTodayData() {
    const entry = await getTodayEntry();
    const entries = await getEntries();
    setStreak(calculateStreak(entries));
    if (entry) {
      setTodayEntry(entry);
      setAuraScore(entry.score);
      setSelectedVibes(entry.vibes || []);
    } else {
      setTodayEntry(null);
      setAuraScore(50);
      setSelectedVibes([]);
    }
    setSaved(false);
  }

  function adjustScore(delta) {
    setAuraScore((prev) => Math.min(100, Math.max(0, prev + delta)));
  }

  function toggleVibe(id) {
    setSelectedVibes((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  async function handleSubmit() {
    const today = new Date().toISOString().split('T')[0];
    const entry = {
      date: today,
      score: auraScore,
      vibes: selectedVibes,
      timestamp: Date.now(),
    };
    await saveEntry(entry);
    setTodayEntry(entry);
    const entries = await getEntries();
    setStreak(calculateStreak(entries));
    setSaved(true);
  }

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const color = getAuraColor(auraScore);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.date}>{dateStr}</Text>
        <StreakBadge streak={streak} />
      </View>

      <Text style={styles.title}>What's your aura today?</Text>

      <View style={styles.scoreSection}>
        <AuraDisplay score={auraScore} size="large" />
      </View>

      <View style={styles.controlsSection}>
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.adjBtn} onPress={() => adjustScore(-10)}>
            <Text style={styles.adjBtnText}>−10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adjBtn} onPress={() => adjustScore(-1)}>
            <Text style={styles.adjBtnText}>−1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adjBtn} onPress={() => adjustScore(1)}>
            <Text style={styles.adjBtnText}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adjBtn} onPress={() => adjustScore(10)}>
            <Text style={styles.adjBtnText}>+10</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.presetRow}>
          {[0, 25, 50, 75, 100].map((val) => (
            <TouchableOpacity
              key={val}
              style={[
                styles.presetBtn,
                auraScore === val && {
                  borderColor: getAuraColor(val),
                  backgroundColor: getAuraColor(val) + '22',
                },
              ]}
              onPress={() => setAuraScore(val)}
            >
              <Text
                style={[
                  styles.presetText,
                  auraScore === val && { color: getAuraColor(val) },
                ]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Pick your vibes</Text>
      <View style={styles.vibesWrap}>
        {VIBE_TAGS.map((tag) => (
          <VibeTag
            key={tag.id}
            label={tag.label}
            selected={selectedVibes.includes(tag.id)}
            onPress={() => toggleVibe(tag.id)}
          />
        ))}
      </View>

      {saved && (
        <View style={styles.savedBanner}>
          <Text style={styles.savedText}>
            {todayEntry ? '✓ Aura updated!' : '✓ Checked in!'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.submitBtn, { backgroundColor: color }]}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.submitText}>
          {todayEntry ? 'Update Aura' : 'Check In Today'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  content: { padding: 20, paddingBottom: 48 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: { color: '#5555AA', fontSize: 14 },
  title: {
    color: '#E2E2FF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
  },
  scoreSection: { alignItems: 'center', marginBottom: 32 },
  controlsSection: { marginBottom: 32 },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14,
  },
  adjBtn: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  adjBtnText: { color: '#A78BFA', fontSize: 15, fontWeight: '700' },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  presetBtn: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    marginHorizontal: 4,
    minWidth: 44,
    alignItems: 'center',
  },
  presetText: { color: '#5555AA', fontSize: 13, fontWeight: '600' },
  sectionTitle: {
    color: '#5555AA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  vibesWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 28 },
  savedBanner: {
    backgroundColor: '#0A1F12',
    borderWidth: 1,
    borderColor: '#34D399',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  savedText: { color: '#34D399', fontSize: 14, fontWeight: '600' },
  submitBtn: {
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  submitText: { color: '#0D0D1A', fontSize: 17, fontWeight: '800' },
});
