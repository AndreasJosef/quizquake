
export function RulesComponent (){

    const root = document.createElement('div');
    root.textContent = 'Hello World'

    // skapar DOM 

    f

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