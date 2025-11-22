export function NameInput({ onSubmit }) {

    const root = document.createElement('div');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter your Name';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Confirm'

    let playerScore = null;

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

    }

    function update({ score }) {
        playerScore = score
    }

    function destroy(){
        submitButton.removeEventListener('click', submitClick);
        window.removeEventListener('click', enterPress);
    }

    return {
        el: root,
        mount,
        update,
        destroy
    }
}