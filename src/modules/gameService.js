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

    async function start() {

        if (state.gameReady) return;

        state.questions = await fetchQuestions('barnfragor')
        state.gameReady = true;

        state.currentQuestion = state.questions[state.nextIndex].question;
        state.currentQuestionID = state.questions[state.nextIndex].id;

        state.nextIndex++

        startTimer()

        console.log('Current game state: ', state);

        publishState();

    }

    function makeMove(answer) {

        let answeredQuestion = state.questions
            .find(question => question.id === state.currentQuestionID);


        if (answeredQuestion.answer === answer) {
            state.score++;
        }

        state.currentQuestion = state.questions[state.nextIndex].question;

        state.nextIndex++;


        bus.emit('state', { ...state });
    }

    function publishState() {
        bus.emit('state', { ...state });
    }

    return { start, makeMove }
}


export const quizQuake = createGameService();
