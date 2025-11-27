import { audioEngine } from "../modules/audioEngine.js";

export function NameInput({ onSubmit }) {

    const root = document.createElement('div');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter your Name';
    nameInput.className = 'input__highscore';

    let playerScore = null;
    let currentHighscores = null;

    root.append(nameInput);

    function submitHighscore(playerName) {

        if (
            nameInput.value === '' ||
            nameInput.value.length < 3 ||
            !playerScore
        ) return

        onSubmit(playerScore, playerName);

        nameInput.value = '';
        root.style.display = 'none';
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

        window.addEventListener('keypress', enterPress);

        if (!currentHighscores || currentHighscores.length === 0) {
            root.style.display = 'block';
            audioEngine.play('level-up-sound');
            return;
        }

        const isUnique = !currentHighscores.some(h => h.score === playerScore);
        const lowestScore = currentHighscores[currentHighscores.length - 1].score;
        const beatsLowest = playerScore > currentHighscores[currentHighscores.length - 1]?.score;

        const inputVisible = isUnique && (playerScore > lowestScore || beatsLowest);

        // Update DOM and Audio
        if (inputVisible) {
            root.style.display = 'block';
            audioEngine.play('level-up-sound');
        } else {
            root.style.display = 'none';
            audioEngine.play('game-over-sound');
        }
    }

    function update({ score, highscores }) {
        playerScore = score
        currentHighscores = highscores
    }

    function init({ score, highscores }) {
        playerScore = score
        currentHighscores = highscores
    }

    function destroy() {
        window.removeEventListener('keypress', enterPress);
        playerScore = null;
        currentHighscores = null;
    }

    return {
        el: root,
        mount,
        init,
        update,
        destroy
    }
}