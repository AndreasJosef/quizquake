// Dependencies
import { quizQuake } from "./modules/gameService.js"
import { createRenderer } from './core/renderer.js';

// Components
import { GameControls } from './components/GameControls.js';
import { ScoreDisplay } from './components/ScoreDisplay.js';
import { RulesComponent } from "./components/RulesComponent.js";
import { StartButton } from "./components/StartButton.js";
import { restartButton } from "./components/RestartButton.js";
import { Question } from './components/Question.js';
import { Clock } from "./components/Clock.js";
import { App } from "./components/App.js";
import { Results } from "./components/Results.js";
import { Categories } from "./components/Categories.js";
import { NameInput } from "./components/NameInput.js";
import { HighscoresList } from "./components/HighscoresList.js";
import { saveHighscore } from "./modules/highscoreAdapter.js";
import { audioEngine } from "./modules/audioEngine.js"
import { SoundControl } from "./components/SoundControl.js";
import { cookiePopup } from "./components/consent.js";

// Create components
const app = App();
const question = Question()

// Register children
const children = [
    {
        component: RulesComponent({ onClick: quizQuake.ready }),
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({ phase: state.gamePhase }),
        visibleWhen: state => state.gamePhase === 'start'
    },
    {
        component: restartButton({ onClick: quizQuake.ready }),
        childRoot: () => app.el.querySelector('.slot-controls'),
        visibleWhen: (state) => state.gamePhase === 'finished'
    },
    {
        component: question,
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({ phase: state.gamePhase, question: state.currentQuestion }),
        visibleWhen: (state) => state.gamePhase === 'playing'
    },
    {
        component: Clock(),
        childRoot: () => app.el.querySelector('.slot-header'),
        slice: state => ({ time: state.timeRemaining }),
        visibleWhen: (state) => state.gamePhase === 'playing'
    },
    {
        component: GameControls({ onClick: quizQuake.makeMove }),
        childRoot: () => app.el.querySelector('.slot-controls'),
        visibleWhen: (state) => state.gamePhase === 'playing'
    },
    {
        component: ScoreDisplay(),
        childRoot: () => app.el.querySelector('.slot-header'),
        slice: state => ({ score: state.score }),
        visibleWhen: (state) => state.gamePhase === 'playing'
    },
    {
        component: Results(),
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({ score: state.score }),
        visibleWhen: (state) => state.gamePhase === 'finished'
    },
    {
        component: Categories({ onClick: quizQuake.start }),
        childRoot: () => app.el.querySelector('.slot-main'),
        visibleWhen: (state) => state.gamePhase === 'settings'
    },
    {
        component: NameInput({ onSubmit: saveHighscore }),
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({ score: state.score, highscores: state.highscores }),
        visibleWhen: (state) => state.gamePhase === 'finished'
    },
    {
        component: HighscoresList(),
        childRoot: () => app.el.querySelector('.slot-main'),
        visibleWhen: (state) => state.gamePhase === 'finished',
        slice: (state) => ({ highscores: state.highscores })
    },
    {
        component: SoundControl({ onClick: quizQuake.toggleSound }),
        childRoot: () => document.querySelector('#soundControl'),
        slice: (state) => ({ isPlaying: state.soundPlaying})
    }
]

// Create the renderer
const renderer = createRenderer({
    rootComponent: app,
    children: children
})

// Mount the app
renderer.mount('#gameContainer');
quizQuake.init();

// === MOUNT COOKIE POPUP MANUELLT append till => document.body===

// const cookie = cookiePopup();
if (cookie && cookie.banner && cookie.overlay) {
    document.body.appendChild(cookie.overlay);
    document.body.appendChild(cookie.banner);
    // console.log("cookie popup mounted with overlay");
}

audioEngine.load('/assets/Neon_Nightsong.mp3', 'background-track', true)
audioEngine.load('/assets/game_over.mp3','game-over-sound', false)
audioEngine.load('/assets/level-up.mp3', 'level-up-sound', false)
