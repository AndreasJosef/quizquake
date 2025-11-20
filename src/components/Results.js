export function Results(){

    const root = document.createElement('div');
    root.className = 'result'

    let html = null;

    function init({ score }) {
       if(!score) score = 0     
            
       root.innerHTML = `<h1>Your score is: ${score}</h1>`
    }

    function update({ score }) {
       root.innerHTML = `<h1>Your score is: ${score}</h1>`
    }

    return {
        el: root,
        init,
        update
    }
}