// Timer

const TOTAL_TIME = 60;

let secondRemaining = TOTAL_TIME;

let timerId = null;

export function tick() {

    secondRemaining--;

    if (secondRemaining <=0) {
        clearInterval(timerId);
        timerId = null
    }
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

    secondRemaining = TOTAL_TIME;

}



// privat
// Turns the page gradually from green to red as time ticking. 

function updateVisuals() {

    const percentage = secondRemaining / TOTAL_TIME;

    const hue = percentage * 120;

    document.body.style.backgroundColor = `hsl(${hue}, 100%. 50%)`;
}


