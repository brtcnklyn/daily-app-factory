import React, { createContext, useContext, useState, useCallback } from 'react';

const DEFAULT_HABITS = [
  { id: '1', name: 'Drink 8 glasses of water', icon: '💧' },
  { id: '2', name: 'Exercise for 20 minutes', icon: '🏃' },
  { id: '3', name: 'Sleep 8 hours last night', icon: '😴' },
  { id: '4', name: 'Read for 15 minutes', icon: '📚' },
  { id: '5', name: 'Meditate for 5 minutes', icon: '🧘' },
];

export const MOOD_LIST = [
  { emoji: '😁', label: 'Amazing', value: 5, color: '#10B981' },
  { emoji: '😊', label: 'Good', value: 4, color: '#6EE7B7' },
  { emoji: '😐', label: 'Okay', value: 3, color: '#FCD34D' },
  { emoji: '😔', label: 'Bad', value: 2, color: '#F87171' },
  { emoji: '😢', label: 'Rough', value: 1, color: '#EF4444' },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [habits, setHabits] = useState(
    DEFAULT_HABITS.map((h) => ({ ...h, completed: false }))
  );
  const [todayMood, setTodayMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [streak, setStreak] = useState(3);

  const toggleHabit = useCallback((id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  }, []);

  const checkInMood = useCallback((mood) => {
    const today = new Date().toDateString();
    setTodayMood(mood);
    setMoodHistory((prev) => {
      const filtered = prev.filter((m) => m.date !== today);
      return [...filtered, { date: today, mood }];
    });
    setStreak((prev) => prev + 1);
  }, []);

  const completedCount = habits.filter((h) => h.completed).length;
  const healthPercent = Math.round((completedCount / habits.length) * 100);
  const petLevel = Math.floor(streak / 7) + 1;

  return (
    <AppContext.Provider
      value={{
        habits,
        todayMood,
        moodHistory,
        streak,
        completedCount,
        healthPercent,
        petLevel,
        toggleHabit,
        checkInMood,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
