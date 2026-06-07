import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultScreen({ navigation, route }) {
  const { won, hero, enemy, rounds } = route.params;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    saveScore();
  }, []);

  const saveScore = async () => {
    try {
      const key = 'nameblade_scores';
      const existing = await AsyncStorage.getItem(key);
      const scores = existing ? JSON.parse(existing) : [];
      scores.push({
        name: hero.name,
        won,
        rounds,
        date: new Date().toISOString(),
        attack: hero.attack,
        defense: hero.defense,
      });
      scores.sort((a, b) => (b.won ? 1 : 0) - (a.won ? 1 : 0));
      await AsyncStorage.setItem(key, JSON.stringify(scores.slice(0, 50)));
    } catch (_) {}
  };

  const bgColor = won ? '#0a1a0a' : '#1a0a0a';
  const accentColor = won ? '#22c55e' : '#ef4444';
  const title = won ? '⚔️  VICTORY!' : '💀  DEFEATED';
  const subtitle = won
    ? `${hero.name} conquered ${enemy.name}!`
    : `${enemy.name} overpowered ${hero.name}...`;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <Animated.View style={[styles.resultCard, { borderColor: accentColor, opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{rounds}</Text>
              <Text style={styles.statLabel}>ROUNDS</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{hero.attack}</Text>
              <Text style={styles.statLabel}>ATTACK</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{hero.defense}</Text>
              <Text style={styles.statLabel}>DEFENSE</Text>
            </View>
          </View>

          {won && (
            <View style={styles.powerBox}>
              <Text style={styles.powerLabel}>NAME POWER</Text>
              <Text style={styles.powerName}>{hero.name.toUpperCase()}</Text>
              <Text style={styles.powerScore}>
                {hero.attack + hero.defense + hero.speed} pts
              </Text>
            </View>
          )}
        </Animated.View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: accentColor }]}
          onPress={() => navigation.navigate('Battle', { hero: { ...hero, hp: hero.maxHp } })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>⚔️  FIGHT AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeBtnText}>🏠  CHANGE NAME</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.lbBtn}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.lbBtnText}>🏆  LEADERBOARD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  resultCard: {
    backgroundColor: '#12122a',
    borderRadius: 20,
    borderWidth: 2,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 32, fontWeight: '900', letterSpacing: 3, marginBottom: 8 },
  subtitle: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 20 },
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statBox: {
    backgroundColor: '#0a0a1a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statValue: { color: '#fff', fontSize: 22, fontWeight: '900' },
  statLabel: { color: '#666', fontSize: 10, letterSpacing: 1.5, marginTop: 2 },
  powerBox: {
    backgroundColor: '#1e1a3a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  powerLabel: { color: '#6c63ff', fontSize: 10, letterSpacing: 2, fontWeight: '700' },
  powerName: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 4, marginTop: 4 },
  powerScore: { color: '#a5b4fc', fontSize: 14, fontWeight: '700', marginTop: 2 },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  homeBtn: { alignItems: 'center', paddingVertical: 12 },
  homeBtnText: { color: '#aaa', fontSize: 14, fontWeight: '600', letterSpacing: 1 },
  lbBtn: { alignItems: 'center', paddingVertical: 10 },
  lbBtnText: { color: '#f59e0b', fontSize: 13, fontWeight: '700', letterSpacing: 1 },
});
