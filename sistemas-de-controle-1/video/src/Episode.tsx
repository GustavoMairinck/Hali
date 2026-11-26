import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { EPISODES } from './episodes';
import { gsap } from 'gsap';
import './site/anim.js';
import './site/vis.css';
import './video.css';

type Seg = [number, number, number, string];
const W: any = window as any;
W.gsap = gsap;

function sigOf(html: string) {
  return html.replace(/#[0-9a-fA-F]{3,6}|rgba\([^)]*\)|font-weight="\d+"|stroke-width="[\d.]+"|stroke-dasharray="[\d ]+"|opacity="[\d.]+"| class="(on|col)"/g, '');
}

function snapOf(html: string | null) {
  if (!html) return null;
  const d = document.createElement('div'); d.innerHTML = html; return W.AnimEngine.snapshot(d);
}

const Card: React.FC<{ html: string; prevHtml: string | null; t: number; t0: number; t1: number; starts: number[] }> = ({ html, prevHtml, t, t0, t1, starts }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<any>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = html;
    tlRef.current = W.AnimEngine.build(ref.current, { t0, t1, starts, prev: snapOf(prevHtml) });
    return () => { tlRef.current && tlRef.current.kill(); };
  }, [html, t0]);
  useLayoutEffect(() => { tlRef.current && tlRef.current.seek(Math.max(0, t - t0), false); });
  return <div className="vbody pl-body" ref={ref} />;
};

export const Episode: React.FC<{ id: string }> = ({ id }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const sy = W.SYNC[id] as { dur: number; segs: Seg[] };
  const vis = (W.VIS[id] || []) as [number, string, string][];
  const ep = EPISODES[id];
  const pStart = (p: number) => { for (const g of sy.segs) if (g[2] >= p) return g[0]; return sy.dur; };

  const cues = useMemo(() => {
    let last = '';
    return vis.map((c, k) => {
      const t0 = pStart(c[0]), t1 = k < vis.length - 1 ? pStart(vis[k + 1][0]) : sy.dur + 1.5;
      const s = sigOf(c[2]); const still = s === last; last = s;
      const starts = sy.segs.filter((g) => g[0] >= t0 - 0.01 && g[0] < t1).map((g) => g[0]);
      return { p: c[0], title: c[1], html: c[2], prevHtml: k > 0 ? vis[k - 1][2] : null, t0, t1, still, starts: starts.length ? starts : [t0] };
    });
  }, [id]);
  const clips = ep.manim.map((m) => ({ ...m, t0: pStart(m.from), t1: pStart(m.to) }));

  const clip = clips.find((c) => t >= c.t0 && t < c.t1);
  let ci = 0; for (let k = 0; k < cues.length; k++) if (cues[k].t0 <= t + 0.01) ci = k;
  const cue = cues[ci];
  let si = -1; for (let k = 0; k < sy.segs.length; k++) if (sy.segs[k][0] <= t + 0.05) si = k;
  const seg = si >= 0 ? sy.segs[si] : null;

  const fadeIn = interpolate(t - (clip ? clip.t0 : cue.t0), [0, 0.35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const kickY = interpolate(t - cue.t0, [0, 0.5], [16, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const title = clip ? cues.filter((c) => c.t0 <= t + 0.01 && c.t0 >= clip.t0 - 0.01).slice(-1)[0]?.title || cue.title : cue.title;

  // legenda com destaque palavra a palavra (proporcional ao tamanho das palavras)
  let caption: React.ReactNode = null;
  if (seg) {
    const words = seg[3].split(' ');
    const total = seg[3].length, prog = Math.max(0, Math.min(1, (t - seg[0]) / Math.max(0.3, seg[1] - seg[0])));
    let acc = 0;
    caption = words.map((w, i) => { const on = acc / total <= prog; acc += w.length + 1; return <React.Fragment key={i}><span className={on ? 'w on' : 'w'}>{w}</span>{' '}</React.Fragment>; });
  }
  const capOp = seg ? interpolate(t, [seg[0], seg[0] + 0.2], [0.4, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;

  return (
    <AbsoluteFill className="frame">
      <Audio src={staticFile('ep' + id + '/topico-' + id + '.mp3')} />
      <div className="top"><span className="ep">EPISÓDIO {id}</span><span className="ept">{ep.title}</span><span className="brand">Ha<b>li</b></span></div>
      <div className="kick" style={{ transform: `translateY(${kickY}px)`, opacity: interpolate(t - cue.t0, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }) }} dangerouslySetInnerHTML={{ __html: title }} />
      <div className="stage" style={{ opacity: fadeIn }}>
        {clip ? (
          <Sequence from={Math.round(clip.t0 * fps)} durationInFrames={Math.round((clip.t1 - clip.t0) * fps)} layout="none">
            <OffthreadVideo src={staticFile(clip.file)} muted className="manim" />
          </Sequence>
        ) : (
          <Card key={cue.t0} html={cue.html} prevHtml={cue.prevHtml} t={t} t0={cue.t0} t1={cue.t1} starts={cue.starts} />
        )}
      </div>
      <div className="cap" style={{ opacity: capOp }}><p>{caption}</p></div>
      <div className="bar"><div style={{ width: `${(100 * frame) / durationInFrames}%` }} />{cues.map((c, k) => <i key={k} style={{ left: `${(100 * c.t0 * fps) / durationInFrames}%` }} />)}</div>
    </AbsoluteFill>
  );
};
