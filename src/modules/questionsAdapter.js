
// ===== fetch JSON =====
export async function fetchQuestions() {

  const res = await fetch('/src/assets/questions.json');

  if (!res.ok) {
    throw new Error("Kunde inte läsa in questions.json");
  }

  const rawData = await res.json();

  return rawData.quiz.flatMap(item => item.questions)

}

