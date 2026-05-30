import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HeroCard from '../components/HeroCard';

const STORAGE_KEY = 'nameforge_collection';

export default function CollectionScreen({ navigation }) {
  const [heroes, setHeroes] = useState([]);

  const loadHeroes = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        setHeroes(JSON.parse(raw).reverse());
      } else {
        setHeroes([]);
      }
    } catch (_) {}
  };

  useFocusEffect(useCallback(() => { loadHeroes(); }, []));

  const handleDelete = (heroId, heroName) => {
    Alert.alert(
      'Remove Hero',
      `Remove ${heroName} from your collection?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const raw = await AsyncStorage.getItem(STORAGE_KEY);
              const all = raw ? JSON.parse(raw) : [];
              const updated = all.filter((h) => h.id !== heroId);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
              setHeroes((prev) => prev.filter((h) => h.id !== heroId));
            } catch (_) {}
          },
        },
      ]
    );
  };

  if (heroes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>⚔️</Text>
        <Text style={styles.emptyTitle}>No Heroes Yet</Text>
        <Text style={styles.emptySubtitle}>
          Forge a hero and save it to build your collection.
        </Text>
        <TouchableOpacity
          style={styles.forgeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.forgeButtonText}>FORGE YOUR FIRST HERO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={heroes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.hint}>Tap a hero to view · Long press to remove</Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Hero', { hero: item })}
          onLongPress={() => handleDelete(item.id, item.name)}
          activeOpacity={0.8}
        >
          <HeroCard hero={item} compact />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  content: {
    padding: 16,
  },
  hint: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#0D0D1A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#EAEAEA',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
  },
  forgeButton: {
    backgroundColor: '#E94560',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  forgeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
});
