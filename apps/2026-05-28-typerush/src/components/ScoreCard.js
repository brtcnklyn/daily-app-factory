import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreCard({ wpm, accuracy, grade, label, color }) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <View style={[styles.gradeBadge, { backgroundColor: color }]}>
        <Text style={styles.gradeText}>{grade}</Text>
      </View>
      <Text style={styles.gradeLabel}>{label}</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{wpm}</Text>
          <Text style={styles.statLabel}>WPM</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{accuracy}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginVertical: 12,
    alignSelf: 'stretch',
  },
  gradeBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gradeText: { fontSize: 36, fontWeight: '800', color: '#FFFFFF' },
  gradeLabel: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 20 },
  stats: { flexDirection: 'row', alignItems: 'center' },
  stat: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: { fontSize: 32, fontWeight: '800', color: '#1F2937' },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  divider: { width: 1, height: 48, backgroundColor: '#E5E7EB' },
});
