export function RulesComponent({ onClick }) {

    // Creating the components single root element
    const root = document.createElement('div');
    const rulesHeading = document.createElement('h2');
    const rulesText = document.createElement('p');
    const readyButton = document.createElement('button')

    root.append(rulesHeading, rulesText, readyButton)

    // Components lifecykel methods can be: init, update, mount, destroy
    function init() {

        // skapar DOM 
        rulesHeading.textContent = 'Regler:'
        rulesText.textContent = 'Är det sant eller falskt? Du har en minut att svara på så många frågor du kan.'
        readyButton.textContent = 'I am ready!'

        readyButton.addEventListener('click', onClick);

    }


    // API
    return {
        el: root,
        init
    }
}