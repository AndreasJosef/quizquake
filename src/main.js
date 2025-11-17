// Dependencies
import { createGameService } from "./modules/gameService.js";
import { createRenderer } from "./modules/renderer.js";

import { bus } from "./modules/eventBus.js";

import { RulesComponent } from "./components/RulesComponent.js";
import { StartButton } from "./components/StartButton.js";
import { QuestionComponent } from "./components/QuestionComponent.js";
import { Clock } from "./components/Clock.js";

// Setup
const game = createGameService();

const renderer = createRenderer({
    bus,
    children: [
       {
        component: RulesComponent(),
        slice: (state) => ({ ready: state.gameReady }),
        childRoot: '#gameContainer'
       },
       {
        component: StartButton({ onClick: game.start }),
        slice: (state) => ({ ready: state.gameReady }),
        childRoot: '#gameContainer'
       },
       {
        component: QuestionComponent(),
        slice: (state) => ({ready: state.gameReady, question: state.currentQuestion }),
        childRoot: '#gameContainer'
       },
       {
        component: Clock(),
        slice: (state) => ({time: state.timeRemaining}),
        childRoot: '#gameContainer'
       }
    ]
})

bus.on('state', (message) => {
    console.log(message);
})

// Start App
renderer.mount();



