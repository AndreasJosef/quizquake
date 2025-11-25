import { audioEngine } from "../modules/audioEngine.js";

export function NameInput({ onSubmit }) {

    const root = document.createElement('div');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter your Name';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Confirm'

    let playerScore = null;
    let currentHighscores = null;

    root.append(nameInput, submitButton);

    function submitHighscore(playerName) {


        if (
            nameInput.value === '' ||
            nameInput.value.length < 3 ||
            !playerScore
        ) return

        onSubmit(playerScore, playerName);

        nameInput.value = '';
    }

    // handle button click and enter in destroy friendly way
    const submitClick = () => submitHighscore(nameInput.value);
    const enterPress = (e) => {
        if (e.key === 'Enter') submitHighscore(nameInput.value);
    }

    function mount() {

        requestAnimationFrame(() => {
            nameInput.focus();
        });

        submitButton.addEventListener('click', submitClick);
        window.addEventListener('keypress', enterPress);

        if (!currentHighscores.length) return;

        const inputVisible =
            playerScore > currentHighscores[currentHighscores.length - 1].score &&
            !currentHighscores.find(highscore => highscore.score === playerScore);


        inputVisible ? root.style.display = 'block' : root.style.display = 'none';

        // Play game over sounds
        // inputVisible ? audioEngine.play('game-won') : audioEngine('game-over');

    }

    function update({ score, highscores }) {
        playerScore = score
        currentHighscores = highscores
    }

    function init({ score, highscores }) {
        currentHighscores = highscores
        playerScore = score
    }

    function destroy() {
        submitButton.removeEventListener('click', submitClick);
        window.removeEventListener('click', enterPress);
    }

    return {
        el: root,
        mount,
        update,
        init,
        destroy
    }
}