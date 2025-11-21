export function HighscoresList() {

    const root = document.createElement('ul');

    function update({ highscores }){

        console.log(highscores)
        
        if (!highscores.length ) return 

        const listItems = highscores.map(item => {
            return `<li>${item.player} - ${item.score}</li>`
        })

        root.innerHTML = listItems.join('');
    }

    return {
        el: root,
        update 
    }

}