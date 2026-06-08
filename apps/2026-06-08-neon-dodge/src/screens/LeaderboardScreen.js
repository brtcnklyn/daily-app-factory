import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: W } = Dimensions.get('window');
const STORAGE_KEY = 'high_scores';
const MAX_SCORES = 10;

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

export default function LeaderboardScreen({ navigate, lastScore }) {
  const [scores, setScores] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const current = stored ? JSON.parse(stored) : [];

        if (lastScore > 0) {
          const updated = [...current, lastScore]
            .sort((a, b) => b - a)
            .slice(0, MAX_SCORES);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          setScores(updated);
          setSaved(true);
        } else {
          setScores(current);
        }
      } catch {
        setScores([]);
      }
    })();
  }, []);

  const handleClear = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setScores([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LEADERBOARD</Text>

      {saved && lastScore > 0 && (
        <View style={styles.savedBadge}>
          <Text style={styles.savedText}>Score {lastScore}s saved!</Text>
        </View>
      )}

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {scores.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No scores yet.</Text>
            <Text style={styles.emptySubText}>Play a game to set a record!</Text>
          </View>
        ) : (
          scores.map((s, i) => (
            <View
              key={i}
              style={[
                styles.row,
                i === 0 && styles.rowFirst,
                lastScore === s && saved && styles.rowHighlight,
              ]}
            >
              <Text style={[styles.rank, i < 3 && { color: MEDAL_COLORS[i] }]}>
                {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
              </Text>
              <Text style={[styles.scoreValue, i === 0 && styles.scoreFirst]}>
                {s}
              </Text>
              <Text style={styles.scoreUnit}>seconds</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigate('home')}>
          <Text style={styles.homeBtnText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playBtn} onPress={() => navigate('game')}>
          <Text style={styles.playBtnText}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>

      {scores.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Clear scores</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    alignItems: 'center',
    paddingTop: 24,
  },
  title: {
    color: '#ff00ff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 6,
    marginBottom: 16,
    textShadowColor: '#ff00ff',
    textShadowRadius: 16,
    textShadowOffset: { width: 0, height: 0 },
  },
  savedBadge: {
    backgroundColor: 'rgba(0,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.4)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  savedText: {
    color: '#00ffff',
    fontSize: 13,
    letterSpacing: 1,
  },
  list: {
    width: '100%',
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  rowFirst: {
    borderColor: 'rgba(255,215,0,0.3)',
    backgroundColor: 'rgba(255,215,0,0.06)',
  },
  rowHighlight: {
    borderColor: 'rgba(0,255,255,0.4)',
    backgroundColor: 'rgba(0,255,255,0.08)',
  },
  rank: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 18,
    fontWeight: 'bold',
    width: 44,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  scoreFirst: {
    color: '#FFD700',
    fontSize: 28,
  },
  scoreUnit: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
    marginLeft: 8,
    width: 58,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    width: '100%',
    paddingHorizontal: 24,
  },
  homeBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'rgba(255,0,255,0.5)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#ff00ff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  playBtn: {
    flex: 2,
    backgroundColor: '#00ffff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  playBtnText: {
    color: '#0a0a1a',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  clearBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  clearText: {
    color: 'rgba(255,80,80,0.5)',
    fontSize: 13,
    letterSpacing: 1,
  },
});
