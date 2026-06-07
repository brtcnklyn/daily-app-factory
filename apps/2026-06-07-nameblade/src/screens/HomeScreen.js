import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { computeStats } from '../utils/nameEngine';
import HeroCard from '../components/HeroCard';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [preview, setPreview] = useState(null);

  const handleNameChange = (text) => {
    setName(text);
    if (text.trim().length >= 2) {
      setPreview(computeStats(text));
    } else {
      setPreview(null);
    }
  };

  const handleBattle = () => {
    if (!preview) return;
    navigation.navigate('Battle', { hero: preview });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>⚔️ NAMEBLADE</Text>
          <Text style={styles.sub}>Your name is your weapon</Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>ENTER YOUR NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Alexander"
            placeholderTextColor="#444"
            value={name}
            onChangeText={handleNameChange}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize="words"
          />
        </View>

        {preview && (
          <View style={styles.previewSection}>
            <Text style={styles.previewTitle}>YOUR BLADE STATS</Text>
            <View style={styles.cardWrapper}>
              <HeroCard fighter={preview} isEnemy={false} />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, !preview && styles.buttonDisabled]}
          onPress={handleBattle}
          disabled={!preview}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>⚔️  ENTER BATTLE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.leaderboardBtn}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.leaderboardText}>🏆  LEADERBOARD</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 4,
  },
  sub: {
    fontSize: 13,
    color: '#6c63ff',
    letterSpacing: 2,
    marginTop: 4,
    fontWeight: '600',
  },
  label: {
    color: '#666',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#12122a',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6c63ff',
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 18,
    paddingVertical: 14,
    letterSpacing: 1,
  },
  previewSection: {
    flex: 1,
    marginBottom: 16,
  },
  previewTitle: {
    color: '#666',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardWrapper: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#2a2a4a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  leaderboardBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  leaderboardText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
