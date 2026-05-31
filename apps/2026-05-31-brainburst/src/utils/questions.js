export const ALL_QUESTIONS = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'How many planets are in our solar system?',
    options: ['7', '8', '9', '10'],
    answer: '8',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 'Pacific',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Michelangelo'],
    answer: 'Da Vinci',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    answer: 'Au',
  },
  {
    question: 'Which country invented pizza?',
    options: ['France', 'Greece', 'Spain', 'Italy'],
    answer: 'Italy',
  },
  {
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Greyhound', 'Horse'],
    answer: 'Cheetah',
  },
  {
    question: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'],
    answer: '6',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    answer: 'Mars',
  },
  {
    question: 'What is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    answer: 'Nile',
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Dickens', 'Shakespeare', 'Austen', 'Hemingway'],
    answer: 'Shakespeare',
  },
  {
    question: 'What is the boiling point of water in Celsius?',
    options: ['90°C', '95°C', '100°C', '105°C'],
    answer: '100°C',
  },
  {
    question: 'How many strings does a standard guitar have?',
    options: ['4', '5', '6', '7'],
    answer: '6',
  },
  {
    question: 'Which element has the atomic number 1?',
    options: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'],
    answer: 'Hydrogen',
  },
  {
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Bangkok', 'Tokyo'],
    answer: 'Tokyo',
  },
  {
    question: 'How many players are on a basketball team on the court?',
    options: ['4', '5', '6', '7'],
    answer: '5',
  },
  {
    question: 'What is the square root of 144?',
    options: ['11', '12', '13', '14'],
    answer: '12',
  },
  {
    question: 'Which continent is the largest by area?',
    options: ['Africa', 'North America', 'Asia', 'Europe'],
    answer: 'Asia',
  },
  {
    question: 'What language has the most native speakers?',
    options: ['English', 'Spanish', 'Mandarin', 'Hindi'],
    answer: 'Mandarin',
  },
  {
    question: 'Which company makes the iPhone?',
    options: ['Samsung', 'Google', 'Apple', 'Sony'],
    answer: 'Apple',
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Quartz', 'Diamond'],
    answer: 'Diamond',
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    answer: '7',
  },
  {
    question: 'Which gas do plants absorb from the air?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    answer: 'Carbon Dioxide',
  },
  {
    question: 'What is the currency of the United Kingdom?',
    options: ['Euro', 'Dollar', 'Franc', 'Pound'],
    answer: 'Pound',
  },
  {
    question: 'Who was the first person to walk on the Moon?',
    options: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'John Glenn'],
    answer: 'Neil Armstrong',
  },
  {
    question: 'How many bones does an adult human body have?',
    options: ['186', '206', '226', '246'],
    answer: '206',
  },
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'],
    answer: 'Canberra',
  },
  {
    question: 'Which sport is played at Wimbledon?',
    options: ['Golf', 'Cricket', 'Tennis', 'Polo'],
    answer: 'Tennis',
  },
  {
    question: 'What is 15% of 200?',
    options: ['20', '25', '30', '35'],
    answer: '30',
  },
  {
    question: 'Which ocean is the smallest?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Southern'],
    answer: 'Arctic',
  },
];

export const getRandomQuestions = (count = 10) => {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q) => ({
    ...q,
    options: [...q.options].sort(() => Math.random() - 0.5),
  }));
};
