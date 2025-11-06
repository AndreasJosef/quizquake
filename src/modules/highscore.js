// OSMAN

// save top ten scores in localstorage
const highscores = [];


// Public interface

// checks if score is highscore and if yes adds to localstorage
export function saveHighscore(score) {

    // check is number

    // load highscores from local storage

    // check is highscore

    // if yes add to highscore and save

}

// returns an array with the top 10 highscore
export function getHighscores(){


    return highscores
}


// privat modul

function loadFromLocalStorag(key){

    return localStorage.getItem(key);

}
