<<<<<<< HEAD:src/modules/question.js
// ===== DOM-referenser =====
const quizDiv = document.getElementById("question-text");
const startBtn = document.getElementById("start-game-btn");
=======
const questionContainer = document.getElementById('quiz')
>>>>>>> c57d986a63a0b8de670e3bdd60aafed41994b74a:src/modules/ui.js

// ===== Renderer =====
export function renderUI(state){

  renderCurrentQuestion(questionContainer, state.questions[state.currentQuestion]);
}


// UI Components

// ===== Render question =====
function renderCurrentQuestion(root, question) {
  console.log(question);
  root.innerHTML = "";

  const questionEl = createQuestionEl(question);
  root.appendChild(questionEl);
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

  // debounce gå vidare efter 0,5 sekunder
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

