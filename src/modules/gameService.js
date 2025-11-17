import { fetchQuestions } from "./questionsAdapter.js";
import { bus  } from "./eventBus.js";

export function createGameService() {

    let state = {
        questions: null,
        gameReady: false,
        currentQuestion: null,
        nextIndex: 0,
        player: {
            name: '',
            points: 0
        }
    };

    // returns a random question within questions range
    function getRandomQuestion() {

        // return Math.floor(Math.random() * state.questions.length);
        return 2
    }

    async function start() {

        if (state.gameReady) return;

        state.questions = await fetchQuestions()
        state.gameReady = true;

        state.currentQuestion = state.questions[state.nextIndex].question;

        state.nextIndex++

        console.log('Current game state: ',state);

        publishState();

    }

    function makeMove(answer) {

        bus.emit('state', { ...state })
    }

    function removeQuestion(i) {
        state.questions.splice(i, 1);

        bus.emit('state', {...state})
    }

    function publishState(){
        bus.emit('state', { ...state });
    }

    return {start, makeMove}
}