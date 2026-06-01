import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getAllTimePoints } from '../utils/storage';
import { getAuraLevel, formatPoints } from '../utils/auraData';

const MOCK_PLAYERS = [
  { name: 'vibes.only',    points: 4820, emoji: '👑' },
  { name: 'aura.god.99',   points: 3950, emoji: '⚡' },
  { name: 'rizz.master',   points: 3210, emoji: '🔥' },
  { name: 'main.character',points: 2780, emoji: '🌟' },
  { name: 'sigma.energy',  points: 2100, emoji: '💎' },
  { name: 'cozy.mode',     points: 1650, emoji: '🍃' },
  { name: 'pure.vibes',    points: 980,  emoji: '✨' },
];

const RANK_BADGES = ['🥇', '🥈', '🥉'];

export default function LeaderboardScreen() {
  const [myPoints, setMyPoints] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getAllTimePoints().then(setMyPoints);
    }, [])
  );

  const allPlayers = [
    ...MOCK_PLAYERS,
    { name: 'you', points: myPoints, emoji: '😤', isMe: true },
  ].sort((a, b) => b.points - a.points);

  function renderItem({ item, index }) {
    const level = getAuraLevel(item.points);
    const rank = RANK_BADGES[index] ?? `#${index + 1}`;

    return (
      <View style={[styles.row, item.isMe && styles.rowMe]}>
        <Text style={styles.rank}>{rank}</Text>
        <Text style={styles.playerEmoji}>{item.emoji}</Text>
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, item.isMe && styles.playerNameMe]}>
            {item.name}
          </Text>
          <Text style={[styles.levelLabel, { color: level.color }]}>{level.label}</Text>
        </View>
        <Text style={[styles.playerPoints, { color: level.color }]}>
          {formatPoints(item.points)}
        </Text>
      </View>
    );
  }

  const myRank = allPlayers.findIndex(p => p.isMe) + 1;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allPlayers}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Leaderboard</Text>
            <Text style={styles.subtitle}>Who's radiating the most? 👀</Text>
            <View style={styles.myRankBanner}>
              <Text style={styles.myRankText}>Your rank: </Text>
              <Text style={styles.myRankNum}>#{myRank}</Text>
              <Text style={styles.myRankText}> with </Text>
              <Text style={styles.myRankNum}>{formatPoints(myPoints)} pts</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { padding: 20, paddingBottom: 16 },
  title: { color: '#ffffff', fontSize: 30, fontWeight: '900', letterSpacing: -1 },
  subtitle: { color: '#6b7280', fontSize: 14, marginTop: 4 },
  myRankBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e0d4a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#7c3aed55',
  },
  myRankText: { color: '#9ca3af', fontSize: 14 },
  myRankNum: { color: '#c4b5fd', fontSize: 14, fontWeight: '900' },

  list: { paddingBottom: 40 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2d2d4e',
  },
  rowMe: {
    borderColor: '#7c3aed',
    backgroundColor: '#1e0d4a',
  },
  rank: {
    color: '#9ca3af',
    fontSize: 15,
    width: 38,
    fontWeight: '700',
    textAlign: 'center',
  },
  playerEmoji: { fontSize: 26, marginRight: 12 },
  playerInfo: { flex: 1 },
  playerName: { color: '#e5e7eb', fontSize: 15, fontWeight: '700' },
  playerNameMe: { color: '#c4b5fd' },
  levelLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  playerPoints: { fontSize: 18, fontWeight: '900' },
});
