"""Cenas Manim do episódio 17 (ações de controle)."""
from common import *

P, S = load('17')


def chip(s, col):
    t = txt(s, 30, col, 'SEMIBOLD')
    return VGroup(RoundedRectangle(width=t.width + .5, height=.62, corner_radius=.31, color=col, stroke_width=3, fill_color=col, fill_opacity=.12), t)


def plot_axes(w=7.6, h=4.2, T=10, yr=(0, 1.4)):
    return Axes(x_range=[0, T, 1], y_range=[yr[0], yr[1], .5], x_length=w, y_length=h,
                axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False)


def curve(g, num, den, T, col, n=500, w=5):
    t, y = step_resp(num, den, T=T, n=n)
    lo, hi = g.y_range[0], g.y_range[1]
    return g.plot_line_graph(t, np.clip(y, lo, hi), add_vertex_dots=False, line_color=col, stroke_width=w)


class Ep17Faixa(Timed):
    """Parágrafos 2 a 5: manter o carro no centro da faixa; P presente, I passado, D futuro."""
    T0 = P[2][0]
    def construct(self):
        x0, x1 = -8.4, .6
        band = Rectangle(width=x1 - x0, height=3.2, color=AXIS, fill_color='#1a1a1a', fill_opacity=1, stroke_width=0).move_to([(x0 + x1) / 2, -.3, 0])
        edges = VGroup(Line([x0, 1.3, 0], [x1, 1.3, 0], color=TX, stroke_width=4), Line([x0, -1.9, 0], [x1, -1.9, 0], color=TX, stroke_width=4))
        off = ValueTracker(0.0)
        def center():
            o = off.get_value() % 1.2
            return VGroup(*[Line([x0 + k * 1.2 - o, -.3, 0], [x0 + k * 1.2 - o + .6, -.3, 0], color=Y, stroke_width=4) for k in range(8) if x0 + k * 1.2 - o + .6 < x1 and x0 + k * 1.2 - o > x0 - .1])
        cl = always_redraw(center)
        lat = ValueTracker(0.0)
        CX = -4.0
        def carv():
            y = -.3 + lat.get_value()
            body = RoundedRectangle(width=1.3, height=.62, corner_radius=.15, color=BL, fill_color=BL, fill_opacity=1, stroke_width=0).move_to([CX, y, 0])
            glass = RoundedRectangle(width=.36, height=.48, corner_radius=.08, color=BG, fill_color='#0f2a3d', fill_opacity=1, stroke_width=0).move_to([CX + .25, y, 0])
            return VGroup(body, glass)
        cr = always_redraw(carv)
        def err():
            y = -.3 + lat.get_value()
            if abs(lat.get_value()) < .08:
                return VGroup()
            a = DoubleArrow([CX - 1.0, -.3, 0], [CX - 1.0, y, 0], buff=0, color=BAD, stroke_width=4, tip_length=.14, max_tip_length_to_length_ratio=.4)
            return VGroup(a, txt('erro', 24, BAD).next_to(a, LEFT, buff=.1))
        er = always_redraw(err)
        self.play(FadeIn(band), Create(edges), run_time=.8)
        self.add(cl)
        self.play(FadeIn(cr), off.animate.increment_value(1.2), run_time=.8, rate_func=linear)
        self.add(er)
        scroll = lambda d: off.animate(rate_func=linear).increment_value(d * 2.4)
        self.play(scroll(1.6), lat.animate(rate_func=smooth).set_value(1.15), run_time=1.6)

        # painel da direita
        px = 1.0
        def steer(mag, col):
            """seta de correção do volante, tamanho proporcional à ação."""
            y = -.3 + lat.get_value()
            if mag < .05:
                return VGroup()
            return Arrow([CX + .9, y, 0], [CX + .9, y - min(mag, 1.6), 0], buff=0, color=col, stroke_width=6, max_tip_length_to_length_ratio=.35)

        # P: proporcional ao erro agora
        self.wait_until(P[3][0])
        h = VGroup(txt('P', 64, Y, 'BOLD'), VGroup(txt('vira o volante na proporção', 27, TX), txt('do erro de agora', 27, TX)).arrange(DOWN, buff=.12, aligned_edge=LEFT)).arrange(RIGHT, buff=.4).move_to([0, 2.5, 0]).align_to(np.array([px, 0, 0]), LEFT)
        st = always_redraw(lambda: steer(1.2 * lat.get_value(), Y))
        self.play(FadeIn(h, shift=LEFT * .2), run_time=.6)
        self.add(st)
        self.play(scroll(2.5), lat.animate(rate_func=smooth).set_value(.3), run_time=2.5)
        self.play(scroll(1.0), lat.animate(rate_func=smooth).set_value(.7), run_time=1.0)
        self.wait_until(P[3][1])
        c1 = chip('P · presente', Y).move_to([0, -2.9, 0]).align_to(np.array([-8.0, 0, 0]), LEFT)
        self.play(FadeIn(c1, scale=1.2), scroll(.8), run_time=.8)
        self.remove(st)

        # I: soma do erro ao longo do tempo
        self.wait_until(P[4][0])
        h2 = VGroup(txt('I', 64, Y, 'BOLD'), VGroup(txt('fora do centro há muito tempo:', 27, TX), txt('a correção vai aumentando', 27, TX)).arrange(DOWN, buff=.12, aligned_edge=LEFT)).arrange(RIGHT, buff=.4).move_to(h, aligned_edge=LEFT)
        acc = ValueTracker(0.0)
        bar_bg = Rectangle(width=.7, height=3.0, color=AXIS, stroke_width=2).move_to([px + .5, -.4, 0])
        bar = always_redraw(lambda: Rectangle(width=.7, height=max(.01, 3.0 * min(acc.get_value(), 1)), color=Y, fill_color=Y, fill_opacity=.8, stroke_width=0).align_to(bar_bg, DOWN).align_to(bar_bg, LEFT))
        bl = txt('soma do erro', 26, MU).next_to(bar_bg, RIGHT, buff=.3)
        st2 = always_redraw(lambda: steer(1.4 * acc.get_value(), Y))
        self.play(FadeOut(h), FadeIn(h2), FadeIn(bar_bg), FadeIn(bl), scroll(.6), lat.animate.set_value(.5), run_time=.6)
        self.add(bar, st2)
        self.play(scroll(3.0), acc.animate(rate_func=linear).set_value(.75), run_time=3.0)
        self.play(scroll(1.4), acc.animate(rate_func=linear).set_value(.9), lat.animate(rate_func=smooth).set_value(0), run_time=1.4)
        self.wait_until(P[4][1])
        c2 = chip('I · passado', Y).next_to(c1, RIGHT, buff=.3)
        self.play(FadeIn(c2, scale=1.2), scroll(.8), run_time=.8)
        self.remove(st2)

        # D: tendência, corrige antes
        self.wait_until(P[5][0])
        h3 = VGroup(txt('D', 64, Y, 'BOLD'), VGroup(txt('se afastando rápido:', 27, TX), txt('corrige antes', 27, TX)).arrange(DOWN, buff=.12, aligned_edge=LEFT)).arrange(RIGHT, buff=.4).move_to(h, aligned_edge=LEFT)
        vel = always_redraw(lambda: Arrow([CX + .2, -.3 + lat.get_value() + .35, 0], [CX + .2, -.3 + lat.get_value() + 1.2, 0], buff=0, color=BL, stroke_width=6, max_tip_length_to_length_ratio=.3))
        vl = txt('velocidade do erro', 26, BL).move_to([px + 2.6, .6, 0]).align_to(np.array([px, 0, 0]), LEFT)
        self.play(FadeOut(h2), FadeOut(bar), FadeOut(bar_bg), FadeOut(bl), FadeIn(h3), scroll(.6), run_time=.6)
        self.add(vel)
        self.play(FadeIn(vl), scroll(1.0), lat.animate(rate_func=rate_functions.ease_in_quad).set_value(.45), run_time=1.0)
        st3 = Arrow([CX + .9, .05, 0], [CX + .9, -1.25, 0], buff=0, color=Y, stroke_width=6, max_tip_length_to_length_ratio=.35)
        el = VGroup(txt('o erro ainda é pequeno,', 28, Y), txt('mas já corrige', 28, Y)).arrange(DOWN, buff=.1, aligned_edge=LEFT).next_to(vl, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(GrowArrow(st3), FadeIn(el), scroll(.8), run_time=.8)
        self.remove(vel)
        self.play(FadeOut(st3), scroll(1.6), lat.animate(rate_func=smooth).set_value(0), run_time=1.6)
        self.wait_until(P[5][1])
        c3 = chip('D · futuro', Y).next_to(c2, RIGHT, buff=.3)
        self.play(FadeIn(c3, scale=1.2), scroll(.8), run_time=.8)
        rest = P[6][0] - .1 - self.now()
        if rest > .1:
            self.play(scroll(rest * .6), run_time=rest)


class Ep17Liga(Timed):
    """Parágrafo 6: liga-desliga, dois estados, oscila em torno da referência."""
    T0 = P[6][0]
    def construct(self):
        g = plot_axes(w=7.4, h=3.4, T=20, yr=(0, 1.5)).move_to([-2.9, 1.0, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(20, 1), color=MU, stroke_width=2)
        rl = txt('tracejado = referência', 22, MU).next_to(g, UP, buff=.12).align_to(g, RIGHT)
        yl = txt('temperatura', 26, MU).next_to(g, UP, buff=.12).align_to(g, LEFT)
        # simulação simples: aquece quando ligado, esfria quando desligado, com histerese
        dt, y, on = .02, .2, True
        ts, ys, us = [], [], []
        for k in range(1001):
            if y > 1.12: on = False
            if y < .88: on = True
            y += dt * ((1.6 if on else 0) - .55 * y) * .3
            ts.append(k * dt); ys.append(y); us.append(1 if on else 0)
        c = g.plot_line_graph(ts, ys, add_vertex_dots=False, line_color=BL, stroke_width=5)
        gs = Axes(x_range=[0, 20, 1], y_range=[0, 1, 1], x_length=7.4, y_length=.9, axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).next_to(g, DOWN, buff=.6)
        sq = gs.plot_line_graph(ts, us, add_vertex_dots=False, line_color=Y, stroke_width=4)
        sl = VGroup(txt('ligado', 22, Y).next_to(gs.c2p(0, 1), LEFT, buff=.15), txt('desligado', 22, MU).next_to(gs.c2p(0, 0), LEFT, buff=.15))
        self.play(Create(g), FadeIn(ref), FadeIn(rl), FadeIn(yl), run_time=.8)
        col = []
        def side(*lines, color=TX):
            m = VGroup(*[txt(l, 30, color) for l in lines]).arrange(DOWN, buff=.1, aligned_edge=LEFT)
            if col:
                m.next_to(col[-1], DOWN, buff=.45, aligned_edge=LEFT)
            else:
                m.move_to([0, 2.3, 0]).align_to(np.array([1.3, 0, 0]), LEFT)
            col.append(m)
            return m
        self.wait_until(P[6][1])
        self.play(Create(gs), FadeIn(sl), FadeIn(side('só dois estados:', 'ligado ou desligado', color=Y)), run_time=.7)
        self.play(Create(c), Create(sq), run_time=4.0, rate_func=linear)
        self.wait_until(P[6][2])
        self.play(FadeIn(side('barato e muito usado:', 'geladeira, ar-condicionado'), shift=UP * .2), run_time=.5)
        self.wait_until(P[6][3])
        band = Rectangle(width=g.x_length, height=g.c2p(0, 1.12)[1] - g.c2p(0, .88)[1], color=BL, fill_color=BL, fill_opacity=.14, stroke_width=0).move_to(g.c2p(10, 1))
        self.play(FadeIn(band), FadeIn(side('oscila em torno', 'da referência', color=BL)), run_time=.6)
        self.wait_until(P[6][4])
        self.play(FadeIn(side('serve para processos lentos', 'que toleram oscilação', color=MU)), run_time=.5)
        self.wait_until(P[7][0] - .1)


class Ep17P(Timed):
    """Parágrafo 7: proporcional deixa off-set; Kp maior diminui mas não zera."""
    T0 = P[7][0]
    def construct(self):
        g = plot_axes(w=7.8, h=4.6, T=6, yr=(0, 1.3)).move_to([-3.8, -.3, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(6, 1), color=MU, stroke_width=2)
        rl = txt('referência', 24, MU).next_to(g.c2p(6, 1), UP, buff=.1).shift(LEFT * .8)
        self.play(Create(g), FadeIn(ref), FadeIn(rl), run_time=.6)
        self.wait_until(P[7][1])
        f = txt('u = Kp · e', 46, Y).move_to([4.6, 2.4, 0])
        self.play(Write(f), run_time=.6)
        c1 = curve(g, [2], [1, 2, 4], 6, Y)
        self.play(Create(c1), run_time=1.4)
        self.wait_until(P[7][2])
        os1 = DoubleArrow(g.c2p(5.4, .5), g.c2p(5.4, 1), buff=0, color=BAD, stroke_width=4, tip_length=.15)
        ol = txt('off-set', 30, BAD).next_to(g.c2p(5.4, .5), DOWN, buff=.15)
        self.play(GrowFromCenter(os1), FadeIn(ol), run_time=.6)
        self.wait_until(P[7][3])
        w = VGroup(txt('se e = 0', 32, TX), txt('então u = 0', 32, TX), txt('e a saída volta a cair', 32, BAD)).arrange(DOWN, buff=.2, aligned_edge=LEFT).next_to(f, DOWN, buff=.5)
        self.play(LaggedStart(*[FadeIn(x, shift=LEFT * .2) for x in w], lag_ratio=.5), run_time=2.0)
        self.wait_until(P[7][4])
        c2 = curve(g, [6], [1, 2, 8], 6, BL)
        os2 = DoubleArrow(g.c2p(5.75, .75), g.c2p(5.75, 1), buff=0, color=BL, stroke_width=4, tip_length=.12)
        kl = txt('Kp maior', 28, BL).move_to(g.c2p(3.6, 1.2))
        self.play(FadeOut(w), Create(c2), FadeIn(kl), run_time=1.4)
        self.play(GrowFromCenter(os2), run_time=.4)
        m = txt('erro menor, mas não zera', 32, BL).next_to(f, DOWN, buff=.5)
        self.play(FadeIn(m), run_time=.4)
        self.wait_until(P[7][5])
        b = txt('exemplo: tanque com boia', 30, MU).next_to(m, DOWN, buff=.35)
        self.play(FadeIn(b), run_time=.5)
        self.wait_until(P[8][0] - .1)


class Ep17I(Timed):
    """Parágrafo 8: integral soma o erro e elimina o off-set; Ki alto oscila; não reduz o pico."""
    T0 = P[8][0]
    def construct(self):
        g = plot_axes(w=7.6, h=4.6, T=12, yr=(0, 1.6)).move_to([-4.0, -.3, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(12, 1), color=MU, stroke_width=2)
        self.play(Create(g), FadeIn(ref), run_time=.6)
        cp = curve(g, [2], [1, 2, 4], 12, MU, w=3)
        lp = txt('só P', 24, MU).next_to(g.c2p(12, .5), UP, buff=.08).shift(LEFT * .4)
        self.play(Create(cp), FadeIn(lp), run_time=.8)
        self.wait_until(P[8][1])
        f = txt('u = Ki · ∫ e dt', 46, Y).move_to([4.6, 2.4, 0])
        self.play(Write(f), run_time=.7)
        # erro como área que vai sendo somada
        t, y = step_resp([2, 2], [1, 2, 4, 2], T=12, n=600)
        k = np.arange(0, len(t), 4)
        area = Polygon(*[g.c2p(t[i], min(y[i], 1)) for i in k], *[g.c2p(t[i], 1) for i in k[::-1]], color=Y, fill_color=Y, fill_opacity=.18, stroke_width=0)
        ci = g.plot_line_graph(t, y, add_vertex_dots=False, line_color=Y, stroke_width=5)
        self.play(Create(ci), FadeIn(area), run_time=2.2)
        al = txt('área = erro somado', 26, Y).move_to(g.c2p(2.6, 1.35))
        self.play(FadeIn(al), run_time=.4)
        self.wait_until(P[8][3])
        r1 = txt('elimina o off-set', 34, TX).next_to(f, DOWN, buff=.5)
        self.play(FadeIn(r1, shift=LEFT * .2), run_time=.5)
        self.wait_until(P[8][4])
        r2 = txt('“ação de reset”', 30, MU).next_to(r1, DOWN, buff=.25)
        self.play(FadeIn(r2), run_time=.4)
        self.wait_until(P[8][5])
        ch = curve(g, [2, 6], [1, 2, 4, 6], 12, BAD)
        hl = txt('Ki alto', 26, BAD).next_to(g.c2p(3.2, 1.45), RIGHT, buff=.05)
        r3 = txt('Ki alto: oscila ou instabiliza', 32, BAD).next_to(r2, DOWN, buff=.35)
        self.play(FadeOut(al), FadeOut(area), Create(ch), FadeIn(hl), FadeIn(r3), run_time=1.6)
        self.wait_until(P[8][6])
        # o pico vem antes de a integral acumular
        pk = Circle(radius=.35, color=TX, stroke_width=3).move_to(g.c2p(float(t[np.argmax(y)]), float(y.max())))
        r4 = txt('não reduz o pico:', 30, TX).next_to(r3, DOWN, buff=.35)
        r5 = txt('o pico vem antes de acumular', 30, TX).next_to(r4, DOWN, buff=.12)
        self.play(Create(pk), FadeIn(r4), FadeIn(r5), run_time=.8)
        self.wait_until(P[9][0] - .1)


class Ep17D(Timed):
    """Parágrafo 9: derivativa antecipa e reduz o pico; não tira off-set; amplifica ruído."""
    T0 = P[9][0]
    def construct(self):
        g = plot_axes(w=7.2, h=4.2, T=4, yr=(0, 1.6)).move_to([-4.3, .1, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(4, 1), color=MU, stroke_width=2)
        self.play(Create(g), FadeIn(ref), run_time=.6)
        f = txt('u = Kd · de/dt', 46, Y).move_to([4.6, 2.4, 0])
        self.wait_until(P[9][1])
        self.play(Write(f), run_time=.7)
        c0 = curve(g, [9], [1, 1, 10], 4, MU, w=3)
        l0 = txt('sem D', 24, MU).next_to(g.c2p(.85, 1.5), RIGHT, buff=.05)
        self.play(Create(c0), FadeIn(l0), run_time=1.2)
        self.wait_until(P[9][2])
        c1 = curve(g, [3, 9], [1, 4, 10], 4, Y)
        l1 = txt('com D', 24, Y).next_to(g.c2p(4, 1.0), RIGHT, buff=.12)
        self.play(Create(c1), FadeIn(l1), run_time=1.3)
        r1 = txt('ultrapassagem menor', 32, Y).next_to(f, DOWN, buff=.5)
        self.play(FadeIn(r1), run_time=.4)
        self.wait_until(P[9][3])
        r2 = txt('erro constante → derivada 0', 30, TX).next_to(r1, DOWN, buff=.3)
        r2b = txt('não elimina o off-set', 30, MU).next_to(r2, DOWN, buff=.12)
        self.play(FadeIn(r2), FadeIn(r2b), run_time=.6)
        # ruído: sinal com chiado e sua derivada
        self.wait_until(P[9][4])
        rng = np.random.default_rng(3)
        ts = np.linspace(0, 4, 400); noise = .035 * rng.standard_normal(400)
        e = .6 + .15 * np.sin(1.5 * ts) + noise
        de = np.gradient(e, ts) * .08
        gn = Axes(x_range=[0, 4, 1], y_range=[-.6, 1, .5], x_length=6.2, y_length=2.0, axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([4.6, -2.3, 0])
        cn = gn.plot_line_graph(ts, e, add_vertex_dots=False, line_color=BL, stroke_width=3)
        cd = gn.plot_line_graph(ts, np.clip(de, -.6, 1), add_vertex_dots=False, line_color=BAD, stroke_width=2)
        ln = VGroup(txt('medida com ruído', 22, BL), txt('derivada', 22, BAD)).arrange(RIGHT, buff=.4).next_to(gn, UP, buff=.08)
        self.play(FadeOut(r2), FadeOut(r2b), Create(gn), FadeIn(ln), run_time=.5)
        self.play(Create(cn), run_time=.8)
        self.play(Create(cd), run_time=.8)
        w = txt('amplifica ruído', 32, BAD, 'SEMIBOLD').next_to(r1, DOWN, buff=.3)
        self.play(FadeIn(w, scale=1.2), run_time=.4)
        self.wait_until(P[10][0] - .1)


class Ep17PID(Timed):
    """Parágrafo 15: as fórmulas do PID, o diagrama em paralelo e os dois zeros + polo na origem."""
    T0 = P[15][0]
    def construct(self):
        yc = 1.2
        def blk(s, y):
            r = RoundedRectangle(width=2.0, height=.8, corner_radius=.12, color=Y, stroke_width=4).move_to([-3.6, y, 0])
            return VGroup(r, txt(s, 34, Y).move_to(r))
        bs = [blk('Kp', yc + 1.25), blk('Ki / s', yc), blk('Kd · s', yc - 1.25)]
        sx = np.array([-.9, yc, 0]); sm = Circle(radius=.32, color=TX, stroke_width=4).move_to(sx)
        plus = txt('+', 30, TX).move_to(sx)
        src = np.array([-7.0, yc, 0])
        ein = txt('e', 34, TX).next_to(src, LEFT, buff=.15)
        wires = VGroup()
        for b in bs:
            y = b.get_center()[1]
            wires.add(VGroup(Line(src, [-5.8, yc, 0], color=TX, stroke_width=3), Line([-5.8, yc, 0], [-5.8, y, 0], color=TX, stroke_width=3), Arrow([-5.8, y, 0], b.get_left(), buff=0, color=TX, stroke_width=3, max_tip_length_to_length_ratio=.15)))
            p = np.array([-1.9, y, 0]); d = (p - sx) / np.linalg.norm(p - sx)
            wires.add(VGroup(Line(b.get_right(), p, color=TX, stroke_width=3), Arrow(p, sx + d * .32, buff=0, color=TX, stroke_width=3, max_tip_length_to_length_ratio=.15)))
        out = Arrow(sm.get_right(), sm.get_right() + RIGHT * 1.0, buff=0, color=TX, stroke_width=3)
        ul = txt('u', 34, TX).next_to(out, RIGHT, buff=.1)
        self.wait_until(P[15][1])
        self.play(FadeIn(ein), Create(wires), *[FadeIn(b) for b in bs], Create(sm), FadeIn(plus), GrowArrow(out), FadeIn(ul), run_time=1.6)
        f1 = txt('C(s) = Kp + Ki/s + Kd·s', 32, TX).move_to([0, -1.8, 0]).align_to(np.array([-7.4, 0, 0]), LEFT)
        self.play(Write(f1), run_time=1.0)
        self.wait_until(P[15][2])
        f2 = txt('C(s) = Kp·(1 + 1/(Ti·s) + Td·s)', 32, TX).next_to(f1, DOWN, buff=.35, aligned_edge=LEFT)
        self.play(Write(f2), run_time=1.2)
        self.wait_until(P[15][3])
        cv = VGroup(txt('Ki = Kp / Ti', 40, Y), txt('Kd = Kp · Td', 40, Y)).arrange(DOWN, buff=.3, aligned_edge=LEFT).move_to([0, 2.5, 0]).align_to(np.array([2.6, 0, 0]), LEFT)
        self.play(LaggedStart(*[Write(x) for x in cv], lag_ratio=.5), run_time=1.4)
        # dois zeros e um polo na origem
        self.wait_until(P[15][4])
        xr, yr = (-4, 1.5), (-1.5, 1.5)
        ax = Axes(x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1], x_length=5.4, y_length=2.6, axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([5.0, -.9, 0])
        zl = [Circle(radius=.17, color=BL, stroke_width=5).move_to(ax.c2p(x, 0)) for x in (-1, -3)]
        pz = pole(ax, 0, 0, Y)
        lab = VGroup(txt('2 zeros', 26, BL).next_to(ax.c2p(-2, 0), DOWN, buff=.35), txt('polo na origem', 26, Y).next_to(ax.c2p(0, 0), UP, buff=.35).shift(RIGHT * .75))
        self.play(Create(ax), run_time=.5)
        self.play(*[FadeIn(z, scale=2) for z in zl], FadeIn(pz, scale=3), FadeIn(lab), run_time=.9)
        self.wait_until(P[15][5])
        ig = txt('integrador: tipo + 1 (episódio 16)', 26, Y).next_to(ax, DOWN, buff=.3)
        self.play(Indicate(pz, color=WHITE, scale_factor=1.5), Indicate(bs[1], color=WHITE), FadeIn(ig), run_time=1)
        self.wait_until(P[16][0] - .1)
