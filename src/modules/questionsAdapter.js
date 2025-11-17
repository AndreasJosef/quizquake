
// ===== fetch JSON =====
export async function fetchQuestions() {

  const res = await fetch('/src/assets/questions.json/');

  if (!res.ok) {
    throw new Error("Kunde inte läsa in questions.json");
  }

  const rawData = await res.json();

  // 50 random index
  // filterar res p de

  return rawData.quiz.flatMap(item => item.questions)

}

