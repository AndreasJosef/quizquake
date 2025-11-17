import { fetchQuestions } from "./questionsAdapter.js";
import { renderUI } from "./ui.js";


// ===== Start quiz =====
// async function startQuiz() {
//   try {
//     const data = await getData();

//     // data ser ut som { quiz: [ { category, questions: [...] }, ... ] }
//     // vi plattar ut alla questions till en lista
//     questions = data.quiz.flatMap((category) => category.questions);

//     currentQuestionIndex = 0;
//     renderCurrentQuestion();
//   } catch (err) {
//     console.error(err);
//     quizDiv.textContent = "Kunde inte ladda frågor 😢";
//   }
// }
const quizDiv = document.getElementById("quiz");

export function createGameService(){

    let state = {
        questions: null,
        gameReady: false,
        currentQuestion: 0
    };

    // returns a random question within questions range
    function getRandomQuestion(){

        // return Math.floor(Math.random() * state.questions.length);
        return 2
    }   

    return {

        async init(){

            if (state.gameReady) return;

            state.questions = await fetchQuestions()

            state.gameReady = true;

            renderUI({...state});

        },

        makeMove(answer) {

        }


    }
}