"""Base comum das cenas: relógio preso ao áudio, plano s e polos no padrão visual."""
import json, os, numpy as np
from manim import *
from theme import *


def load(ep):
    S = json.load(open(os.path.join(os.path.dirname(__file__), 'ep%s.json' % ep)))
    return {int(k): v for k, v in S['paras'].items()}, S


class Timed(Scene):
    """wait_until(t) espera até o instante t (segundos do áudio)."""
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


def label(pt, s, off=UP * .3, col=TX, fs=30):
    return txt(s, fs, col).move_to(pt + off)


def plane(xr=(-8, 4), yr=(-8, 8), h=6.6):
    ax = Axes(x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1], x_length=h * (xr[1] - xr[0]) / (yr[1] - yr[0]) * 1.25, y_length=h,
              axis_config={'color': AXIS, 'stroke_width': 2, 'tip_width': .18, 'tip_height': .18, 'include_ticks': True, 'tick_size': .05},
              tips=True)
    ls = label(ax.x_axis.get_end(), 'σ', DOWN * .35 + LEFT * .1)
    lw = label(ax.y_axis.get_end(), 'jω', LEFT * .35)
    return ax, VGroup(ls, lw)


def pole(ax, x, y, col=Y, sz=.17):
    p = ax.c2p(x, y)
    return VGroup(Line(p + (-sz, -sz, 0), p + (sz, sz, 0), color=col, stroke_width=6),
                  Line(p + (-sz, sz, 0), p + (sz, -sz, 0), color=col, stroke_width=6))


def regions(ax, xr, yr, op=.12):
    """faixa esquerda (estável), direita (instável) e o eixo jω (marginal)."""
    w0 = ax.c2p(0, 0)[0]
    h = ax.c2p(0, yr[1])[1] - ax.c2p(0, yr[0])[1]
    L = Rectangle(width=w0 - ax.c2p(xr[0], 0)[0], height=h, fill_color=Y, fill_opacity=op, stroke_width=0).move_to(ax.c2p(xr[0] / 2, (yr[0] + yr[1]) / 2))
    R = Rectangle(width=ax.c2p(xr[1], 0)[0] - w0, height=h, fill_color=BAD, fill_opacity=op, stroke_width=0).move_to(ax.c2p(xr[1] / 2, (yr[0] + yr[1]) / 2))
    A = Line(ax.c2p(0, yr[0]), ax.c2p(0, yr[1]), color=BL, stroke_width=6)
    return L, R, A


def resp_axes(w=5.6, h=3.4, yr=(-1.4, 1.4), T=6):
    return Axes(x_range=[0, T, 1], y_range=[yr[0], yr[1], 1], x_length=w, y_length=h,
                axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': False}, tips=False)


def step_resp(num, den, T=30.0, n=600):
    """resposta ao degrau de num/den (coeficientes em potências decrescentes de s), RK4."""
    den = np.array(den, float); num = np.array(num, float)
    a = den / den[0]; b = np.zeros(len(a)); b[len(a) - len(num):] = num / den[0]
    N = len(a) - 1
    A = np.zeros((N, N)); A[:-1, 1:] = np.eye(N - 1); A[-1, :] = -a[1:][::-1]
    C = (b[1:] - b[0] * a[1:])[::-1]
    x = np.zeros(N); dt = T / n; ts = [0.0]; ys = [b[0]]
    f = lambda x: A @ x + np.eye(N)[-1]
    for k in range(n):
        k1 = f(x); k2 = f(x + dt / 2 * k1); k3 = f(x + dt / 2 * k2); k4 = f(x + dt * k3)
        x = x + dt / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
        ts.append((k + 1) * dt); ys.append(C @ x + b[0])
    return np.array(ts), np.array(ys)


class RouthMixin:
    """tabela de Routh com painel de explicação à direita (mesmo visual do episódio 14)."""
    CX = [-5.9, -4.3, -2.6, -0.9]
    RY = [1.75, .85, -.05, -.95, -1.85]
    PX = 1.4

    def cell(self, r, c):
        return np.array([self.CX[c + 1], self.RY[r], 0])

    def panel(self, *mobs):
        new = VGroup(*mobs).arrange(DOWN, buff=.35, aligned_edge=LEFT).move_to([4.6, .0, 0]).align_to(np.array([self.PX, 0, 0]), LEFT)
        anims = [FadeIn(new, shift=UP * .2)]
        if self.cur is not None:
            anims.insert(0, FadeOut(self.cur, shift=UP * .2))
        anims += [FadeOut(e) for e in self.extra]
        self.play(*anims, run_time=.6)
        self.cur = new
        self.extra = []
        return new

    def marks(self, cells_y, cells_b, w=1.25):
        bx = VGroup()
        for (r, c) in cells_y:
            bx.add(RoundedRectangle(width=w, height=.72, corner_radius=.1, color=Y, stroke_width=4).move_to(self.cell(r, c)))
        for (r, c) in cells_b:
            bx.add(RoundedRectangle(width=w, height=.72, corner_radius=.1, color=BL, stroke_width=4).move_to(self.cell(r, c)))
        return bx

    def calc(self, parts, size=40):
        return VGroup(*[txt(s, size, c) for s, c in parts]).arrange(RIGHT, buff=.2)

    def grid(self, rowl):
        lines = VGroup(Line([self.CX[0] + .6, 2.25, 0], [self.CX[0] + .6, -2.3, 0], color=AXIS, stroke_width=3))
        labs = VGroup(*[txt(l, 36, Y, 'SEMIBOLD').move_to([self.CX[0], y, 0]) for l, y in zip(rowl, self.RY)])
        return lines, labs
