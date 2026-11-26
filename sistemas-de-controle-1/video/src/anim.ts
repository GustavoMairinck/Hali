/* Animação dos cartões SVG/HTML com GSAP: a linha do tempo é montada uma vez por cartão
   e "seekada" em cada frame, então o resultado depende só do tempo (determinístico). */
import gsap from 'gsap';

export function buildTimeline(root: HTMLElement, t0: number, t1: number, starts: number[], still: boolean) {
  const tl = gsap.timeline({ paused: true });
  const W = Math.max(1, t1 - t0);
  const rel = (t: number) => Math.max(0, t - t0);
  const seq: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>('.vf > div, .vl li, .vt tr, .vchips span, .vq, .vbig, .vmini, .vnote').forEach((e) => {
    if (e.tagName === 'TR' && (!e.querySelector('td') || e.closest('.routh'))) return;
    seq.push(e);
  });
  const S = starts.length, N = seq.length, used: Record<number, number> = {};
  seq.forEach((e, k) => {
    const si = N <= 1 ? 0 : Math.min(S - 1, Math.floor((k * S) / N));
    const j = (used[si] = (used[si] || 0) + 1);
    const at = still ? 0 : rel((k === 0 ? t0 + 0.2 : starts[si]) + (j - 1) * 0.5);
    if (still) return;
    tl.fromTo(e, { opacity: 0, y: 18, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }, at);
    tl.fromTo(e, { textShadow: '0 0 0px rgba(245,197,24,0)' }, { textShadow: '0 0 22px rgba(245,197,24,.75)', duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at + 0.25);
  });
  root.querySelectorAll<SVGSVGElement>('.vsvg').forEach((sv, si) => {
    if (still) return;
    const ts = 0.25 + si * Math.min(1.2, W * 0.15), D = Math.max(1.6, Math.min(6, W * 0.55));
    sv.querySelectorAll<SVGElement>('.an-pop').forEach((e, k) => {
      tl.fromTo(e, { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2.2)' }, ts + 0.25 + k * 0.3);
    });
    sv.querySelectorAll<SVGGeometryElement>('.an-draw').forEach((e) => {
      const mk = e.getAttribute('marker-end');
      if (mk) { e.removeAttribute('marker-end'); tl.set(e, { attr: { 'marker-end': mk } }, ts + 0.3 + D * 0.97); }
      tl.fromTo(e, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: D, ease: 'power1.inOut', autoRound: false }, ts + 0.3);
      if (e.classList.contains('an-curve')) {
        const len = e.getTotalLength();
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '5'); dot.setAttribute('fill', e.getAttribute('stroke') || '#f5c518');
        dot.style.filter = 'drop-shadow(0 0 6px ' + (e.getAttribute('stroke') || '#f5c518') + ')';
        dot.style.opacity = '0';
        e.parentNode!.appendChild(dot);
        const pr = { p: 0 };
        tl.fromTo(pr, { p: 0 }, {
          p: 1, duration: D, ease: 'power1.inOut',
          onUpdate: () => { const pt = e.getPointAtLength(len * pr.p); dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y)); dot.style.opacity = pr.p > 0 && pr.p < 1 ? '1' : '0'; },
        }, ts + 0.3);
      }
    });
    sv.querySelectorAll<SVGElement>('.an-late').forEach((e) => {
      tl.fromTo(e, { opacity: 0 }, { opacity: 1, duration: 0.5 }, ts + 0.3 + D * 0.85);
    });
  });
  return tl;
}
