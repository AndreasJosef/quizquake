export function StartButton({ onClick }) {
    const root = document.createElement('button');
    root.textContent = 'Starta spelet'

    function init() {
        root.addEventListener('click', onClick);
    }

    function update({ phase }) {

    }

    return {
        el: root,
        update,
        init
    }
}