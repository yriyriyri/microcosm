"use client";

export type SfxId = string;

export type PlayOptions = {
  volume?: number;
  rate?: number;
  detune?: number;
  maxConcurrent?: number;
};

type LoopSession = {
  stop: (fadeMs?: number) => void;
};

type ActiveLoop = {
  src: AudioBufferSourceNode;
  gain: GainNode;
  id: SfxId;
};

type OneShotDef = {
  kind?: "oneshot";
  url: string;
  defaultVolume?: number;
  maxConcurrent?: number;
};

type VariantDef = {
  kind: "variants";
  urls: string[];
  defaultVolume?: number;
  maxConcurrent?: number;
  noImmediateRepeat?: boolean;
};

type SoundDef = OneShotDef | VariantDef;

export class SoundManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  private defs = new Map<SfxId, SoundDef>();

  private buffers = new Map<string, AudioBuffer>();
  private loading = new Map<string, Promise<void>>();

  private activeCount = new Map<string, number>(); 
  private unlocked = false;

  private lastVariantIndex = new Map<SfxId, number>();

  private loops = new Map<string, ActiveLoop>();

  configure(defs: Record<SfxId, SoundDef>) {
    this.defs.clear();
    for (const [id, def] of Object.entries(defs)) this.defs.set(id, def);
  }

  getTime() {
    return this.ctx?.currentTime ?? 0;
  }

  async unlock() {
    if (this.unlocked) return;

    if (!this.ctx) {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 1.0;
      this.master.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      try { await this.ctx.resume(); } catch {}
    }

    try {
      const b = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);
      const src = this.ctx.createBufferSource();
      src.buffer = b;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      src.connect(g);
      g.connect(this.master!);
      src.start();
    } catch {}

    this.unlocked = true;
  }

  setMasterVolume(v: number) {
    if (!this.master) return;
    this.master.gain.value = Math.max(0, Math.min(1, v));
  }

  private ensureCtx() {
    if (this.ctx && this.master) return true;
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 1.0;
    this.master.connect(this.ctx.destination);
    return true;
  }

  private async loadBuffer(bufferKey: string, url: string) {
    if (this.buffers.has(bufferKey)) return;

    const existing = this.loading.get(bufferKey);
    if (existing) return existing;

    const p = (async () => {
      this.ensureCtx();
      const res = await fetch(url);
      const arr = await res.arrayBuffer();
      const buf = await this.ctx!.decodeAudioData(arr);
      this.buffers.set(bufferKey, buf);
    })().finally(() => this.loading.delete(bufferKey));

    this.loading.set(bufferKey, p);
    return p;
  }

  async preload(id: SfxId) {
    const def = this.defs.get(id);
    if (!def) return;

    if (def.kind === "variants") {
      await Promise.all(
        def.urls.map((url, idx) => this.loadBuffer(`${id}#${idx}`, url))
      );
      return;
    }

    await this.loadBuffer(id, def.url);
  }

  private pickVariantIndex(id: SfxId, def: VariantDef): number {
    const n = def.urls.length;
    if (n <= 1) return 0;

    const last = this.lastVariantIndex.get(id);
    let idx = Math.floor(Math.random() * n);

    if (def.noImmediateRepeat && last != null && n > 1) {
      if (idx === last) idx = (idx + 1 + Math.floor(Math.random() * (n - 1))) % n;
    }

    this.lastVariantIndex.set(id, idx);
    return idx;
  }

  play(id: SfxId, opts: PlayOptions = {}) {
    const def = this.defs.get(id);
    if (!def) return;

    this.ensureCtx();
    if (!this.ctx || !this.master) return;

    const maxC = opts.maxConcurrent ?? def.maxConcurrent ?? 8;
    const cur = this.activeCount.get(id) ?? 0;
    if (cur >= maxC) return;

    let bufferKey = id;
    let url: string | null = null;
    let defaultVol = def.defaultVolume ?? 1;

    if (def.kind === "variants") {
      const idx = this.pickVariantIndex(id, def);
      bufferKey = `${id}#${idx}`;
      url = def.urls[idx] ?? null;
    } else {
      url = def.url;
    }

    if (!this.buffers.has(bufferKey)) {
      if (url) void this.loadBuffer(bufferKey, url);
      return;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = this.buffers.get(bufferKey)!;

    if (opts.rate != null) src.playbackRate.value = opts.rate;
    if (opts.detune != null) src.detune.value = opts.detune;

    const gain = this.ctx.createGain();
    const vol = defaultVol * (opts.volume ?? 1);
    gain.gain.value = Math.max(0, Math.min(1, vol));

    src.connect(gain);
    gain.connect(this.master);

    this.activeCount.set(id, cur + 1);
    src.onended = () => {
      const next = (this.activeCount.get(id) ?? 1) - 1;
      this.activeCount.set(id, Math.max(0, next));
      try { gain.disconnect(); } catch {}
      try { src.disconnect(); } catch {}
    };

    try { src.start(); } catch {}
  }

  startLoop(key: string, id: SfxId, opts: PlayOptions = {}) {
    const def = this.defs.get(id);
    if (!def) return;
    this.ensureCtx();
    if (!this.ctx || !this.master) return;
  
    if (this.loops.has(key)) return;
  
    let bufferKey = id;
    let url: string | null = null;
    const defaultVol = def.defaultVolume ?? 1;
  
    if ((def as any).kind === "variants") {
      bufferKey = `${id}#0`;
      url = (def as any).urls?.[0] ?? null;
    } else {
      url = (def as any).url ?? null;
    }
  
    if (!this.buffers.has(bufferKey)) {
      if (url) void this.loadBuffer(bufferKey, url);
      return;
    }
  
    const src = this.ctx.createBufferSource();
    src.buffer = this.buffers.get(bufferKey)!;
    src.loop = true;
    if (opts.rate != null) src.playbackRate.value = opts.rate;
    if (opts.detune != null) src.detune.value = opts.detune;
  
    const gain = this.ctx.createGain();
    const vol = defaultVol * (opts.volume ?? 1);
    gain.gain.value = Math.max(0, Math.min(1, vol));
  
    src.connect(gain);
    gain.connect(this.master);
  
    this.loops.set(key, { src, gain, id });
  
    try { src.start(); } catch {}
  }
  
  stopLoop(key: string, fadeMs: number = 60) {
    const loop = this.loops.get(key);
    if (!loop || !this.ctx) return;
  
    this.loops.delete(key);
  
    const now = this.ctx.currentTime;
    const g = loop.gain.gain;
  
    try {
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0, now + fadeMs / 1000);
    } catch {}
  
    const stopAt = now + fadeMs / 1000 + 0.01;
    try { loop.src.stop(stopAt); } catch {}
  
    loop.src.onended = () => {
      try { loop.gain.disconnect(); } catch {}
      try { loop.src.disconnect(); } catch {}
    };
  }

  startLoopAt(key: string, id: SfxId, opts: PlayOptions = {}, startAtTime: number) {
    const def = this.defs.get(id);
    if (!def) return;

    this.ensureCtx();
    if (!this.ctx || !this.master) return;

    if (this.loops.has(key)) return;

    let bufferKey = id;
    let url: string | null = null;
    const defaultVol = def.defaultVolume ?? 1;

    if (def.kind === "variants") {
      bufferKey = `${id}#0`;
      url = def.urls?.[0] ?? null;
    } else {
      url = def.url ?? null;
    }

    if (!this.buffers.has(bufferKey)) {
      if (url) void this.loadBuffer(bufferKey, url);
      return;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = this.buffers.get(bufferKey)!;
    src.loop = true;

    if (opts.rate != null) src.playbackRate.value = opts.rate;
    if (opts.detune != null) src.detune.value = opts.detune;

    const gain = this.ctx.createGain();
    const vol = defaultVol * (opts.volume ?? 1);
    gain.gain.value = Math.max(0, Math.min(1, vol));

    src.connect(gain);
    gain.connect(this.master);

    this.loops.set(key, { src, gain, id });

    try {
      src.start(startAtTime);
    } catch {}
  }

  setLoopVolume(key: string, target: number, fadeMs: number = 120) {
    const loop = this.loops.get(key);
    if (!loop || !this.ctx) return;

    const now = this.ctx.currentTime;
    const g = loop.gain.gain;
    const t = Math.max(0, Math.min(1, target));
    const dur = Math.max(0, fadeMs) / 1000;

    try {
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      if (dur <= 0) {
        g.setValueAtTime(t, now);
      } else {
        g.linearRampToValueAtTime(t, now + dur);
      }
    } catch {}
  }
}

export const sound = new SoundManager();