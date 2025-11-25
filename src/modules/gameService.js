import { fetchQuestions } from "./questionsAdapter.js";
import { bus } from "../core/eventBus.js";
import { startTimer } from "./timerService.js";
import { clearStorage, getHighscores, saveHighscore } from "./highscoreAdapter.js"
import { audioEngine } from "./audioEngine.js"

export const GAME_SECONDS = 30;

export const GAME_PHASES = {
    start: 'start',
    settings: 'settings',
    playing: 'playing',
    finished: 'finished'
}

export const CATEGORIES = [
    'barnfragor',
    'internet',
    'sport',
    'kultur'
]

function createGameService() {

    let state = {
        questions: null,
        gamePhase: GAME_PHASES.start,
        score: 0,
        currentQuestion: null,
        currentQuestionID: null,
        timeRemaining: GAME_SECONDS,
        nextIndex: 0,
        highscores: null,
    };

    bus.on('tick', (seconds) => {

        state.timeRemaining = seconds

        if (seconds === 0) {
            state.gamePhase = 'finished'
            state.timeRemaining = GAME_SECONDS;
        }

        publishState();
    })

    bus.on('storage', (items) => {
        state.highscores = items;

        publishState();
    })

    // works as long as we do not have any nested properties on state.
    // Will break when we do and then need build a more robust solution
    // and do a deep merge
    function setState(updates) {

        state = {
            ...state,
            ...updates
        }
    }

    function init() {

        // clearStorage() 

        // saveHighscore(20, 'Leon');
        // saveHighscore(40, 'Leon');

        publishState();
    }

    function ready() {
        state.score = 0;
        state.timeRemaining = GAME_SECONDS;
        state.gamePhase = GAME_PHASES.settings;
        state.highscores = getHighscores();
        audioEngine.play('background-track');

        publishState();
    }

    async function start(category) {
        state.questions = await fetchQuestions(category)

        state.gamePhase = GAME_PHASES.playing;

        state.currentQuestion = state.questions[state.nextIndex].question;
        state.currentQuestionID = state.questions[state.nextIndex].id;

        state.nextIndex++

        startTimer(state.timeRemaining)
        publishState();
    }

    function makeMove(answer) {

        let answeredQuestion = state.questions.find(question => question.id === state.currentQuestionID);


        if (answeredQuestion.answer === answer) {
            state.score++;

              state.currentQuestion = state.questions[state.nextIndex].question;
        state.currentQuestionID = state.questions[state.nextIndex].id;

        state.nextIndex++

        } else {
            
            setTimeout(() => {
                state.gamePhase = GAME_PHASES.finished;
            publishState();


            },1000);

           
            
            return;
        }

            

      

        

        console.log(state.currentQuestion)
        publishState();

        
    }

    function publishState() {

        const safeState = {
            gameReady: state.gameReady,
            gamePhase: state.gamePhase,
            score: state.score,
            currentQuestion: state.currentQuestion,
            currentQuestionID: state.currentQuestionID,
            timeRemaining: state.timeRemaining,
            highscores: state.highscores
        };

        bus.emit('state', { ...safeState });
    }

    return { setState, init, ready, start, makeMove }
}

export const quizQuake = createGameService();
