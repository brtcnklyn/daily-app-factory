const CHALLENGES = {
  happy: [
    {
      title: 'Spread the Joy',
      description: "Send a kind, genuine message to someone you haven't talked to in a while. Make their day!",
      emoji: '💌',
      duration: '5 min',
    },
    {
      title: 'Dance Break',
      description: "Put on your favorite upbeat song and dance like nobody's watching for the full duration.",
      emoji: '💃',
      duration: '3 min',
    },
    {
      title: 'Gratitude List',
      description: 'Write down 10 specific things you are grateful for right now. Be detailed!',
      emoji: '📝',
      duration: '10 min',
    },
  ],
  sad: [
    {
      title: 'Comfort Walk',
      description: 'Step outside and take a slow walk. Notice 5 beautiful or interesting things around you.',
      emoji: '🌿',
      duration: '10 min',
    },
    {
      title: 'Feel-Good Playlist',
      description: 'Create a playlist of songs that always lift your mood. Aim for at least 5 songs.',
      emoji: '🎵',
      duration: '15 min',
    },
    {
      title: 'Self-Care Ritual',
      description: 'Make yourself a warm drink and sit quietly without your phone. Just breathe.',
      emoji: '☕',
      duration: '5 min',
    },
  ],
  anxious: [
    {
      title: 'Box Breathing',
      description: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Repeat 8 rounds. Activates your calm system.',
      emoji: '🫁',
      duration: '5 min',
    },
    {
      title: 'Brain Dump',
      description: "Write everything on your mind on paper without filtering or judging. Empty your head.",
      emoji: '📓',
      duration: '10 min',
    },
    {
      title: 'Cold Water Reset',
      description: "Splash cold water on your face 10 times. It triggers the dive reflex and slows your heart rate.",
      emoji: '💧',
      duration: '2 min',
    },
  ],
  excited: [
    {
      title: 'Channel the Energy',
      description: "Start that one task you've been putting off. You have the momentum — use it now!",
      emoji: '⚡',
      duration: '20 min',
    },
    {
      title: 'Vision Board Sprint',
      description: 'Find 5 images that represent your current goals and save them to a dedicated folder.',
      emoji: '🎯',
      duration: '15 min',
    },
    {
      title: 'Share the Hype',
      description: "Record a 2-minute voice note about what's exciting you today. Listen back tomorrow.",
      emoji: '🎙️',
      duration: '3 min',
    },
  ],
  tired: [
    {
      title: 'Power Nap',
      description: 'Set a 20-minute timer and rest with eyes closed. Do not sleep longer — it causes grogginess.',
      emoji: '😴',
      duration: '20 min',
    },
    {
      title: 'Hydration Check',
      description: 'Drink a full glass of water slowly. Rate your energy level again in 5 minutes.',
      emoji: '🥤',
      duration: '5 min',
    },
    {
      title: 'Stretch Reset',
      description: 'Do a slow full-body stretch routine. Focus on your neck, shoulders, and lower back.',
      emoji: '🧘',
      duration: '5 min',
    },
  ],
  calm: [
    {
      title: 'Creative Flow',
      description: 'Draw, doodle, or free-write for 15 minutes with no goal or judgement. Just flow.',
      emoji: '🎨',
      duration: '15 min',
    },
    {
      title: 'Deep Read',
      description: "Read a chapter of a book or a long article you've been meaning to get to.",
      emoji: '📖',
      duration: '20 min',
    },
    {
      title: 'Week Planning',
      description: 'Write 3 meaningful goals for this week and one concrete action step for each.',
      emoji: '🗓️',
      duration: '10 min',
    },
  ],
};

export function getRandomChallenge(mood) {
  const list = CHALLENGES[mood] || CHALLENGES.calm;
  return list[Math.floor(Math.random() * list.length)];
}

export default CHALLENGES;
