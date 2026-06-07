import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function LeaderboardScreen({ navigation }) {
  const [scores, setScores] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadScores();
    }, [])
  );

  const loadScores = async () => {
    try {
      const data = await AsyncStorage.getItem('nameblade_scores');
      if (data) {
        const parsed = JSON.parse(data);
        const sorted = parsed
          .filter(s => s.won)
          .sort((a, b) => (b.attack + b.defense + b.speed || 0) - (a.attack + a.defense + a.speed || 0));
        setScores(sorted.slice(0, 20));
      }
    } catch (_) {}
  };

  const clearScores = () => {
    Alert.alert('Clear Scores', 'Reset all battle records?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('nameblade_scores');
          setScores([]);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => {
    const power = (item.attack || 0) + (item.defense || 0) + (item.speed || 0);
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
    return (
      <View style={styles.row}>
        <Text style={styles.rank}>{medal}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.rounds} rounds · {new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.power}>{power}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← BACK</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🏆  HALL OF BLADES</Text>
          <TouchableOpacity onPress={clearScores}>
            <Text style={styles.clear}>RESET</Text>
          </TouchableOpacity>
        </View>

        {scores.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>⚔️</Text>
            <Text style={styles.emptyText}>No victories yet.</Text>
            <Text style={styles.emptySubtext}>Win a battle to appear here.</Text>
          </View>
        ) : (
          <FlatList
            data={scores}
            keyExtractor={(_, i) => String(i)}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a1a' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3a',
  },
  back: { color: '#6c63ff', fontWeight: '700', fontSize: 13 },
  title: { color: '#f59e0b', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  clear: { color: '#ef4444', fontWeight: '700', fontSize: 12 },
  list: { paddingHorizontal: 16, paddingTop: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12122a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  rank: { fontSize: 20, width: 40 },
  info: { flex: 1 },
  name: { color: '#fff', fontWeight: '800', fontSize: 15 },
  meta: { color: '#666', fontSize: 11, marginTop: 2 },
  power: { color: '#6c63ff', fontWeight: '900', fontSize: 18 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 52, marginBottom: 12 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  emptySubtext: { color: '#666', fontSize: 13, marginTop: 6 },
});
