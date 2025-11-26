import { toBool } from '../core/utils.js'

export function GameControls({ onClick }) {

    const root = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');
    
    root.className = "btn-bar";
    trueButton.textContent = 'True';
    trueButton.className = "btn btn-True";
    falseButton.textContent = 'False';
    falseButton.className = "btn btn-False";


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

    function destroy() {

        window.removeEventListener('keydown', onKey);
    }

    return {
        el: root,
        init,
        mount,
        destroy
    }

}