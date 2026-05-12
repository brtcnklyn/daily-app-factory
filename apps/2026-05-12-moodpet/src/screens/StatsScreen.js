import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useApp, MOOD_LIST } from '../store';

export default function StatsScreen() {
  const { streak, moodHistory, petLevel, habits, completedCount } = useApp();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toDateString();
    const entry = moodHistory.find((m) => m.date === dateStr);
    return { date: d, entry };
  });

  const avgMoodValue =
    moodHistory.length > 0
      ? Math.round(
          moodHistory.reduce((sum, m) => sum + m.mood.value, 0) /
            moodHistory.length
        )
      : null;

  const avgMood = avgMoodValue
    ? MOOD_LIST.find((m) => m.value === avgMoodValue)
    : null;

  const nextLevelDays = 7 - (streak % 7);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Your Stats</Text>

        <View style={styles.row}>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardIcon}>🔥</Text>
            <Text style={styles.cardValue}>{streak}</Text>
            <Text style={styles.cardLabel}>Day Streak</Text>
          </View>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardIcon}>⭐</Text>
            <Text style={styles.cardValue}>Lv. {petLevel}</Text>
            <Text style={styles.cardLabel}>Pet Level</Text>
          </View>
        </View>

        {avgMood && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Average Mood</Text>
            <View style={styles.avgRow}>
              <Text style={styles.avgEmoji}>{avgMood.emoji}</Text>
              <View>
                <Text style={styles.avgLabel}>{avgMood.label}</Text>
                <Text style={styles.avgSub}>
                  Based on {moodHistory.length} check-in
                  {moodHistory.length !== 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mood This Week</Text>
          <View style={styles.weekRow}>
            {last7Days.map(({ date, entry }, i) => (
              <View key={i} style={styles.dayCol}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: entry
                        ? entry.mood.color
                        : '#E5E7EB',
                    },
                  ]}
                />
                <Text style={styles.dayLabel}>
                  {date
                    .toLocaleString('en-US', { weekday: 'short' })
                    .slice(0, 1)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.legend}>
            {MOOD_LIST.map((m) => (
              <View key={m.value} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: m.color }]}
                />
                <Text style={styles.legendLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Habits</Text>
          <Text style={styles.habitSummary}>
            {completedCount} of {habits.length} completed
          </Text>
          <View style={styles.bigBar}>
            <View
              style={[
                styles.bigBarFill,
                {
                  width: `${Math.round(
                    (completedCount / habits.length) * 100
                  )}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Next Level</Text>
          <Text style={styles.nextLevelText}>
            {nextLevelDays === 7
              ? 'You just leveled up! Keep going 🚀'
              : `${nextLevelDays} more day${nextLevelDays !== 1 ? 's' : ''} to reach Level ${petLevel + 1}`}
          </Text>
          <View style={styles.bigBar}>
            <View
              style={[
                styles.bigBarFill,
                { width: `${((7 - nextLevelDays) / 7) * 100}%` },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  container: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1F2937',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 12,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  half: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 12,
    gap: 12,
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#7C3AED',
  },
  cardLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 16,
  },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avgEmoji: {
    fontSize: 44,
    marginRight: 16,
  },
  avgLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  avgSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayCol: {
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  habitSummary: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  bigBar: {
    height: 12,
    backgroundColor: '#EDE9FE',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bigBarFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 6,
  },
  nextLevelText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
});
