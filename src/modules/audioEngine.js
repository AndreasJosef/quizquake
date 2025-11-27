export const AUDIO_TRACKS = [
  'background-track',
  'game-over-sound',
  'level-up-sound'
]

class AudioEngine {
  constructor() {
    this.audio = [];
  }

  async load(loopUrl, audioTitle, loop) {

    let trackAudio = new Audio(loopUrl);

    trackAudio.loop = loop

    let track = {
      title: audioTitle,
      audio: trackAudio,
    }


    this.audio.push(track);

    console.log('loaded', this.audio)
  }

  play(title) {
    let track = this.audio.find(t => t.title === title)

    console.log('Playing', title)

    if (track) {
      track.audio.play();
    } else {
      console.error(`Track with title: ${title} not found!`)
    }

  }

  stop() {
    console.log("Music stopped")
    if (this.audio && this.audio.length > 0) {
      this.audio.forEach(track => {
        track.audio.pause();
        track.audio.currentTime = 0;
      });
    }
  }

}

// Export a singleton 
export const audioEngine = new AudioEngine();
