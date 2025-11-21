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





