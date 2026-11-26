"""Cenas Manim do episódio 01. Mesmo padrão visual do site/vídeo (tema em theme.py)."""
import json, os, numpy as np
from manim import *
from theme import *

S = json.load(open(os.path.join(os.path.dirname(__file__), 'ep01.json')))
P = {int(k): v for k, v in S['paras'].items()}


class Timed(Scene):
    """Cena com relógio: wait_until(t) espera até o instante t (segundos do áudio)."""
    T0 = 0.0
    def setup(self):
        self.camera.background_color = BG
    def now(self):
        return self.T0 + self.renderer.time
    def wait_until(self, t):
        dt = t - self.now()
        if dt > 1 / 30:
            self.wait(dt)
    def play_at(self, t, *anims, run_time=1.0, **kw):
        self.wait_until(t)
        self.play(*anims, run_time=run_time, **kw)


def plane(xr=(-8, 4), yr=(-8, 8), h=6.6):
    ax = Axes(x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1], x_length=h * (xr[1] - xr[0]) / (yr[1] - yr[0]) * 1.25, y_length=h,
              axis_config={'color': AXIS, 'stroke_width': 2, 'tip_width': .18, 'tip_height': .18, 'include_ticks': True, 'tick_size': .05},
              tips=True)
    ls = label(ax.x_axis.get_end(), 'σ', DOWN * .35 + LEFT * .1)
    lw = label(ax.y_axis.get_end(), 'jω', LEFT * .35)
    return ax, VGroup(ls, lw)


def label(pt, s, off=UP * .3, col=TX, fs=30):
    return txt(s, fs, col).move_to(pt + off)


def pole(ax, x, y, col=Y, sz=.17):
    p = ax.c2p(x, y)
    return VGroup(Line(p + (-sz, -sz, 0), p + (sz, sz, 0), color=col, stroke_width=6),
                  Line(p + (-sz, sz, 0), p + (sz, -sz, 0), color=col, stroke_width=6))


class Ep01Vetor(Timed):
    """Parágrafos 3 e 4: σ no eixo horizontal, ω no vertical, s = σ + jω."""
    T0 = P[3][0]
    def construct(self):
        ax, lab = plane()
        VGroup(ax, lab).shift(LEFT * 2.6)
        self.play(Create(ax), run_time=1.4)
        self.play(FadeIn(lab), run_time=.5)
        # σ: eixo horizontal
        self.wait_until(P[3][1])
        hl = Line(ax.c2p(-8, 0), ax.c2p(4, 0), color=Y, stroke_width=7)
        sig = txt('σ  parte real', 30, Y).next_to(ax, RIGHT, buff=.4).shift(UP * 1)
        self.play(Create(hl), FadeIn(sig, shift=LEFT * .3), run_time=1)
        # ω: eixo vertical
        self.wait_until(P[3][3])
        vl = Line(ax.c2p(0, -8), ax.c2p(0, 8), color=BL, stroke_width=7)
        om = txt('ω  parte imaginária', 30, BL).next_to(sig, DOWN, buff=.35, aligned_edge=LEFT)
        self.play(FadeOut(hl), Create(vl), FadeIn(om, shift=LEFT * .3), run_time=1)
        self.wait_until(P[3][5])
        j = txt('j² = −1', 34, TX).next_to(om, DOWN, buff=.5, aligned_edge=LEFT)
        self.play(FadeOut(vl), Write(j), run_time=1)
        # s = σ + jω: ande σ para o lado e ω para cima
        self.wait_until(P[4][0])
        eq = txt('s = σ + jω', 44, TX).next_to(j, DOWN, buff=.6, aligned_edge=LEFT)
        self.play(Write(eq), run_time=1)
        o = ax.c2p(0, 0); a = ax.c2p(-3, 0); b = ax.c2p(-3, 7)
        step1 = Arrow(o, a, buff=0, color=Y, stroke_width=6)
        step2 = Arrow(a, b, buff=0, color=BL, stroke_width=6)
        self.play(GrowArrow(step1), run_time=1.1)
        self.play(GrowArrow(step2), run_time=1.1)
        dot = Dot(b, color=Y, radius=.11)
        vec = Arrow(o, b, buff=0, color=Y, stroke_width=5)
        self.play(FadeIn(dot, scale=2), GrowArrow(vec), step1.animate.set_opacity(.35), step2.animate.set_opacity(.35), run_time=1)
        self.play(FadeIn(label(b, '−3 + j7', LEFT * 1.4, Y, 30)), run_time=.6)
        self.wait_until(P[5][0] - .2)


class Ep01Espelho(Timed):
    """Parágrafo 6: o par conjugado é o espelho em relação ao eixo horizontal."""
    T0 = P[6][0]
    def construct(self):
        ax, lab = plane()
        VGroup(ax, lab).shift(LEFT * 1.5)
        self.add(ax, lab)
        p1 = pole(ax, -3, 7)
        l1 = label(ax.c2p(-3, 7), '−3 + j7', LEFT * 1.2, Y)
        self.play(FadeIn(p1, scale=3), FadeIn(l1), run_time=.8)
        self.wait_until(P[6][1])
        mirror = DashedLine(ax.c2p(-8, 0), ax.c2p(4, 0), color=Y, stroke_width=4)
        self.play(Create(mirror), run_time=.8)
        p2 = p1.copy()
        self.play(Rotate(p2, angle=PI, axis=RIGHT, about_point=ax.c2p(0, 0)), run_time=1.6, rate_func=smooth)
        self.play(FadeIn(label(ax.c2p(-3, -7), '−3 − j7', LEFT * 1.2, Y)), run_time=.6)
        self.wait_until(P[6][3])
        tag = txt('par conjugado', 38, Y).to_edge(RIGHT, buff=.8)
        self.play(Write(tag), Indicate(VGroup(p1, p2), color=WHITE), run_time=1.2)
        self.wait_until(P[7][0] - .2)


class Ep01Regioes(Timed):
    """Parágrafos 7 a 10: o polo anda da esquerda para a direita e a resposta muda junto."""
    T0 = P[7][0]
    def construct(self):
        ax, lab = plane(xr=(-5, 4), yr=(-6, 6), h=6.4)
        VGroup(ax, lab).to_edge(LEFT, buff=.5)
        self.add(ax, lab)
        L = Rectangle(width=ax.c2p(0, 0)[0] - ax.c2p(-5, 0)[0], height=6.4, fill_color=Y, fill_opacity=.13, stroke_width=0).move_to(ax.c2p(-2.5, 0))
        R = Rectangle(width=ax.c2p(4, 0)[0] - ax.c2p(0, 0)[0], height=6.4, fill_color=BAD, fill_opacity=.13, stroke_width=0).move_to(ax.c2p(2, 0))
        tl = txt('estável', 28, Y).move_to(ax.c2p(-2.5, 5.4)); tr = txt('instável', 28, BAD).move_to(ax.c2p(2, 5.4))
        axisl = Line(ax.c2p(0, -6), ax.c2p(0, 6), color=BL, stroke_width=7)
        ta = txt('oscila', 26, BL).next_to(ax.c2p(0, -5.4), RIGHT, buff=.15)
        self.play(FadeIn(L), Write(tl), run_time=.9)
        self.play(Create(axisl), Write(ta), run_time=.9)
        self.play(FadeIn(R), Write(tr), run_time=.9)
        # gráfico da resposta à direita
        g = Axes(x_range=[0, 6, 1], y_range=[-1.3, 1.3, 1], x_length=6.2, y_length=4.2,
                 axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False).to_edge(RIGHT, buff=.6)
        gl = txt('resposta no tempo', 26, MU).next_to(g, UP, buff=.2)
        sig = ValueTracker(-0.6)
        def resp():
            s = sig.get_value()
            col = Y if s < -0.05 else (BL if s < 0.05 else BAD)
            k = 1 if s <= 0 else 0.05
            return g.plot(lambda t: np.clip(k * np.exp(s * t) * np.cos(4 * t), -1.3, 1.3), x_range=[0, 6, .02], color=col, stroke_width=5)
        def pl():
            s = sig.get_value(); col = Y if s < -0.05 else (BL if s < 0.05 else BAD)
            x = 5 * s / 1.0 if False else s * 3.4
            return VGroup(pole(ax, x, 2.5, col), pole(ax, x, -2.5, col))
        self.wait_until(P[8][0])
        curve = always_redraw(resp); poles = always_redraw(pl)
        self.play(Create(g), Write(gl), FadeIn(poles, scale=2), run_time=1)
        self.play(Create(curve), run_time=2)
        cap = txt('morre com o tempo', 30, Y).next_to(g, DOWN, buff=.3)
        self.play(FadeIn(cap, shift=UP * .2), run_time=.6)
        self.wait_until(P[9][0])
        cap2 = txt('oscila para sempre', 30, BL).next_to(g, DOWN, buff=.3)
        self.play(sig.animate.set_value(0), FadeOut(cap), run_time=2.2, rate_func=smooth)
        self.play(FadeIn(cap2, shift=UP * .2), run_time=.6)
        self.wait_until(P[10][0])
        cap3 = txt('cresce sem limite', 30, BAD).next_to(g, DOWN, buff=.3)
        self.play(sig.animate.set_value(0.55), FadeOut(cap2), run_time=2.2, rate_func=smooth)
        self.play(FadeIn(cap3, shift=UP * .2), run_time=.6)
        self.wait_until(P[11][0] - .2)


class Ep01Angulo(Timed):
    """Parágrafo 11: módulo (distância até a origem) e ângulo medido do eixo real negativo."""
    T0 = P[11][0]
    def construct(self):
        ax, lab = plane()
        VGroup(ax, lab).shift(LEFT * 3.6)
        self.add(ax, lab)
        o, b = ax.c2p(0, 0), ax.c2p(-3, 7)
        dot = Dot(b, color=Y, radius=.11)
        self.play(FadeIn(dot, scale=2), run_time=.5)
        self.wait_until(P[11][1])
        seg = Line(o, b, color=BL, stroke_width=6)
        self.play(Create(seg), run_time=1.2)
        m = txt('|s| = √(σ² + ω²)', 34, TX).move_to(UP * 1.8); m.align_to(np.array([1.0, 0, 0]), LEFT)
        self.play(Write(m), run_time=1)
        self.wait_until(P[11][2] + 1)
        m2 = txt('√58 ≈ 7,62', 36, Y).next_to(m, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(m2), run_time=1)
        self.wait_until(P[11][3])
        th = np.arctan2(7, 3)
        arc = Arc(radius=1.0, start_angle=PI, angle=-th, arc_center=o, color=BL, stroke_width=6)
        neg = DashedLine(o, ax.c2p(-6, 0), color=BL, stroke_width=3)
        self.play(Create(neg), run_time=.6)
        self.play(Create(arc), run_time=1.2)
        tl = txt('θ', 34, BL).move_to(o + 1.35 * np.array([np.cos(PI - th / 2), np.sin(PI - th / 2), 0]))
        a1 = txt('θ = tan⁻¹(7/3) ≈ 67°', 34, TX).next_to(m2, DOWN, buff=.5, aligned_edge=LEFT)
        self.play(FadeIn(tl), Write(a1), run_time=1)
        self.wait_until(P[11][4])
        a2 = txt('cos θ = 0,394', 36, Y).next_to(a1, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(Write(a2), run_time=1)
        self.wait_until(P[11][5])
        z = txt('→ vira ζ (2ª ordem)', 32, BL).next_to(a2, DOWN, buff=.3, aligned_edge=LEFT)
        self.play(FadeIn(z, shift=RIGHT * .3), Circumscribe(a2, color=Y), run_time=1.2)
        self.wait_until(P[12][0] - .2)
