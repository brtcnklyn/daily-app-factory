import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../store';
import HabitItem from '../components/HabitItem';

export default function HabitsScreen() {
  const { habits, toggleHabit, completedCount, healthPercent } = useApp();

  const allDone = completedCount === habits.length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Daily Habits</Text>
          <Text style={styles.subtitle}>
            {allDone
              ? '🎉 All done — your pet is thriving!'
              : 'Each habit makes your pet happier'}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {completedCount}/{habits.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressBg}>
          <View
            style={[styles.progressFill, { width: `${healthPercent}%` }]}
          />
        </View>
        <Text style={styles.progressLabel}>{healthPercent}%</Text>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem habit={item} onToggle={() => toggleHabit(item.id)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    maxWidth: 220,
  },
  badge: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#DDD6FE',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C3AED',
    width: 36,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
