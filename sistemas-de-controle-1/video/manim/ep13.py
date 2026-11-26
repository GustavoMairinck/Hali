"""Cenas Manim do episódio 13 (estabilidade). Padrão visual em theme.py / common.py."""
from common import *

P, S = load('13')
GOOD = Y


def term_row(terms, size=46, buff=.22):
    """polinômio como termos separados, para poder destacar cada um."""
    g = VGroup(*[txt('+ s²', size, TX).set_opacity(0) if t == '_' else txt(t, size, TX) for t in terms]).arrange(RIGHT, buff=buff)
    return g


def verdict(s, col, size=40):
    return txt(s, size, col, weight='SEMIBOLD')


class Ep13Bola(Timed):
    """Parágrafo 2: bolinha na tigela (volta) e no morro (rola)."""
    T0 = P[2][0]
    def construct(self):
        a, r = .38, .3
        cb, ch = np.array([-4.3, -1.2, 0]), np.array([4.3, 1.0, 0])
        bowl = FunctionGraph(lambda x: a * x * x, x_range=[-2.7, 2.7], color=Y, stroke_width=7).shift(cb)
        hill = FunctionGraph(lambda x: -a * x * x, x_range=[-2.7, 2.7], color=BAD, stroke_width=7).shift(ch)
        gy = ch[1] - a * 7.29

        def on(c, sgn, x):
            y = sgn * a * x * x
            n = np.array([-sgn * 2 * a * x, 1, 0]); n = n / np.linalg.norm(n)
            return c + np.array([x, y, 0]) + r * n

        xb = ValueTracker(0.0)   # posição da bolinha na tigela
        uh = ValueTracker(0.0)   # tempo do morro
        ball = lambda: Circle(radius=r, color=WHITE, fill_color=TX, fill_opacity=1, stroke_width=0)
        b1 = always_redraw(lambda: ball().move_to(on(cb, 1, xb.get_value())))

        def hpos():
            u = uh.get_value()
            x = .03 * (np.exp(2.2 * u) - 1)
            if x <= 2.7:
                return on(ch, -1, x)
            e = on(ch, -1, 2.7)
            k = x - 2.7
            return np.array([e[0] + k * .9, max(e[1] - k * 2.2, gy - 3.0), 0])
        b2 = always_redraw(lambda: ball().move_to(hpos()))

        t1 = verdict('volta: estável', Y).move_to([cb[0], -3.0, 0])
        t2 = verdict('rola: instável', BAD).move_to([ch[0], -3.0, 0])
        self.play(Create(bowl), Create(hill), run_time=1.2)
        self.play(FadeIn(b1, scale=.5), FadeIn(b2, scale=.5), run_time=.6)

        # tigela: empurra para o lado, solta e ela volta para o fundo
        self.wait_until(P[2][1])
        push = always_redraw(lambda: Arrow(on(cb, 1, xb.get_value()) + np.array([1.5, .9, 0]), on(cb, 1, xb.get_value()) + np.array([.32, .2, 0]), buff=0, color=BL, stroke_width=6))
        self.play(FadeIn(push), run_time=.3)
        self.play(xb.animate.set_value(-2.0), run_time=.9, rate_func=smooth)
        self.remove(push)
        u = ValueTracker(0.0)
        b1.clear_updaters(); b1.add_updater(lambda m: m.move_to(on(cb, 1, -2.0 * np.exp(-.55 * u.get_value()) * np.cos(2.3 * u.get_value()))))
        self.play(u.animate.set_value(6.5), run_time=2.8, rate_func=linear)
        self.play(FadeIn(t1, shift=UP * .2), run_time=.5)

        # morro: um empurrão pequeno e ela rola e não volta
        self.wait_until(P[2][2])
        push2 = Arrow(on(ch, -1, 0) + np.array([-1.6, .8, 0]), on(ch, -1, 0) + np.array([-.34, .1, 0]), buff=0, color=BL, stroke_width=6)
        self.play(GrowArrow(push2), run_time=.5)
        self.play(FadeOut(push2), uh.animate.set_value(2.45), run_time=2.0, rate_func=linear)
        self.play(FadeIn(t2, shift=UP * .2), run_time=.5)
        self.wait_until(P[3][0] - .1)


class Ep13Respostas(Timed):
    """Parágrafos 4 a 6: as três definições pela resposta natural."""
    T0 = P[4][0]
    def construct(self):
        defs = [
            (P[4][0], 'estável', 'tende a zero', Y, lambda t: np.exp(-.7 * t) * np.cos(4 * t)),
            (P[5][0], 'instável', 'cresce sem limite', BAD, lambda t: .04 * np.exp(.58 * t) * np.cos(4 * t)),
            (P[6][0], 'marginalmente estável', 'constante ou oscilando', BL, lambda t: .8 * np.cos(4 * t)),
        ]
        xs = [-5.7, 0, 5.7]
        for (t, name, sub, col, f), x in zip(defs, xs):
            self.wait_until(t)
            g = resp_axes(w=4.4, h=3.8).move_to([x, -1.0, 0])
            h = txt(name, 32, col, 'SEMIBOLD').next_to(g, UP, buff=.85)
            s = txt(sub, 28, MU).next_to(h, DOWN, buff=.18)
            c = g.plot(f, x_range=[0, 6, .02], color=col, stroke_width=5)
            dot = Dot(color=col, radius=.09)
            self.play(Create(g), FadeIn(h, shift=DOWN * .2), FadeIn(s), run_time=.7)
            dot.add_updater(lambda d, c=c: d.move_to(c.get_end()))
            self.add(c, dot)
            self.play(Create(c), run_time=2.6, rate_func=rate_functions.ease_in_out_sine)
            dot.clear_updaters()
            self.play(FadeOut(dot), run_time=.2)
        self.wait_until(P[7][0] - .1)


class Ep13Polos(Timed):
    """Parágrafos 8 a 11: classificação pelos polos de malha fechada."""
    T0 = P[8][0]
    def construct(self):
        xr, yr = (-6, 4), (-6, 6)
        ax, lab = plane(xr=xr, yr=yr, h=6.2)
        VGroup(ax, lab).to_edge(LEFT, buff=1.0).shift(DOWN * .15)
        L, R, A = regions(ax, xr, yr, op=.16)
        g = resp_axes(w=5.4, h=3.4).to_edge(RIGHT, buff=1.4).shift(DOWN * .3)
        gl = txt('resposta natural', 26, MU).next_to(g, UP, buff=.2)
        self.play(Create(ax), FadeIn(lab), run_time=1.2)
        self.play(Create(g), FadeIn(gl), run_time=.6)

        def curve(f, col):
            return g.plot(lambda t: np.clip(f(t), -1.4, 1.4), x_range=[0, 6, .02], color=col, stroke_width=5)

        # 9: todos à esquerda
        self.wait_until(P[9][0])
        p1, p2, p3 = pole(ax, -2, 3), pole(ax, -2, -3), pole(ax, -5, 0)
        self.play(FadeIn(L), LaggedStart(*[FadeIn(p, scale=3) for p in (p1, p2, p3)], lag_ratio=.25), run_time=1)
        c = curve(lambda t: np.exp(-.7 * t) * np.cos(3 * t), Y)
        v = verdict('estável', Y).next_to(g, DOWN, buff=.4)
        self.play(Create(c), FadeIn(v), run_time=1.4)

        # 10: um polo vai para a direita
        self.wait_until(P[10][0] + .2)
        p3r = pole(ax, 2, 0, BAD)
        c2 = curve(lambda t: .05 * np.exp(.65 * t) * np.cos(3 * t) + .03 * np.exp(.6 * t), BAD)
        v2 = verdict('instável', BAD).move_to(v)
        self.play(FadeOut(L), FadeIn(R), Transform(p3, p3r), run_time=1.3, rate_func=smooth)
        self.play(Transform(c, c2), Transform(v, v2), run_time=1)
        # ... ou polos repetidos sobre o eixo
        self.wait_until(P[10][0] + 3.0)
        q1, q2 = pole(ax, 0, 4, BAD), pole(ax, 0, -4, BAD)
        rep = VGroup(txt('×2', 26, BAD).next_to(q1, RIGHT, buff=.15), txt('×2', 26, BAD).next_to(q2, RIGHT, buff=.15))
        c3 = curve(lambda t: .2 * t * np.sin(4 * t), BAD)
        p3l = pole(ax, -5, 0)
        self.play(FadeOut(R), Transform(p1, q1), Transform(p2, q2), Transform(p3, p3l), Create(A), run_time=1.2)
        self.play(FadeIn(rep), Transform(c, c3), run_time=.8)

        # 11: simples sobre o eixo
        self.wait_until(P[11][0])
        A2 = A.copy().set_color(BL)
        q1b, q2b = pole(ax, 0, 4, BL), pole(ax, 0, -4, BL)
        c4 = curve(lambda t: .8 * np.cos(4 * t), BL)
        v3 = verdict('marginalmente estável', BL, 36).move_to(v)
        self.play(FadeOut(rep), Transform(p1, q1b), Transform(p2, q2b), Transform(A, A2), FadeIn(L), run_time=1)
        self.play(Transform(c, c4), Transform(v, v3), run_time=1)
        self.wait_until(P[12][0] - .1)


class Ep13Atalhos(Timed):
    """Parágrafos 13 a 16: os atalhos pelos coeficientes do denominador."""
    T0 = P[13][0]
    def show(self, terms, signs, col, msg, sub=None):
        row = term_row(terms, 64, buff=.5).move_to(UP * 1.2)
        tag = txt('denominador de malha fechada', 26, MU).next_to(row, UP, buff=.55)
        self.play(FadeIn(row, shift=UP * .2), FadeIn(tag), run_time=.7)
        # o sinal de cada coeficiente aparece embaixo do termo, um por um
        chips = VGroup()
        for t, sg in zip(row, signs):
            c = {'+': Y, '−': BAD, '?': BAD}[sg]
            ch = VGroup(Circle(radius=.42, color=c, stroke_width=5, fill_color=c, fill_opacity=.15), txt(sg, 44, c, 'SEMIBOLD'))
            ch.move_to([t.get_x(), row.get_bottom()[1] - .85, 0])
            chips.add(ch)
        self.play(LaggedStart(*[FadeIn(c, scale=.4) for c in chips], lag_ratio=.3), run_time=1.2)
        hot = [i for i, sg in enumerate(signs) if sg != '+']
        anims = []
        for i in hot:
            if terms[i] != '_':
                anims.append(row[i].animate.set_color(BAD))
            else:
                gap = DashedVMobject(RoundedRectangle(width=row[i].width + .2, height=row[i].height + .3, corner_radius=.1, color=BAD, stroke_width=4), num_dashes=24)
                anims.append(Create(gap.move_to(row[i])))
            anims.append(Indicate(chips[i], color=BAD, scale_factor=1.3))
        if not hot:
            anims.append(Create(SurroundingRectangle(VGroup(row, chips), color=Y, buff=.25, corner_radius=.12, stroke_width=4)))
        self.play(*anims, run_time=.8)
        v = verdict(msg, col, 44).next_to(chips, DOWN, buff=.7)
        self.play(Write(v), run_time=.8)
        out = [row, tag, v, chips]
        if sub:
            s_ = txt(sub, 32, MU).next_to(v, DOWN, buff=.35)
            self.play(FadeIn(s_, shift=UP * .15), run_time=.5)
            out.append(s_)
        return out

    def clear(self):
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=.3)

    def construct(self):
        # 13: sinais diferentes
        self.show(['s³', '+ 2s²', '− 3s', '+ 5'], '++−+', BAD, 'sinais diferentes → instável')
        self.wait_until(P[14][0] - .3); self.clear()
        # 14: falta potência (lacuna onde estaria s²)
        o = self.show(['s³', '_', '+ 4s', '+ 2'], '+?++', BAD, 'falta s² → instável ou, no máximo, marginal')
        self.wait_until(P[15][0] - .3); self.clear()
        # 15: todos presentes e positivos
        o = self.show(['s³', '+ 2s²', '+ 3s', '+ 1'], '++++', Y, 'todos positivos: não dá para concluir')
        self.wait_until(P[15][1])
        r = txt('→ critério de Routh-Hurwitz (episódio 14)', 34, BL).next_to(o[2], DOWN, buff=.4)
        self.play(FadeIn(r, shift=RIGHT * .3), run_time=.7)
        self.wait_until(P[16][0] - .3); self.clear()
        # 16: exceção de 2ª ordem
        self.show(['s²', '+ 3s', '+ 2'], '+++', Y, '2ª ordem: todos positivos = estável', 'vale só para 1ª e 2ª ordem')
        self.wait_until(P[17][0] - .1)


class Ep13Exemplos(Timed):
    """Parágrafo 17: exemplos do slide 19."""
    T0 = P[17][0]
    def frac(self, num, terms, size=44):
        n = txt(num, size, TX)
        d = term_row(terms, size, buff=.3)
        bar = Line(LEFT, RIGHT, color=TX, stroke_width=3).set_width(max(n.width, d.width) + .3)
        return VGroup(n, bar, d).arrange(DOWN, buff=.18)

    def construct(self):
        ex = [
            (P[17][1], '2', ['s³', '_', '+ s', '+ 1'], 1, 'falta s²', 'não estável', BAD),
            (P[17][2], 's + 1', ['s³', '− s²', '+ s', '+ 2'], 1, 'coeficiente negativo', 'instável', BAD),
            (P[17][3], 's + 10', ['s', '(s² + s + 1)'], 0, 'sem termo independente', 'polo na origem: não estável', BAD),
        ]
        ys = [2.55, 0, -2.55]
        for (t, num, terms, hl, why, res, col), y in zip(ex, ys):
            self.wait_until(t)
            f = self.frac(num, terms).move_to([-4.2, y, 0])
            self.play(FadeIn(f, shift=RIGHT * .3), run_time=.7)
            d = f[2]
            box = SurroundingRectangle(d[hl], color=col, buff=.1, corner_radius=.08, stroke_width=4)
            extra = []
            if terms[hl] == '_':
                extra.append(txt('s²?', 34, col).move_to(d[hl]))
            self.play(Create(box), *[FadeIn(e, scale=1.3) for e in extra], *([] if extra else [d[hl].animate.set_color(col)]), run_time=.7)
            w = txt(why, 32, MU).move_to([3.0, y + .32, 0]).align_to(np.array([-.8, 0, 0]), LEFT)
            r = txt(res, 38, col, 'SEMIBOLD').next_to(w, DOWN, buff=.15, aligned_edge=LEFT)
            self.play(FadeIn(w, shift=LEFT * .2), run_time=.5)
            self.play(Write(r), run_time=.6)
        self.wait_until(P[18][0] - .1)
