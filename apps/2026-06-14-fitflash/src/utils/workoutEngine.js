const EXERCISES = [
  { name: 'Push-Ups', reps: '15 reps', muscle: 'Chest', emoji: '💪', instruction: 'Keep your body straight, lower chest to floor' },
  { name: 'Squats', reps: '20 reps', muscle: 'Legs', emoji: '🦵', instruction: 'Feet shoulder-width apart, lower until thighs parallel' },
  { name: 'Plank Hold', reps: '30 seconds', muscle: 'Core', emoji: '🔥', instruction: 'Keep body straight as a board, breathe steadily' },
  { name: 'Burpees', reps: '10 reps', muscle: 'Full Body', emoji: '⚡', instruction: 'Jump, drop to plank, push-up, jump back up' },
  { name: 'Jumping Jacks', reps: '30 reps', muscle: 'Cardio', emoji: '🏃', instruction: 'Jump with arms and legs wide, return to start' },
  { name: 'Mountain Climbers', reps: '20 reps', muscle: 'Core', emoji: '⛰️', instruction: 'Plank position, alternate driving knees to chest fast' },
  { name: 'Reverse Lunges', reps: '12 each leg', muscle: 'Legs', emoji: '🦶', instruction: 'Step backward, lower back knee toward floor' },
  { name: 'Tricep Dips', reps: '12 reps', muscle: 'Arms', emoji: '🪑', instruction: 'Use a chair edge, lower body by bending elbows' },
  { name: 'High Knees', reps: '40 reps', muscle: 'Cardio', emoji: '🚀', instruction: 'Run in place, drive knees up to waist height' },
  { name: 'Crunches', reps: '20 reps', muscle: 'Core', emoji: '🎯', instruction: 'Feet flat on floor, curl up toward knees, exhale at top' },
  { name: 'Wall Sit', reps: '30 seconds', muscle: 'Legs', emoji: '🧱', instruction: 'Back flat against wall, thighs parallel to floor' },
  { name: 'Superman Holds', reps: '12 reps', muscle: 'Back', emoji: '🦸', instruction: 'Lie face down, lift arms and legs simultaneously, hold 2s' },
  { name: 'Side Plank', reps: '20s each side', muscle: 'Core', emoji: '⚖️', instruction: 'Balance on one forearm and foot, keep hips high' },
  { name: 'Jump Squats', reps: '15 reps', muscle: 'Legs', emoji: '🐸', instruction: 'Squat down then explode upward into a jump, land softly' },
  { name: 'Diamond Push-Ups', reps: '10 reps', muscle: 'Triceps', emoji: '💎', instruction: 'Form diamond with hands under chest, elbows close to body' },
  { name: 'Glute Bridges', reps: '20 reps', muscle: 'Glutes', emoji: '🌉', instruction: 'Lie on back, push hips up squeezing glutes at top' },
  { name: 'Bicycle Crunches', reps: '20 reps', muscle: 'Core', emoji: '🚴', instruction: 'Alternate elbow to opposite knee in cycling motion' },
  { name: 'Inchworms', reps: '8 reps', muscle: 'Full Body', emoji: '🐛', instruction: 'Walk hands out to plank, do a push-up, walk hands back' },
];

export function generateWorkout() {
  const shuffled = [...EXERCISES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}
