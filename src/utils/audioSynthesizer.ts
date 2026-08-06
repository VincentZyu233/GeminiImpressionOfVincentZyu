// Web Audio API Synthesizer with User Gesture Auto-Unlock & Silent Fallback

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private userInteracted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.userInteracted = true;
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
    }
  }

  public init(): void {
    if (!this.userInteracted) return;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) this.playTone(523.25, 'sine', 0.1, 0.15);
    return this.enabled;
  }

  public playTone(freq: number = 440, type: OscillatorType = 'sine', duration: number = 0.15, gainVal: number = 0.1): void {
    if (!this.enabled || !this.userInteracted) return;
    this.init();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Silently ignore audio playback edge cases before full browser unlock
    }
  }

  public playSlideChime(): void {
    if (!this.enabled || !this.userInteracted) return;
    this.playTone(440, 'sine', 0.1, 0.08);
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.08), 80);
    setTimeout(() => this.playTone(880, 'sine', 0.2, 0.06), 160);
  }

  public playHoverPop(): void {
    if (!this.enabled || !this.userInteracted) return;
    this.playTone(587.33, 'triangle', 0.05, 0.04);
  }

  public playWarpSound(): void {
    if (!this.enabled || !this.userInteracted) return;
    this.init();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch {
      // Silently ignore audio playback error
    }
  }
}

export const audioSynth = new AudioSynthesizer();
