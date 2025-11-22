import { bus } from "../core/eventBus";

const STORAGE_KEY = "quiz_highscores";

export function saveHighscore(score, name) {

  const highscores = getHighscores(STORAGE_KEY);

  const entry = {
    player: name,
    score: score
  }

  const scoreExists = highscores
    .find( highscore => highscore.score === entry.score)

  if (scoreExists) return 

  if (highscores.includes(entry.score)) return

  highscores.push(entry);

  // Sort from highest to lowest
  highscores.sort((a, b) => b.score - a.score);

  const topTen = highscores.slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(topTen));

  bus.emit('storage', topTen);

  console.log("Highscore saved!", entry.player, entry.score);
}

export function getHighscores() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearStorage() {
  localStorage.setItem(STORAGE_KEY, [])
  console.log("Cleared Highscores!", localStorage.getItem(STORAGE_KEY));
}