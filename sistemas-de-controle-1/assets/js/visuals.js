/* Visuais sincronizados com os áudios.
   VIS[id] = lista de [parágrafo do roteiro, título, HTML]. O visual aparece quando
   a narração chega naquele parágrafo e fica até o próximo. */
(function () {
  'use strict';
  var V = window.V, fr = V.fr, F = V.F, big = V.big, list = V.list, bul = V.bul, warn = V.warn, tbl = V.tbl, row = V.row,
    sp = V.sp, plot = V.plot, loop = V.loop, so = V.so, tf = V.tf, routh = V.routh, q = V.q, chips = V.chips, C = V.C;
  function e(x) { return Math.exp(x); }
  var VIS = {};

  /* ===== 01 ===== */
  VIS['01'] = [
    [0, 'Números complexos e o plano s', sp({ region: null, q: [-3, 7] }) ],
    [1, 'Meta do episódio', row(F('s = −3 + j7'), sp({ pts: [[-3, 7]], labels: [[-3, 5.4, '−3 + j7', C.y]] })) ],
    [2, 'O plano s é um mapa', sp({ poles: [[-5, 3], [-5, -3], [-1, 0], [-6, 0]], labels: [[-5, 4.6, 'endereço'], [-1, 1.4, 'endereço']] }) ],
    [3, 'Duas partes: σ e ω', row(sp({ vec: [-3, 7] }), F('σ: eixo horizontal (real)', 'ω: eixo vertical (imaginário)', 'j² = −1')) ],
    [4, 's = σ + jω', row(F('s = σ + jω'), sp({ vec: [-3, 7], pts: [[-3, 7]] })) ],
    [5, 'De onde vêm: Bhaskara', F('s² + 6s + 58 = 0', 'Δ = 36 − 232 = −196', 'σ = −b / 2a = −3', 'ω = √196 / 2 = 7', '<b>s = −3 ± j7</b>') ],
    [6, 'Par conjugado (espelho)', sp({ mirror: true, poles: [[-3, 7], [-3, -7]], labels: [[-3, 8.6, '+j7'], [-3, -6.2, '−j7']] }) ],
    [7, 'As três regiões do mapa', sp({ region: 'all' }) ],
    [8, 'Esquerda: a resposta morre', row(sp({ region: 'left', poles: [[-3, 0]] }), plot({ t: 4, y: [-1.1, 1.1], c: [{ f: function (t) { return e(-1.2 * t) * Math.cos(5 * t); } }] })) ],
    [9, 'Eixo vertical: oscila para sempre', row(sp({ region: 'axis', poles: [[0, 4], [0, -4]] }), plot({ t: 4, y: [-1.1, 1.1], c: [{ f: function (t) { return Math.cos(5 * t); } }] })) ],
    [10, 'Direita: cresce sem limite', row(sp({ region: 'right', poles: [[2, 0]] }), plot({ t: 4, y: [-1.1, 1.1], c: [{ col: C.bad, f: function (t) { return 0.05 * e(0.8 * t) * Math.cos(5 * t); } }] })) ],
    [11, 'Módulo e ângulo', row(sp({ angle: [-3, 7], pts: [[-3, 7]], labels: [[0.4, 4.2, '|s| ≈ 7,62', C.bl, 'start']] }), F('|s| = √(σ² + ω²) = √58 ≈ 7,62', 'θ = tan⁻¹(7/3) ≈ 67°', 'cos θ = 0,394 → vira ζ')) ],
    [12, 'Dois erros clássicos', row(warn(['−3 ± 7 são dois números <b>reais</b>', '−3 ± j7 é um <b>par complexo</b>', 'real = horizontal, imaginário = vertical']), sp({ poles: [[-3, 7], [-3, -7]], pts: [[-10, 0], [4, 0]], x: [-11, 5] , labels: [[-10, 1.4, '−10', C.bl], [4, 1.4, '+4', C.bl]] })) ],
    [13, 'Resumo', row(F('s = σ + jω', '|s| = distância até a origem'), sp({ region: 'all' })) ],
    [14, 'Sua vez', row(q('O polo 2 + j3 está em qual lado do plano? O que isso significa?', 'Lado direito (parte real positiva): resposta cresce, sistema instável.'), sp({ region: 'all', q: [2, 3] })) ]
  ];

  /* ===== 02 ===== */
  VIS['02'] = [
    [0, 'Transformada de Laplace', big('f(t) &nbsp;⟶&nbsp; F(s)', 'tabela + três regras') ],
    [2, 'Laplace é um tradutor', tbl(['Idioma do tempo', 'Idioma s'], [['equação diferencial', 'conta de frações'], ['derivar  d/dt', '× s'], ['integrar  ∫', '÷ s']]) ],
    [3, 'A tabela: cada integração põe um s embaixo', tbl(['f(t)', 'F(s)'], [['impulso δ(t)', '1'], ['degrau', fr('1', 's')], ['rampa t', fr('1', 's²')], ['tⁿ', fr('n!', 'sⁿ⁺¹')]]) ],
    [4, 'Mais três linhas da tabela', tbl(['f(t)', 'F(s)'], [['e<sup>−at</sup>', fr('1', 's + a')], ['sen ωt', fr('ω', 's² + ω²')], ['cos ωt', fr('s', 's² + ω²')]]) ],
    [5, 'As três regras', list(['Linearidade', 'Deslocamento na frequência', 'Derivada']) ],
    [6, 'Regra 1: linearidade', list(['Linearidade', 'Deslocamento na frequência', 'Derivada'], 0) + F('ℒ{7·f(t)} = 7·F(s)') ],
    [7, 'Regra 2: deslocamento na frequência', list(['Linearidade', 'Deslocamento na frequência', 'Derivada'], 1) + F('e<sup>−at</sup>·f(t) → F(s <b>+</b> a)', 'e<sup>+at</sup>·f(t) → F(s <b>−</b> a)', '<small>o sinal sempre inverte</small>') ],
    [8, 'Regra 3: derivada', list(['Linearidade', 'Deslocamento na frequência', 'Derivada'], 2) + F('ℒ{f′(t)} = s·F(s)', '<small>condições iniciais nulas</small>') ],
    [9, 'Exemplo de prova', big('5 · e<sup>−2t</sup> · sen 3t') ],
    [10, 'Passo 1: separe as peças', chips(['5', 'e<sup>−2t</sup>', 'sen 3t']) ],
    [11, 'Passo 2: tabela', chips(['5', 'e<sup>−2t</sup>', 'sen 3t'], 2) + F('sen 3t → ' + fr('3', 's² + 9')) ],
    [12, 'Passo 3: troque s por s + 2', chips(['5', 'e<sup>−2t</sup>', 'sen 3t'], 1) + F(fr('3', '(s + 2)² + 9'), '<small>o 9 não muda: ele é ω²</small>') ],
    [13, 'Passo 4: constante', chips(['5', 'e<sup>−2t</sup>', 'sen 3t'], 0) + F('5 × 3 = 15') ],
    [14, 'Resposta', F('<b>' + fr('15', '(s + 2)² + 9') + '</b>') ],
    [15, 'Truque do sinal', row(F('e<sup>−5t</sup> → polo em s = −5', 'fator (s + 5)'), sp({ poles: [[-5, 0]], y: [-4, 4], labels: [[-5, 1.6, '−5']] })) ],
    [16, 'Erros que mais aparecem', warn(['errar o sinal do deslocamento', 'trocar só um dos s', 'mexer no ω²', 'esquecer o fatorial: t⁴ → 4!/s⁵ = 24/s⁵']) ],
    [17, 'Resumo', F('tabela + 3 regras', 'e<sup>−at</sup>: troque s por s + a') ],
    [18, 'Sua vez', q('Qual a transformada de t²·e<sup>3t</sup>?', 'Base: 2/s³. Expoente positivo: s vira s − 3. Resposta: 2/(s − 3)³.') ]
  ];

  /* ===== 03 ===== */
  VIS['03'] = [
    [0, 'Frações parciais', big('C(s) ⟶ c(t)', 'o caminho de volta') ],
    [2, 'Desmontar em peças da tabela', F(fr('s + 2', 's(s + 5)') + ' = ' + fr('A', 's') + ' + ' + fr('B', 's + 5')) ],
    [3, 'Cada raiz vira uma fração', tbl(['Raiz', 'Fração', 'No tempo'], [['0', fr('A', 's'), 'A'], ['−5', fr('B', 's + 5'), 'B·e<sup>−5t</sup>'], ['−5 (dupla)', fr('B₁', 's + 5') + ' + ' + fr('B₂', '(s + 5)²'), 'B₁e<sup>−5t</sup> + B₂·t·e<sup>−5t</sup>']]) ],
    [4, 'Regra do tampar', list(['Tampe o fator da raiz', 'Substitua o valor da raiz no que sobrou']) ],
    [6, 'Exemplo (aula 2, slide 13)', F('C(s) = ' + fr('s + 2', 's(s + 5)')) ],
    [7, 'Coeficiente A (raiz 0)', F('tampa o s: ' + fr('s + 2', 's + 5'), 's = 0 → <b>A = 2/5</b>') ],
    [8, 'Coeficiente B (raiz −5)', F('tampa o (s + 5): ' + fr('s + 2', 's'), 's = −5 → ' + fr('−3', '−5') + ' → <b>B = 3/5</b>') ],
    [9, 'De volta ao tempo', row(F('c(t) = 2/5 + 3/5·e<sup>−5t</sup>'), plot({ t: 1.2, y: [0, 1.1], h1: [[0.4, '2/5']], c: [{ f: function (t) { return 0.4 + 0.6 * e(-5 * t); } }] })) ],
    [10, 'Forçada + natural', plot({ t: 1.2, y: [0, 1.1], c: [{ f: function () { return 0.4; }, col: C.bl, lab: 'forçada (degrau)', lp: [0.85, 0.42] }, { f: function (t) { return 0.6 * e(-5 * t); }, col: C.bad, lab: 'natural (polo −5)', lp: [0.3, 0.16] }, { f: function (t) { return 0.4 + 0.6 * e(-5 * t); } }] }) ],
    [11, 'Raiz repetida', F(fr('K₂', '(s + a)²') + ': tampar normal', fr('K₁', 's + a') + ': derive antes de substituir') ],
    [12, 'Três erros comuns', warn(['uma fração só para raiz repetida', 'erro de sinal com s = −5', 'expandir sem dividir quando grau de cima ≥ grau de baixo']) ],
    [13, 'Roteiro de prova', list(['Fatorar o denominador', 'Uma fração por raiz', 'Coeficientes pelo tampar', 'Trocar cada fração pela tabela']) + F('s² + 4s + 13 = (s + 2)² + 9') ],
    [14, 'Resumo', F(fr('A', 's') + ' → A', fr('B', 's + a') + ' → B·e<sup>−at</sup>') ],
    [15, 'Sua vez', q('Em 1 / ((s + 1)(s + 3)), quanto vale o coeficiente de (s + 1)?', 'Tampa (s + 1), s = −1: 1 / (−1 + 3) = 1/2.') ]
  ];

  /* ===== 04 ===== */
  var sig = function (k) {
    var fs = [null, function (t) { return t > 0.1 ? 1 : 0; }, function (t) { return Math.max(0, t - 0.1) / 1.0; }, function (t) { var x = Math.max(0, t - 0.1); return 0.5 * x * x / 0.6; }];
    var names = ['impulso', 'degrau', 'rampa', 'parábola'];
    return names.map(function (nm, i) {
      var o = { w: 150, h: 110, t: 1.2, y: [0, 1.2], xl: '', label: nm };
      if (i === 0) o.arrowsUp = [[0.12, 1.1]]; else o.c = [{ f: fs[i], col: k === i ? C.y : '#888' }];
      if (i === 0 && k !== 0) o.arrowsUp = [[0.12, 1.1]];
      return '<div class="vmini' + (k === i ? ' on' : '') + '">' + plot(o) + '<span>' + nm + '</span></div>';
    }).join('');
  };
  VIS['04'] = [
    [0, 'Sinais de teste', '<div class="vgrid4">' + sig(-1) + '</div>'],
    [2, 'Entradas padrão para comparar sistemas', '<div class="vgrid4">' + sig(-1) + '</div>'],
    [4, 'Impulso → 1', '<div class="vgrid4">' + sig(0) + '</div>' + F('δ(t) → 1') ],
    [5, 'Degrau → 1/s (posição)', '<div class="vgrid4">' + sig(1) + '</div>' + F('u(t) → ' + fr('1', 's')) ],
    [6, 'Rampa → 1/s² (velocidade)', '<div class="vgrid4">' + sig(2) + '</div>' + F('t → ' + fr('1', 's²')) ],
    [7, 'Parábola → 1/s³ (aceleração)', '<div class="vgrid4">' + sig(3) + '</div>' + F('½t² → ' + fr('1', 's³'), '<small>sem o ½, não seria 1/s³</small>') ],
    [8, 'Resposta ao impulso', row(loop({ blocks: ['G(s)'], R: 'δ → 1', C: 'Y = G', noSum: true }), F('Y(s) = G(s)·1', 'g(t) = ℒ⁻¹{G(s)}', '<small>a impressão digital do sistema</small>')) ],
    [9, 'Qualquer entrada', row(loop({ blocks: ['G(s)'], R: 'X(s)', C: 'Y(s)', noSum: true }), F('Y(s) = G(s)·X(s)', '<small>tempo: convolução · s: multiplicação</small>')) ],
    [10, 'Exemplo da diagnóstica', F('h(t) = t·e<sup>−5t</sup>', 'entrada: rampa') ],
    [11, 'H(s)', F('t → ' + fr('1', 's²') + ' &nbsp;·&nbsp; s → s + 5', 'H(s) = ' + fr('1', '(s + 5)²')) ],
    [12, 'X(s)', F('rampa: X(s) = ' + fr('1', 's²')) ],
    [13, 'Y(s) = H·X', F('Y(s) = ' + fr('1', 's²(s + 5)²')) ],
    [15, 'Erros comuns', warn(['confundir degrau com rampa', 'esquecer o ½ da parábola', 'resposta ao impulso ≠ entrada igual a 1']) ],
    [16, 'O R(s) das fórmulas', tbl(['Sinal', 'R(s)', 'Onde aparece'], [['degrau', fr('1', 's'), 'tópicos 9, 11, 16'], ['rampa', fr('1', 's²'), 'tópico 16'], ['parábola', fr('1', 's³'), 'tópico 16']]) ],
    [17, 'Amplitude multiplica', F('degrau de amplitude 5 → ' + fr('5', 's')) ],
    [18, 'Resumo', tbl(['Sinal', 'Representa'], [['degrau', 'posição'], ['rampa', 'velocidade'], ['parábola', 'aceleração']]) ],
    [19, 'Sua vez', q('Se G(s) = 3 / (s + 2), qual a resposta ao impulso?', '3·e<sup>−2t</sup>') ]
  ];

  /* ===== 05 ===== */
  var ac = function (hl, open) { return loop({ blocks: ['Controlador', 'Atuador', 'Processo'], H: open ? null : 'Sensor', noSum: !!open, R: 'Ref. 22 °C', C: 'Temp.', hl: hl, plant: [1, 2], dist: 'porta aberta', w: 440, bw: 78 }); };
  VIS['05'] = [
    [0, 'O que é um sistema de controle', ac(null) ],
    [2, 'Tornado × avião', big('a diferença é o controle', 'fazer uma variável seguir o valor desejado') ],
    [3, 'As peças, num ar-condicionado', ac(null) ],
    [4, 'Referência (setpoint)', ac('R') ],
    [5, 'Saída (variável controlada)', ac('C') ],
    [6, 'Controlador', ac(0) ],
    [7, 'Atuador', ac(1) ],
    [8, 'Processo', ac(2) ],
    [9, 'Planta = atuador + processo', ac('plant') ],
    [10, 'Sensor', ac('H') ],
    [11, 'Distúrbio', ac('dist') ],
    [12, 'Malha aberta × malha fechada', '<p class="vnote">Malha aberta: não mede a saída</p>' + ac(null, true) + '<p class="vnote">Malha fechada: mede, compara e corrige</p>' + ac(null) ],
    [13, 'Malha aberta: não mede a saída', loop({ blocks: ['Programa', 'Máquina'], R: 'ciclo', C: 'roupa', noSum: true }) + big('dirigir de olhos fechados') ],
    [14, 'Malha fechada: realimentação', ac('H') + big('medir → comparar → corrigir') ],
    [15, 'Vantagens e desvantagens', tbl(['', 'Malha aberta', 'Malha fechada'], [['precisão', 'baixa', 'alta'], ['distúrbios', 'sensível', 'rejeita'], ['custo', 'baixo', 'maior'], ['risco', '—', '<b>instabilidade</b>']]) ],
    [16, 'Roteiro de resposta', tbl(['', 'Exemplo'], [['Malha aberta', 'torradeira com timer'], ['Malha fechada', 'ferro com termostato'], ['Troca', 'precisão × custo e risco de instabilidade']]) ],
    [17, 'Três armadilhas', warn(['malha fechada nem sempre é melhor', 'planta = atuador + processo', 'ter sensor não basta: a medida precisa corrigir a ação']) ],
    [18, 'Erros de medição', bul(['grosseiro', 'acidental', 'de inserção', 'de paralaxe', 'de zeragem']) + '<p class="vnote">medida errada → o controlador corrige para o lugar errado</p>' ],
    [19, 'Onde isso aparece depois', tbl(['No diagrama', 'É'], [['somador', 'comparador'], ['G', 'planta'], ['H', 'sensor'], ['PID', 'transforma erro em ação']]) ],
    [20, 'Resumo', big('medir → comparar → corrigir') ],
    [21, 'Sua vez', q('Semáforo com tempo fixo: malha aberta ou fechada?', 'Ele não mede nada: malha aberta.') ]
  ];

  /* ===== 06 ===== */
  VIS['06'] = [
    [0, 'Função de transferência', F('G(s) = ' + fr('Y(s)', 'X(s)')) ],
    [2, 'A receita do sistema', loop({ blocks: ['G(s): receita'], R: 'entrada', C: 'saída', noSum: true, bw: 110 }) ],
    [3, 'Definição de prova', F('G(s) = ' + fr('ℒ{saída}', 'ℒ{entrada}'), '<b>condições iniciais nulas</b>') ],
    [4, 'Da equação diferencial para G(s)', tbl(['No tempo', 'Em s'], [['y″', 's²·Y'], ['y′', 's·Y'], ['y', 'Y']]) + list(['Troque derivadas por s', 'Coloque Y e X em evidência', 'Divida']) ],
    [5, 'Exemplo da diagnóstica', F('2y″ + y′ + 6y = x', '(2s² + s + 6)·Y = X', 'G = ' + fr('1', '2s² + s + 6')) ],
    [6, 'Impedâncias em s', tbl(['Componente', 'Impedância'], [['Resistor', 'R'], ['Indutor', 'sL'], ['Capacitor', fr('1', 'sC')]]) ],
    [7, 'Circuito RC', row(F(fr('V<sub>C</sub>', 'V<sub>i</sub>') + ' = ' + fr('1/sC', 'R + 1/sC') + ' = ' + fr('1', 'RCs + 1'), 'τ = RC'), plot({ t: 5, y: [0, 1.15], h1: [[1, '1']], c: [{ f: function (t) { return 1 - e(-t); } }], v1: [[1, 'τ']] })) ],
    [8, 'Massa, mola e amortecedor', row(F(fr('1', 'Ms² + Bs + k'), 'M = 20, k = 320', 'Δ = 0: B² = 4·20·320', '<b>B = 160 N·s/m</b>'), plot({ t: 3, y: [0, 1.15], c: [{ f: so(1, 4), lab: 'crítico' }] })) ],
    [9, 'Erros comuns', warn(['é sempre saída sobre entrada', 'capacitor é 1/sC, não sC', 'o denominador decide polos e estabilidade']) ],
    [10, 'Resumo', F('G = saída / entrada (CI nulas)', 'derivada → s', 'R · sL · 1/sC') ],
    [11, 'Sua vez', q('Qual a FT de y″ + 3y′ + 2y = 5x?', '5 / (s² + 3s + 2)') ]
  ];

  /* ===== 07 ===== */
  VIS['07'] = [
    [0, 'Diagrama de blocos', loop({ blocks: ['G(s)'], H: 'H(s)' }) ],
    [2, 'Como ler: bloco, seta, somador, ramificação', loop({ blocks: ['G(s)'], H: 'H(s)', hl: 'sum', E: 'E' }) ],
    [3, 'Regra 1: série multiplica', loop({ blocks: ['G₁', 'G₂', 'G₃'], noSum: true, R: 'R', C: 'C' }) + F('G₁·G₂·G₃') ],
    [4, 'Regra 2: paralelo soma', V.par('G₁', 'G₂', '±') + F('G₁ ± G₂') ],
    [5, 'Regra 3: realimentação', row(loop({ blocks: ['G'], H: 'H', R: 'R', C: 'C' }), F(fr('G', '1 + GH'), '<small>H = 1: ' + fr('G', '1 + G') + '</small>')) ],
    [6, 'Deduzindo em quatro linhas', F('E = R − H·C', 'C = G·E', 'C = G·R − GH·C', 'C(1 + GH) = G·R → ' + fr('C', 'R') + ' = ' + fr('G', '1 + GH')) ],
    [7, 'Dois truques', tbl(['Mover', 'Compense com'], [['somador para frente de G', 'entrada × G'], ['ramificação para depois de G', 'ramo × 1/G']]) + '<p class="vnote">o sinal em cada ponto não pode mudar</p>' ],
    [8, 'Exemplo que caiu duas vezes', row(loop({ blocks: ['1/(s+4)'], H: '1/s', R: 'R', C: 'C' }), F('GH = ' + fr('1', 's(s + 4)'), '× s(s + 4) em cima e embaixo', '<b>' + fr('s', 's² + 4s + 1') + '</b>')) ],
    [9, 'Versão no tempo', F('(h₁ + h₂) ∗ h₃ − h₄', '<small>∗ = convolução (série no tempo)</small>') ],
    [10, 'Erros comuns', warn(['trocar o sinal do denominador', 'esquecer o H no produto', 'somar blocos em série', 'mover blocos sem compensar']) ],
    [11, 'Resumo', tbl(['Ligação', 'Equivalente'], [['série', 'G₁·G₂'], ['paralelo', 'G₁ ± G₂'], ['realimentação', fr('G', '1 + GH')]]) ],
    [12, 'Sua vez', q('G = 10/(s + 1) com realimentação unitária. Malha fechada?', '10 / (s + 11)') ]
  ];

  /* ===== 08 ===== */
  VIS['08'] = [
    [0, 'Polos e zeros', sp({ poles: [[-2, 0], [-5, 0]], zeros: [[-3, 0]], y: [-4, 4], labels: [[-6.5, 2.6, '× polo', C.y, 'start'], [-6.5, 1.4, '○ zero', C.bl, 'start']] }) ],
    [2, 'Polo: denominador · zero: numerador', row(sp({ poles: [[-2, 0], [-5, 0]], zeros: [[-3, 0]], y: [-4, 4] }), F('polo (×): G → ∞', 'zero (○): G = 0')) ],
    [3, 'Polos são o DNA', big('polos → forma', 'zeros → amplitudes') ],
    [4, 'Forçada + natural', plot({ t: 1.5, y: [0, 1.15], c: [{ f: function () { return 1; }, col: C.bl, lab: 'forçada (polo da entrada)', lp: [0.75, 1.02] }, { f: function (t) { return -e(-5 * t); }, col: C.bad, wd: 1.6 }, { f: function (t) { return 1 - e(-5 * t); }, lab: 'total', lp: [0.3, 0.72] }], y0: 0 }) + '<p class="vnote">natural: e<sup>−5t</sup>, vem do polo do sistema em −5</p>' ],
    [5, 'Mais à esquerda, mais rápido', row(sp({ poles: [[-1, 0], [-5, 0], [-2, 4], [-2, -4]], y: [-6, 6] }), plot({ t: 3, y: [-1, 1.1], c: [{ f: function (t) { return e(-t); }, col: C.bad, lab: 'e^−t', lp: [1.8, 0.2] }, { f: function (t) { return e(-5 * t); }, col: C.bl }, { f: function (t) { return e(-2 * t) * Math.cos(4 * t); }, lab: 'e^−2t·cos 4t', lp: [1.4, -0.4] }] })) ],
    [6, 'Ler a forma sem fazer conta', row(sp({ poles: [[0, 0], [-2, 0], [-4, 0], [-5, 0]], zeros: [[-3, 0]], y: [-3, 3], x: [-6, 1] }), F('c(t) = K₁ + K₂e<sup>−2t</sup> + K₃e<sup>−4t</sup> + K₄e<sup>−5t</sup>', '<small>K₁: forçada · resto: natural · mais lento: −2</small>')) ],
    [7, 'Do mapa para a função', row(sp({ poles: [[0, 0], [-2, 0], [-6, 0]], zeros: [[-3, 0], [1, 0]], y: [-3, 3], x: [-7, 2] }), F('G = ' + fr('(s + 3)(s − 1)', 's(s + 2)(s + 6)'))) ],
    [8, 'Erros comuns', warn(['polo em −2 → fator (s + 2)', 'não troque × com ○', 'zero à direita <b>não</b> deixa instável']) ],
    [9, 'Os coeficientes (se pedirem)', F('K₁ = 3/40 · K₂ = −1/12', 'K₃ = −1/8 · K₄ = 2/15') ],
    [10, 'Tudo é leitura do mapa', tbl(['', 'No mapa'], [['1ª ordem', 'um polo real'], ['2ª ordem', 'par de polos'], ['estabilidade', 'algum polo à direita?']]) ],
    [11, 'Resumo', big('forçada ← entrada · natural ← sistema', 'mais à esquerda, mais rápido') ],
    [12, 'Sua vez', row(q('(s − 1)/(s² + 2s + 10) é estável?', 'Polos −1 ± j3, à esquerda: estável, apesar do zero em +1.'), sp({ region: 'all', poles: [[-1, 3], [-1, -3]], zeros: [[1, 0]], x: [-4, 3], y: [-5, 5] })) ]
  ];

  /* ===== 09 ===== */
  var fo = function (a) { return function (t) { return 1 - e(-a * t); }; };
  VIS['09'] = [
    [0, 'Sistemas de 1ª ordem', F('G(s) = ' + fr('a', 's + a')) ],
    [2, 'Caixa d’água: sobe e estabiliza', plot({ t: 5, y: [0, 1.15], h1: [[1, 'final']], c: [{ f: fo(1) }] }) ],
    [3, 'Resposta ao degrau', F('c(t) = k·(1 − e<sup>−t/τ</sup>)', 'k: valor final · τ: constante de tempo') ],
    [5, 'τ = 1/a: 63% do final', plot({ t: 5, y: [0, 1.15], h1: [[1, ''], [0.632, '63%', C.bl]], v1: [[1, 'τ', C.bl]], pts: [[1, 0.632]], c: [{ f: fo(1) }] }) ],
    [6, 'Tr = 2,2/a: de 10% a 90%', plot({ t: 5, y: [0, 1.15], h1: [[0.1, '10%'], [0.9, '90%']], vb: [[0.105, 2.303]], ann: [[1.2, 0.5, 'T<tspan baseline-shift="sub" font-size="9">r</tspan>', C.bl]], c: [{ f: fo(1) }] }) ],
    [7, 'Ts = 4/a: entra na faixa de 2%', plot({ t: 6, y: [0, 1.15], band: [0.98, 1.02], v1: [[4, 'Ts = 4/a', C.bl]], c: [{ f: fo(1) }] }) ],
    [8, 'Exemplo: 50/(s + 50)', tbl(['', 'Valor'], [['τ = 1/50', '0,02 s'], ['Tr = 2,2/50', '0,044 s'], ['Ts = 4/50', '0,08 s'], ['final', '1']]) ],
    [9, 'Motor CC: ler no gráfico', plot({ t: 10, y: [0, 115], yl: 'rpm', xl: 't (ms)', h1: [[100, '100'], [63, '63', C.bl]], v1: [[2, '2 ms', C.bl]], c: [{ f: function (t) { return 100 * (1 - e(-t / 2)); } }] }) + F('k = 100 · τ = 2 ms') ],
    [10, 'Três sistemas da processual', row(sp({ poles: [[-1, 0], [-5, 0], [10, 0, C.bad]], x: [-7, 12], y: [-3, 3], labels: [[-1, 1, '−1'], [-5, 1, '−5'], [10, 1, '+10', C.bad]] }), plot({ t: 3, y: [0, 1.2], c: [{ f: fo(1), col: '#888', lab: '1/(s+1)', lp: [2.2, 0.85] }, { f: function (t) { return 0.2 * (1 - e(-5 * t)) * 5; }, lab: '−5: mais rápido', lp: [1.3, 1.02] }, { f: function (t) { return 0.02 * (e(10 * t) - 1); }, col: C.bad }] })) ],
    [11, 'Erros comuns', warn(['τ vem do polo, não do numerador', 'normalize: 2/(4s + 1) tem τ = 4', 'ganho muda o final, não a velocidade']) ],
    [12, 'Variando K e τ', row(plot({ t: 5, y: [0, 2.2], c: [{ f: fo(1.2), col: '#888', lab: 'K = 1', lp: [4, 1] }, { f: function (t) { return 2 * fo(1.2)(t); }, lab: 'K = 2', lp: [4, 2] }], label: 'K muda o final' }), plot({ t: 5, y: [0, 1.2], c: [{ f: fo(2.5), lab: 'τ pequeno', lp: [1.3, 1.05] }, { f: fo(0.6), col: C.bl, lab: 'τ grande', lp: [3.6, 0.7] }], label: 'τ muda a velocidade' })) ],
    [13, 'Resumo', tbl(['Grandeza', 'Fórmula'], [['τ', '1/a (63%)'], ['Tr', '2,2/a'], ['Ts', '4/a']]) ],
    [14, 'Sua vez', q('4/(s + 2): valor final ao degrau e tempo de acomodação?', 'Final 4/2 = 2. Ts = 4/2 = 2 s.') ]
  ];

  /* ===== 10 ===== */
  var types = function (hl) {
    var cs = [{ z: 0, lab: 'ζ = 0' }, { z: 0.3, lab: '0 < ζ < 1' }, { z: 1, lab: 'ζ = 1' }, { z: 2.2, lab: 'ζ > 1' }], cols = ['#c792ea', C.y, C.bl, '#9ccc65'];
    return plot({ t: 10, y: [0, 2.1], h1: [[1, '1']], c: cs.map(function (c, i) { return { f: so(c.z, 1.3), col: cols[i], wd: hl == null || hl === i ? 2.4 : 1, dash: hl == null || hl === i ? null : '3 3', lab: hl == null || hl === i ? c.lab : '', lp: [[1.6, 2.02], [3.4, 1.42], [5.2, 0.92], [8.4, 0.6]][i] }; }) });
  };
  var tp = function (z, pl) { return row(sp({ poles: pl, x: [-5, 2], y: [-4, 4] }), types(z)); };
  VIS['10'] = [
    [0, '2ª ordem: ζ e ωₙ', types(null) ],
    [2, 'Quebra-molas e amortecedor', types(null) + '<p class="vnote">ζ: quanto freia a oscilação · ωₙ: escala de tempo</p>' ],
    [3, 'Forma geral', F(fr('K·ωₙ²', 's² + 2ζωₙs + ωₙ²'), 'comparando com ' + fr('b', 's² + as + b') + ':', 'ωₙ = √b &nbsp;·&nbsp; <b>ζ = a / (2√b)</b>') ],
    [4, 'Os quatro tipos', types(null) ],
    [5, 'ζ = 0: não amortecido', tp(0, [[0, 3], [0, -3]]) ],
    [6, '0 < ζ < 1: subamortecido', tp(1, [[-1, 2.8], [-1, -2.8]]) ],
    [7, 'ζ = 1: criticamente amortecido', tp(2, [[-2, 0.25], [-2, -0.25]]) ],
    [8, 'ζ > 1: superamortecido', tp(3, [[-0.6, 0], [-3.8, 0]]) ],
    [9, 'Exemplo: 36/(s² + 4,2s + 36)', row(F('ωₙ = √36 = 6', 'ζ = 4,2/12 = 0,35', '<b>subamortecido</b>'), plot({ t: 3, y: [0, 1.5], h1: [[1, '1']], c: [{ f: so(0.35, 6) }] })) ],
    [10, 'Mesmo termo do meio (8s)', row(tbl(['Final', 'ζ', 'Tipo'], [['12', '≈ 1,15', 'super'], ['16', '1', 'crítico'], ['20', '≈ 0,89', 'sub']]), plot({ t: 2.5, y: [0, 1.15], c: [{ f: so(8 / (2 * Math.sqrt(12)), Math.sqrt(12)), col: '#9ccc65' }, { f: so(1, 4), col: C.bl }, { f: so(8 / (2 * Math.sqrt(20)), Math.sqrt(20)) }] })) ],
    [11, 'Erros comuns', warn(['ζ = a/2 esquece o ωₙ', 'ωₙ vem do termo independente', 'divida tudo se s² tiver coeficiente', '10/(s² + 2s + 4): ωₙ = 2, final = 10/4']) ],
    [12, 'Caracterizar as curvas A, B, C, D', types(null) + list(['Passa do valor final? → sub (ou não amortecida)', 'Não passa: rápida → crítica · lenta → super']) ],
    [13, 'Resumo', tbl(['ζ', 'Resposta'], [['0', 'não amortecida'], ['0 a 1', 'subamortecida'], ['1', 'crítica'], ['> 1', 'superamortecida']]) ],
    [14, 'Sua vez', q('25/(s² + 10s + 25): qual o tipo?', 'ωₙ = 5, ζ = 10/10 = 1: criticamente amortecido.') ]
  ];

  /* ===== 11 ===== */
  var f75 = so(0.75, 10), f39 = so(0.394, Math.sqrt(58));
  var specs = plot({ t: 3.2, y: [0, 1.45], band: [0.98, 1.02], h1: [[1, '1']], c: [{ f: so(0.3, 3) }], pts: [[1.098, 1.372, '%UP', C.bl]], v1: [[1.098, 'Tp', C.bl], [2.9, 'Ts', C.bl]], vb: [[0.13, 0.55]], ann: [[0.34, 0.25, 'Tr', C.bl]] });
  VIS['11'] = [
    [0, 'Subamortecido: Tp, %UP, Ts, Tr', specs ],
    [2, 'O que cada especificação mede', specs ],
    [3, 'Cada parte do polo define uma coisa', row(sp({ poles: [[-2, 3.5], [-2, -3.5]], angle: [-2, 3.5], x: [-5, 2], y: [-5, 5], labels: [[-2, 4.6, '−σd + jωd']] }), tbl(['Parte do polo', 'Define'], [['ωd (imaginária)', 'Tp'], ['σd (real)', 'Ts'], ['ângulo (cos θ = ζ)', '%UP']])) ],
    [5, 'ωd', F('ωd = ωₙ·√(1 − ζ²)') ],
    [6, 'σd', F('ωd = ωₙ·√(1 − ζ²)', 'σd = ζ·ωₙ') ],
    [7, 'Tempo de pico', F('Tp = ' + fr('π', 'ωd')) ],
    [8, 'Ultrapassagem: só depende de ζ', F('%UP = 100·e<sup>−ζπ / √(1 − ζ²)</sup>') ],
    [9, 'Acomodação', F('Ts = ' + fr('4', 'ζωₙ')) ],
    [10, 'Tempo de subida', big('sem fórmula exata', 'Matlab ou aproximação do Nise (no site)') ],
    [11, 'Caminho de volta: de %UP para ζ', F('ζ = ' + fr('−ln(%UP/100)', '√(π² + ln²(%UP/100))')) ],
    [12, 'Exemplo (slide 82)', F(fr('100', 's² + 15s + 100')) ],
    [13, 'ωₙ e ζ', F('ωₙ = √100 = 10', 'ζ = 15/20 = 0,75') ],
    [14, '√(1 − ζ²)', F('√(1 − 0,5625) = √0,4375 ≈ 0,661') ],
    [15, 'Tempo de pico', F('Tp = π / (10 × 0,661) ≈ <b>0,475 s</b>') ],
    [16, 'Ultrapassagem', F('expoente ≈ −3,56', 'e<sup>−3,56</sup> ≈ 0,028 → <b>2,8%</b>') ],
    [17, 'Acomodação', F('Ts = 4 / 7,5 ≈ <b>0,533 s</b>') ],
    [18, 'Conferido por simulação', plot({ t: 1, y: [0, 1.15], band: [0.98, 1.02], h1: [[1, '1']], c: [{ f: f75 }], v1: [[0.475, 'Tp', C.bl], [0.533, '', C.bl]], pts: [[0.475, f75(0.475), '2,8%', C.bl]] }) ],
    [19, 'Polos −3 ± j7', row(sp({ poles: [[-3, 7], [-3, -7]], angle: [-3, 7], x: [-6, 2] }), F('ζ = 0,394 · %UP ≈ 26%', 'Tp = π/7 ≈ 0,45 s', 'Ts = 4/3 ≈ 1,33 s')) ],
    [20, 'Erros comuns', warn(['Tp usa ωd, não ωₙ', 'sinal de menos no logaritmo', '%UP não depende de ωₙ', 'só vale para 2ª ordem pura']) ],
    [21, 'Resumo', tbl(['Parte do polo', 'Define'], [['real', 'acomodação'], ['imaginária', 'pico'], ['ângulo', 'ultrapassagem']]) ],
    [22, 'Sua vez', row(q('Polos para a esquerda, mesma parte imaginária: o que muda?', 'Acomodação diminui. Tempo de pico não muda.'), sp({ poles: [[-1, 3], [-1, -3], [-3, 3, '#888'], [-3, -3, '#888']], arrows: [[-1.2, 3, -2.7, 3], [-1.2, -3, -2.7, -3]], x: [-5, 2], y: [-5, 5] })) ]
  ];

  /* ===== 12 ===== */
  var d3 = tf([500], [1, 24, 105, 500], 4), d2 = tf([25], [1, 4, 25], 4);
  VIS['12'] = [
    [0, 'Polos adicionais e zeros', sp({ poles: [[-2, 4.58], [-2, -4.58], [-20, 0]], x: [-22, 3], y: [-7, 7] }) ],
    [2, 'Polos dominantes', row(sp({ poles: [[-2, 4.58], [-2, -4.58], [-20, 0, '#888']], x: [-22, 3], y: [-7, 7], labels: [[-2, 6, 'dominam'], [-20, 1.6, 'some rápido', C.mu]] }), plot({ t: 4, y: [0, 1.4], c: [{ d: d2, col: C.bl, lab: '2ª ordem', lp: [2.6, 1.12] }, { d: d3, dash: '5 4', lab: '3ª ordem', lp: [3.2, 0.86] }] })) ],
    [3, 'Regra dos cinco vezes', F('|polo extra| ≥ 5 × |parte real dominante|') ],
    [4, 'Exemplo', row(F('polos: −2 ± j4,58 · extra: −20', '20 > 5 × 2 = 10 ✓', 'ωₙ = 5 · ζ = 0,4', '%UP ≈ 25% · Ts ≈ 2 s'), sp({ poles: [[-2, 4.58], [-2, -4.58], [-20, 0]], x: [-22, 3], y: [-7, 7] })) ],
    [5, 'Zero perto: mais rápido e com mais pico', plot({ t: 4, y: [0, 1.8], h1: [[1, '1']], c: [{ d: d2, col: '#888', lab: 'sem zero', lp: [2.8, 0.82] }, { d: tf([25 / 4, 25], [1, 4, 25], 4), lab: 'zero em −4', lp: [1.5, 1.55] }] }) ],
    [6, 'Zero à direita: fase não mínima', plot({ t: 4, y: [-0.9, 1.7], h1: [[1, '1']], c: [{ d: tf([-25 / 5, 25], [1, 4, 25], 4), col: C.bad }], ann: [[1.6, -0.6, 'começa ao contrário', C.bad, 'start']] }) ],
    [7, 'Zero quase em cima do polo', sp({ poles: [[-6.5, 0], [-2, 3], [-2, -3]], zeros: [[-7, 0]], x: [-9, 2], y: [-5, 5], labels: [[-6.75, 1.4, 'quase se cancelam', C.bl]] }) ],
    [8, 'Erros comuns', warn(['compare com a parte real, não com ωₙ', 'o ganho muda ao cortar um polo distante', 'zero à direita não causa instabilidade']) ],
    [9, 'PID adiciona dois zeros', big('mais ultrapassagem que a fórmula prevê', 'não é erro de conta: são os zeros') ],
    [10, 'Resumo', bul(['regra dos 5 vezes', 'zero perto: mais rápido, mais pico', 'zero à direita: fase não mínima']) ],
    [11, 'Sua vez', row(q('Polos −1 ± j2 e −3. Aproxima por 2ª ordem?', '3 < 5 × 1: não.'), sp({ poles: [[-1, 2], [-1, -2], [-3, 0]], x: [-6, 2], y: [-4, 4] })) ]
  ];

  /* ===== 13 ===== */
  VIS['13'] = [
    [0, 'Estabilidade', sp({ region: 'all' }) ],
    [1, 'A especificação mais importante', big('instável = não funciona') ],
    [2, 'Bolinha na tigela e no morro', V.ball() ],
    [4, 'Estável: resposta natural → 0', plot({ t: 5, y: [-1.1, 1.1], c: [{ f: function (t) { return e(-0.8 * t) * Math.cos(4 * t); } }] }) ],
    [5, 'Instável: cresce sem limite', plot({ t: 5, y: [-1.1, 1.1], c: [{ col: C.bad, f: function (t) { return 0.06 * e(0.6 * t) * Math.cos(4 * t); } }] }) ],
    [6, 'Marginalmente estável', plot({ t: 5, y: [-1.1, 1.1], c: [{ col: C.bl, f: function (t) { return 0.8 * Math.cos(4 * t); } }] }) ],
    [7, 'Entrada limitada, saída limitada', big('BIBO', 'toda entrada limitada → saída limitada') ],
    [9, 'Todos à esquerda: estável', sp({ region: 'left', poles: [[-2, 3], [-2, -3], [-5, 0]] }) ],
    [10, 'Algum à direita: instável', sp({ region: 'right', poles: [[-2, 3], [-2, -3], [2, 0]] }) ],
    [11, 'Simples sobre o eixo: marginal', sp({ region: 'axis', poles: [[0, 4], [0, -4], [-4, 0]] }) ],
    [12, 'Atalhos pelos coeficientes', tbl(['Coeficientes', 'Conclusão'], [['sinais diferentes', 'instável'], ['falta potência de s', 'instável ou marginal'], ['todos presentes e positivos', 'use Routh']]) ],
    [13, 'Atalho 1', tbl(['Coeficientes', 'Conclusão'], [['sinais diferentes', 'instável'], ['falta potência de s', 'instável ou marginal'], ['todos presentes e positivos', 'use Routh']], 0) ],
    [14, 'Atalho 2', tbl(['Coeficientes', 'Conclusão'], [['sinais diferentes', 'instável'], ['falta potência de s', 'instável ou marginal'], ['todos presentes e positivos', 'use Routh']], 1) ],
    [15, 'Atalho 3', tbl(['Coeficientes', 'Conclusão'], [['sinais diferentes', 'instável'], ['falta potência de s', 'instável ou marginal'], ['todos presentes e positivos', 'use Routh']], 2) ],
    [16, 'Exceção: 2ª ordem', big('todos positivos = estável', 'só para 1ª e 2ª ordem') ],
    [17, 'Exemplos do slide 19', tbl(['Denominador', 'Por quê', 'Conclusão'], [['s³ + s + 1', 'falta s²', 'não estável'], ['s³ − s² + s + 2', 'coeficiente negativo', 'instável'], ['s(s² + s + 1)', 'polo na origem', 'não estável']]) ],
    [18, 'Erros comuns', warn(['use a malha fechada', 'zeros não definem estabilidade', 'todos positivos só garante até 2ª ordem', 'polo na origem está sobre o eixo']) ],
    [19, 'Malha aberta dada? Feche antes', F('denominador MF = D<sub>G</sub> + N<sub>G</sub>', '<small>e escreva o motivo junto da conclusão</small>') ],
    [20, 'Resumo', sp({ region: 'all' }) ],
    [21, 'Sua vez', row(q('Polos em −1 e ±j2. Classificação?', 'Par simples sobre o eixo, resto à esquerda: marginalmente estável.'), sp({ region: 'all', poles: [[-1, 0], [0, 2], [0, -2]], x: [-4, 3], y: [-4, 4] })) ]
  ];

  /* ===== 14 ===== */
  var R14 = [['s⁴', '1', '3', '5'], ['s³', '2', '4', '0'], ['s²', '1', '5', ''], ['s¹', '−6', '', ''], ['s⁰', '5', '', '']];
  var r14 = function (k, hl, o) { o = o || {}; return routh(R14.map(function (r, i) { return i < k ? r : [r[0], '', '', '']; }), { hl: hl, col: o.col, note: o.note }); };
  VIS['14'] = [
    [0, 'Critério de Routh-Hurwitz', r14(5, null, { col: true }) ],
    [2, 'Detector de sinais', big('polos no SPD = trocas de sinal', 'na primeira coluna') ],
    [3, 'O denominador de malha fechada', F('s⁴ + 2s³ + 3s² + 4s + 5') ],
    [4, '1ª linha: coeficientes pulando um', F('s⁴ + 2s³ + 3s² + 4s + 5') + r14(1, 0) ],
    [5, '2ª linha: os que sobraram', r14(2, 1) ],
    [6, 'Da 3ª linha em diante', F('elemento = ' + fr('(pivô de baixo)·(cima à direita) − (pivô de cima)·(baixo à direita)', 'pivô de baixo')) + r14(2) ],
    [8, 'Linha s²: primeiro elemento', routh([R14[0], R14[1], ['s²', '1', '', ''], ['s¹', '', '', ''], ['s⁰', '', '', '']], { hl: 2, note: '(2·3 − 1·4) / 2 = 1' }) ],
    [9, 'Linha s²: segundo elemento', r14(3, 2, { note: '(2·5 − 1·0) / 2 = 5' }) ],
    [10, 'Linha s¹', r14(4, 3, { note: '(1·4 − 2·5) / 1 = −6' }) ],
    [11, 'Linha s⁰', r14(5, 4) ],
    [12, 'Primeira coluna', r14(5, null, { col: true, note: '1, 2, 1, −6, 5' }) ],
    [13, 'Contando as trocas', r14(5, null, { col: true, note: '1 → −6 (uma) · −6 → 5 (duas)' }) ],
    [14, 'Conclusão: instável, 2 polos no SPD', sp({ region: 'all', poles: [[-1.29, 0.86], [-1.29, -0.86], [0.29, 1.42], [0.29, -1.42]], x: [-3, 2], y: [-2.5, 2.5] }) ],
    [15, 'Dica: escalar uma linha', big('multiplique ou divida uma linha por um positivo', 'os sinais não mudam') ],
    [16, 'Casos especiais', tbl(['Caso', 'O que fazer'], [['zero só no 1º elemento', 'troque por ε > 0'], ['linha inteira de zeros', 'polinômio auxiliar, derive, use a derivada']]) ],
    [17, 'Erros comuns', warn(['usar a malha aberta', 'contar negativos em vez de trocas', 'errar a ordem da conta', 'esquecer o zero que completa a linha']) ],
    [18, 'Feche a malha primeiro', F('G = ' + fr('1000', '(s + 2)(s + 3)(s + 5)'), 'D + N = s³ + 10s² + 31s + 1030') ],
    [19, 'Resumo', bul(['duas primeiras linhas pulando coeficientes', 'produto cruzado ÷ pivô de baixo', 'trocas na 1ª coluna = polos no SPD']) ],
    [20, 'Sua vez', q('1ª coluna: 1, 5, 2, 7. Quantos polos no SPD?', 'Nenhuma troca: zero. Estável.') ]
  ];

  /* ===== 15 ===== */
  var R15 = [['s⁴', '1', '3', 'K'], ['s³', '3', '2', '0'], ['s²', '7/3', 'K', ''], ['s¹', '2 − 9K/7', '', ''], ['s⁰', 'K', '', '']];
  var r15 = function (k, hl, note) { return routh(R15.map(function (r, i) { return i < k ? r : [r[0], '', '', '']; }), { hl: hl, col: k === 5, note: note }); };
  VIS['15'] = [
    [0, 'Routh no projeto: a faixa de K', r15(5) ],
    [2, 'K é o volume do controlador', row(plot({ t: 12, y: [-0.2, 2], c: [{ d: tf([0.5], [1, 3, 3, 2, 0.5], 12), lab: 'K baixo', lp: [9, 1.2] }], label: 'K baixo' }), plot({ t: 12, y: [-0.2, 2], c: [{ d: tf([1.7], [1, 3, 3, 2, 1.7], 12), col: C.bad, lab: 'K alto', lp: [3, 1.8] }], label: 'K alto' })) ],
    [3, 'A ideia', list(['K aparece na 1ª coluna', 'cada elemento > 0 vira uma inequação', 'resposta: interseção de todas']) ],
    [4, 'Questão 3 da lista', F('s⁴ + 3s³ + 3s² + 2s + K') ],
    [5, 'Linha s⁴', r15(1, 0) ],
    [6, 'Linha s³', r15(2, 1) ],
    [7, 'Linha s²', r15(3, 2, '(3·3 − 1·2)/3 = 7/3 · (3K − 0)/3 = K') ],
    [8, 'Linha s¹', r15(4, 3, '(7/3·2 − 3K)/(7/3) = 2 − 9K/7') ],
    [9, 'Linha s⁰', r15(5, 4) ],
    [10, 'As condições', F('2 − 9K/7 > 0 → K < 14/9 ≈ 1,56', 'K > 0') ],
    [11, 'Resposta', big('0 < K < 14/9') ],
    [12, 'No limite: oscila', row(F('K = 14/9 → linha s¹ zera', '7/3·s² + 14/9 = 0', 'ω = √(2/3) ≈ 0,82 rad/s'), plot({ t: 30, y: [-0.3, 1.4], c: [{ d: tf([14 / 9], [1, 3, 3, 2, 14 / 9], 30, 600), col: C.bl }] })) ],
    [13, 'Liga com Ziegler-Nichols', big('ganho crítico K<sub>u</sub> + período P<sub>u</sub>', 'episódio 18') ],
    [14, 'Exemplos do slide', tbl(['G(s)', 'Faixa estável'], [['K / (s(s + 7)(s + 11))', '0 < K < 1386'], ['K / (s(s + 1)²)', '0 < K < 2']]) + '<p class="vnote">“1.386” no slide é ponto de milhar</p>' ],
    [15, 'Erros comuns', warn(['esquecer K > 0', 'inverter a inequação ao dividir por negativo', 'usar a malha aberta', 'ler errado o ponto de milhar']) ],
    [16, 'No seu projeto', list(['Tabela com o ganho', 'K que zera a linha s¹', 'Frequência pela linha s²']) ],
    [17, 'Resumo', bul(['tabela com K', 'tudo positivo, interseção', 'no limite: linha s² dá a frequência']) ],
    [18, 'Sua vez', q('s³ + 6s² + 11s + 6 + K. Qual o K crítico?', 'Linha s¹: (66 − 6 − K)/6 = 0 → K = 60.') ]
  ];

  /* ===== 16 ===== */
  var ramp = function (t) { return t; };
  VIS['16'] = [
    [0, 'Erro em regime permanente', plot({ t: 5, y: [0, 1.2], h1: [[1, 'R']], c: [{ f: function (t) { return 0.8 * (1 - e(-1.5 * t)); } }], seg: [[4.4, 0.8, 4.4, 1]], ann: [[4.1, 0.9, 'e(∞)', C.bl, 'end']] }) ],
    [2, 'Depois que tudo se acalmou', F('e(∞) = lim<sub>t→∞</sub> [r(t) − c(t)]') + plot({ t: 5, y: [0, 1.2], h1: [[1, 'R']], c: [{ f: function (t) { return 0.8 * (1 - e(-1.5 * t)); } }], seg: [[4.4, 0.8, 4.4, 1]] }) ],
    [3, 'Seguindo outro carro', row(plot({ t: 5, y: [0, 1.2], h1: [[1, 'parado']], c: [{ f: function (t) { return 1 - e(-1.5 * t); } }], label: 'degrau' }), plot({ t: 5, y: [0, 5.5], c: [{ f: ramp, col: '#888', lab: 'carro da frente', lp: [3, 3.3] }, { f: function (t) { return Math.max(0, t - 0.8 + 0.8 * e(-t / 0.8)); }, lab: 'fica atrás', lp: [4.3, 3.1] }], label: 'rampa' })) ],
    [4, 'Tipo = polos na origem da malha aberta', row(sp({ poles: [[0, 0], [-3, 0]], x: [-5, 2], y: [-3, 3], labels: [[0, 1.2, '1/s']] }), F('cada 1/s é um integrador', 'tipo ≠ ordem')) ],
    [5, 'Duas fórmulas', F('dada T: E = R(1 − T), e(∞) = lim<sub>s→0</sub> sE(s)', 'dada G: e(∞) = lim<sub>s→0</sub> ' + fr('sR(s)', '1 + G(s)')) ],
    [6, 'Normalizar G', F('cada fator na forma (1 + s/a)', 'o número que sobra na frente é G<sub>N</sub>') ],
    [7, 'Degrau', tbl(['Entrada', 'Tipo 0', 'Tipo 1', 'Tipo 2'], [['degrau', fr('1', '1 + G<sub>N</sub>'), '0', '0'], ['rampa', '∞', fr('1', 'G<sub>N</sub>'), '0'], ['parábola', '∞', '∞', fr('1', 'G<sub>N</sub>')]], 0) ],
    [8, 'Rampa', tbl(['Entrada', 'Tipo 0', 'Tipo 1', 'Tipo 2'], [['degrau', fr('1', '1 + G<sub>N</sub>'), '0', '0'], ['rampa', '∞', fr('1', 'G<sub>N</sub>'), '0'], ['parábola', '∞', '∞', fr('1', 'G<sub>N</sub>')]], 1) ],
    [9, 'Parábola', tbl(['Entrada', 'Tipo 0', 'Tipo 1', 'Tipo 2'], [['degrau', fr('1', '1 + G<sub>N</sub>'), '0', '0'], ['rampa', '∞', fr('1', 'G<sub>N</sub>'), '0'], ['parábola', '∞', '∞', fr('1', 'G<sub>N</sub>')]], 2) ],
    [10, 'Nomes do livro', F('G<sub>N</sub> = K<sub>p</sub>, K<sub>v</sub> ou K<sub>a</sub>') ],
    [11, 'Exemplo do slide', row(F('T = ' + fr('5', 's² + 7s + 10'), 'T(0) = 1/2 → <b>e = 0,5</b>'), plot({ t: 4, y: [0, 1.15], h1: [[1, '1']], c: [{ d: tf([5], [1, 7, 10], 4) }], seg: [[3.6, 0.5, 3.6, 1]] })) ],
    [12, 'Questão 6: rampa', F('1 − T = ' + fr('s² + 2s + 9', 's² + 3s + 10'), 'e(∞) = lim ' + fr('s² + 2s + 9', 's(s² + 3s + 10)') + ' = 9/0 → <b>∞</b>') ],
    [13, 'Alerta: estabilidade antes de tudo', row(F('s³ + 3s² + 2s + 15', '3·2 = 6 < 15 → instável', 'o “erro zero” é falso'), plot({ t: 8, y: [-3, 4], c: [{ d: tf([15], [1, 3, 2, 15], 8), col: C.bad }] })) ],
    [14, 'Resumo', bul(['tipo = integradores da malha aberta', 'tabela 3 × 3', 'cheque a estabilidade primeiro']) ],
    [15, 'Sua vez', q('20/((s + 1)(s + 4)), realimentação unitária, degrau. Erro?', 'Tipo 0, G<sub>N</sub> = 5, erro = 1/6.') ]
  ];

  /* ===== 17 ===== */
  var trio = function (hl) { return chips(['P · presente', 'I · passado', 'D · futuro'], hl); };
  var fx = tf([2], [1, 2, 2 + 2], 6);
  var eff = function (hl) { return tbl(['Aumentar', 'Subida', 'Ultrapassagem', 'Acomodação', 'Erro'], [['K<sub>p</sub>', '↓', '↑', 'pouco', '↓'], ['K<sub>i</sub>', '↓', '↑', '↑', 'zera'], ['K<sub>d</sub>', 'pouco ↓', '↓', '↓', 'pouco']], hl); };
  VIS['17'] = [
    [0, 'Ações de controle', trio(null) ],
    [2, 'Mantendo o carro no centro da faixa', trio(null) ],
    [3, 'Proporcional: o presente', trio(0) ],
    [4, 'Integral: o passado', trio(1) ],
    [5, 'Derivativa: a tendência', trio(2) ],
    [6, 'Liga-desliga', plot({ t: 10, y: [0, 1.4], h1: [[1, 'ref']], c: [{ f: function (t) { return t < 2 ? t / 2 : 1 + 0.12 * Math.sin(2.2 * (t - 2)); }, col: C.bl }] }) + '<p class="vnote">oscila em torno da referência (geladeira)</p>' ],
    [7, 'P: sobra um off-set', plot({ t: 6, y: [0, 1.2], h1: [[1, 'ref']], c: [{ d: fx }], seg: [[5.5, 0.5, 5.5, 1]], ann: [[5.3, 0.75, 'off-set', C.bl, 'end']] }) ],
    [8, 'I: elimina o off-set', plot({ t: 6, y: [0, 1.4], h1: [[1, 'ref']], c: [{ d: tf([2, 2], [1, 2, 4, 2], 6) }] }) + '<p class="vnote">mas não reduz o pico; K<sub>i</sub> alto oscila</p>' ],
    [9, 'D: antecipa e reduz o pico', plot({ t: 4, y: [0, 1.5], h1: [[1, '']], c: [{ d: tf([9], [1, 1, 10], 4), col: '#888', lab: 'sem D', lp: [0.8, 1.42] }, { d: tf([3, 9], [1, 4, 10], 4), lab: 'com D', lp: [2.4, 0.98] }] }) + '<p class="vnote">amplifica ruído</p>' ],
    [10, 'Tabela de efeitos', eff(null) ],
    [11, 'Aumentar K<sub>p</sub>', eff(0) ],
    [12, 'Aumentar K<sub>i</sub>', eff(1) ],
    [13, 'Aumentar K<sub>d</sub>', eff(2) ],
    [14, 'É tendência', big('o efeito real depende da planta') ],
    [15, 'As fórmulas do PID', F('C(s) = K<sub>p</sub> + ' + fr('K<sub>i</sub>', 's') + ' + K<sub>d</sub>s', 'C(s) = K<sub>p</sub>(1 + ' + fr('1', 'T<sub>i</sub>s') + ' + T<sub>d</sub>s)', 'K<sub>i</sub> = K<sub>p</sub>/T<sub>i</sub> · K<sub>d</sub> = K<sub>p</sub>T<sub>d</sub>', '<small>2 zeros + 1 polo na origem (tipo +1)</small>') ],
    [16, 'Erros comuns', warn(['quem elimina o erro é o I, não o D', 'mais K<sub>p</sub> nem sempre melhora', 'T<sub>i</sub> maior = ação integral menor']) ],
    [17, 'Resumo', trio(null) + bul(['I elimina o erro', 'D reduz o pico e sofre com ruído']) ],
    [18, 'Sua vez', q('K<sub>p</sub> = 6 e T<sub>i</sub> = 2 s. Quanto vale K<sub>i</sub>?', '6/2 = 3') ]
  ];

  /* ===== 18 ===== */
  var scurve = function (t) { return 1 - e(-t) * (1 + t + t * t / 2); };
  var zn2 = (function () { /* T = C·G/(1 + C·G), C = Kp(TdTi s² + Ti s + 1)/(Ti s), G = 1/((s+1)(s+2)(s+3)) */
    var Kp = 36, Ti = 0.945, Td = 0.236;
    var num = [Kp * Td * Ti, Kp * Ti, Kp];
    var den = [Ti, 6 * Ti, 11 * Ti, 6 * Ti, 0];
    den = [den[0], den[1], den[2] + num[0], den[3] + num[1], den[4] + num[2]];
    return tf(num, den, 6, 500);
  })();
  VIS['18'] = [
    [0, 'Sintonia por Ziegler-Nichols', big('tabela empírica = ponto de partida', 'depois, ajuste fino') ],
    [2, 'A receita de bolo da avó', big('funciona na maioria das cozinhas', 'mas você ainda prova e ajusta') ],
    [3, 'Método 1: curva de reação (malha aberta)', plot({ t: 10, y: [0, 1.15], h1: [[1, 'C']], c: [{ f: scurve }], lines: [[0.807, 0, 4.501, 1, C.bl, 1.4, '4 3']], v1: [[0.807, 'L', C.bl], [4.501, 'L + T', C.bl]], pts: [[2, scurve(2), 'inflexão', C.bl]] }) + F('R = C / T') ],
    [4, 'Tabela do método 1', tbl(['', 'K<sub>p</sub>', 'T<sub>i</sub>', 'T<sub>d</sub>'], [['P', fr('1', 'RL'), '—', '—'], ['PI', fr('0,9', 'RL'), 'L / 0,3', '—'], ['PID', fr('1,2', 'RL'), '2L', '0,5L']], 2) ],
    [5, 'Só para curva em S', warn(['planta que oscila: não serve', 'planta com integrador: não serve']) ],
    [6, 'Método 2: oscilação (malha fechada)', plot({ t: 6, y: [-0.2, 2.1], c: [{ d: tf([60], [1, 6, 11, 66], 6, 600), col: C.bl }], seg: [[1.85, 1.95, 3.74, 1.95]], ann: [[2.8, 1.85, 'P<tspan baseline-shift="sub" font-size="9">u</tspan>', C.bl]] }) + F('só P, aumente até oscilar constante: K<sub>u</sub>') ],
    [7, 'Tabela do método 2', tbl(['', 'K<sub>p</sub>', 'T<sub>i</sub>', 'T<sub>d</sub>'], [['P', '0,5K<sub>u</sub>', '—', '—'], ['PI', '0,45K<sub>u</sub>', 'P<sub>u</sub>/1,2', '—'], ['PID', '0,6K<sub>u</sub>', 'P<sub>u</sub>/2', 'P<sub>u</sub>/8']], 2) ],
    [8, 'K<sub>u</sub> e P<sub>u</sub> pelo Routh', F('s³ + 6s² + 11s + 6 + K<sub>p</sub>', 'linha s¹ zera em K<sub>u</sub> = 60', '6s² + 66 = 0 → ω = √11 ≈ 3,32 rad/s', 'P<sub>u</sub> = 2π/ω ≈ 1,89 s') ],
    [9, 'Ganhos do PID', tbl(['', 'Conta', 'Valor'], [['K<sub>p</sub>', '0,6 × 60', '36'], ['T<sub>i</sub>', '1,89 / 2', '0,95 s'], ['T<sub>d</sub>', '1,89 / 8', '0,24 s']]) ],
    [10, 'Simulação: erro zero, pico alto', plot({ t: 6, y: [0, 1.6], h1: [[1, '1']], c: [{ d: zn2 }] }) + '<p class="vnote">ultrapassagem perto de 44%, típico de Ziegler-Nichols</p>' ],
    [11, 'Por que o ajuste fino', bul(['tabelas empíricas: 1ª aproximação', 'tendem a ultrapassagem alta', 'ajuste fino atende as especificações reais']) ],
    [12, 'Erros comuns', warn(['método 1 sem curva em S', 'trocar T<sub>i</sub> com K<sub>i</sub>', 'P<sub>u</sub> = 2π/ω, não ω', 'L vai até onde a tangente corta o eixo']) ],
    [13, 'Resumo', tbl(['Método', 'Lê', 'PID'], [['1: curva em S', 'L e T', '1,2/RL · 2L · 0,5L'], ['2: limite de estabilidade', 'K<sub>u</sub> e P<sub>u</sub>', '0,6K<sub>u</sub> · P<sub>u</sub>/2 · P<sub>u</sub>/8']]) ],
    [14, 'Sua vez', q('K<sub>u</sub> = 20 e P<sub>u</sub> = 4 s. Ganhos de um PI?', 'K<sub>p</sub> = 0,45 × 20 = 9. T<sub>i</sub> = 4/1,2 ≈ 3,3 s.') ]
  ];

  window.VIS = VIS;
})();
