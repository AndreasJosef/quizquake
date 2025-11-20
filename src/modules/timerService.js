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



// privat

// Put tick-tack sound to timer

const tickSound = new Audio(); //tick.mp3 ligger i assets
const tackSound = new Audio(); //tack.mp3 ligger i assets

function tickTack(){

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

function updateVisuals() {
    const percentage = secondsRemaining / TOTAL_TIME;

    const curveFactor = 1.7; //exponenten. 1 är linjär kurva som vi hade tidigare.

    const adjustedPercentage = Math.pow(percentage, curveFactor); // pow() är potens

    const hue = percentage * 120;

    document.body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
}




