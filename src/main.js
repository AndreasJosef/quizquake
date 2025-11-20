// Dependencies
import { quizQuake } from "./modules/gameService.js"
import { createRendererSingleRoot } from './core/singleRootRenderer.js';

// Components
import { GameControls } from  './components/GameControls.js';
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

// Create components
const app = App();
const question = Question()

// Register children
const children = [
    {
        component: RulesComponent(),
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({ phase: state.gamePhase }),
        visibleWhen: state => state.gamePhase === 'start'
    },
    // {
    //     component: StartButton({ onClick: quizQuake.start }),
    //     childRoot: () => app.el.querySelector('.slot-controls'),
    //     slice: state => ({ phase: state.gamePhase }),
    //     visibleWhen: (state) =>  state.gamePhase === 'settings'
    // },
    {
        component: restartButton({ onClick: console.log }),
        childRoot: () => app.el.querySelector('.slot-controls'),
        visibleWhen: (state) =>  state.gamePhase === 'finished'
    },
    {
        component: question,
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({ phase: state.gamePhase, question: state.currentQuestion }),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    },
    {
        component: Clock(),
        childRoot: () => app.el.querySelector('.slot-header'),
        slice: state => ({ time: state.timeRemaining }),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    },
    {
        component: GameControls({onClick: quizQuake.makeMove }),
        childRoot: () => app.el.querySelector('.slot-controls'),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    },
    {
        component: ScoreDisplay(),
        childRoot: () => app.el.querySelector('.slot-header'),
        slice: state => ({score: state.score}),
        visibleWhen: (state) =>  state.gamePhase === 'playing'
    },
    {
        component: Results(),
        childRoot: () => app.el.querySelector('.slot-main'),
        slice: state => ({score: state.score}),
        visibleWhen: (state) =>  state.gamePhase === 'finished'
    },
    {
        component: Categories(),
        childRoot: () => app.el.querySelector('.slot-main'),
        visibleWhen: (state) =>  state.gamePhase === 'settings'
    },
    {
        component: NameInput(),
        childRoot: () => app.el.querySelector('.slot-main'),
        visibleWhen: (state) =>  state.gamePhase === 'finished'
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