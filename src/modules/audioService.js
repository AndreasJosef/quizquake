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
//importera bus. bus on tick, play sound.

//  bus.on('tick', (seconds) => {

    //     state.timeRemaining = seconds

    //     if (seconds === 0) {
    //         state.gamePhase = 'finished'
    //     }

    //     publishState();
    // })