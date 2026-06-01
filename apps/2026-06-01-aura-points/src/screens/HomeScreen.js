import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuraCard from '../components/AuraCard';
import EventItem from '../components/EventItem';
import { getTodayEvents, getAllTimePoints, getStreak } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [todayEvents, setTodayEvents] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState({ count: 0 });

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const [events, total, streakData] = await Promise.all([
          getTodayEvents(),
          getAllTimePoints(),
          getStreak(),
        ]);
        setTodayEvents(events.slice().reverse());
        setTotalPoints(total);
        setStreak(streakData);
      }
      load();
    }, [])
  );

  const todayPoints = todayEvents.reduce((sum, e) => sum + (e.points || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todayEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EventItem event={item} />}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Your Aura</Text>
                <Text style={styles.date}>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <View style={styles.streakBadge}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <Text style={styles.streakCount}>{streak.count}</Text>
              </View>
            </View>

            <AuraCard totalPoints={totalPoints} todayPoints={todayPoints} />

            <Text style={styles.sectionTitle}>Today's Events</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyText}>No aura events yet today</Text>
            <Text style={styles.emptySubtext}>Tap + to log your first event</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Event')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -1,
  },
  date: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f59e0b44',
  },
  streakEmoji: {
    fontSize: 18,
    marginRight: 4,
  },
  streakCount: {
    color: '#f59e0b',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionTitle: {
    color: '#4b5563',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  list: {
    paddingBottom: 110,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 14,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#4b5563',
    fontSize: 13,
    marginTop: 6,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 10,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '300',
    lineHeight: 38,
    marginTop: -2,
  },
});
