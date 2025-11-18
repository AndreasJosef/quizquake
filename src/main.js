// Dependencies
import { quizQuake } from "./modules/gameService.js"
import { createRendererSingleRoot } from './core/singleRootRenderer.js';

// Components
import { RulesComponent } from "./components/RulesComponent.js";
import { StartButton } from "./components/StartButton.js";
import { Question } from './components/Question.js'
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
        slice: state => ({ ready: state.gameReady }),
    },
    {
        component: StartButton({ onClick: quizQuake.start }),
        childRoot: () => app.el.querySelector('.slot-button-start'),
        slice: state => ({ ready: state.gameReady })
    },
    {
        component: question,
        childRoot: app.el,
        slice: state => ({ ready: state.gameReady, question: state.currentQuestion })
    },
    {
        component: Clock(),
        childRoot: () => question.el.querySelector('.slot-clock'),
        slice: state => ({ time: state.timeRemaining })
    }
]

// Create the renderer
const renderer = createRendererSingleRoot({
    rootComponent: app,
    children: children
})

// Mount the app
renderer.mount('#gameContainer');






