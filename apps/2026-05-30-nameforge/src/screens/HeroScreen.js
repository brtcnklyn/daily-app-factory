import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeroCard from '../components/HeroCard';

const STORAGE_KEY = 'nameforge_collection';

export default function HeroScreen({ route, navigation }) {
  const { hero } = route.params;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const collection = JSON.parse(raw);
          setSaved(collection.some((h) => h.id === hero.id));
        }
      } catch (_) {}
    })();
  }, [hero.id]);

  const handleSave = async () => {
    if (saved) return;
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const collection = raw ? JSON.parse(raw) : [];
      collection.push({ ...hero, savedAt: new Date().toISOString() });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
      setSaved(true);
      Alert.alert('Hero Saved!', `${hero.name} has been added to your collection.`);
    } catch (_) {
      Alert.alert('Error', 'Could not save hero. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeroCard hero={hero} />

      <TouchableOpacity
        style={[styles.saveButton, saved && styles.saveButtonSaved]}
        onPress={handleSave}
        activeOpacity={0.85}
        disabled={saved}
      >
        <Text style={styles.saveButtonText}>
          {saved ? '✓  SAVED TO COLLECTION' : '  SAVE HERO'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgeAgainButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.85}
      >
        <Text style={styles.forgeAgainText}>⚔️  FORGE ANOTHER</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Your hero is unique — the same name always forges the same warrior.
        </Text>
      </View>
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
    paddingTop: 16,
  },
  saveButton: {
    backgroundColor: '#E94560',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  saveButtonSaved: {
    backgroundColor: '#2A2A3E',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  forgeAgainButton: {
    borderWidth: 2,
    borderColor: '#E94560',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  forgeAgainText: {
    color: '#E94560',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  infoText: {
    color: '#555',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
  },
});
