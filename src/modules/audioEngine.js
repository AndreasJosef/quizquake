class AudioEngine {
  constructor() {
    this.audio = null;
  }

  async load(loopUrl) {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.audio = new Audio(loopUrl);
    this.audio.loop = true;

    console.log('loaded', this.audio)
  }

  play() {
    if (this.audio) {
      this.audio.play();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}

// Export a singleton 
export const audioEngine = new AudioEngine();
