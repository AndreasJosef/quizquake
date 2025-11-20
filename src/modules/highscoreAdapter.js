// ====================================================
// Step 1: the key used in localStorage
// ====================================================
const STORAGE_KEY = "quiz_highscores";

// ====================================================
// Step 2: new score
// ====================================================
export function saveHighscore(name, score) {
  // the score is a valid number
  if (typeof score !== "number" || isNaN(score)) {
    console.error("Score must be a number");
    return;
  }

  // Step 2.1: Load existing highscores
  const highscores = loadFromLocalStorage(STORAGE_KEY);

  // check if score already exists
  if (highscores.includes(score)) return 


  // Step 2.2: the new score
  highscores.push(score);

  // Step 2.3: Sort from highest to lowest
  highscores.sort((a, b) => b - a);

  // Step 2.4: Keep only top 10
  const topTen = highscores.slice(0, 10);

  // Step 2.5: Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topTen));

  console.log("✅ Highscore saved!");
}

// ====================================================
// Step 3:  list of highscores
// ====================================================

export function getHighscores() {
  return loadFromLocalStorage(STORAGE_KEY);
}

export function getPlayers() {
  const highscores = loadFromLocalStorage(STORAGE_KEY);
  return highscores.map(player => player.name);
}

export function createPlayer(name) {
  if (!name) return console.error("Name is required");

  const highscores = loadFromLocalStorage(STORAGE_KEY);

  // check om spelaren redan finns 

  if (highscores.some(player => player.name === name)) {
    console.warn("Player already exists");
    return;
  }

  // skapa ny spelare


  highscores.push({ name, scores: [] });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highscores));

  console.log(`Player ${name} created`);
  
}
  


// ====================================================
// Step 4: to load data from localStorage
// ====================================================
function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}



// highscore shape
// const highscores = [
//   {
//     name: 'Joakim',
//     scores: [1,2,3]
//   },
//   {
//     name: 'Andreas',
//     scores: [1,2,3]
//   },

// ]