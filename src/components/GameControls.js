import { toBool } from '../core/utils.js'

export function GameControls({ onClick }) {

    const root = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');

    root.className = "btn-bar";

    trueButton.textContent = 'true';
    trueButton.className = "btn btn-true";

    falseButton.textContent = 'false';
    falseButton.className = "btn btn-false";


    root.append(falseButton, trueButton)

    function onKey(e) {

        if (e.key === 'f') {
            onClick(false);
        }

        if (e.key === 'j') {
            onClick(true);
        }

    }

    function onBtnClick(e) {
        const btn = e.target.closest('button');
      
        console.log(toBool(btn.textContent));

        // only trigger on buttons in this container
        if (btn && root.contains(btn)) {
            onClick(toBool(btn.textContent));
        }
    }

    function mount() {
        root.addEventListener('click', onBtnClick);
        window.addEventListener('keydown', onKey);
    }

    function destroy() {
        root.removeEventListener('click', onBtnClick);
        window.removeEventListener('keydown', onKey);
    }

    return {
        el: root,
        mount,
        destroy
    }

}