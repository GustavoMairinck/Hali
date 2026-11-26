/* Motor de animação dos cartões (o mesmo usado nos vídeos).
   Monta uma linha do tempo GSAP pausada por cartão e o player faz "seek" com o tempo do áudio,
   então pausar, pular e mudar a velocidade nunca dessincronizam.
   Itens que já estavam no cartão anterior (mesmo texto, mesmo gráfico) não são animados de novo. */
(function (root) {
  'use strict';
  var SEQ = '.vf > div, .vl li, .vt tr, .vchips span, .vq, .vbig, .vmini, .vnote';

  function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function svgSig(sv) {
    return sv.outerHTML.replace(/#[0-9a-fA-F]{3,6}|rgba\([^)]*\)|font-weight="\d+"|stroke-width="[\d.]+"|stroke-dasharray="[\d ]+"|opacity="[\d.]+"|style="[^"]*"/g, '');
  }
  function seqItems(el) {
    var out = [];
    el.querySelectorAll(SEQ).forEach(function (e) {
      if (e.tagName === 'TR' && (!e.querySelector('td') || e.closest('.routh'))) return;
      if (e.closest('.vmini') && e !== e.closest('.vmini')) return;
      out.push(e);
    });
    return out;
  }
  /* o que está na tela agora, para o próximo cartão saber o que é novo */
  function snapshot(el) {
    var keys = {}, sigs = {};
    seqItems(el).forEach(function (e) { keys[e.tagName + '|' + norm(e.textContent)] = 1; });
    el.querySelectorAll('.vsvg').forEach(function (sv) { sigs[svgSig(sv)] = 1; });
    el.querySelectorAll('.routh').forEach(function (t) { keys['ROUTH|' + norm(t.textContent)] = 1; });
    return { keys: keys, sigs: sigs };
  }

  function build(el, o) {
    var gsap = root.gsap, prev = o.prev || { keys: {}, sigs: {} };
    var t0 = o.t0, W = Math.max(1.5, o.t1 - o.t0), starts = (o.starts && o.starts.length) ? o.starts : [t0];
    var tl = gsap.timeline({ paused: true });
    /* 1) itens de texto: espalhados na primeira parte do cartão, presos ao início das frases */
    var items = seqItems(el).filter(function (e) { return !prev.keys[e.tagName + '|' + norm(e.textContent)]; });
    var N = items.length, span = Math.min(W * 0.6, Math.max(0, N - 1) * 2.6), last = -1;
    items.forEach(function (e, k) {
      var raw = 0.15 + (N <= 1 ? 0 : span * k / (N - 1)), abs = t0 + raw;
      for (var i = starts.length - 1; i >= 0; i--) { if (starts[i] <= abs + 0.05) { if (abs - starts[i] < 1.4) abs = starts[i] + 0.1; break; } }
      var at = Math.max(last + 0.35, abs - t0); last = at;
      tl.fromTo(e, { autoAlpha: 0, y: 14, filter: 'blur(4px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out', clearProps: 'filter' }, at);
      tl.fromTo(e, { textShadow: '0 0 0px rgba(245,197,24,0)' }, { textShadow: '0 0 18px rgba(245,197,24,.7)', duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at + 0.2);
    });
    /* 2) gráficos: eixos já presentes; polos e blocos surgem, curvas se desenham com um ponto guia */
    var svgs = Array.prototype.slice.call(el.querySelectorAll('.vsvg')).filter(function (sv) { return !prev.sigs[svgSig(sv)]; });
    svgs.forEach(function (sv, si) {
      var ts = 0.2 + si * Math.min(1.2, W * 0.15), D = Math.max(1.6, Math.min(5, W * 0.45));
      sv.querySelectorAll('.an-pop').forEach(function (e, k) {
        tl.fromTo(e, { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, ts + 0.2 + k * 0.25);
      });
      sv.querySelectorAll('.an-draw').forEach(function (e) {
        var mk = e.getAttribute('marker-end');
        if (mk) { e.removeAttribute('marker-end'); tl.set(e, { attr: { 'marker-end': mk } }, ts + 0.3 + D * 0.97); }
        tl.fromTo(e, { strokeDasharray: 1, strokeDashoffset: 1, autoAlpha: 0 }, { strokeDashoffset: 0, autoAlpha: 1, duration: D, ease: 'power1.inOut', autoRound: false }, ts + 0.3);
        if (e.classList.contains('an-curve') && e.getTotalLength) {
          var len = 0; try { len = e.getTotalLength(); } catch (x) { len = 0; }
          if (!len) return;
          var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle'), col = e.getAttribute('stroke') || '#f5c518';
          dot.setAttribute('r', '4.5'); dot.setAttribute('fill', col); dot.setAttribute('class', 'an-tracer'); dot.style.opacity = '0';
          e.parentNode.appendChild(dot);
          var pr = { p: 0 };
          tl.fromTo(pr, { p: 0 }, {
            p: 1, duration: D, ease: 'power1.inOut',
            onUpdate: function () { var pt = e.getPointAtLength(len * pr.p); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); dot.style.opacity = pr.p > 0.001 && pr.p < 0.999 ? '1' : '0'; }
          }, ts + 0.3);
        }
      });
      sv.querySelectorAll('.an-late').forEach(function (e) { tl.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, ts + 0.3 + D * 0.85); });
    });
    /* 3) tabela de Routh nova: linhas novas acendem */
    el.querySelectorAll('.routh tr.on').forEach(function (r) {
      tl.fromTo(r, { backgroundColor: 'rgba(245,197,24,.35)' }, { backgroundColor: 'rgba(245,197,24,0)', duration: 1.2, clearProps: 'backgroundColor' }, 0.2);
    });
    tl.set({}, {}, Math.max(W, 0.1)); /* garante duração mínima */
    return tl;
  }

  root.AnimEngine = { build: build, snapshot: snapshot };
})(typeof window !== 'undefined' ? window : this);
