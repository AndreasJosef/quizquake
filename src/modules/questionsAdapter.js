// ===== fetch JSON =====
export async function fetchQuestions(category) {

  const res = await fetch(`/data/${category}.json`);

  if (!res.ok) {
    throw new Error("Kunde inte läsa in questions.json");
  }

  const rawData = await res.json();

  console.log(rawData);

  return getRandomQuestions(rawData, 50);
}

// private helper 
function getRandomQuestions(questions, count) {

  const shuffled = [...questions];

  // Fisher-Yates shuffle algoritm (bäst enligt internet)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}
