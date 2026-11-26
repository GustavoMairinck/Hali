"""Cenas Manim do episódio 15 (Routh no projeto: a faixa de K)."""
from common import *

P, S = load('15')
KC = 14 / 9
DEN = lambda K: [1, 3, 3, 2, K]


class Ep15Volume(Timed):
    """Parágrafo 2: K é o volume; baixo responde fraco, alto dá microfonia."""
    T0 = P[2][0]
    def construct(self):
        # "botão de volume": régua de K
        nl = NumberLine(x_range=[0, 2.4, .5], length=6.2, color=AXIS, include_numbers=False, stroke_width=3).move_to([-4.6, -2.2, 0])
        nums = VGroup(*[txt(s, 26, MU).next_to(nl.n2p(v), DOWN, buff=.2) for v, s in [(0, '0'), (1, '1'), (2, '2')]])
        kl = txt('K', 40, TX, 'SEMIBOLD').next_to(nl, LEFT, buff=.35)
        K = ValueTracker(.25)
        knob = always_redraw(lambda: Triangle(color=Y, fill_color=Y, fill_opacity=1).scale(.18).rotate(PI).next_to(nl.n2p(K.get_value()), UP, buff=.05))
        kv = always_redraw(lambda: txt('K = ' + ('%.2f' % K.get_value()).replace('.', ','), 34, Y).next_to(nl, UP, buff=.85))
        # ícone de alto-falante com "ondas" que crescem com K
        spk = VGroup(Rectangle(width=.35, height=.5, color=TX, fill_color=TX, fill_opacity=1, stroke_width=0),
                     Polygon([.17, .25, 0], [.6, .6, 0], [.6, -.6, 0], [.17, -.25, 0], color=TX, fill_color=TX, fill_opacity=1, stroke_width=0)).move_to([-6.2, 1.1, 0])
        def waves():
            k = K.get_value(); n = 1 + int(k / .6)
            col = Y if k < KC - .02 else (BL if k < KC + .02 else BAD)
            return VGroup(*[Arc(radius=.35 + .3 * i, start_angle=-PI / 4, angle=PI / 2, arc_center=spk.get_right() + RIGHT * .05, color=col, stroke_width=5) for i in range(min(n, 4))])
        wv = always_redraw(waves)

        g = Axes(x_range=[0, 30, 5], y_range=[-1.8, 3.8, 1], x_length=7.6, y_length=4.8,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([3.9, -.1, 0])
        ref = DashedLine(g.c2p(0, 1), g.c2p(30, 1), color=MU, stroke_width=2, dash_length=.12)
        gl = txt('saída', 26, MU).next_to(g, UP, buff=.15).align_to(g, LEFT)
        tl = txt('t', 26, MU).next_to(g.c2p(30, 0), DOWN, buff=.1)

        def curve():
            k = K.get_value()
            t, y = step_resp([k], DEN(k), T=30, n=600)
            col = Y if k < KC - .02 else (BL if k < KC + .02 else BAD)
            pts = [g.c2p(a, float(np.clip(b, -1.8, 3.8))) for a, b in zip(t, y)]
            return VMobject(color=col, stroke_width=5).set_points_as_corners(pts)

        self.play(Create(nl), FadeIn(nums), FadeIn(kl), FadeIn(spk), Create(g), FadeIn(ref), FadeIn(gl), FadeIn(tl), run_time=1.2)
        self.add(knob, kv, wv)
        c = always_redraw(curve)
        self.play(Create(c), run_time=1.5)
        # volume baixo
        self.wait_until(P[2][1])
        self.play(K.animate.set_value(.5), run_time=1.2)
        m1 = txt('volume baixo: fraco, mas estável', 32, Y).next_to(g, DOWN, buff=.35)
        self.play(FadeIn(m1, shift=UP * .2), run_time=.5)
        # volume alto demais: microfonia
        self.wait_until(P[2][2])
        m2 = txt('volume alto demais: microfonia', 32, BAD).move_to(m1)
        self.play(K.animate.set_value(1.85), FadeOut(m1), run_time=2.4, rate_func=smooth)
        self.play(FadeIn(m2, shift=UP * .2), run_time=.5)
        # até onde dá para aumentar?
        self.wait_until(P[2][3])
        ok = Line(nl.n2p(0), nl.n2p(KC), color=Y, stroke_width=10)
        bad = Line(nl.n2p(KC), nl.n2p(2.4), color=BAD, stroke_width=10)
        lim = DashedLine(nl.n2p(KC) + UP * .5, nl.n2p(KC) + DOWN * .5, color=BL, stroke_width=4)
        q = txt('até onde?', 30, BL).next_to(lim, DOWN, buff=.55)
        self.play(Create(ok), Create(bad), Create(lim), FadeIn(q), FadeOut(m2), run_time=1)
        self.play(K.animate.set_value(KC), run_time=1.4, rate_func=smooth)
        m3 = txt('no limite: oscila sem crescer', 32, BL).move_to(m1)
        self.play(FadeIn(m3, shift=UP * .2), run_time=.5)
        self.wait_until(P[3][0] - .1)


R15 = [['1', '3', 'K'], ['3', '2', '0'], ['7/3', 'K', ''], ['2 − 9K/7', '', ''], ['K', '', '']]
ROWL = ['s⁴', 's³', 's²', 's¹', 's⁰']


class Ep15Tabela(RouthMixin, Timed):
    """Parágrafos 5 a 11: tabela com K, condições e a interseção."""
    T0 = P[5][0]
    CX = [-6.6, -4.9, -2.4, -1.0]
    PX = .9

    def construct(self):
        self.cur = None; self.extra = []
        terms = ['s⁴', '+ 3s³', '+ 3s²', '+ 2s', '+ K']
        coef = ['1', '3', '3', '2', 'K']
        poly = VGroup(*[txt(t, 50, TX) for t in terms]).arrange(RIGHT, buff=.28).move_to([0, 3.15, 0])
        lines, labs = self.grid(ROWL)
        q3 = txt('questão 3 da lista', 28, BL).to_corner(DL, buff=.5)
        self.play(FadeIn(poly), Create(lines), FadeIn(labs), FadeIn(q3), run_time=.8)
        V = [[None] * 3 for _ in range(5)]

        def fly(k, r, c):
            src = poly[k]
            m = txt(coef[k], 44, Y if coef[k] == 'K' else TX).move_to(src.get_center())
            V[r][c] = m
            return Succession(src.animate(run_time=.25).set_color(Y), AnimationGroup(m.animate.move_to(self.cell(r, c)), src.animate.set_color(TX), run_time=.8))

        self.play(LaggedStart(fly(0, 0, 0), fly(2, 0, 1), fly(4, 0, 2), lag_ratio=.4), run_time=2.0)
        self.wait_until(P[6][0])
        self.play(LaggedStart(fly(1, 1, 0), fly(3, 1, 1), lag_ratio=.4), run_time=1.6)
        z = txt('0', 44, MU).move_to(self.cell(1, 2)); V[1][2] = z
        self.play(FadeIn(z, scale=1.6), run_time=.4)

        def put(res, r, c, col=TX, size=44, src=None):
            m = txt(res, size, col).move_to(src.get_center() if src is not None else self.cell(r, c))
            V[r][c] = m
            if src is not None:
                self.play(m.animate.move_to(self.cell(r, c)), run_time=.8)
            else:
                self.play(FadeIn(m, scale=1.4), run_time=.5)
            return m

        # s², 1º: (3·3 − 1·2)/3 = 7/3
        self.wait_until(P[7][0])
        mk = self.marks([(1, 0), (0, 1)], [(0, 0), (1, 1)])
        self.play(Create(mk), run_time=.5)
        l1 = self.calc([('(', TX), ('3·3', Y), (' − ', TX), ('1·2', BL), (') ÷ 3', TX)])
        self.panel(txt('linha s², 1º elemento', 32, MU), l1)
        self.wait_until(P[7][1])
        r1 = txt('= 7/3', 48, TX, 'SEMIBOLD').next_to(l1, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(r1), run_time=.5); self.extra.append(r1)
        put('7/3', 2, 0, src=r1[1:])
        self.play(FadeOut(mk), run_time=.3)
        # s², 2º: (3K − 1·0)/3 = K
        self.wait_until(P[7][2])
        mk = self.marks([(1, 0), (0, 2)], [(0, 0), (1, 2)])
        self.play(Create(mk), run_time=.5)
        l2 = self.calc([('(', TX), ('3·K', Y), (' − ', TX), ('1·0', BL), (') ÷ 3', TX)])
        self.panel(txt('linha s², 2º elemento', 32, MU), l2)
        r2 = txt('= K', 48, Y, 'SEMIBOLD').next_to(l2, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(r2), run_time=.5); self.extra.append(r2)
        put('K', 2, 1, col=Y, src=r2[1:])
        self.play(FadeOut(mk), run_time=.3)
        # s¹: (7/3·2 − 3·K)/(7/3) = 2 − 9K/7
        self.wait_until(P[8][0])
        mk = self.marks([(2, 0), (1, 1)], [(1, 0), (2, 1)])
        self.play(Create(mk), run_time=.5)
        l3 = self.calc([('(', TX), ('7/3·2', Y), (' − ', TX), ('3·K', BL), (') ÷ 7/3', TX)])
        self.panel(txt('linha s¹', 32, MU), l3)
        self.wait_until(P[8][1])
        r3 = txt('= 2 − 9K/7', 48, Y, 'SEMIBOLD').next_to(l3, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(r3), run_time=.7); self.extra.append(r3)
        put('2 − 9K/7', 3, 0, col=Y, size=36, src=r3[1:])
        V[3][0].shift(RIGHT * .45)
        self.play(FadeOut(mk), run_time=.3)
        # s⁰: K
        self.wait_until(P[9][0])
        put('K', 4, 0, col=Y)

        # condições: cada elemento da primeira coluna > 0
        self.wait_until(P[10][0])
        colbox = RoundedRectangle(width=3.0, height=4.55, corner_radius=.15, color=Y, stroke_width=4).move_to([self.CX[1] + .45, (self.RY[0] + self.RY[4]) / 2, 0])
        self.play(Create(colbox), *[V[r][c].animate.set_opacity(.3) for r in range(5) for c in (1, 2) if V[r][c] is not None], run_time=.7)
        c1 = self.calc([('2 − 9K/7 > 0', Y)], 38)
        self.panel(txt('tudo na 1ª coluna > 0', 32, MU), c1)
        self.play(Indicate(V[3][0], color=Y), run_time=.7)
        self.wait_until(P[10][1] + 2.5)
        c1b = txt('→ K < 14/9 ≈ 1,56', 38, Y).next_to(c1, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(c1b), run_time=.8); self.extra.append(c1b)
        self.wait_until(P[10][2])
        c2 = txt('K > 0', 38, Y).next_to(c1b, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(c2), Indicate(V[4][0], color=Y), run_time=.8); self.extra.append(c2)

        # resposta: interseção na reta
        self.wait_until(P[11][0])
        nl = NumberLine(x_range=[-.5, 2.5, .5], length=6.4, color=AXIS, stroke_width=3)
        z0 = txt('0', 28, TX).next_to(nl.n2p(0), DOWN, buff=.2); zk = txt('14/9', 28, TX).next_to(nl.n2p(KC), DOWN, buff=.2)
        band = Line(nl.n2p(0), nl.n2p(KC), color=Y, stroke_width=12)
        o0 = Circle(radius=.1, color=Y, stroke_width=4, fill_color=BG, fill_opacity=1).move_to(nl.n2p(0))
        o1 = Circle(radius=.1, color=Y, stroke_width=4, fill_color=BG, fill_opacity=1).move_to(nl.n2p(KC))
        ans = txt('0 < K < 14/9', 52, Y, 'SEMIBOLD')
        grp = VGroup(ans, VGroup(nl, z0, zk, band, o0, o1)).arrange(DOWN, buff=.6)
        self.panel(grp)
        self.wait_until(P[12][0] - .1)


class Ep15Limite(Timed):
    """Parágrafo 12: no limite a linha s¹ zera, o sistema oscila e a linha s² dá a frequência."""
    T0 = P[12][0]
    def construct(self):
        g = Axes(x_range=[0, 40, 5], y_range=[0, 2, 1], x_length=7.4, y_length=3.6,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).move_to([-4.6, -1.0, 0])
        gl = txt('K = 14/9', 30, BL).next_to(g, UP, buff=.15).align_to(g, LEFT)
        t, y = step_resp([KC], DEN(KC), T=40, n=800)
        c = g.plot_line_graph(t, y, add_vertex_dots=False, line_color=BL, stroke_width=5)
        self.wait_until(P[12][1])
        s1 = VGroup(txt('linha s¹:', 34, MU), txt('2 − 9·(14/9)/7 = 0', 38, TX)).arrange(RIGHT, buff=.3).move_to([-4.6, 2.7, 0])
        self.play(FadeIn(s1, shift=DOWN * .2), run_time=.7)
        zero = SurroundingRectangle(s1[1], color=BL, buff=.12, corner_radius=.08)
        self.play(Create(zero), run_time=.5)
        # oscila com amplitude constante
        self.wait_until(P[12][2])
        self.play(Create(g), FadeIn(gl), run_time=.6)
        self.play(Create(c), run_time=3.2, rate_func=linear)
        env = VGroup(DashedLine(g.c2p(12, y[-160:].max()), g.c2p(40, y[-160:].max()), color=MU, stroke_width=2),
                     DashedLine(g.c2p(12, y[-160:].min()), g.c2p(40, y[-160:].min()), color=MU, stroke_width=2))
        am = txt('amplitude constante', 26, MU).next_to(gl, RIGHT, buff=.4)
        self.play(Create(env), FadeIn(am), run_time=.7)
        # frequência pela linha s²
        self.wait_until(P[12][3])
        x0 = .9
        e1 = txt('linha s²:', 32, MU).move_to([0, 2.7, 0]).align_to(np.array([x0, 0, 0]), LEFT)
        e2 = txt('7/3 s² + 14/9 = 0', 40, TX).next_to(e1, DOWN, buff=.25, aligned_edge=LEFT)
        self.play(FadeIn(e1), Write(e2), run_time=1.2)
        self.wait_until(P[12][4])
        e3 = txt('s² = −2/3', 40, TX).next_to(e2, DOWN, buff=.3, aligned_edge=LEFT)
        e4 = txt('ω = √(2/3) ≈ 0,82 rad/s', 38, BL, 'SEMIBOLD').next_to(e3, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(e3), run_time=.7)
        self.play(Write(e4), run_time=.9)
        # período marcado no gráfico
        T = 2 * np.pi / np.sqrt(2 / 3)
        i0 = 600 + int(np.argmax(y[600:])); t0 = t[i0]
        per = DoubleArrow(g.c2p(t0 - T, -.22), g.c2p(t0, -.22), buff=0, color=BL, stroke_width=4, tip_length=.15)
        pl = txt('período = 2π/ω ≈ 7,7 s', 26, BL).next_to(per, DOWN, buff=.1)
        guides = VGroup(*[DashedLine(g.c2p(x, y[i0]), g.c2p(x, -.22), color=BL, stroke_width=2, dash_length=.08) for x in (t0 - T, t0)])
        self.play(Create(guides), GrowFromCenter(per), FadeIn(pl), Circumscribe(e4, color=BL), run_time=1)
        self.wait_until(P[13][0] - .1)
