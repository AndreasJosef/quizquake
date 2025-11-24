export function RulesComponent({ onClick }) {

    // Creating the components single root element
    const root = document.createElement('div');
    const rulesHeading = document.createElement('h2');
    const rulesText = document.createElement('p');
    const readyButton = document.createElement('button')
    readyButton.className = 'btn btn__ready'

    root.append(rulesHeading, rulesText, readyButton)

    // Components lifecykel methods can be: init, update, mount, destroy
    function init() {

        // skapar DOM 
        rulesHeading.textContent = 'Regler:'
        rulesText.textContent = 'SANT ELLER FALSKT? Mål: Svara på flest frågor på 60 sek. Svar: [ J ] för Sant, [ F ] för Falskt.'
       readyButton.textContent = 'I got it!'

        readyButton.addEventListener('click', onClick);

    }


    // API
    return {
        el: root,
        init
    }
}