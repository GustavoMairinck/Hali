(function () {
  'use strict';
  var D = window.DATA;
  var T = D.topicos;
  var byId = {}; T.forEach(function (t) { byId[t.id] = t; });
  var ORDER = ['01','02','04','06','07','08','13','14','15','16','09','10','11','17','18','03','05','12'];
  var LV = { 1: 'Nível 1 · Compreensão', 2: 'Nível 2 · Aplicação', 3: 'Nível 3 · Desafio' };
  var L = 'ABCDE';

  /* ---------- armazenamento (com fallback em memória) ---------- */
  var KEY = 'sc1-estudos-v1', mem = null;
  function load() {
    if (mem) return mem;
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { s = null; }
    mem = s || { done: {}, last: null, hist: {}, sim: null };
    mem.done = mem.done || {}; mem.hist = mem.hist || {};
    return mem;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }
  var st = load();

  /* ---------- utilidades ---------- */
  var main = document.getElementById('main');
  function h(html) { main.innerHTML = html; main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tt(t) { return t.id + '. ' + t.titulo; }
  function fmtDur(s) { if (!s) return '—'; var m = Math.floor(s / 60), r = Math.round(s % 60); return m + ' min ' + (r < 10 ? '0' : '') + r + ' s'; }
  function nDone() { return T.filter(function (t) { return st.done[t.id]; }).length; }
  function nextRec() { for (var i = 0; i < ORDER.length; i++) if (!st.done[ORDER[i]]) return byId[ORDER[i]]; return null; }
  function wrapTables(root) { (root || main).querySelectorAll('table').forEach(function (tb) { if (!tb.parentNode.classList.contains('tablewrap')) { var w = document.createElement('div'); w.className = 'tablewrap'; tb.parentNode.insertBefore(w, tb); w.appendChild(tb); } }); }
  function impChip(t) { return '<span class="chip ' + (t.importancia === 'Essencial' ? 'e' : 'y') + '">' + t.importancia + '</span>'; }

  /* ---------- voz do navegador (alternativa ao MP3) ---------- */
  var speaking = null;
  function speak(id, btn) {
    if (!('speechSynthesis' in window)) return;
    if (speaking === id) { speechSynthesis.cancel(); speaking = null; btn.textContent = 'Ouvir com a voz do navegador'; return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(byId[id].audio.roteiro);
    u.lang = 'pt-BR'; u.rate = 0.95;
    var v = speechSynthesis.getVoices().filter(function (x) { return /pt(-|_)BR/i.test(x.lang); })[0];
    if (v) u.voice = v;
    u.onend = function () { speaking = null; btn.textContent = 'Ouvir com a voz do navegador'; };
    speaking = id; btn.textContent = 'Parar a voz do navegador';
    speechSynthesis.speak(u);
  }
  function audioBlock(t, withScript) {
    var a = t.audio, out = '<div class="audiobox"><div class="row" style="margin:0"><b>Áudio do tópico ' + t.id + '</b><span class="chip">' + fmtDur(a.dur) + '</span></div>';
    if (a.mp3) out += '<audio controls preload="none" src="audios/topico-' + t.id + '.mp3"></audio>';
    else out += '<p class="note">MP3 indisponível.</p>';
    if ('speechSynthesis' in window) out += '<div class="row"><button class="btn ghost" data-speak="' + t.id + '">Ouvir com a voz do navegador</button></div>';
    if (withScript) out += '<details class="ans"><summary>Roteiro escrito</summary><div class="in">' + a.roteiro.split(/\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></details>';
    return out + '</div>';
  }

  /* ---------- PAINEL ---------- */
  function painel() {
    var d = nDone(), n = T.length, pct = Math.round(100 * d / n), nx = nextRec();
    var lastT = st.last && byId[st.last];
    var hist = Object.keys(st.hist).length;
    var html = '<h1>' + esc(D.disciplina) + '</h1><p class="lead">' + esc(D.professor) + '</p>';
    html += '<div class="card"><div class="row" style="justify-content:space-between;margin:0"><b>Progresso geral</b><span>' + pct + '%</span></div><div class="progress" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><div style="width:' + pct + '%"></div></div>';
    html += '<div class="stat"><div><b>' + n + '</b><span>tópicos</span></div><div><b>' + d + '</b><span>concluídos</span></div><div><b>' + hist + '</b><span>questões tentadas</span></div></div></div>';
    if (nx) html += '<div class="card"><p class="muted" style="margin:0">Próximo tópico recomendado</p><h2 style="margin:4px 0 6px">' + esc(tt(nx)) + '</h2><p class="muted">' + impChip(nx) + ' <span class="chip">⏱ ' + nx.tempo + '</span> <span class="chip">' + nx.dificuldade + '</span></p><div class="row"><a class="btn primary" href="#topico-' + nx.id + '">Começar agora</a>' + (lastT && lastT.id !== nx.id ? '<a class="btn" href="#topico-' + lastT.id + '">Voltar ao tópico ' + lastT.id + ' (onde parei)</a>' : '') + '</div></div>';
    else html += '<div class="card"><h2 style="margin-top:0">Todos os tópicos concluídos ✓</h2><p>Próximo passo: fazer o <a href="#simulado">simulado</a>.</p></div>';
    html += '<h2>Acesso rápido</h2><div class="grid">' +
      '<a class="tile" href="#audios"><b>Áudios</b><span>18 episódios curtos, um por tópico</span></a>' +
      '<a class="tile" href="#exercicios"><b>Banco de questões</b><span>' + D.questoes.length + ' questões com gabarito comentado</span></a>' +
      '<a class="tile" href="#simulado"><b>Simulado</b><span>10 questões, correção e diagnóstico</span></a>' +
      '<a class="tile" href="#folha"><b>Folha A4</b><span>consulta para a prova · ver e imprimir</span></a>' +
      '<a class="tile" href="#revisao"><b>Revisão</b><span>fórmulas, flashcards, dificuldades</span></a>' +
      '<a class="tile" href="#mapa"><b>Mapa de aprendizagem</b><span>ordem e dependências</span></a></div>';
    html += '<h2>Foco provável da prova do 2º bimestre</h2><p class="muted">Hipótese baseada na lista de 20/11 (ver "Sobre").</p><div class="row">' + ['13','14','15','16','17','18'].map(function (i) { return '<a class="chip y" href="#topico-' + i + '">' + esc(tt(byId[i])) + (st.done[i] ? ' ✓' : '') + '</a>'; }).join('') + '</div>';
    h(html);
  }

  /* ---------- MAPA ---------- */
  function mapa() {
    var html = '<h1>Mapa de aprendizagem</h1><p class="lead">Ordem por dependência entre conceitos. Clique para abrir o tópico.</p>';
    html += '<div class="card"><b>Sequência recomendada</b><p class="muted" style="margin:4px 0 0">' + ORDER.map(function (i) { return '<a href="#topico-' + i + '">' + i + (st.done[i] ? '✓' : '') + '</a>'; }).join(' → ') + '</p></div>';
    D.blocos.forEach(function (b) {
      html += '<h2>' + esc(b.nome) + '</h2><p class="muted">' + esc(b.desc) + '</p><div class="tablewrap"><table><tr><th>Tópico</th><th>Pré-req.</th><th>Importância</th><th>Dificuldade</th><th>Relação</th></tr>';
      b.ids.forEach(function (i) { var t = byId[i]; html += '<tr><td><a href="#topico-' + i + '">' + esc(tt(t)) + '</a>' + (st.done[i] ? ' ✓' : '') + '</td><td>' + esc(t.prereq) + '</td><td>' + t.importancia + '</td><td>' + t.dificuldade + '</td><td>' + esc(t.relacao) + '</td></tr>'; });
      html += '</table></div>';
    });
    html += '<h2>O que recuperar de Sinais e Sistemas (só o necessário)</h2><div class="tablewrap"><table><tr><th>Pré-requisito</th><th>O que é / por quê</th><th>Onde será usado</th><th>Profundidade para a prova</th></tr>' + D.prereqSS.map(function (r) { return '<tr><td>' + r.map(esc).join('</td><td>') + '</td></tr>'; }).join('') + '</table></div>';
    h(html);
  }

  /* ---------- TÓPICO ---------- */
  function topico(id) {
    var t = byId[id]; if (!t) return painel();
    st.last = id; save();
    var idx = ORDER.indexOf(id), prev = ORDER[idx - 1], next = ORDER[idx + 1];
    var html = '<p class="muted" style="margin:0">' + esc(t.bloco) + '</p><h1>' + esc(tt(t)) + '</h1>';
    html += '<div class="row">' + impChip(t) + '<span class="chip">Dificuldade: ' + t.dificuldade + '</span><span class="chip">⏱ ' + t.tempo + '</span>' + (st.done[id] ? '<span class="chip y">Concluído ✓</span>' : '') + '</div>';
    html += '<dl class="meta"><dt>Pré-requisitos</dt><dd>' + linkIds(t.prereq) + '</dd><dt>Relação</dt><dd>' + esc(t.relacao) + '</dd><dt>Fontes</dt><dd>' + t.fontes + '</dd></dl>';
    html += audioBlock(t, true);
    t.sections.forEach(function (s, i) {
      var open = i < 2 ? ' open' : '';
      var inner = s.html;
      if (s.respostas) inner += '<details class="ans"><summary>Ver respostas (tente antes)</summary><div class="in">' + s.respostas + '</div></details>';
      html += '<details class="sec"' + open + '><summary>' + esc(s.titulo) + '</summary><div class="in">' + inner + '</div></details>';
    });
    var nq = D.questoes.filter(function (q) { return q.topico === id; }).length;
    html += '<div class="row" style="margin-top:18px"><button class="btn ' + (st.done[id] ? 'ghost' : 'primary') + '" id="doneBtn">' + (st.done[id] ? 'Desmarcar conclusão' : 'Marcar como concluído') + '</button>' + (nq ? '<a class="btn" href="#exercicios-' + id + '">Praticar: ' + nq + ' questões deste tópico</a>' : '') + '</div>';
    html += '<div class="pager">' + (prev ? '<a class="btn ghost" href="#topico-' + prev + '">← ' + esc(tt(byId[prev])) + '</a>' : '<span></span>') + (next ? '<a class="btn ghost" href="#topico-' + next + '">' + esc(tt(byId[next])) + ' →</a>' : '<a class="btn ghost" href="#simulado">Ir para o simulado →</a>') + '</div>';
    h(html); wrapTables();
    document.getElementById('doneBtn').onclick = function () { st.done[id] = !st.done[id]; if (!st.done[id]) delete st.done[id]; save(); topico(id); };
  }
  function linkIds(s) { return s.replace(/\b(\d{2})\b/g, function (m) { return byId[m] ? '<a href="#topico-' + m + '">' + m + '</a>' : m; }); }

  /* ---------- ÁUDIOS ---------- */
  function audios() {
    var html = '<h1>Áudios</h1><p class="lead">Um episódio por tópico, na ordem do mapa. Nada toca sozinho.</p><p class="note">Os MP3 foram gerados com voz sintética offline (Piper, pt-BR). Se preferir, use a voz do navegador.</p>';
    ORDER.forEach(function (i) {
      var t = byId[i];
      html += '<div class="card"><div class="row" style="margin:0;justify-content:space-between"><b>' + esc(tt(t)) + '</b><a href="#topico-' + i + '">abrir tópico</a></div><p class="muted" style="margin:4px 0 0">' + esc(t.relacao) + '</p>' + audioBlock(t, true) + '</div>';
    });
    h(html);
  }

  /* ---------- QUESTÕES ---------- */
  function qCard(q, mode) {
    var c = '<div class="q" id="q-' + q.id + '"><div class="head"><span class="chip y">Tópico ' + q.topico + '</span><span class="chip">' + LV[q.nivel] + '</span><span class="chip">' + esc(q.formato) + '</span>' + (st.hist[q.id] ? '<span class="chip">' + (st.hist[q.id].ok ? 'último: acertou' : 'último: errou') + '</span>' : '') + '</div>';
    c += '<div>' + q.enunciado + '</div>';
    if (q.imagem) c += '<p><img src="' + q.imagem + '" alt="Gráfico da questão ' + q.id + '"></p>';
    if (q.tipo === 'mc') c += '<div class="opts">' + q.alternativas.map(function (a, j) { return '<label><input type="radio" name="' + mode + q.id + '" value="' + j + '"><span><b>' + L[j] + ')</b> ' + a + '</span></label>'; }).join('') + '</div>';
    if (q.tipo === 'num') c += '<div class="row"><label>Resposta: <input type="text" inputmode="decimal" id="' + mode + 'n-' + q.id + '" size="10" placeholder="ex.: 0,5"></label></div>';
    if (q.tipo === 'open') c += '<textarea id="' + mode + 't-' + q.id + '" placeholder="Rascunho da sua resposta (não é corrigido automaticamente)"></textarea>';
    if (mode === 'ex') c += '<div class="row"><button class="btn primary" data-check="' + q.id + '">' + (q.tipo === 'open' ? 'Ver gabarito' : 'Verificar') + '</button></div><div class="out"></div>';
    return c + '</div>';
  }
  function gabarito(q) {
    var g = '<div class="in">';
    if (q.tipo === 'mc') g += '<p><b>Resposta: ' + L[q.correta] + '</b></p>';
    if (q.tipo === 'num') g += '<p><b>Resposta: ' + String(q.resposta).replace('.', ',') + '</b></p>';
    g += '<p><b>Resolução</b></p>' + q.resolucao + '<p><b>Fórmula:</b> ' + q.formula + '</p>';
    if (q.porque) g += '<p><b>Por que cada alternativa</b></p><ul>' + q.porque.map(function (p, j) { return '<li><b>' + L[j] + ')</b> ' + p.replace(/^<p>|<\/p>$/g, '') + '</li>'; }).join('') + '</ul>';
    g += '<p><b>Erros prováveis:</b> ' + q.erros + '</p></div>';
    return g;
  }
  function grade(q, mode) {
    if (q.tipo === 'mc') { var r = document.querySelector('input[name="' + mode + q.id + '"]:checked'); if (!r) return null; return +r.value === q.correta; }
    if (q.tipo === 'num') { var v = (document.getElementById(mode + 'n-' + q.id).value || '').trim().replace(/\s/g, '').replace(',', '.'); if (v === '') return null; var x = parseFloat(v); if (isNaN(x)) return null; return Math.abs(x - q.resposta) <= Math.max(q.tol, 1e-9); }
    return 'open';
  }
  function record(id, ok) { var e = st.hist[id] || { n: 0, erros: 0 }; e.n++; if (!ok) e.erros++; e.ok = ok; e.t = Date.now(); st.hist[id] = e; save(); }
  function markOpts(q, mode) { if (q.tipo !== 'mc') return; document.querySelectorAll('input[name="' + mode + q.id + '"]').forEach(function (inp) { var lb = inp.parentNode; lb.classList.remove('right', 'wrong'); if (+inp.value === q.correta) lb.classList.add('right'); else if (inp.checked) lb.classList.add('wrong'); }); }

  function exercicios(filtroTop) {
    var topSel = filtroTop || '', nivSel = '';
    var html = '<h1>Banco de questões</h1><p class="lead">Tente primeiro. O gabarito só aparece quando você pedir.</p>';
    html += '<div class="card filters"><label>Tópico<select id="fTop"><option value="">Todos</option>' + T.map(function (t) { return '<option value="' + t.id + '"' + (t.id === topSel ? ' selected' : '') + '>' + esc(tt(t)) + '</option>'; }).join('') + '</select></label><label>Dificuldade<select id="fNiv"><option value="">Todas</option><option value="1">Nível 1 · Compreensão</option><option value="2">Nível 2 · Aplicação</option><option value="3">Nível 3 · Desafio</option></select></label><span class="note" id="fCount"></span></div>';
    html += '<div id="qlist"></div><h2>Histórico de desempenho</h2><div id="hist"></div>';
    h(html);
    function render() {
      topSel = document.getElementById('fTop').value; nivSel = document.getElementById('fNiv').value;
      var qs = D.questoes.filter(function (q) { return (!topSel || q.topico === topSel) && (!nivSel || String(q.nivel) === nivSel); });
      qs.sort(function (a, b) { return a.topico.localeCompare(b.topico) || a.nivel - b.nivel; });
      document.getElementById('fCount').textContent = qs.length + ' questão(ões)';
      var box = document.getElementById('qlist');
      box.innerHTML = qs.length ? qs.map(function (q) { return qCard(q, 'ex'); }).join('') : '<p class="muted">Nenhuma questão com esse filtro.</p>';
      wrapTables(box);
      box.querySelectorAll('[data-check]').forEach(function (b) {
        b.onclick = function () {
          var q = D.questoes.filter(function (x) { return x.id === b.dataset.check; })[0];
          var out = b.parentNode.nextElementSibling, res = grade(q, 'ex');
          if (res === null) { out.innerHTML = '<div class="fb no">Responda antes de verificar.</div>'; return; }
          if (res === 'open') {
            out.innerHTML = '<div class="fb ok"><b>Gabarito</b>' + gabarito(q) + '<div class="row"><span>Como foi?</span><button class="btn" data-self="1">Acertei</button><button class="btn ghost" data-self="0">Errei / incompleto</button></div></div>';
            out.querySelectorAll('[data-self]').forEach(function (s) { s.onclick = function () { record(q.id, s.dataset.self === '1'); s.parentNode.innerHTML = '<span class="note">Registrado no histórico.</span>'; histBox(); }; });
            wrapTables(out); return;
          }
          record(q.id, res); markOpts(q, 'ex');
          out.innerHTML = '<div class="fb ' + (res ? 'ok' : 'no') + '"><b>' + (res ? 'Certo.' : 'Ainda não.') + '</b> ' + (res ? '' : 'Compare com a resolução:') + '<details class="ans"' + (res ? '' : ' open') + '><summary>Gabarito comentado</summary>' + gabarito(q) + '</details></div>';
          wrapTables(out); histBox();
        };
      });
    }
    document.getElementById('fTop').onchange = render; document.getElementById('fNiv').onchange = render;
    render(); histBox();
  }
  function histBox() {
    var box = document.getElementById('hist'); if (!box) return;
    var all = D.questoes.concat(D.simulado), per = {};
    all.forEach(function (q) { var e = st.hist[q.id]; if (!e) return; var p = per[q.topico] = per[q.topico] || { ok: 0, tot: 0 }; p.tot++; if (e.ok) p.ok++; });
    var ks = Object.keys(per).sort();
    if (!ks.length) { box.innerHTML = '<p class="muted">Nenhuma tentativa ainda. As respostas ficam salvas neste navegador.</p>'; return; }
    box.innerHTML = '<div class="tablewrap"><table><tr><th>Tópico</th><th>Questões tentadas</th><th>Último resultado certo</th><th>Aproveitamento</th></tr>' + ks.map(function (k) { var p = per[k]; return '<tr><td><a href="#topico-' + k + '">' + esc(tt(byId[k])) + '</a></td><td>' + p.tot + '</td><td>' + p.ok + '</td><td>' + Math.round(100 * p.ok / p.tot) + '%</td></tr>'; }).join('') + '</table></div><div class="row"><button class="btn ghost" id="clr">Limpar histórico</button><span id="clrc"></span></div>';
    document.getElementById('clr').onclick = function () {
      var c = document.getElementById('clrc');
      c.innerHTML = 'Tem certeza? <button class="btn" id="clrY">Sim, limpar</button> <button class="btn ghost" id="clrN">Cancelar</button>';
      document.getElementById('clrY').onclick = function () { st.hist = {}; st.sim = null; save(); route(); };
      document.getElementById('clrN').onclick = function () { c.innerHTML = ''; };
    };
  }

  /* ---------- SIMULADO ---------- */
  function simulado() {
    var html = '<h1>Simulado final</h1><p class="lead">10 questões, peso maior no 2º bimestre. Sem cronômetro: faça no seu ritmo.</p><p class="note">Resolva no papel ou nos campos. Quando terminar, clique em "Corrigir". O gabarito fica separado, no final.</p>';
    html += D.simulado.map(function (q, i) { return '<h3>Questão ' + (i + 1) + '</h3>' + qCard(q, 'si'); }).join('');
    html += '<div class="row"><button class="btn primary" id="corr">Corrigir simulado</button><button class="btn ghost" id="reset">Recomeçar</button></div><div id="simres"></div>';
    h(html); wrapTables();
    document.getElementById('reset').onclick = function () { st.sim = null; save(); simulado(); };
    document.getElementById('corr').onclick = function () {
      var res = {}, auto = 0, autoOk = 0, opens = [];
      D.simulado.forEach(function (q) { var g = grade(q, 'si'); if (g === 'open') { opens.push(q); return; } res[q.id] = g === true; auto++; if (g === true) autoOk++; if (g !== null) record(q.id, g === true); markOpts(q, 'si'); });
      var out = '<div class="card"><h2 style="margin-top:0">Resultado</h2><p><b>' + autoOk + ' de ' + auto + '</b> questões objetivas/numéricas corretas. ' + (opens.length ? 'Faça a autoavaliação da(s) discursiva(s) abaixo.' : '') + '</p>';
      var wrongT = {}; D.simulado.forEach(function (q) { if (res[q.id] === false) wrongT[q.topico] = 1; });
      var w = Object.keys(wrongT);
      out += w.length ? '<p>Revise: ' + w.map(function (k) { return '<a class="chip y" href="#topico-' + k + '">' + esc(tt(byId[k])) + '</a>'; }).join(' ') + '</p>' : '<p>Nenhum erro nas questões corrigidas automaticamente.</p>';
      out += '<p class="note">Questões em branco contam como erradas na nota, mas não entram no histórico de dificuldades.</p></div>';
      out += '<h2>Gabarito comentado</h2>' + D.simulado.map(function (q, i) {
        var tag = q.tipo === 'open' ? '<div class="row"><span>Autoavaliação:</span><button class="btn" data-sself="' + q.id + '" data-v="1">Acertei</button><button class="btn ghost" data-sself="' + q.id + '" data-v="0">Errei</button></div>' : '<span class="chip ' + (res[q.id] ? 'y' : '') + '">' + (res[q.id] ? 'Certo' : 'Errado') + '</span>';
        return '<div class="q"><b>Questão ' + (i + 1) + '</b> ' + tag + gabarito(q) + '</div>';
      }).join('');
      var box = document.getElementById('simres'); box.innerHTML = out; wrapTables(box);
      box.querySelectorAll('[data-sself]').forEach(function (b) { b.onclick = function () { record(b.dataset.sself, b.dataset.v === '1'); b.parentNode.innerHTML = '<span class="note">Registrado.</span>'; }; });
      st.sim = { t: Date.now(), ok: autoOk, tot: auto }; save();
      box.scrollIntoView();
    };
  }

  /* ---------- REVISÃO ---------- */
  var fIdx = 0, fBack = false, fOrder = null;
  function revisao(tab) {
    tab = tab || 'formulas';
    var tabs = [['formulas', 'Fórmulas'], ['flash', 'Flashcards'], ['rapidas', 'Perguntas rápidas'], ['memorizar', 'O que memorizar'], ['dific', 'Minhas dificuldades']];
    var html = '<h1>Revisão</h1><div class="tabs" role="tablist">' + tabs.map(function (x) { return '<button role="tab" aria-selected="' + (x[0] === tab) + '" class="' + (x[0] === tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div><div id="rv"></div>';
    h(html);
    main.querySelectorAll('[data-tab]').forEach(function (b) { b.onclick = function () { location.hash = '#revisao-' + b.dataset.tab; }; });
    var rv = document.getElementById('rv');
    if (tab === 'formulas') rv.innerHTML = ORDER.map(function (i) { var t = byId[i]; return '<details class="sec"><summary>' + esc(tt(t)) + '</summary><div class="in">' + t.formulas + '</div></details>'; }).join('');
    if (tab === 'memorizar') rv.innerHTML = ORDER.map(function (i) { var t = byId[i]; return '<details class="sec"><summary>' + esc(tt(t)) + '</summary><div class="in">' + t.memorizar + '</div></details>'; }).join('');
    if (tab === 'flash') flash(rv);
    if (tab === 'rapidas') rapidas(rv);
    if (tab === 'dific') dific(rv);
    wrapTables(rv);
  }
  function flash(rv) {
    if (!fOrder) fOrder = D.flashcards.map(function (_, i) { return i; });
    var c = D.flashcards[fOrder[fIdx]];
    rv.innerHTML = '<p class="muted">Cartão ' + (fIdx + 1) + ' de ' + D.flashcards.length + '. Clique no cartão para virar.</p><div class="flash" id="fc" tabindex="0" role="button" aria-label="Virar cartão"><div class="side">' + (fBack ? 'Resposta' : 'Pergunta') + '</div><div>' + (fBack ? c.b : c.f) + '</div></div><div class="row"><button class="btn ghost" id="fp">← Anterior</button><button class="btn primary" id="ff">Virar</button><button class="btn ghost" id="fn">Próximo →</button><button class="btn ghost" id="fs">Embaralhar</button></div>';
    function go(d) { fIdx = (fIdx + d + D.flashcards.length) % D.flashcards.length; fBack = false; flash(rv); }
    document.getElementById('fc').onclick = document.getElementById('ff').onclick = function () { fBack = !fBack; flash(rv); };
    document.getElementById('fc').onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fBack = !fBack; flash(rv); } };
    document.getElementById('fp').onclick = function () { go(-1); };
    document.getElementById('fn').onclick = function () { go(1); };
    document.getElementById('fs').onclick = function () { fOrder.sort(function () { return Math.random() - .5; }); fIdx = 0; fBack = false; flash(rv); };
  }
  function rapidas(rv) {
    var t = T[Math.floor(Math.random() * T.length)];
    rv.innerHTML = '<div class="card"><p class="muted" style="margin:0">Do tópico <a href="#topico-' + t.id + '">' + esc(tt(t)) + '</a></p>' + t.teste.q + '<details class="ans"><summary>Ver respostas (tente antes)</summary><div class="in">' + t.teste.a + '</div></details></div><div class="row"><button class="btn primary" id="outra">Outro tópico</button></div>';
    document.getElementById('outra').onclick = function () { rapidas(rv); };
  }
  function dific(rv) {
    var all = D.questoes.concat(D.simulado), per = {};
    all.forEach(function (q) { var e = st.hist[q.id]; if (!e || e.ok) return; per[q.topico] = (per[q.topico] || 0) + 1; });
    var ks = Object.keys(per).sort(function (a, b) { return per[b] - per[a]; });
    if (!ks.length) { rv.innerHTML = '<p class="muted">Nenhuma dificuldade registrada ainda. Resolva questões no <a href="#exercicios">banco</a> ou no <a href="#simulado">simulado</a>: os tópicos em que você errar aparecem aqui.</p>'; return; }
    rv.innerHTML = '<p>Tópicos com questões erradas (último resultado), do mais crítico ao menos:</p>' + ks.map(function (k) { return '<div class="card"><b>' + esc(tt(byId[k])) + '</b> — ' + per[k] + ' questão(ões) para refazer<div class="row"><a class="btn primary" href="#topico-' + k + '">Rever o tópico</a><a class="btn" href="#exercicios-' + k + '">Refazer questões</a></div></div>'; }).join('');
  }

  /* ---------- FOLHA ---------- */
  function folha() {
    var html = '<h1>Folha de consulta A4</h1><p class="lead">Uma página, pensada para resolver questões, não para estudar.</p>' + (D.pdf ? '<div class="row"><a class="btn primary" href="folha-a4/consulta-prova.pdf" download>Baixar PDF (A4)</a><a class="btn" href="folha-a4/consulta-prova.html" target="_blank" rel="noopener">Abrir versão para imprimir</a></div><p class="note">Imprima em 100% (sem "ajustar à página").</p>' : '<p class="note">Para imprimir, use o PDF da pasta <b>folha-a4</b> do pacote .zip (imprima em 100%, sem "ajustar à página").</p>') + '<iframe class="folha-frame" src="folha-a4/consulta-prova.html" title="Folha de consulta A4"></iframe><h2>Por que este conteúdo</h2>' + D.justificativa;
    h(html);
  }

  /* ---------- SOBRE ---------- */
  function sobre() {
    h('<h1>Sobre este material</h1><div class="tabs"><a class="btn ghost" href="#rel">Relatório</a><a class="btn ghost" href="#est">Estilo do professor</a><a class="btn ghost" href="#ref">Referências</a></div><section id="rel" class="card">' + D.relatorio + '</section><section id="est" class="card">' + D.estilo + '</section><section id="ref" class="card">' + D.bibliografia + '</section>');
    wrapTables();
    main.querySelectorAll('.tabs a').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); document.querySelector(a.getAttribute('href')).scrollIntoView(); }; });
  }

  /* ---------- roteador ---------- */
  function route() {
    if ('speechSynthesis' in window) { speechSynthesis.cancel(); speaking = null; }
    var hs = (location.hash || '').replace(/^#\/?/, ''), k = hs.indexOf('-');
    var p = k < 0 ? [hs] : [hs.slice(0, k), hs.slice(k + 1)];
    var r = p[0] || 'inicio';
    document.querySelectorAll('nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.r === r || (r === 'topico' && a.dataset.r === 'mapa')); });
    document.getElementById('nav').classList.remove('open'); document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
    if (r === 'mapa') return mapa();
    if (r === 'topico') return topico(p[1]);
    if (r === 'audios') return audios();
    if (r === 'exercicios') return exercicios(p[1]);
    if (r === 'simulado') return simulado();
    if (r === 'revisao') return revisao(p[1]);
    if (r === 'folha') return folha();
    if (r === 'sobre') return sobre();
    return painel();
  }
  main.addEventListener('click', function (e) { var b = e.target.closest('[data-speak]'); if (b) speak(b.dataset.speak, b); });
  document.getElementById('menuBtn').onclick = function () { var n = document.getElementById('nav'); n.classList.toggle('open'); this.setAttribute('aria-expanded', n.classList.contains('open')); };
  window.addEventListener('hashchange', route);
  route();
})();
