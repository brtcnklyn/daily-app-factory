import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatBar from './StatBar';

export default function HeroCard({ hero, compact = false }) {
  if (!hero) return null;

  return (
    <View style={[styles.card, { borderColor: hero.color }, compact && styles.compact]}>
      <View style={[styles.classBadge, { backgroundColor: hero.color }]}>
        <Text style={styles.classIcon}>{hero.icon}</Text>
        <Text style={styles.classText}>{hero.heroClass.toUpperCase()}</Text>
      </View>

      <Text style={styles.heroName}>{hero.name}</Text>
      <Text style={styles.meta}>Lvl {hero.level}  ·  Power {hero.powerRating}</Text>

      {!compact && (
        <>
          <View style={styles.divider} />
          <View style={styles.statsContainer}>
            {Object.entries(hero.stats).map(([key, val]) => (
              <StatBar key={key} label={key} value={val} />
            ))}
          </View>
          <View style={styles.abilityBox}>
            <Text style={styles.abilityLabel}>SPECIAL ABILITY</Text>
            <Text style={styles.abilityName}>{hero.ability}</Text>
          </View>
        </>
      )}

      {compact && (
        <Text style={styles.compactClass}>{hero.heroClass}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    marginVertical: 6,
  },
  compact: {
    padding: 14,
    marginVertical: 4,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    gap: 4,
  },
  classIcon: {
    fontSize: 14,
  },
  classText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1,
  },
  heroName: {
    color: '#FFD700',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  meta: {
    color: '#888',
    fontSize: 13,
  },
  compactClass: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A3E',
    marginVertical: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  abilityBox: {
    backgroundColor: '#0D0D1A',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  abilityLabel: {
    color: '#555',
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 4,
  },
  abilityName: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
