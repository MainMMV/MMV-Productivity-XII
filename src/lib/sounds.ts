// Web Audio API Synthesizer for elegant, ambient sound profiles
export type SoundType = "success" | "complete" | "toggle" | "celebration" | "alarm";

class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  play(type: SoundType) {
    try {
      // Read settings from storage to see if sounds are enabled
      const storedSettingsStr = localStorage.getItem("mmv-settings");
      if (storedSettingsStr) {
        const stored = JSON.parse(storedSettingsStr);
        if (stored.sound_notifications_enabled === false) {
          return; // Sound is muted by user preference
        }
      }

      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const volume = 0.15; // Safe default volume

      if (type === "toggle") {
        // Soft ambient pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);

        gain.gain.setValueAtTime(volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
      } 
      else if (type === "complete") {
        // Sparkling glass chime arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(volume * 0.8, now + idx * 0.08 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.4);
        });
      } 
      else if (type === "success") {
        // Gentle peaceful ambient tone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.type = "sine";
        osc2.type = "triangle";

        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc2.frequency.setValueAtTime(880, now); // A5

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.5);
        osc2.stop(now + 0.5);
      } 
      else if (type === "celebration") {
        // Shimmering brass and high bell symphony arpeggios
        const chord = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // Beautiful C Major scale arpeggio
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0, now + idx * 0.06);
          gain.gain.linearRampToValueAtTime(volume * 0.8, now + idx * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.6);

          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.6);
        });
      }
      else if (type === "alarm") {
        // Elegant repeating cycle ding-dong
        const notes = [659.25, 523.25]; // E5, C5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.3);

          gain.gain.setValueAtTime(0, now + idx * 0.3);
          gain.gain.linearRampToValueAtTime(volume, now + idx * 0.3 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.3 + 0.8);

          osc.start(now + idx * 0.3);
          osc.stop(now + idx * 0.3 + 0.8);
        });
      }
    } catch (e) {
      console.warn("Web Audio API not supported or initialized", e);
    }
  }
}

export const playSound = (type: SoundType) => {
  try {
    const manager = new SoundManager();
    manager.play(type);
  } catch (e) {}
};
