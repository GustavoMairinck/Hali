/* Biblioteca de visuais dos áudios: plano s, gráficos, diagramas de blocos, tabelas.
   Tudo gera HTML/SVG em texto, sem dependências. */
(function () {
  'use strict';
  var Y = '#f5c518', TX = '#ececec', MU = '#a9a9a9', LN = '#3a3a3a', BAD = '#ff8a65', BL = '#7cc4ff';
  var V = {};
  V.C = { y: Y, tx: TX, mu: MU, bad: BAD, bl: BL };

  function n(v) { return Math.round(v * 10) / 10; }
  function txt(x, y, s, o) {
    o = o || {};
    return '<text x="' + n(x) + '" y="' + n(y) + '" fill="' + (o.c || MU) + '" font-size="' + (o.fs || 12) + '"' +
      (o.a ? ' text-anchor="' + o.a + '"' : '') + (o.w ? ' font-weight="' + o.w + '"' : '') + '>' + s + '</text>';
  }
  function line(x1, y1, x2, y2, c, w, dash) {
    return '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2) + '" stroke="' + (c || LN) + '" stroke-width="' + (w || 1) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  function svg(w, h, body, label) {
    return '<svg class="vsvg" style="--mw:' + Math.round(w * 1.6) + 'px" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (label || 'diagrama') + '"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + MU + '"/></marker><marker id="ahy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + Y + '"/></marker></defs>' + body + '</svg>';
  }
  V.txt = txt; V.line = line; V.svg = svg;

  /* ---------- texto ---------- */
  V.fr = function (a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; };
  V.F = function () { return '<div class="vf">' + Array.prototype.slice.call(arguments).map(function (l) { return '<div>' + l + '</div>'; }).join('') + '</div>'; };
  V.big = function (s, sub) { return '<div class="vbig">' + s + (sub ? '<small>' + sub + '</small>' : '') + '</div>'; };
  V.list = function (items, hl) { return '<ol class="vl">' + items.map(function (s, i) { return '<li' + (hl === i ? ' class="on"' : '') + '>' + s + '</li>'; }).join('') + '</ol>'; };
  V.bul = function (items) { return '<ul class="vl">' + items.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>'; };
  V.warn = function (items) { return '<ul class="vl warn">' + items.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>'; };
  V.tbl = function (head, rows, hl) {
    var h = '<table class="vt"><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>';
    rows.forEach(function (r, i) { h += '<tr' + (hl === i || (hl && hl.indexOf && hl.indexOf(i) >= 0) ? ' class="on"' : '') + '>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; });
    return h + '</table>';
  };
  V.row = function () { return '<div class="vrow">' + Array.prototype.slice.call(arguments).join('') + '</div>'; };
  V.chips = function (items, hl) { return '<div class="vchips">' + items.map(function (s, i) { return '<span' + (hl === i ? ' class="on"' : '') + '>' + s + '</span>'; }).join('') + '</div>'; };
  V.q = function (q, a) { return '<div class="vq"><b>Pergunta</b><p>' + q + '</p>' + (a ? '<details><summary>Ver resposta</summary><p>' + a + '</p></details>' : '') + '</div>'; };

  /* ---------- plano s ---------- */
  V.sp = function (o) {
    o = o || {};
    var W = 300, H = 210, P = 22;
    var xr = o.x || [-8, 4], yr = o.y || [-8, 8];
    function X(x) { return P + (x - xr[0]) / (xr[1] - xr[0]) * (W - 2 * P); }
    function Yv(y) { return H - P - (y - yr[0]) / (yr[1] - yr[0]) * (H - 2 * P); }
    var b = '', x0 = X(0), y0 = Yv(0);
    var reg = o.region;
    if (reg) {
      var la = reg === 'all' || reg === 'left' ? .16 : .05, ra = reg === 'all' || reg === 'right' ? .16 : .05;
      b += '<rect x="' + P + '" y="' + P + '" width="' + n(x0 - P) + '" height="' + (H - 2 * P) + '" fill="' + Y + '" opacity="' + la + '"/>';
      b += '<rect x="' + n(x0) + '" y="' + P + '" width="' + n(W - P - x0) + '" height="' + (H - 2 * P) + '" fill="' + BAD + '" opacity="' + ra + '"/>';
      if (reg === 'all' || reg === 'left') b += txt((P + x0) / 2, P + 14, 'estável', { c: Y, a: 'middle', fs: 11 });
      if (reg === 'all' || reg === 'right') b += txt((x0 + W - P) / 2, P + 14, 'instável', { c: BAD, a: 'middle', fs: 11 });
      if (reg === 'all' || reg === 'axis') b += txt(x0 + 4, H - P - 6, reg === 'axis' ? 'oscila' : 'oscila', { c: TX, fs: 10 });
    }
    (o.grid !== false) && (function () {
      for (var gx = Math.ceil(xr[0]); gx <= xr[1]; gx++) if (gx) b += line(X(gx), y0 - 2.5, X(gx), y0 + 2.5, '#555');
      for (var gy = Math.ceil(yr[0]); gy <= yr[1]; gy++) if (gy) b += line(x0 - 2.5, Yv(gy), x0 + 2.5, Yv(gy), '#555');
    })();
    b += line(P - 6, y0, W - P + 8, y0, reg === 'axis' ? Y : '#777', reg === 'axis' ? 1.2 : 1, null);
    b += line(x0, H - P + 6, x0, P - 8, reg === 'axis' ? Y : '#777', reg === 'axis' ? 3 : 1);
    b += txt(W - P + 6, y0 - 6, 'σ', { c: TX, fs: 13 }) + txt(x0 + 6, P - 6, 'jω', { c: TX, fs: 13 });
    if (o.vec) {
      var vx = X(o.vec[0]), vy = Yv(o.vec[1]);
      b += line(vx, vy, vx, y0, MU, 1, '3 3') + line(vx, vy, x0, vy, MU, 1, '3 3');
      b += '<line class="an-draw" pathLength="1" x1="' + n(x0) + '" y1="' + n(y0) + '" x2="' + n(vx) + '" y2="' + n(vy) + '" stroke="' + Y + '" stroke-width="2" marker-end="url(#ahy)"/>';
      if (o.vecLabels !== false) {
        b += txt(vx, y0 + (o.vec[1] > 0 ? 15 : -6), 'σ', { c: Y, a: 'middle' });
        b += txt(x0 + (o.vec[0] < 0 ? 8 : -8), vy + 4, 'ω', { c: Y, a: o.vec[0] < 0 ? 'start' : 'end' });
      }
    }
    if (o.angle) {
      var ax = o.angle[0], ay = o.angle[1], r = 26, th = Math.atan2(Math.abs(Yv(ay) - y0), Math.abs(X(ax) - x0));
      var ex = x0 - r * Math.cos(th), ey = y0 - r * Math.sin(th) * (ay > 0 ? 1 : -1);
      b += '<path class="an-draw" pathLength="1" d="M' + n(x0 - r) + ',' + n(y0) + ' A' + r + ',' + r + ' 0 0,1 ' + n(ex) + ',' + n(ey) + '" fill="none" stroke="' + BL + '" stroke-width="1.6"/>';
      b += txt(x0 - r - 6, y0 - 8, 'θ', { c: BL, a: 'end', fs: 13 });
      b += line(x0, y0, X(ax), Yv(ay), BL, 1.4);
    }
    if (o.mirror) b += line(P, y0, W - P, y0, Y, 1.2, '5 4');
    (o.arrows || []).forEach(function (a) {
      b += '<line class="an-late" x1="' + n(X(a[0])) + '" y1="' + n(Yv(a[1])) + '" x2="' + n(X(a[2])) + '" y2="' + n(Yv(a[3])) + '" stroke="' + BL + '" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#ah)"/>';
    });
    (o.zeros || []).forEach(function (z) { b += '<circle class="an-pop"  cx="' + n(X(z[0])) + '" cy="' + n(Yv(z[1])) + '" r="5.5" fill="none" stroke="' + BL + '" stroke-width="2"/>'; });
    (o.poles || []).forEach(function (p) {
      var px = X(p[0]), py = Yv(p[1]), c = p[2] || (p[0] > 0.001 ? BAD : Y);
      b += '<g class="an-pop">' + line(px - 5.5, py - 5.5, px + 5.5, py + 5.5, c, 2.4) + line(px - 5.5, py + 5.5, px + 5.5, py - 5.5, c, 2.4) + '</g>';
    });
    (o.pts || []).forEach(function (p) { b += '<circle class="an-pop" cx="' + n(X(p[0])) + '" cy="' + n(Yv(p[1])) + '" r="4.5" fill="' + (p[2] || Y) + '"/>'; });
    (o.labels || []).forEach(function (l) { b += '<g class="an-late">' + txt(X(l[0]), Yv(l[1]), l[2], { c: l[3] || TX, a: l[4] || 'middle', fs: 12 }) + '</g>'; });
    if (o.q) b += '<g class="an-pop">' + txt(X(o.q[0]), Yv(o.q[1]) + 6, '?', { c: Y, a: 'middle', fs: 20, w: 700 }) + '<circle cx="' + n(X(o.q[0])) + '" cy="' + n(Yv(o.q[1])) + '" r="13" fill="none" stroke="' + Y + '" stroke-dasharray="3 3"/></g>';
    return svg(W, H, b, o.label || 'plano s');
  };

  /* ---------- simulação de resposta ao degrau de uma função de transferência ---------- */
  V.tf = function (num, den, tmax, N, u) {
    N = N || 400; u = u || function () { return 1; };
    var a0 = den[0], d = den.map(function (v) { return v / a0; }), m = num.map(function (v) { return v / a0; });
    var nn = d.length - 1; while (m.length < nn + 1) m.unshift(0);
    var b0 = m[0], c = [];
    for (var i = 0; i < nn; i++) c.push(m[nn - i] - d[nn - i] * b0);
    var x = new Array(nn).fill(0), out = [], dt = tmax / N, sub = 8, h = dt / sub, t = 0;
    function f(x, uu) { var dx = new Array(nn); for (var i = 0; i < nn - 1; i++) dx[i] = x[i + 1]; var s = uu; for (var j = 0; j < nn; j++) s -= d[nn - j] * x[j]; dx[nn - 1] = s; return dx; }
    function y(x, uu) { var s = b0 * uu; for (var i = 0; i < nn; i++) s += c[i] * x[i]; return s; }
    for (var k = 0; k <= N; k++) {
      out.push([t, y(x, u(t))]);
      for (var s = 0; s < sub; s++) {
        var uu = u(t), k1 = f(x, uu), x2 = x.map(function (v, i) { return v + h / 2 * k1[i]; }), k2 = f(x2, u(t + h / 2)),
          x3 = x.map(function (v, i) { return v + h / 2 * k2[i]; }), k3 = f(x3, u(t + h / 2)), x4 = x.map(function (v, i) { return v + h * k3[i]; }), k4 = f(x4, u(t + h));
        x = x.map(function (v, i) { return v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]); }); t += h;
      }
    }
    return out;
  };
  /* resposta ao degrau de 2ª ordem normalizada */
  V.so = function (z, wn, k) {
    k = k == null ? 1 : k;
    return function (t) {
      if (t <= 0) return 0;
      if (z === 0) return k * (1 - Math.cos(wn * t));
      if (z < 1) { var wd = wn * Math.sqrt(1 - z * z); return k * (1 - Math.exp(-z * wn * t) * (Math.cos(wd * t) + z / Math.sqrt(1 - z * z) * Math.sin(wd * t))); }
      if (z === 1) return k * (1 - Math.exp(-wn * t) * (1 + wn * t));
      var r = wn * Math.sqrt(z * z - 1), p1 = -z * wn + r, p2 = -z * wn - r;
      return k * (1 + (p2 * Math.exp(p1 * t) - p1 * Math.exp(p2 * t)) / (p1 - p2));
    };
  };

  /* ---------- gráfico ---------- */
  V.plot = function (o) {
    var W = o.w || 300, H = o.h || 180, L = 34, R = 12, T = 12, B = 24;
    var t0 = o.t0 || 0, tm = o.t, ymn = o.y ? o.y[0] : 0, ymx = o.y ? o.y[1] : 1.2;
    function X(t) { return L + (t - t0) / (tm - t0) * (W - L - R); }
    function Yv(v) { return H - B - (v - ymn) / (ymx - ymn) * (H - T - B); }
    var b = '';
    if (o.band) b += '<rect x="' + L + '" y="' + n(Yv(o.band[1])) + '" width="' + (W - L - R) + '" height="' + n(Yv(o.band[0]) - Yv(o.band[1])) + '" fill="' + Y + '" opacity=".1"/>';
    (o.vb || []).forEach(function (v) { b += '<rect x="' + n(X(v[0])) + '" y="' + T + '" width="' + n(X(v[1]) - X(v[0])) + '" height="' + (H - T - B) + '" fill="' + BL + '" opacity=".12"/>'; });
    b += line(L, Yv(ymn < 0 && ymx > 0 ? 0 : ymn), W - R + 4, Yv(ymn < 0 && ymx > 0 ? 0 : ymn), '#777', 1);
    b += line(L, H - B + 2, L, T - 4, '#777', 1);
    b += txt(W - R, H - 8, o.xl || 't', { c: MU, a: 'end', fs: 11 });
    if (o.yl) b += txt(L - 4, T + 2, o.yl, { c: MU, a: 'end', fs: 11 });
    (o.h1 || []).forEach(function (g) { b += line(L, Yv(g[0]), W - R, Yv(g[0]), g[2] || MU, 1, '4 3') + (g[1] ? txt(L - 4, Yv(g[0]) + 4, g[1], { c: g[2] || MU, a: 'end', fs: 10.5 }) : ''); });
    (o.v1 || []).forEach(function (g) { b += line(X(g[0]), T, X(g[0]), H - B, g[2] || MU, 1, '4 3') + (g[1] ? txt(X(g[0]), H - B + 14, g[1], { c: g[2] || MU, a: 'middle', fs: 10.5 }) : ''); });
    (o.c || []).forEach(function (cv) {
      var pts = [];
      if (cv.d) pts = cv.d; else { var N = 240; for (var i = 0; i <= N; i++) { var t = t0 + (tm - t0) * i / N; pts.push([t, cv.f(t)]); } }
      var p = pts.map(function (q) { var v = Math.max(ymn - (ymx - ymn) * .05, Math.min(ymx + (ymx - ymn) * .05, q[1])); return n(X(q[0])) + ',' + n(Yv(v)); }).join(' ');
      b += '<polyline ' + (cv.dash ? '' : 'class="an-draw an-curve" pathLength="1" ') + 'points="' + p + '" fill="none" stroke="' + (cv.col || Y) + '" stroke-width="' + (cv.wd || 2.2) + '"' + (cv.dash ? ' stroke-dasharray="' + cv.dash + '"' : '') + ' stroke-linejoin="round"/>';
      if (cv.lab) { var lp = cv.lp || pts[Math.floor(pts.length * .78)]; b += '<g class="an-late">' + txt(X(lp[0]), Yv(lp[1]) - 6, cv.lab, { c: cv.col || Y, a: 'middle', fs: 11.5, w: 600 }) + '</g>'; }
    });
    (o.pts || []).forEach(function (q) { b += '<g class="an-late"><circle cx="' + n(X(q[0])) + '" cy="' + n(Yv(q[1])) + '" r="4" fill="' + (q[3] || BL) + '"/>' + (q[2] ? txt(X(q[0]) + (q[4] || 6), Yv(q[1]) - 7, q[2], { c: q[3] || BL, fs: 11, a: q[5] || 'start' }) : '') + '</g>'; });
    (o.ann || []).forEach(function (q) { b += '<g class="an-late">' + txt(X(q[0]), Yv(q[1]), q[2], { c: q[3] || TX, a: q[4] || 'middle', fs: 11.5 }) + '</g>'; });
    (o.seg || []).forEach(function (q) { b += '<line class="an-late" x1="' + n(X(q[0])) + '" y1="' + n(Yv(q[1])) + '" x2="' + n(X(q[2])) + '" y2="' + n(Yv(q[3])) + '" stroke="' + (q[4] || BL) + '" stroke-width="1.6" marker-start="url(#ah)" marker-end="url(#ah)"/>'; });
    (o.lines || []).forEach(function (q) { b += '<g class="an-late">' + line(X(q[0]), Yv(q[1]), X(q[2]), Yv(q[3]), q[4] || BL, q[5] || 1.6, q[6]) + '</g>'; });
    (o.arrowsUp || []).forEach(function (q) { b += '<line class="an-draw" pathLength="1" x1="' + n(X(q[0])) + '" y1="' + n(Yv(0)) + '" x2="' + n(X(q[0])) + '" y2="' + n(Yv(q[1])) + '" stroke="' + Y + '" stroke-width="2.4" marker-end="url(#ahy)"/>'; });
    return svg(W, H, b, o.label || 'gráfico');
  };

  /* ---------- diagrama de blocos em malha ---------- */
  /* o.blocks: nomes no caminho direto; o.H: bloco de realimentação (omitir = malha aberta);
     o.R, o.C: rótulos de entrada/saída; o.hl: 'R','C','H','sum','dist','plant' ou índice do bloco; o.dist: rótulo do distúrbio */
  V.loop = function (o) {
    var bl = o.blocks || ['G(s)'], nb = bl.length, W = o.w || (nb > 2 ? 360 : 300), H = o.H ? 150 : 96;
    var sx = Math.max(56, 26 + String(o.R || 'R(s)').replace(/<[^>]+>/g, '').length * 6.4), y = 40, bw = o.bw || (nb > 2 ? 66 : 70), gap = 14, start = sx + 30;
    var x = start, b = '', hl = o.hl, avail = W - start - 54;
    if (nb * bw + (nb - 1) * gap > avail) bw = (avail - (nb - 1) * gap) / nb;
    function on(k) { return hl === k; }
    b += txt(6, y - 10, o.R || 'R(s)', { c: on('R') ? Y : TX, fs: 12, w: on('R') ? 700 : 400 });
    if (!o.noSum) {
      b += '<line x1="6" y1="' + y + '" x2="' + (sx - 11) + '" y2="' + y + '" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
      b += '<circle cx="' + sx + '" cy="' + y + '" r="10" fill="none" stroke="' + (on('sum') ? Y : MU) + '" stroke-width="' + (on('sum') ? 2.4 : 1.4) + '"/>';
      b += txt(sx - 16, y - 8, '+', { c: TX, fs: 11 });
      if (o.H) b += txt(sx + 4, y + 22, o.sign || '−', { c: TX, fs: 13 });
      b += '<line x1="' + (sx + 10) + '" y1="' + y + '" x2="' + (start - 1) + '" y2="' + y + '" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
      if (o.E) b += txt(sx + 18, y - 8, o.E, { c: MU, fs: 10.5 });
    } else {
      b += '<line x1="6" y1="' + y + '" x2="' + (start - 1) + '" y2="' + y + '" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    }
    var px0 = null, px1 = null;
    bl.forEach(function (name, i) {
      var h = on(i);
      if (o.plant && i >= o.plant[0] && i <= o.plant[1]) { if (px0 === null) px0 = x; px1 = x + bw; }
      b += '<g class="an-pop"><rect x="' + n(x) + '" y="' + (y - 17) + '" width="' + n(bw) + '" height="34" rx="6" fill="' + (h ? 'rgba(245,197,24,.18)' : '#1b1b1b') + '" stroke="' + (h ? Y : '#666') + '" stroke-width="' + (h ? 2.2 : 1.2) + '"/>';
      b += txt(x + bw / 2, y + 4, name, { c: h ? Y : TX, a: 'middle', fs: bw < 60 ? 10.5 : 12, w: h ? 700 : 400 }) + '</g>';
      x += bw;
      if (i < nb - 1) { b += '<line x1="' + n(x) + '" y1="' + y + '" x2="' + n(x + gap - 1) + '" y2="' + y + '" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>'; x += gap; }
    });
    if (o.plant && px0 !== null) {
      var ph = on('plant');
      b += '<rect x="' + n(px0 - 5) + '" y="' + (y - 25) + '" width="' + n(px1 - px0 + 10) + '" height="50" rx="9" fill="none" stroke="' + (ph ? Y : '#555') + '" stroke-dasharray="5 4" stroke-width="' + (ph ? 2 : 1) + '"/>';
      b += txt((px0 + px1) / 2, y + 37, 'planta', { c: ph ? Y : MU, a: 'middle', fs: 11, w: ph ? 700 : 400 });
    }
    if (o.dist) {
      var dx = o.distX || (x - bw / 2);
      b += '<line x1="' + n(dx) + '" y1="2" x2="' + n(dx) + '" y2="' + (y - 18) + '" stroke="' + (on('dist') ? BAD : '#777') + '" stroke-width="' + (on('dist') ? 2.2 : 1.2) + '" marker-end="url(#ah)"/>';
      b += txt(dx + 6, 12, o.dist, { c: on('dist') ? BAD : MU, fs: 11, w: on('dist') ? 700 : 400 });
    }
    var ox = x, end = W - 8;
    b += '<line x1="' + n(ox) + '" y1="' + y + '" x2="' + end + '" y2="' + y + '" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    b += txt(end, y - 10, o.C || 'C(s)', { c: on('C') ? Y : TX, a: 'end', fs: 12, w: on('C') ? 700 : 400 });
    if (o.H) {
      var fx = ox + (end - ox) / 2 - 6, yb = y + 72, hw = 76, hx = (sx + fx) / 2 - hw / 2, hh = on('H');
      b += '<circle cx="' + n(fx) + '" cy="' + y + '" r="3" fill="' + MU + '"/>';
      b += '<polyline class="an-draw" pathLength="1" points="' + n(fx) + ',' + y + ' ' + n(fx) + ',' + yb + ' ' + n(hx + hw + 1) + ',' + yb + '" fill="none" stroke="' + (hh ? Y : MU) + '" stroke-width="1.4" marker-end="url(#ah)"/>';
      b += '<g class="an-pop"><rect x="' + n(hx) + '" y="' + (yb - 16) + '" width="' + hw + '" height="32" rx="6" fill="' + (hh ? 'rgba(245,197,24,.18)' : '#1b1b1b') + '" stroke="' + (hh ? Y : '#666') + '" stroke-width="' + (hh ? 2.2 : 1.2) + '"/>';
      b += txt(hx + hw / 2, yb + 4, o.H, { c: hh ? Y : TX, a: 'middle', fs: 12, w: hh ? 700 : 400 }) + '</g>';
      b += '<polyline class="an-draw" pathLength="1" points="' + n(hx) + ',' + yb + ' ' + sx + ',' + yb + ' ' + sx + ',' + (y + 11) + '" fill="none" stroke="' + (hh ? Y : MU) + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    }
    return svg(W, H, b, o.label || 'diagrama de blocos');
  };

  /* blocos em paralelo */
  V.par = function (a, b2, sign) {
    var W = 300, H = 120, b = '';
    b += txt(6, 52, 'R', { c: TX }) + line(6, 60, 60, 60, MU, 1.4) + '<circle cx="60" cy="60" r="3" fill="' + MU + '"/>';
    b += '<polyline points="60,60 60,28 103,28" fill="none" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    b += '<polyline points="60,60 60,92 103,92" fill="none" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    [[28, a], [92, b2]].forEach(function (q) { b += '<rect x="104" y="' + (q[0] - 15) + '" width="70" height="30" rx="6" fill="#1b1b1b" stroke="#666"/>' + txt(139, q[0] + 4, q[1], { c: TX, a: 'middle' }); });
    b += '<polyline points="174,28 220,28 220,49" fill="none" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    b += '<polyline points="174,92 220,92 220,71" fill="none" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    b += '<circle cx="220" cy="60" r="10" fill="none" stroke="' + MU + '" stroke-width="1.4"/>' + txt(226, 46, '+', { c: TX, fs: 11 }) + txt(226, 84, sign || '+', { c: TX, fs: 12 });
    b += '<line x1="230" y1="60" x2="292" y2="60" stroke="' + MU + '" stroke-width="1.4" marker-end="url(#ah)"/>' + txt(292, 52, 'C', { c: TX, a: 'end' });
    return svg(W, H, b, 'blocos em paralelo');
  };

  /* tabela de Routh */
  V.routh = function (rows, o) {
    o = o || {};
    var h = '<table class="vt routh">';
    rows.forEach(function (r, i) {
      var cls = o.hl === i ? ' class="on"' : '';
      h += '<tr' + cls + '><th>' + r[0] + '</th>' + r.slice(1).map(function (c, j) { return '<td' + (j === 0 && o.col ? ' class="col"' : '') + '>' + (c == null ? '' : c) + '</td>'; }).join('') + '</tr>';
    });
    return h + '</table>' + (o.note ? '<p class="vnote">' + o.note + '</p>' : '');
  };

  /* bolinha na tigela e no morro */
  V.ball = function () {
    var b = '';
    b += '<path d="M10,40 Q70,140 130,40" fill="none" stroke="' + Y + '" stroke-width="2.4"/><circle cx="70" cy="80" r="9" fill="' + TX + '"/>' + txt(70, 120, 'tigela: volta', { c: Y, a: 'middle', fs: 12 });
    b += '<path d="M170,110 Q230,10 290,110" fill="none" stroke="' + BAD + '" stroke-width="2.4"/><circle cx="230" cy="50" r="9" fill="' + TX + '"/>' + txt(230, 130, 'morro: rola', { c: BAD, a: 'middle', fs: 12 });
    b += '<line x1="242" y1="44" x2="268" y2="60" stroke="' + MU + '" stroke-width="1.4" stroke-dasharray="3 3" marker-end="url(#ah)"/>';
    return svg(300, 140, b, 'estável e instável');
  };

  window.V = V;
})();
