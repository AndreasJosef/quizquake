import { fetchQuestions } from "./questionsAdapter.js";
import { bus } from "../core/eventBus.js";
import { startTimer } from "./timerService.js";

function createGameService() {

    let state = {
        questions: null,
        gameReady: false,
        score: 0,
        currentQuestion: null,
        currentQuestionID: null,
        timeRemaining: 60,
        nextIndex: 0,
        player: {
            name: '',
            points: 0
        }
    };

    bus.on('tick', (seconds) => {

        state.timeRemaining = seconds

        publishState();
    })

    function init(){
        publishState();
    }

    async function start() {

        if (state.gameReady) return;

        state.questions = await fetchQuestions('internet_trivia')

        state.gameReady = true;

        state.currentQuestion = state.questions[state.nextIndex].question;
        state.currentQuestionID = state.questions[state.nextIndex].id;

        state.nextIndex++

        startTimer()
        publishState();

    }

    function makeMove(answer) {

        let answeredQuestion = state.questions.find(question => question.id === state.currentQuestionID);


        if (answeredQuestion.answer === answer) {
            state.score++;
        }

        state.currentQuestion = state.questions[state.nextIndex].question;
        state.currentQuestionID = state.questions[state.nextIndex].id;

        state.nextIndex++

        console.log(state.currentQuestion)

        publishState();
    }

    function publishState() {

        const safeState = {
            gameReady: state.gameReady,
            score: state.score,
            currentQuestion: state.currentQuestion,
            currentQuestionID: state.currentQuestionID,
            timeRemaining: state.timeRemaining,
        };

        bus.emit('state', { ...safeState });
    }

    return { init, start, makeMove }
}


export const quizQuake = createGameService();
