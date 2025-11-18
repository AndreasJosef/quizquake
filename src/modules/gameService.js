import { fetchQuestions } from "./questionsAdapter.js";
import { bus  } from "./eventBus.js";
import { startTimer } from "./timerService.js";

export function createGameService() {

    let state = {
        questions: null,
        gameReady: false,
        currentQuestion: null,
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

        state.questions = await fetchQuestions()
        state.gameReady = true;

        state.currentQuestion = state.questions[state.nextIndex].question;

        state.nextIndex++

        startTimer()

        console.log('Current game state: ',state);

        publishState();

    }

    function makeMove(answer) {

        bus.emit('state', { ...state })
    }

    function publishState(){
        bus.emit('state', { ...state });
    }

    return {start, makeMove}
}