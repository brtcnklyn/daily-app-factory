import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MoodBadge from '../components/MoodBadge';
import { getLast7Days, getStreak, MOODS } from '../utils/storage';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StatsScreen() {
  const [last7Days, setLast7Days] = useState([]);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const [days, s] = await Promise.all([getLast7Days(), getStreak()]);
        setLast7Days(days);
        setStreak(s);
      };
      load();
    }, [])
  );

  const checkedInCount = last7Days.filter((d) => d.data).length;

  const moodCounts = MOODS.map((mood) => ({
    ...mood,
    count: last7Days.filter((d) => d.data?.mood === mood.key).length,
  })).filter((m) => m.count > 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#6C63FF' }]}>
          <Text style={[styles.summaryValue, { color: '#fff' }]}>{streak}</Text>
          <Text style={[styles.summaryLabel, { color: 'rgba(255,255,255,0.75)' }]}>
            🔥 Streak
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: '#6C63FF' }]}>
            {checkedInCount}/7
          </Text>
          <Text style={[styles.summaryLabel, { color: '#bbb' }]}>📅 This Week</Text>
        </View>
      </View>

      {moodCounts.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week's Vibe</Text>
          {moodCounts.map((mood) => (
            <View key={mood.key} style={styles.moodStatRow}>
              <MoodBadge mood={mood} />
              <View style={styles.moodBarTrack}>
                <View
                  style={[
                    styles.moodBarFill,
                    {
                      width: `${Math.round((mood.count / 7) * 100)}%`,
                      backgroundColor: mood.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.moodCount}>{mood.count}d</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last 7 Days</Text>
        {last7Days.map(({ date, data }, index) => {
          const mood = data ? MOODS.find((m) => m.key === data.mood) : null;
          const dateObj = new Date(date + 'T00:00:00');
          const dayLabel = DAY_LABELS[dateObj.getDay()];
          const isToday = index === 0;

          return (
            <View key={date} style={styles.dayRow}>
              <View style={styles.dayInfo}>
                <Text style={[styles.dayName, isToday && styles.dayNameToday]}>
                  {isToday ? 'Today' : dayLabel}
                </Text>
                <Text style={styles.dayDate}>{date.slice(5)}</Text>
              </View>
              {mood ? (
                <MoodBadge mood={mood} />
              ) : (
                <Text style={styles.emptyDash}>—</Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryValue: {
    fontSize: 34,
    fontWeight: '800',
  },
  summaryLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  moodStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 10,
  },
  moodBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  moodCount: {
    fontSize: 12,
    color: '#bbb',
    width: 22,
    textAlign: 'right',
    marginLeft: 8,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  dayInfo: {
    marginRight: 8,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  dayNameToday: {
    color: '#6C63FF',
  },
  dayDate: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 2,
  },
  emptyDash: {
    fontSize: 18,
    color: '#ddd',
    paddingHorizontal: 14,
  },
});
