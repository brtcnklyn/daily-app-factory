function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuestion() {
  const type = randomInt(0, 2);
  let a, b, answer, text;

  if (type === 0) {
    a = randomInt(10, 79);
    b = randomInt(10, 79);
    answer = a + b;
    text = `${a} + ${b}`;
  } else if (type === 1) {
    a = randomInt(20, 99);
    b = randomInt(1, a - 1);
    answer = a - b;
    text = `${a} − ${b}`;
  } else {
    a = randomInt(2, 12);
    b = randomInt(2, 12);
    answer = a * b;
    text = `${a} × ${b}`;
  }

  const wrongs = new Set();
  while (wrongs.size < 3) {
    const delta = randomInt(1, 15) * (Math.random() > 0.5 ? 1 : -1);
    const candidate = answer + delta;
    if (candidate > 0 && candidate !== answer && !wrongs.has(candidate)) {
      wrongs.add(candidate);
    }
  }

  return {
    text: `${text} = ?`,
    answer,
    choices: shuffle([answer, ...wrongs]),
  };
}

export function generateQuestions(count = 10) {
  return Array.from({ length: count }, generateQuestion);
}
