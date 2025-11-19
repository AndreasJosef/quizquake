// Dependencies
import { quizQuake } from "./modules/gameService.js"
import { createRendererSingleRoot } from './core/singleRootRenderer.js';

// Components
import { GameControls } from  './components/GameControls.js';
import { ScoreDisplay } from './components/ScoreDisplay.js';
import { RulesComponent } from "./components/RulesComponent.js";
import { StartButton } from "./components/StartButton.js";
import { Question } from './components/Question.js';
import { Clock } from "./components/Clock.js";
import { App } from "./components/App.js";

// Create components
const app = App();
const question = Question()

// Register children
const children = [
    {
        component: RulesComponent(),
        childRoot: () => app.el.querySelector('.slot-rules'),
        slice: state => ({ phase: state.gamePhase }),
    },
    {
        component: StartButton({ onClick: quizQuake.start }),
        childRoot: () => app.el.querySelector('.slot-button-start'),
        slice: state => ({ phase: state.gamePhase }),
        visibleWhen: (state) =>  state.gamePhase === 'start'
    },
    {
        component: question,
        childRoot: app.el,
        slice: state => ({ phase: state.gamePhase, question: state.currentQuestion })
    },
    {
        component: Clock(),
        childRoot: () => question.el.querySelector('.slot-clock'),
        slice: state => ({ time: state.timeRemaining }),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    },
    {
        component: GameControls({onClick: quizQuake.makeMove }),
        childRoot: () => question.el.querySelector('.slot-controls'),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    },
    {
        component: ScoreDisplay(),
        childRoot: () => app.el.querySelector('.slot-score'),
        slice: state => ({score: state.score}),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    }
]

// Create the renderer
const renderer = createRendererSingleRoot({
    rootComponent: app,
    children: children
})

// Mount the app
renderer.mount('#gameContainer');
quizQuake.init();