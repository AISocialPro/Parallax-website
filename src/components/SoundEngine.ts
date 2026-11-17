/**
 * Web Audio API Procedural Sound Engine
 * Generates cinematic ambient drones, cosmic winds, dynamic chords, and UI feedback
 * completely synthesized in real-time without relying on external MP3/WAV files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private currentScene: number = 0;
  private isInitialized: boolean = false;

  // Nodes for ambient drone
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  constructor() {
    // Lazy initialized on user gesture
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.windGain.connect(this.masterGain);

      this.startAmbientDrone();
      this.startAtmosphericWind();

      this.isInitialized = true;
    } catch (e) {
      console.warn("AudioContext init deferred or not supported:", e);
    }
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.droneGain) return;

    // Sub-bass root (A1 = 55Hz)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Warm fifth (E2 = 82.4Hz)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);

    // Lowpass filter for warm cinematic sub drone
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(4, this.ctx.currentTime);

    // LFO to slowly modulate filter frequency (breathing effect)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 10 second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(50, this.ctx.currentTime);

    this.lfo.connect(lfoGain);
    lfoGain.connect(this.droneFilter.frequency);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
    this.lfo.start();
  }

  private startAtmosphericWind() {
    if (!this.ctx || !this.windGain) return;

    // Procedural pink-ish noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // subtle volume
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter centered at 400Hz
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(350, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.5, this.ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(this.windGain);
    whiteNoise.start();
  }

  /**
   * Modulate atmosphere frequencies depending on active scene
   */
  public setSceneTone(sceneIndex: number) {
    if (!this.ctx || !this.droneFilter || !this.droneOsc1 || !this.droneOsc2) return;
    this.currentScene = sceneIndex;

    const t = this.ctx.currentTime;
    const freqs = [
      { osc1: 55, osc2: 82.4, filter: 140 }, // Scene 1: The Beginning (Deep mystical A1)
      { osc1: 65.4, osc2: 98.0, filter: 220 }, // Scene 2: Floating Islands (Airy C2)
      { osc1: 43.6, osc2: 65.4, filter: 110 }, // Scene 3: Cosmic Void (Vast sub-bass F1)
      { osc1: 73.4, osc2: 110, filter: 320 },  // Scene 4: Future City (Electric D2)
      { osc1: 55, osc2: 164.8, filter: 480 },  // Scene 5: Portal / Singularity (Ascending fifths)
    ];

    const target = freqs[sceneIndex] || freqs[0];
    this.droneOsc1.frequency.exponentialRampToValueAtTime(target.osc1, t + 1.5);
    this.droneOsc2.frequency.exponentialRampToValueAtTime(target.osc2, t + 1.5);
    this.droneFilter.frequency.exponentialRampToValueAtTime(target.filter, t + 1.5);
  }

  /**
   * Sound FX: UI Button Hover (high delicate chirp)
   */
  public playHover() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(1800, t + 0.06);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // ignore
    }
  }

  /**
   * Sound FX: UI Click / Explore (reverberant crystalline chime)
   */
  public playClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const notes = [587.33, 880, 1174.66]; // D5, A5, D6 chord
      const t = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.03);

        gain.gain.setValueAtTime(0.06, t + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6 + idx * 0.1);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t + idx * 0.03);
        osc.stop(t + 0.7 + idx * 0.1);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Sound FX: Dimensional Warp / Scene Transition Whoosh
   */
  public playTransition() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, t);
      filter.frequency.exponentialRampToValueAtTime(800, t + 0.25);
      filter.frequency.exponentialRampToValueAtTime(150, t + 0.6);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.6);
    } catch {
      // ignore
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, t, 0.1);
    }
    return this.isMuted;
  }

  public getMuted() {
    return this.isMuted;
  }
}

export const sound = new SoundEngine();

