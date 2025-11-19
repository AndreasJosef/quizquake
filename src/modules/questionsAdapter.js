// ===== fetch JSON =====
export async function fetchQuestions(category) {

  const res = await fetch(`/src/assets/${category}.json`);

  if (!res.ok) {
    throw new Error("Kunde inte läsa in questions.json");
  }

  const rawData = await res.json();

  const allQuestions = rawData.quiz.flatMap(item => item.questions)

  return getRandomQuestions(allQuestions, 50);
}


function getRandomQuestions(questions, count) {

  const shuffled = [...questions];

  // Fisher-Yates shuffle algoritm (bäst enligt internet)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];


  }

  return shuffled.slice(0, Math.min(count, shuffled.length));


}
