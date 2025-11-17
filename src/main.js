// Dependencies
import { createGameService } from "./modules/gameService.js";
import { bus } from "./modules/eventBus.js";

// DOM references
const startBtn = document.getElementById("startBtn");

// Setup
const game = createGameService();

// Wiring
startBtn.addEventListener('click', game.start);


// playButtons.addEventListener('click', game.makeMove);

bus.on('state', (message) => {
    console.log(message)
});

