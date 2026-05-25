import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem('aura_history');
      if (raw) setHistory(JSON.parse(raw).reverse());
      else setHistory([]);
    } catch (_) {}
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadHistory);
    return unsubscribe;
  }, [navigation, loadHistory]);

  const clearHistory = async () => {
    await AsyncStorage.removeItem('aura_history');
    setHistory([]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { borderLeftColor: item.color }]}>
      <View style={[styles.dot, { backgroundColor: item.color }]}>
        <Text style={styles.dotEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardName, { color: item.color }]}>{item.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Aura History</Text>
        <TouchableOpacity onPress={clearHistory} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌌</Text>
          <Text style={styles.emptyTitle}>No auras yet</Text>
          <Text style={styles.emptySubtitle}>Do your first check-in to see your history here.</Text>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => navigation.navigate('Quiz')}
          >
            <Text style={styles.startBtnText}>Check My Aura →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, idx) => `${item.timestamp}-${idx}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    paddingTop: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  backBtn: { padding: 8 },
  backText: { color: '#7777aa', fontSize: 16 },
  title: { color: '#ffffff', fontSize: 20, fontWeight: '700' },
  clearBtn: { padding: 8 },
  clearText: { color: '#44445a', fontSize: 14 },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#111120',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    marginBottom: 12,
  },
  dot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  dotEmoji: { fontSize: 22 },
  cardContent: { flex: 1 },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    color: '#7777aa',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  cardDate: { color: '#44445a', fontSize: 11 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#7777aa',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  startBtn: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 50,
  },
  startBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
