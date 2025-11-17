import { createGameService } from "./modules/gameService.js";

// ===== DOM-referenser =====
const quizDiv = document.getElementById("quiz");
const startBtn = document.getElementById("startBtn");

const game = createGameService();


startBtn.addEventListener('click', () => {

    game.init();

})


playButtons.addEventListener('click', game.makeMove);


