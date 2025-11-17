export function RulesComponent (){

    const root = document.createElement('div');


    // skapar DOM 
    root.innerHTML = `
        <h2>Regler:</h2>
        <p>Är det sant eller falskt? Du har en minut att svara på så många frågor du kan.</p>
    `

    // On State Change
    function update({ ready }){

        if (ready) {
            root.classList.add('u-hidden')
        } else {
            root.classList.remove('u-hidden')
        }

    }

    // API
    return {
        el: root,
        update
    }
}