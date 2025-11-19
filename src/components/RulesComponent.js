export function RulesComponent() {

    // Creating the components single root element
    const root = document.createElement('div');

    // Components lifecykel methods can be: init, update, mount, destroy
    function init() {

        // skapar DOM 
        root.innerHTML = `
            <h2>Regler:</h2>
            <p>Är det sant eller falskt? Du har en minut att svara på så många frågor du kan.</p>
        `
    }

    // On State Change
    function update({ phase}) {

        phase !== 'start' ? root.classList.add('u-hidden') : root.classList.remove('u-hidden')
    }

    // API
    return {
        el: root,
        init,
        update
    }
}