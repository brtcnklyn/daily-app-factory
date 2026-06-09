import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import HeroStats from '../components/HeroStats';
import MonsterDisplay from '../components/MonsterDisplay';
import CardComponent from '../components/CardComponent';
import { getRandomCards } from '../data/cards';
import { getMonsterForFloor } from '../data/monsters';

const HERO_MAX_HP = 100;
const MONSTER_TURN_DELAY = 900;

export default function GameScreen({ onGameOver }) {
  const [hero, setHero] = useState({ hp: HERO_MAX_HP, maxHp: HERO_MAX_HP, shield: 0 });
  const [monster, setMonster] = useState(() => getMonsterForFloor(1));
  const [floor, setFloor] = useState(1);
  const [cards, setCards] = useState(() => getRandomCards(3));
  const [message, setMessage] = useState('A monster appears! Choose a card to fight!');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [floorCleared, setFloorCleared] = useState(false);
  const [isDead, setIsDead] = useState(false);

  useEffect(() => {
    if (!isDead) return;
    const timer = setTimeout(() => onGameOver({ floor }), 1500);
    return () => clearTimeout(timer);
  }, [isDead]);

  const playCard = (card) => {
    if (!isPlayerTurn || floorCleared || isDead) return;

    setIsPlayerTurn(false);

    let newHeroHp = hero.hp;
    let newHeroShield = 0;
    let newMonsterHp = monster.hp;
    let playerMsg = '';

    if (card.type === 'attack') {
      newMonsterHp = monster.hp - card.value;
      playerMsg = `${card.emoji} ${card.name}: Dealt ${card.value} damage!`;
    } else if (card.type === 'defend') {
      newHeroShield = card.value;
      playerMsg = `${card.emoji} ${card.name}: Gained ${card.value} shield!`;
    } else if (card.type === 'heal') {
      newHeroHp = Math.min(hero.maxHp, hero.hp + card.value);
      playerMsg = `${card.emoji} ${card.name}: Restored ${card.value} HP!`;
    } else if (card.type === 'special') {
      newMonsterHp = monster.hp - card.attackValue;
      newHeroShield = card.shieldValue;
      playerMsg = `${card.emoji} ${card.name}: ${card.attackValue} dmg + ${card.shieldValue} shield!`;
    }

    setMessage(playerMsg);
    setHero({ ...hero, hp: newHeroHp, shield: newHeroShield });
    setMonster({ ...monster, hp: newMonsterHp });

    if (newMonsterHp <= 0) {
      setTimeout(() => {
        setMessage(`🎉 ${monster.name} defeated! Floor ${floor} cleared!`);
        setFloorCleared(true);
      }, 300);
      return;
    }

    const capturedMonster = monster;
    setTimeout(() => {
      const damage = Math.max(0, capturedMonster.attack - newHeroShield);
      const finalHp = newHeroHp - damage;

      if (finalHp <= 0) {
        setHero(prev => ({ ...prev, hp: 0, shield: 0 }));
        setMessage(`💀 ${capturedMonster.name} strikes for ${damage} damage! You died!`);
        setIsDead(true);
      } else {
        setHero(prev => ({ ...prev, hp: finalHp, shield: 0 }));
        setMessage(`${capturedMonster.emoji} ${capturedMonster.name} attacks for ${damage} damage!`);
        setCards(getRandomCards(3));
        setIsPlayerTurn(true);
      }
    }, MONSTER_TURN_DELAY);
  };

  const goToNextFloor = () => {
    const nextFloor = floor + 1;
    const nextMonster = getMonsterForFloor(nextFloor);
    setFloor(nextFloor);
    setMonster(nextMonster);
    setCards(getRandomCards(3));
    setFloorCleared(false);
    setIsPlayerTurn(true);
    setHero(prev => ({ ...prev, shield: 0 }));
    setMessage(`Floor ${nextFloor}: ${nextMonster.name} appears!`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeroStats hero={hero} floor={floor} />

        <MonsterDisplay monster={monster} />

        <View style={styles.messageBox}>
          <Text style={styles.message} numberOfLines={2}>{message}</Text>
        </View>

        {floorCleared ? (
          <TouchableOpacity style={styles.nextBtn} onPress={goToNextFloor} activeOpacity={0.8}>
            <Text style={styles.nextBtnText}>Next Floor →</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cardsRow}>
            {cards.map((card, index) => (
              <CardComponent
                key={`${card.id}-${index}`}
                card={card}
                onPress={playCard}
                disabled={!isPlayerTurn || isDead}
              />
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  messageBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 6,
    minHeight: 46,
    justifyContent: 'center',
  },
  message: {
    color: '#c0c0d8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  cardsRow: {
    flexDirection: 'row',
    marginTop: 6,
    height: 120,
  },
  nextBtn: {
    backgroundColor: '#27ae60',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 6,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
