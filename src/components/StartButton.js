export function StartButton({ onClick }) {
    const root = document.createElement('button');

    root.id = 'startGame';
    root.textContent = 'Starta spelet'

    function init() {
        root.addEventListener('click', onClick);
    }

    function hide() {
        root.style.display = 'none';
    }

    function update({ ready }) {
        if (ready) hide();
    }

    return {
        el: root,
        update,
        init
    }
}