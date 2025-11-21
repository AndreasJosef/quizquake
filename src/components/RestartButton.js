export function restartButton({ onClick }) {

    const root = document.createElement('button');
    root.textContent = 'Börja om';

    function init() {
        root.addEventListener('click', onClick)
    }

    return {
        el: root,
        init
    }
}