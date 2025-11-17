import { bus } from './eventBus.js'

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
// Turns the page gradually from green to red as time ticking. 

function updateVisuals() {

    const percentage = secondRemaining / TOTAL_TIME;

    const hue = percentage * 120;

    document.body.style.backgroundColor = `hsl(${hue}, 100%. 50%)`;
}


