import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { generateHero } from '../utils/heroGenerator';
import HeroCard from '../components/HeroCard';

const STORAGE_KEY = 'nameforge_collection';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [recentHeroes, setRecentHeroes] = useState([]);

  const loadRecent = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all = JSON.parse(raw);
        setRecentHeroes(all.slice(-3).reverse());
      }
    } catch (_) {}
  };

  useFocusEffect(useCallback(() => { loadRecent(); }, []));

  const handleForge = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      Alert.alert('Too Short', 'Enter at least 2 characters to forge a hero.');
      return;
    }
    const hero = generateHero(trimmed);
    navigation.navigate('Hero', { hero });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.tagline}>Enter your name. Forge your destiny.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name..."
        placeholderTextColor="#444"
        value={name}
        onChangeText={setName}
        maxLength={30}
        autoCorrect={false}
        autoCapitalize="words"
        returnKeyType="done"
        onSubmitEditing={handleForge}
      />

      <TouchableOpacity style={styles.forgeButton} onPress={handleForge} activeOpacity={0.85}>
        <Text style={styles.forgeButtonText}>FORGE HERO</Text>
      </TouchableOpacity>

      {recentHeroes.length > 0 && (
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT HEROES</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
              <Text style={styles.seeAllText}>See all →</Text>
            </TouchableOpacity>
          </View>
          {recentHeroes.map((h) => (
            <TouchableOpacity
              key={h.id}
              onPress={() => navigation.navigate('Hero', { hero: h })}
              activeOpacity={0.75}
            >
              <HeroCard hero={h} compact />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {recentHeroes.length === 0 && (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>⚔️</Text>
          <Text style={styles.placeholderText}>
            Every name hides a warrior.{'\n'}Discover yours.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  content: {
    padding: 20,
    paddingTop: 36,
  },
  tagline: {
    color: '#888',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#1A1A2E',
    color: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#2A2A4E',
    marginBottom: 14,
  },
  forgeButton: {
    backgroundColor: '#E94560',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
  },
  forgeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 2,
  },
  recentSection: {
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#555',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  seeAllText: {
    color: '#E94560',
    fontSize: 13,
  },
  placeholder: {
    marginTop: 48,
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  placeholderText: {
    color: '#444',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
  },
});
