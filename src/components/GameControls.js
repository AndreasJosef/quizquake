import { toBool } from '../core/utils.js'

export function GameControls({ onClick }) {

    const root = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');

    trueButton.textContent = 'True';
    falseButton.textContent = 'False';

    root.append(falseButton, trueButton)

    function onKey(e){

        if (e.key === 'f') {
            onClick(false);
        }

        if (e.key === 'j') {
            onClick(true);
        }

    }

    function mount() {
        
        window.addEventListener('keydown', onKey);

    }

    function init() {

        root.addEventListener('click', (e) => {
            

            if (e.target.tagName === 'BUTTON'){
                onClick(toBool(e.target.textContent));
            }

        })
    }

    return {
        el: root,
        init,
        mount
    }

}