// functions first
function buildQuiz() {}

//Variables (DOM)
const quizDiv = document.getElementById("quiz");
const questions = [];
let currentQuestionIndex = 0;

async function getData() {
  try {
    const res = await fetch('./src/modules/questions.json');
    if (!res.ok) throw new Error('Kunde inte läsa in questions.json');

    const data = await res.json();
    questions.push(...data);

  } catch (err) {
    console.error(err);
  }
}



function checkAnswer(userAnswer, questionObj) {
  //Compare userAnswer with the correct answer
  const isCorrect =
    userAnswer ===
    (questionObj.correct_answer || questionObj.correct_answer === "True");
}
//Display feedback
showFeedback(isCorrect);
{
  let message = document.getElementById("message");
  if (!message) {
    message = document.createElement("div");
    message.id = "message";
    document.getElementById("quiz").appendChild(message);
  }
  message.textContent = isCorrect ? "Correct!" : "Incorrect.";
  message.style.marginBottom = "1rem";
}

//Disables answer so the user can't click twice
const answerButtons = document.querySelectorAll("button");
answerButtons.forEach((btn) => (btn.disabled = true));

//Delay for feedback, then move to the next question
setTimeout(() => {}, 1000); //1 sec

function renderNextQuestion() {
  currentQuestionIndex++;
  let message = document.getElementById("message");
  if (message) message.textContent = "";
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";
  if (currentQuestionIndex < questions.length) {
    quizDiv.appendChild(
      createQuestionEl(
        questions[currentQuestionIndex].question,
        questions[currentQuestionIndex]
      )
    );
  } else {
    quizDiv.textContent = "Quiz finished";
  }
}



    currentQuestionIndex = 0;
    quizDiv.innerHTML = "";
    quizDiv.appendChild(createQuestionEl(questions[0].question, questions[0]));
 
  


function createQuestionEl(content, questionObj) {
  //Create container for questions and answers
  const container = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = content;
  p.style.marginBlockEnd = ".5rem";
  container.appendChild(p);
  //Create buttons true and false
  const answerButtons = document.createElement("div");
  answerButtons.style.marginBottom = "1rem";

  const trueBtn = document.createElement("button");
  trueBtn.textContent = "True";
  trueBtn.addEventListener("click", function () {
    checkAnswer(true, questionObj);
  });

  const falseBtn = document.createElement("button");
  falseBtn.textContent = "False";
  falseBtn.addEventListener("click", function () {
    checkAnswer(false, questionObj);
  });

  answerButtons.appendChild(trueBtn);
  answerButtons.appendChild(falseBtn);

  container.appendChild(answerButtons);
  return container;
}

document.addEventListener("click", (e) => {
  e.preventDefault();

  // read an Id attribute from the clicked element(adjust attribute name to your HTML)
  const questionID = e.target.getAttribute("data-question-id") || e.target.id;
  if (!questionID) return; // nothing to do if there is no Id

  const question =
    typeof getQuestionById === "function" ? getQuestionById(questionID) : null;

  if (question) {
    question.checkAnswer(questionID);
  }
});

const render = function () {};
