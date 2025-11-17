// Dependencies
import { createGameService } from "./modules/gameService.js";
import { createRenderer } from "./modules/renderer.js";

import { bus } from "./modules/eventBus.js";

import { RulesComponent } from "./components/RulesComponent.js";

// DOM 
const startBtn = document.getElementById("startGame");

const rulesComponent = RulesComponent();

// Setup
const game = createGameService();

const renderer = createRenderer({
    bus,
    children: [
       {
        component: rulesComponent,
        slice: (state) => ({ ready: state.gameReady }),
        childRoot: '#gameContainer'
       } 
    ]
})

// Wiring DOM Events
startBtn.addEventListener('click', game.changeReadyState);
gameControls.add('click', game.makeMove)

// Start App
renderer.mount();


