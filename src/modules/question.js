// ===== DOM-referenser =====
const quizDiv = document.getElementById("question-text");
const startBtn = document.getElementById("start-game-btn");

// ===== State =====
let questions = [];
let currentQuestionIndex = 0;

// ===== Start quiz =====
async function startQuiz() {
  try {
    const data = await getData();

    // data ser ut som { quiz: [ { category, questions: [...] }, ... ] }
    // vi plattar ut alla questions till en lista
    questions = data.quiz.flatMap((category) => category.questions);

    currentQuestionIndex = 0;
    renderCurrentQuestion();
  } catch (err) {
    console.error(err);
    quizDiv.textContent = "Kunde inte ladda frågor 😢";
  }
}

// ===== fetch JSON =====
async function getData() {
  // Justera sökvägen så den matchar din riktiga struktur:
  // om filen ligger i src/modules: './src/modules/questions.json'
  const res = await fetch("./src/modules/questions.json");

  if (!res.ok) {
    throw new Error("Kunde inte läsa in questions.json");
  }

  return res.json();
}

// ===== Render question =====
function renderCurrentQuestion() {
  quizDiv.innerHTML = "";

  if (currentQuestionIndex >= questions.length) {
    quizDiv.textContent = "Quiz klart! 🎉";
    return;
  }

  const questionObj = questions[currentQuestionIndex];
  const questionEl = createQuestionEl(questionObj);
  quizDiv.appendChild(questionEl);
}

// ===== Create HTML for question =====
function createQuestionEl(questionObj) {
  const container = document.createElement("div");

  const p = document.createElement("p");
  p.textContent = questionObj.question;
  p.style.marginBlockEnd = ".5rem";
  container.appendChild(p);

  const btnWrapper = document.createElement("div");
  btnWrapper.style.marginBottom = "1rem";

  // true-Btn
  const trueBtn = document.createElement("button");
  trueBtn.textContent = "True";
  trueBtn.addEventListener("click", () => {
    handleAnswer("true", questionObj);
  });

  // false-Btn
  const falseBtn = document.createElement("button");
  falseBtn.textContent = "False";
  falseBtn.addEventListener("click", () => {
    handleAnswer("false", questionObj);
  });

  btnWrapper.appendChild(trueBtn);
  btnWrapper.appendChild(falseBtn);
  container.appendChild(btnWrapper);

  return container;
}

// ===== When user answers =====
function handleAnswer(userAnswer, questionObj) {
  const correct = questionObj.answer.toLowerCase(); // "true" / "false"
  const isCorrect = userAnswer === correct;

  showFeedback(isCorrect);

  // Stops ability to press button twice
  const buttons = quizDiv.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  // gå vidare efter 0,5 sekunder
  setTimeout(() => {
    const msg = document.getElementById("message");
    if (msg) msg.textContent = "";
    currentQuestionIndex++;
    renderCurrentQuestion();
  }, 500);
}

// ===== show feedback =====
function showFeedback(isCorrect) {
  let message = document.getElementById("message");
  if (!message) {
    message = document.createElement("div");
    message.id = "message";
    quizDiv.appendChild(message);
  }
  message.textContent = isCorrect ? "Rätt!" : "Fel";
  message.style.marginBottom = "1rem";
}

// ===== connect button =====
startBtn.addEventListener("click", startQuiz);
