import { fetchQuestions } from "./questionsAdapter.js";
import { bus  } from "./eventBus.js";

import { renderUI } from "./ui.js";

export function createGameService() {

    let state = {
        questions: null,
        gameReady: false,
        currentQuestion: 0,
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

        console.log('Current game state: ',state);

        renderUI({ ...state });

        removeQuestion(3);

    }

    function makeMove(answer) {

    }

    function removeQuestion(i) {
        state.questions.splice(i, 1);

        bus.emit('state', {...state})
    }

    return {start, makeMove}
}