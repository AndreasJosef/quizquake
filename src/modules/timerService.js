import { bus } from '../core/eventBus.js'

// Timer
const TOTAL_TIME = 60;
let secondsRemaining = TOTAL_TIME;
let timerId = null;

export function tick() {

    secondsRemaining--;

    if (secondsRemaining === 0) {
        clearInterval(timerId);
        timerId = null
    }

    bus.emit('tick', secondsRemaining)
}

//when time is up call callback
export function startTimer(){ 


    if (timerId !== null) {
        return;
    }
    
    timerId = setInterval(tick, 1000);
}

// tar bort timern
export function resetTimer() {
    clearInterval(timerId);

    timerId = null;

    secondsRemaining = TOTAL_TIME;
}


// Put tick-tack sound to timer

const tickSound = new Audio(); //tick.mp3 ligger i assets
const tackSound = new Audio(); //tack.mp3 ligger i assets


function tickTack(){

    let progress = 1 - (secondsRemaining / TOTAL_TIME);

    let currentVolume = Math.max(0.1, progress);     

    tickSound.volume = currentVolume; 
    tackSound.volume = currentVolume;

    if (secondsRemaining % 2 === 1) {

        tickSound.currentTime = 0;
        tickSound.play().catch(e => console.log(e));
    }else {
        tackSound.currentTime = 0;
        tackSound.play().catch(e => console.log(e));
    }

    if (secondsRemaining === 0) { 
        clearInterval(timerId);
        timerId = null;
    }

}
 
// Turns the page gradually from green to red as time ticking. 






