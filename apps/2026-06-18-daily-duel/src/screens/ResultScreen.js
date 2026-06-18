import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EMOJI = { correct: '🟩', present: '🟨', absent: '⬛' };

export default function ResultScreen({ navigation, route }) {
  const { won, attempts, word, allEvaluations, time } = route.params;

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const emojiGrid = (allEvaluations ?? [])
    .map(row => row.map(s => EMOJI[s] ?? '⬛').join(''))
    .join('\n');

  const shareText =
    `DailyDuel ${new Date().toLocaleDateString()} ${won ? attempts : 'X'}/6\n` +
    `⏱ ${formatTime(time)}\n\n${emojiGrid}`;

  const handleShare = () => Share.share({ message: shareText });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>{won ? '🏆' : '💀'}</Text>
        <Text style={[styles.title, won ? styles.titleGreen : styles.titleRed]}>
          {won ? 'YOU WIN!' : 'GAME OVER'}
        </Text>

        <Text style={styles.wordReveal}>
          The word was{' '}
          <Text style={styles.wordHighlight}>{word}</Text>
        </Text>

        <View style={styles.statsRow}>
          <MiniStat label="Attempts" value={won ? `${attempts}/6` : 'X/6'} />
          <MiniStat label="Time"     value={formatTime(time)} />
        </View>

        <View style={styles.emojiCard}>
          <Text style={styles.emojiLabel}>Your Result</Text>
          <Text style={styles.emojiGrid}>{emojiGrid}</Text>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
          <Text style={styles.shareBtnText}>SHARE RESULT  ↗</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeBtnText}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function MiniStat({ label, value }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content:   { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },

  icon:         { fontSize: 72, marginBottom: 12 },
  title:        { fontSize: 34, fontWeight: '900', letterSpacing: 4, marginBottom: 8 },
  titleGreen:   { color: '#4ecca3' },
  titleRed:     { color: '#e94560' },

  wordReveal:     { color: '#888899', fontSize: 16, marginBottom: 24 },
  wordHighlight:  { color: '#fff', fontWeight: '800', textTransform: 'uppercase' },

  statsRow:   { flexDirection: 'row', marginBottom: 24 },
  miniStat:   {
    alignItems: 'center', backgroundColor: '#16213e',
    borderRadius: 14, padding: 16, minWidth: 100, marginHorizontal: 8,
  },
  miniValue:  { fontSize: 24, fontWeight: '800', color: '#fff' },
  miniLabel:  { fontSize: 11, color: '#666688', marginTop: 4 },

  emojiCard:  {
    backgroundColor: '#16213e', borderRadius: 18,
    padding: 22, marginBottom: 28, width: '100%', alignItems: 'center',
  },
  emojiLabel: { color: '#666688', fontSize: 11, letterSpacing: 1, marginBottom: 12 },
  emojiGrid:  { fontSize: 24, lineHeight: 34, textAlign: 'center' },

  shareBtn:     {
    backgroundColor: '#e94560',
    paddingVertical: 16, borderRadius: 50, width: '100%',
    alignItems: 'center', marginBottom: 12,
    shadowColor: '#e94560', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 6,
  },
  shareBtnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 2 },

  homeBtn:      { paddingVertical: 12 },
  homeBtnText:  { color: '#666688', fontSize: 15 },
});
