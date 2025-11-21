export function NameInput({ onSubmit }) {

    const root = document.createElement('div');

    let nameInput = document.createElement('input');
    let submitButton = document.createElement('button');

    let playerScore = null;

    nameInput.type = 'text';
    nameInput.placeholder = 'Enter your Name';

    submitButton.textContent = 'Confirm'

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

    function mount() {

        requestAnimationFrame(() => {
            nameInput.focus();
        });

        submitButton.addEventListener('click', e => {
            submitHighscore(nameInput.value)
        })

    }

    function update({ score }) {
        playerScore = score
    }

    return {
        el: root,
        mount,
        update
    }
}