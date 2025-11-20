export function restartButton({onClick}) {
    const root = document.createElement ('button'); 
    root.textContent = 'Spela om'

    function init() {
        root.addEventListener('click', ()=> {
            onClick('hallo')
        })
    }
    return {
        el: root,
        init
    }

}