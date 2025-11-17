export function Clock(){
    let root = document.createElement('p')


    function update({ time }){

        root.textContent= time;

    }

    return {
        el: root,
        update
    }
}