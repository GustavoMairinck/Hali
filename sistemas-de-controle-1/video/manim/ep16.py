"""Cenas Manim do episódio 16 (erro em regime permanente)."""
from common import *

P, S = load('16')


def car(col, w=1.3):
    body = RoundedRectangle(width=w, height=.42, corner_radius=.12, color=col, fill_color=col, fill_opacity=1, stroke_width=0)
    top = RoundedRectangle(width=w * .55, height=.3, corner_radius=.1, color=col, fill_color=col, fill_opacity=1, stroke_width=0).next_to(body, UP, buff=-.05).shift(LEFT * w * .08)
    wl = [Circle(radius=.13, color=BG, fill_color='#222222', fill_opacity=1, stroke_width=3).move_to(body.get_bottom() + np.array([dx * w, 0, 0])) for dx in (-.28, .28)]
    return VGroup(top, body, *wl)


def gap(a, b, y, col, label):
    """colchete de erro entre a traseira do carro da frente (b) e a frente do seguidor (a)."""
    ln = DoubleArrow([a, y, 0], [b, y, 0], buff=0, color=col, stroke_width=4, tip_length=.14, max_tip_length_to_length_ratio=.4)
    t = txt(label, 24, col).next_to(ln, UP, buff=.06)
    return VGroup(ln, t)


class Ep16Carros(Timed):
    """Parágrafo 3: seguir um carro parado (degrau) e um carro andando (rampa)."""
    T0 = P[3][0]
    def construct(self):
        W = 1.7
        y1, y2, y3 = 2.15, -.35, -2.75
        road = lambda y: Line([-8.4, y - .5, 0], [8.4, y - .5, 0], color=AXIS, stroke_width=3)
        l1 = txt('carro da frente parado (degrau)', 28, MU).move_to([0, y1 + 1.2, 0]).to_edge(LEFT, buff=.6)
        l2 = txt('carro da frente andando (rampa)', 28, MU).move_to([0, y2 + 1.25, 0]).to_edge(LEFT, buff=.6)
        lead1 = car(MU, W).move_to([5.8, y1, 0])
        self.play(Create(road(y1)), run_time=.6)
        self.play(FadeIn(l1), FadeIn(lead1), run_time=.6)
        # degrau: um motorista para antes, outro encosta
        self.wait_until(P[3][1])
        fa = car(Y, W).move_to([-7.4, y1, 0])
        self.add(fa)
        self.play(fa.animate.move_to([2.9, y1, 0]), run_time=3.0, rate_func=rate_functions.ease_out_cubic)
        g1 = gap(fa.get_right()[0] + .05, lead1.get_left()[0] - .05, y1 + .7, Y, 'erro')
        self.play(FadeIn(g1), run_time=.4)
        self.wait_until(P[3][2])
        fb = car(BL, W).move_to([-7.4, y1, 0])
        self.add(fb)
        self.play(FadeOut(g1), fa.animate.set_opacity(.22), fb.animate.move_to([lead1.get_left()[0] - W / 2 - .06, y1, 0]), run_time=1.6, rate_func=rate_functions.ease_out_cubic)
        z = txt('outro motorista encosta: erro 0', 26, BL).next_to(fb, UP, buff=.25).shift(LEFT * 1.2)
        self.play(FadeIn(z), run_time=.4)
        # rampa: o carro da frente anda; um seguidor fica a distância constante, outro vai ficando para trás
        self.wait_until(P[3][3])
        self.play(FadeIn(l2), Create(road(y2)), Create(road(y3)), run_time=.6)
        u = ValueTracker(0.0)
        v = 1.3
        lx = lambda: -2.6 + v * u.get_value()
        pa = lambda: lx() - 2.6
        pb = lambda: lx() - 2.6 - .38 * u.get_value() ** 1.3
        la = always_redraw(lambda: car(MU, W).move_to([lx(), y2, 0]))
        lb = always_redraw(lambda: car(MU, W).move_to([lx(), y3, 0]))
        ca = always_redraw(lambda: car(BL, W).move_to([pa(), y2, 0]))
        cb = always_redraw(lambda: car(BAD, W).move_to([pb(), y3, 0]))
        ga = always_redraw(lambda: gap(pa() + W / 2 + .05, lx() - W / 2 - .05, y2 + .7, BL, 'erro constante'))
        gb = always_redraw(lambda: gap(pb() + W / 2 + .05, lx() - W / 2 - .05, y3 + .7, BAD, 'erro cresce'))
        self.play(FadeIn(la), FadeIn(lb), FadeIn(ca), FadeIn(cb), run_time=.4)
        self.add(ga, gb)
        self.play(u.animate.set_value(6.4), run_time=7.4, rate_func=linear)
        self.wait_until(P[4][0] - .1)


class Ep16Tipo(Timed):
    """Parágrafo 4: tipo = polos na origem da malha aberta; integrador; tipo não é ordem."""
    T0 = P[4][0]
    def construct(self):
        # G(s) com dois fatores s em evidência
        self.wait_until(P[4][1])
        n = txt('10', 52, TX)
        d = VGroup(txt('s', 52, Y), txt('·', 52, TX), txt('s', 52, Y), txt('(s + 3)', 52, TX)).arrange(RIGHT, buff=.15)
        bar = Line(LEFT, RIGHT, color=TX, stroke_width=3).set_width(d.width + .3)
        G = VGroup(txt('G(s) =', 52, TX), VGroup(n, bar, d).arrange(DOWN, buff=.15)).arrange(RIGHT, buff=.3).move_to([-4.4, 2.0, 0])
        self.play(Write(G), run_time=1.2)
        b1 = SurroundingRectangle(d[0], color=Y, buff=.08, corner_radius=.06); b2 = SurroundingRectangle(d[2], color=Y, buff=.08, corner_radius=.06)
        tp = txt('2 polos na origem → tipo 2', 38, Y, 'SEMIBOLD').next_to(G, DOWN, buff=.5)
        self.play(Create(b1), run_time=.4)
        self.play(Create(b2), run_time=.4)
        self.play(FadeIn(tp, shift=UP * .2), run_time=.5)
        # integrador: acumula o erro
        self.wait_until(P[4][2])
        blk = RoundedRectangle(width=1.4, height=1.0, corner_radius=.12, color=Y, stroke_width=4).move_to([4.2, 2.3, 0])
        bl = txt('1/s', 40, Y).move_to(blk)
        ai = Arrow(blk.get_left() + LEFT * 2.3, blk.get_left(), buff=0, color=TX, stroke_width=4)
        ao = Arrow(blk.get_right(), blk.get_right() + RIGHT * 2.3, buff=0, color=TX, stroke_width=4)
        ei = txt('erro', 26, MU).next_to(ai, UP, buff=.12); eo = txt('correção', 26, MU).next_to(ao, UP, buff=.12)
        self.play(Create(blk), Write(bl), GrowArrow(ai), GrowArrow(ao), FadeIn(ei), FadeIn(eo), run_time=1)
        ga = Axes(x_range=[0, 4, 1], y_range=[0, 4, 1], x_length=2.0, y_length=1.5, axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False)
        gi = ga.copy().next_to(ai, DOWN, buff=.35); go = ga.copy().next_to(ao, DOWN, buff=.35)
        ci = gi.plot(lambda t: 1, x_range=[0, 4], color=TX, stroke_width=4)
        co = go.plot(lambda t: t * .95, x_range=[0, 4], color=Y, stroke_width=4)
        self.play(Create(gi), Create(go), run_time=.5)
        self.play(Create(ci), Create(co), run_time=1.6, rate_func=linear)
        acc = txt('erro constante → correção que cresce', 26, MU).next_to(VGroup(gi, go), DOWN, buff=.25)
        self.play(FadeIn(acc), run_time=.5)
        # mais integradores, mais entradas sem erro
        self.wait_until(P[4][3])
        rows = VGroup(*[txt(s, 32, c) for s, c in [('tipo 0 → segue degrau com erro', MU), ('tipo 1 → degrau sem erro', TX), ('tipo 2 → também a rampa sem erro', Y)]]).arrange(DOWN, buff=.25, aligned_edge=LEFT).move_to([-4.0, -2.2, 0])
        self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * .3) for r in rows], lag_ratio=.4), run_time=1.6)
        # tipo não é ordem
        self.wait_until(P[4][4])
        self.play(*[FadeOut(m) for m in [blk, bl, ai, ao, ei, eo, gi, go, ci, co, acc]], run_time=.5)
        w1 = txt('tipo ≠ ordem', 44, BAD, 'SEMIBOLD').move_to([0, 1.9, 0]).align_to(np.array([.9, 0, 0]), LEFT)
        self.play(Write(w1), run_time=.7)
        self.wait_until(P[4][5])
        o1 = txt('tipo: 2 (fatores s puros)', 30, Y).next_to(w1, DOWN, buff=.5, aligned_edge=LEFT)
        o2 = txt('ordem: 3 (grau do denominador)', 30, TX).next_to(o1, DOWN, buff=.25, aligned_edge=LEFT)
        deg = SurroundingRectangle(d, color=TX, buff=.1, corner_radius=.08)
        self.play(FadeIn(o1), run_time=.5)
        self.play(FadeIn(o2), Create(deg), run_time=.7)
        self.wait_until(P[5][0] - .1)


class Ep16Tabela(Timed):
    """Parágrafos 7 a 9: a tabela 3 × 3 montada célula a célula."""
    T0 = P[7][0]
    def construct(self):
        cx = [-5.2, -1.4, 1.9, 5.2]
        ry = [2.55, 1.05, -.75, -2.55]
        heads = VGroup(*[txt(h, 36, Y, 'SEMIBOLD').move_to([cx[i + 1], ry[0], 0]) for i, h in enumerate(['tipo 0', 'tipo 1', 'tipo 2'])])
        hl = Line([-7.6, ry[0] - .55, 0], [7.2, ry[0] - .55, 0], color=AXIS, stroke_width=3)
        vl = Line([cx[0] + 1.7, ry[0] + .4, 0], [cx[0] + 1.7, ry[3] - .8, 0], color=AXIS, stroke_width=3)
        # mini-gráficos de cada entrada
        def mini(f, name):
            ax = Axes(x_range=[0, 1, 1], y_range=[0, 1, 1], x_length=1.2, y_length=.9, axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False)
            c = ax.plot(f, x_range=[0, 1, .02], color=BL, stroke_width=4)
            return VGroup(VGroup(ax, c), txt(name, 28, TX)).arrange(RIGHT, buff=.25)
        ins = [mini(lambda t: .8 if t > .08 else 0, 'degrau'), mini(lambda t: .9 * t, 'rampa'), mini(lambda t: .9 * t * t, 'parábola')]
        for m, y in zip(ins, ry[1:]):
            m.move_to([cx[0] - .3, y, 0])
        self.play(Create(hl), Create(vl), FadeIn(heads), run_time=.7)
        val = [[('1/(1 + GN)', TX), ('0', Y), ('0', Y)], [('∞', BAD), ('1/GN', TX), ('0', Y)], [('∞', BAD), ('∞', BAD), ('1/GN', TX)]]
        V = [[MarkupText(s.replace('GN', 'G<sub>N</sub>'), font=FONT, font_size=50, color=c).move_to([cx[j + 1], ry[i + 1], 0]) for j, (s, c) in enumerate(r)] for i, r in enumerate(val)]
        def show(*ij, rt=.6):
            self.play(*[FadeIn(V[i][j], scale=1.3) for i, j in ij], *[Indicate(heads[j], color=WHITE, scale_factor=1.1) for i, j in ij], run_time=rt)
        # degrau
        self.play(FadeIn(ins[0], shift=RIGHT * .3), run_time=.5)
        show((0, 0))
        self.wait_until(P[7][1])
        show((0, 1), (0, 2))
        # rampa
        self.wait_until(P[8][0])
        self.play(FadeIn(ins[1], shift=RIGHT * .3), run_time=.5)
        show((1, 0))
        self.wait_until(P[8][1]); show((1, 1))
        self.wait_until(P[8][2]); show((1, 2))
        # parábola
        self.wait_until(P[9][0])
        self.play(FadeIn(ins[2], shift=RIGHT * .3), run_time=.5)
        show((2, 0), (2, 1))
        self.wait_until(P[9][1]); show((2, 2))
        diag = VGroup(*[SurroundingRectangle(V[k][k], color=BL, buff=.14, corner_radius=.08) for k in range(3)])
        self.play(Create(diag), run_time=.8)
        dl = txt('na diagonal: erro finito', 28, BL).move_to([3.6, -3.55, 0])
        self.play(FadeIn(dl), run_time=.4)
        self.wait_until(P[10][0] - .1)


class Ep16Alerta(Timed):
    """Parágrafo 13: o valor final só vale para sistema estável."""
    T0 = P[13][0]
    def construct(self):
        self.wait_until(P[13][1])
        h = txt('teorema do valor final: só se o sistema for estável', 36, BAD, 'SEMIBOLD').to_edge(UP, buff=.4)
        self.play(Write(h), run_time=1.2)
        self.wait_until(P[13][3])
        q5 = txt('questão 5 da lista', 26, BL).to_corner(DL, buff=.5)
        poly = txt('s³ + 3s² + 2s + 15', 48, TX).move_to([-4.2, 1.6, 0])
        self.play(FadeIn(q5), Write(poly), run_time=1.2)
        self.wait_until(P[13][4])
        r1 = txt('3 · 2 = 6', 44, TX).next_to(poly, DOWN, buff=.55)
        r2 = txt('6 < 15', 44, BAD, 'SEMIBOLD').next_to(r1, DOWN, buff=.3)
        rule = txt('3ª ordem só é estável se 3·2 > 15', 26, MU).next_to(r2, DOWN, buff=.35)
        self.play(Write(r1), run_time=.6)
        self.play(Write(r2), FadeIn(rule), run_time=.6)
        self.wait_until(P[13][5])
        ins = txt('instável', 50, BAD, 'SEMIBOLD').next_to(rule, DOWN, buff=.35)
        self.play(FadeIn(ins, scale=1.3), run_time=.5)
        # o "erro zero" é falso: a saída não se acomoda
        self.wait_until(P[13][6])
        g = Axes(x_range=[0, 6, 1], y_range=[-3, 6, 1], x_length=6.6, y_length=4.6,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([3.9, -.4, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(6, 1), color=MU, stroke_width=2)
        rl = txt('entrada', 24, MU).next_to(g.c2p(0, 1), LEFT, buff=.12)
        t, y = step_resp([15], [1, 3, 2, 15], T=6, n=300)
        yc = np.clip(y, -3, 6)
        c = g.plot_line_graph(t, yc, add_vertex_dots=False, line_color=BAD, stroke_width=5)
        fake = txt('“erro = 0”', 40, TX).move_to([3.9, 2.45, 0])
        self.play(FadeIn(fake), run_time=.4)
        cross = Line(fake.get_left() + LEFT * .1, fake.get_right() + RIGHT * .1, color=BAD, stroke_width=6)
        self.play(Create(cross), Create(g), FadeIn(ref), FadeIn(rl), run_time=.6)
        self.play(Create(c), run_time=2.4, rate_func=linear)
        self.wait_until(P[13][7])
        box = SurroundingRectangle(VGroup(poly, ins), color=Y, buff=.3, corner_radius=.12)
        ck = txt('cheque a estabilidade primeiro', 32, Y, 'SEMIBOLD').next_to(box, DOWN, buff=.2)
        self.play(Create(box), FadeOut(q5), FadeIn(ck), run_time=.8)
        self.wait_until(P[14][0] - .1)
