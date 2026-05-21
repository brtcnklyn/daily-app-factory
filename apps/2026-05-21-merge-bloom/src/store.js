const store = { bestScore: 0 };

export function getBestScore() {
  return store.bestScore;
}

export function updateBestScore(score) {
  if (score > store.bestScore) {
    store.bestScore = score;
  }
}
