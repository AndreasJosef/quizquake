export function ScoreDisplay(){

    let root = document.createElement('div');
    let p = document.createElement('p');

    root.append(p);

    function init({ score }){
        p.textContent = `Score: ${score}` 
    }

    function update({ score }) {
        p.textContent = `Score: ${score}` 
    }

    return {
        el: root,
        init,
        update
    }


}