import { bus } from "../core/eventBus";

const STORAGE_KEY = "quiz_highscores";

// saves a top 10 sorted list of highscore objects to local storage
export function saveHighscore(score, name) {

  const highscores = getHighscores(STORAGE_KEY);

  const entry = {
    player: name,
    score: score
  }

  const scoreExists = highscores
    .find( highscore => highscore.score === entry.score)

  if (scoreExists) return 

  highscores.push(entry);

  // Sort from highest to lowest
  highscores.sort((a, b) => b.score - a.score);

  // only save top ten
  const topTen = highscores.slice(0, 5);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(topTen));

  bus.emit('storage', topTen);

  console.log("Highscore saved:", entry.player, entry.score);
}

// returns a sorted array of highscore objets from local storage
export function getHighscores() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// deletes all highscores from local storage
export function clearStorage() {
  localStorage.setItem(STORAGE_KEY, [])
  console.log("Cleared Highscores!", localStorage.getItem(STORAGE_KEY));
}