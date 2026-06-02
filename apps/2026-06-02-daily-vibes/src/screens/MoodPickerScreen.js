import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { MOODS } from '../data/vibes';
import MoodCard from '../components/MoodCard';

export default function MoodPickerScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleContinue = () => {
    if (selectedMood) {
      navigation.replace('VibeResult', { mood: selectedMood });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>How are you{'\n'}feeling right now?</Text>
        <Text style={styles.subtitle}>Choose the mood that resonates most</Text>
      </View>

      <FlatList
        data={MOODS}
        renderItem={({ item }) => (
          <MoodCard
            mood={item}
            selected={selectedMood?.id === item.id}
            onPress={() => setSelectedMood(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedMood && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedMood}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {selectedMood
              ? `Reveal My ${selectedMood.label} Vibe ✨`
              : 'Select a mood first'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A2E',
    lineHeight: 36,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footer: {
    padding: 24,
    paddingBottom: 36,
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#DDD',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
