"""Cenas Manim do episódio 18 (sintonia de PID por Ziegler-Nichols)."""
from common import *

P, S = load('18')

sc = lambda t: 1 - np.exp(-t) * (1 + t + t * t / 2)
TI = 2.0
YI = sc(TI)
SL = TI * TI * np.exp(-TI) / 2
L = TI - YI / SL
LT = TI + (1 - YI) / SL


def box(s, col=Y, w=1.9, h=.85, size=32):
    r = RoundedRectangle(width=w, height=h, corner_radius=.12, color=col, stroke_width=4)
    return VGroup(r, txt(s, size, col).move_to(r))


class Ep18Curva(Timed):
    """Parágrafo 3: método 1, curva de reação em malha aberta: tangente, L, T, C e R."""
    T0 = P[3][0]
    def construct(self):
        # malha aberta
        self.wait_until(P[3][1])
        pl = box('planta', TX).move_to([-3.0, 2.85, 0])
        a1 = Arrow(pl.get_left() + LEFT * 2.0, pl.get_left(), buff=0, color=TX, stroke_width=4)
        a2 = Arrow(pl.get_right(), pl.get_right() + RIGHT * 2.0, buff=0, color=TX, stroke_width=4)
        l1 = txt('degrau', 26, BL).next_to(a1, UP, buff=.08); l2 = txt('c(t)', 26, Y).next_to(a2, UP, buff=.08)
        ma = txt('malha aberta', 28, MU).next_to(a2, RIGHT, buff=.4)
        self.play(GrowArrow(a1), FadeIn(pl), GrowArrow(a2), FadeIn(l1), FadeIn(l2), FadeIn(ma), run_time=1)
        g = Axes(x_range=[0, 10, 1], y_range=[0, 1.2, .5], x_length=9.6, y_length=4.2,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([-2.6, -.75, 0])
        tl = txt('t', 26, MU).next_to(g.c2p(10, 0), DOWN, buff=.1)
        self.wait_until(P[3][2])
        man = txt('controlador em manual', 26, MU).next_to(pl, DOWN, buff=.15)
        self.play(Create(g), FadeIn(tl), FadeIn(man), Indicate(l1, color=BL), run_time=.9)
        # curva em S
        self.wait_until(P[3][3])
        c = g.plot(sc, x_range=[0, 10, .02], color=Y, stroke_width=5)
        self.play(Create(c), run_time=2.0)
        sl = txt('forma de S', 28, Y).next_to(g.c2p(6.5, sc(6.5)), DOWN, buff=.35)
        self.play(FadeIn(sl), run_time=.4)
        # tangente no ponto de inflexão
        self.wait_until(P[3][4])
        ip = Dot(g.c2p(TI, YI), color=BL, radius=.09)
        il = txt('inflexão', 26, BL).next_to(ip, RIGHT, buff=.2).shift(DOWN * .15)
        self.play(FadeIn(ip, scale=2), FadeIn(il), run_time=.6)
        tan = Line(g.c2p(L - .25, -SL * .25), g.c2p(LT + .35, 1 + SL * .35), color=BL, stroke_width=3)
        self.play(Create(tan), FadeOut(sl), run_time=1.2)
        # L, T e C
        self.wait_until(P[3][5])
        cl = DashedLine(g.c2p(0, 1), g.c2p(10, 1), color=MU, stroke_width=2)
        cL = txt('C', 30, TX).next_to(g.c2p(0, 1), LEFT, buff=.15)
        dl = Dot(g.c2p(L, 0), color=BL, radius=.08)
        Ll = txt('L', 32, BL, 'SEMIBOLD').next_to(g.c2p(L, 0), DOWN, buff=.15)
        self.play(FadeIn(dl, scale=2), FadeIn(Ll), run_time=.6)
        aL = DoubleArrow(g.c2p(0, .08), g.c2p(L, .08), buff=0, color=BL, stroke_width=3, tip_length=.12, max_tip_length_to_length_ratio=.5)
        at = txt('atraso', 24, BL).next_to(aL, UP, buff=.05)
        self.play(GrowFromCenter(aL), FadeIn(at), run_time=.6)
        self.wait_until(P[3][5] + 2.8)
        vl = DashedLine(g.c2p(LT, 0), g.c2p(LT, 1), color=BL, stroke_width=2)
        aT = DoubleArrow(g.c2p(L, -.12), g.c2p(LT, -.12), buff=0, color=BL, stroke_width=3, tip_length=.14)
        Tl = txt('T', 32, BL, 'SEMIBOLD').next_to(aT, DOWN, buff=.08)
        self.play(Create(vl), GrowFromCenter(aT), FadeIn(Tl), run_time=.8)
        self.wait_until(P[3][5] + 4.8)
        self.play(Create(cl), FadeIn(cL), run_time=.6)
        # R = C / T
        self.wait_until(P[3][6])
        r = txt('R = C / T', 46, Y, 'SEMIBOLD').move_to([5.6, -.2, 0])
        nums = txt('L ≈ 0,81 · T ≈ 3,69', 28, MU).next_to(r, DOWN, buff=.3)
        self.play(Write(r), run_time=.8)
        self.play(FadeIn(nums), run_time=.5)
        self.wait_until(P[4][0] - .1)


class Ep18Oscila(Timed):
    """Parágrafo 6: método 2, malha fechada só com P, aumenta Kp até oscilar: Ku e Pu."""
    T0 = P[6][0]
    def construct(self):
        # diagrama em malha fechada
        y0 = 2.5
        sm = Circle(radius=.28, color=TX, stroke_width=4).move_to([-6.2, y0, 0])
        cb = box('Kp', Y, w=1.5).move_to([-4.2, y0, 0])
        ib = box('I', AXIS, w=.9).move_to([-2.7, y0, 0]); db = box('D', AXIS, w=.9).move_to([-1.6, y0, 0])
        pb = box('planta', TX, w=1.9).move_to([.6, y0, 0])
        ws = VGroup(Arrow([-7.8, y0, 0], sm.get_left(), buff=0, color=TX, stroke_width=3),
                    Arrow(sm.get_right(), cb.get_left(), buff=0, color=TX, stroke_width=3),
                    Arrow(cb.get_right(), pb.get_left(), buff=0, color=TX, stroke_width=3),
                    Arrow(pb.get_right(), pb.get_right() + RIGHT * 1.4, buff=0, color=TX, stroke_width=3))
        fb = VGroup(Line(pb.get_right() + RIGHT * .8, pb.get_right() + RIGHT * .8 + DOWN * 1.0, color=TX, stroke_width=3),
                    Line(pb.get_right() + RIGHT * .8 + DOWN * 1.0, [-6.2, y0 - 1.0, 0], color=TX, stroke_width=3),
                    Arrow([-6.2, y0 - 1.0, 0], sm.get_bottom(), buff=0, color=TX, stroke_width=3))
        mf = txt('malha fechada', 28, MU).move_to([5.6, y0, 0])
        self.play(Create(sm), FadeIn(cb), FadeIn(ib), FadeIn(db), FadeIn(pb), Create(ws), run_time=1)
        self.wait_until(P[6][1])
        self.play(Create(fb), FadeIn(mf), run_time=.8)
        # só P: risca I e D
        self.wait_until(P[6][2])
        xs = VGroup(*[Line(b.get_corner(DL), b.get_corner(UR), color=BAD, stroke_width=5) for b in (ib, db)])
        self.play(Create(xs), ib.animate.set_opacity(.35), db.animate.set_opacity(.35), run_time=.6)
        g = Axes(x_range=[0, 8, 1], y_range=[0, 2, .5], x_length=9.0, y_length=3.6,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([-2.6, -1.9, 0])
        K = ValueTracker(10.0)
        def cv():
            k = K.get_value()
            t, y = step_resp([k], [1, 6, 11, 6 + k], T=8, n=400)
            col = Y if k < 59 else BL
            return g.plot_line_graph(t, np.clip(y, 0, 2), add_vertex_dots=False, line_color=col, stroke_width=5)
        c = always_redraw(cv)
        kv = always_redraw(lambda: txt('Kp = %d' % round(K.get_value()), 40, Y if K.get_value() < 59 else BL, 'SEMIBOLD').move_to([5.6, -.4, 0]))
        self.play(Create(g), FadeIn(c), FadeIn(kv), run_time=.8)
        self.play(K.animate.set_value(60), run_time=4.6, rate_func=rate_functions.ease_in_out_sine)
        amp = txt('amplitude constante', 28, BL).next_to(kv, DOWN, buff=.3)
        self.play(FadeIn(amp), run_time=.4)
        # Ku e Pu
        self.wait_until(P[6][3])
        ku = txt('Ku = 60: ganho crítico', 30, BL, 'SEMIBOLD').next_to(amp, DOWN, buff=.45)
        self.play(Write(ku), run_time=.8)
        self.wait_until(P[6][4])
        t, y = step_resp([60], [1, 6, 11, 66], T=8, n=800)
        pk = [i for i in range(1, 799) if y[i] > y[i - 1] and y[i] >= y[i + 1] and y[i] > 1.2]
        t1, t2 = t[pk[1]], t[pk[2]]
        pa = DoubleArrow(g.c2p(t1, 1.92), g.c2p(t2, 1.92), buff=0, color=BL, stroke_width=4, tip_length=.14)
        pu = txt('Pu', 30, BL, 'SEMIBOLD').next_to(pa, UP, buff=.05)
        gd = VGroup(*[DashedLine(g.c2p(x, y[i]), g.c2p(x, 1.92), color=BL, stroke_width=2, dash_length=.06) for x, i in ((t1, pk[1]), (t2, pk[2]))])
        self.play(Create(gd), GrowFromCenter(pa), FadeIn(pu), run_time=.8)
        self.wait_until(P[7][0] - .1)


class Ep18Routh(RouthMixin, Timed):
    """Parágrafo 8: Ku e Pu pelo Routh, como no episódio 15."""
    T0 = P[8][0]
    CX = [-6.8, -5.0, -2.6, -1.0]
    PX = .7

    def construct(self):
        self.cur = None; self.extra = []
        self.wait_until(P[8][1])
        g = txt('G(s) = 1 / ((s + 1)(s + 2)(s + 3))', 40, TX).move_to([0, 3.15, 0])
        self.play(Write(g), run_time=1.2)
        self.wait_until(P[8][2])
        poly = txt('s³ + 6s² + 11s + 6 + Kp', 46, TX).move_to([0, 3.15, 0])
        self.play(FadeOut(g, shift=UP * .3), FadeIn(poly, shift=UP * .3), run_time=.7)
        RY = [1.6, .6, -.4, -1.4]
        self.RY = RY
        lines = Line([self.CX[0] + .6, 2.1, 0], [self.CX[0] + .6, -1.9, 0], color=AXIS, stroke_width=3)
        labs = VGroup(*[txt(l, 36, Y, 'SEMIBOLD').move_to([self.CX[0], y, 0]) for l, y in zip(['s³', 's²', 's¹', 's⁰'], RY)])
        rows = [['1', '11'], ['6', '6 + Kp'], ['(60 − Kp) / 6', ''], ['6 + Kp', '']]
        V = [[txt(v, 38, TX).move_to(self.cell(r, c)) for c, v in enumerate(row) if v] for r, row in enumerate(rows)]
        V[2][0].shift(RIGHT * .7); V[3][0].shift(RIGHT * .3); V[1][1].shift(RIGHT * .2)
        self.play(Create(lines), FadeIn(labs), run_time=.6)
        for r in range(4):
            self.play(*[FadeIn(m, shift=DOWN * .15) for m in V[r]], run_time=.55)
        # linha s¹ zera
        self.wait_until(P[8][3])
        bx = SurroundingRectangle(V[2][0], color=BL, buff=.12, corner_radius=.08)
        self.panel(txt('linha s¹ = 0', 34, MU), txt('60 − Kp = 0', 42, BL))
        self.play(Create(bx), run_time=.5)
        self.wait_until(P[8][4])
        k = txt('Ku = 60', 50, BL, 'SEMIBOLD').next_to(self.cur, DOWN, buff=.35, aligned_edge=LEFT)
        self.play(Write(k), run_time=.6); self.extra.append(k)
        # linha s²: frequência
        self.wait_until(P[8][5])
        bx2 = SurroundingRectangle(VGroup(V[1][0], V[1][1]), color=Y, buff=.12, corner_radius=.08)
        self.play(FadeOut(bx), Create(bx2), run_time=.5)
        self.panel(txt('linha s² com Kp = 60', 32, MU), txt('6s² + 66 = 0', 42, TX), txt('ω = √11 ≈ 3,32 rad/s', 40, Y))
        self.wait_until(P[8][6])
        pu = txt('Pu = 2π/ω ≈ 1,89 s', 46, BL, 'SEMIBOLD').next_to(self.cur, DOWN, buff=.35, aligned_edge=LEFT)
        self.play(Write(pu), run_time=.8); self.extra.append(pu)
        self.wait_until(P[9][0] - .1)


class Ep18Sim(Timed):
    """Parágrafo 10: o PID de Ziegler-Nichols zera o erro, mas a ultrapassagem fica perto de 44%."""
    T0 = P[10][0]
    def construct(self):
        Kp, Ti, Td = 36, .945, .236
        num = [Kp * Td * Ti, Kp * Ti, Kp]
        den = [Ti, 6 * Ti, 11 * Ti + num[0], 6 * Ti + num[1], num[2]]
        t, y = step_resp(num, den, T=6, n=600)
        g = Axes(x_range=[0, 6, 1], y_range=[0, 1.6, .5], x_length=9.4, y_length=4.8,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([-2.4, -.3, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(6, 1), color=MU, stroke_width=2)
        rl = txt('referência', 24, MU).next_to(g.c2p(6, 1), UP, buff=.12).shift(LEFT * .8)
        c = g.plot_line_graph(t, y, add_vertex_dots=False, line_color=Y, stroke_width=5)
        gains = txt('Kp = 36 · Ti = 0,95 s · Td = 0,24 s', 28, MU).next_to(g, UP, buff=.25).align_to(g, LEFT)
        self.play(Create(g), FadeIn(ref), FadeIn(rl), FadeIn(gains), run_time=.8)
        self.play(Create(c), run_time=2.4)
        i = int(np.argmax(y))
        ov = DoubleArrow(g.c2p(t[i], 1), g.c2p(t[i], y[i]), buff=0, color=BAD, stroke_width=4, tip_length=.14)
        ol = txt('≈ 44%', 40, BAD, 'SEMIBOLD').next_to(ov, RIGHT, buff=.2)
        self.play(GrowFromCenter(ov), FadeIn(ol), run_time=.6)
        ez = txt('erro → 0', 36, Y).move_to([5.6, .2, 0])
        uz = txt('ultrapassagem alta', 36, BAD).next_to(ez, DOWN, buff=.3)
        self.play(FadeIn(ez), run_time=.4)
        self.play(FadeIn(uz), run_time=.4)
        self.wait_until(P[10][1])
        tp = txt('típico de Ziegler-Nichols', 30, MU).next_to(uz, DOWN, buff=.5)
        self.play(FadeIn(tp, shift=UP * .2), run_time=.5)
        self.wait_until(P[11][0] - .1)
