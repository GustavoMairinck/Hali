"""Cenas Manim do episódio 14 (Routh-Hurwitz). Padrão visual em theme.py / common.py."""
from common import *

P, S = load('14')


class Ep14Detector(Timed):
    """Parágrafo 2: o Routh é um detector de sinais, diz de que lado estão os polos."""
    T0 = P[2][0]
    def construct(self):
        xr, yr = (-4, 4), (-4, 4)
        ax, lab = plane(xr=xr, yr=yr, h=6.2)
        VGroup(ax, lab).to_edge(LEFT, buff=1.2)
        L, R, A = regions(ax, xr, yr, op=.16)
        self.play(Create(ax), FadeIn(lab), run_time=1.2)
        pts = [(-2.2, 1.6), (-1.3, -2.4), (1.4, 2.2), (2.3, -1.2)]
        qs = VGroup(*[VGroup(Circle(radius=.36, color=MU, stroke_width=3, fill_color=MU, fill_opacity=.12), txt('?', 34, TX)).move_to(ax.c2p(*p)) for p in pts])
        self.play(LaggedStart(*[FadeIn(q, scale=.3) for q in qs], lag_ratio=.2), run_time=1)
        # não diz onde: os polos ficam "borrados", mudando de lugar dentro do seu lado
        self.wait_until(P[2][1])
        jit = [(-1.4, 2.6), (-2.8, -1.0), (2.6, 1.0), (1.2, -2.5)]
        self.play(*[q.animate.move_to(ax.c2p(*p)) for q, p in zip(qs, jit)], run_time=1.1, rate_func=there_and_back)
        self.play(*[q.animate.move_to(ax.c2p(*p)) for q, p in zip(qs, [(-1.9, -.4), (-1.0, -2.9), (2.0, 2.9), (2.9, -.3)])], run_time=1.1, rate_func=there_and_back)
        # diz de que lado
        self.wait_until(P[2][2])
        self.play(Create(A), run_time=.6)
        self.play(FadeIn(L), FadeIn(R), *[q[0].animate.set_color(Y if p[0] < 0 else BAD) for q, p in zip(qs, pts)], run_time=.8)
        cl = txt('esquerda: 2', 30, Y).move_to(ax.c2p(-2, -3.4)); cr = txt('direita: 2', 30, BAD).move_to(ax.c2p(2, -3.4))
        self.play(FadeIn(cl, shift=UP * .2), FadeIn(cr, shift=UP * .2), run_time=.6)
        # a regra
        self.wait_until(P[2][3])
        x0 = 1.0
        r1 = txt('polos no semiplano direito', 32, BAD, 'SEMIBOLD').move_to([0, 1.3, 0]).align_to(np.array([x0, 0, 0]), LEFT)
        eq = txt('=', 52, TX).next_to(r1, DOWN, buff=.3).align_to(r1, LEFT).shift(RIGHT * .1)
        r2 = txt('trocas de sinal', 32, Y, 'SEMIBOLD').next_to(eq, DOWN, buff=.3).align_to(r1, LEFT)
        r3 = txt('na primeira coluna', 30, MU).next_to(r2, DOWN, buff=.15).align_to(r1, LEFT)
        self.play(FadeIn(r1, shift=LEFT * .3), run_time=.7)
        self.play(Write(eq), run_time=.4)
        self.play(FadeIn(r2, shift=LEFT * .3), FadeIn(r3), run_time=.7)
        self.play(Indicate(cr, color=BAD), run_time=.8)
        self.wait_until(P[2][4])
        st = txt('sem troca → estável', 36, Y, 'SEMIBOLD').next_to(r3, DOWN, buff=.6).align_to(r1, LEFT)
        self.play(Write(st), run_time=.8)
        self.wait_until(P[3][0] - .1)


R14 = [['1', '3', '5'], ['2', '4', '0'], ['1', '5', ''], ['−6', '', ''], ['5', '', '']]
ROWL = ['s⁴', 's³', 's²', 's¹', 's⁰']


class Ep14Tabela(Timed):
    """Parágrafos 3 a 14: monta a tabela de Routh, calcula elemento por elemento e conta as trocas."""
    T0 = P[3][0]
    CX = [-5.9, -4.3, -2.6, -0.9]      # coluna dos rótulos e três colunas de números
    RY = [1.75, .85, -.05, -.95, -1.85]

    def cell(self, r, c):
        return np.array([self.CX[c + 1], self.RY[r], 0])

    def panel(self, *mobs):
        """coloca a explicação no painel da direita, trocando a anterior."""
        new = VGroup(*mobs).arrange(DOWN, buff=.35, aligned_edge=LEFT).move_to([4.6, .0, 0]).align_to(np.array([1.4, 0, 0]), LEFT)
        anims = [FadeIn(new, shift=UP * .2)]
        if self.cur is not None:
            anims.insert(0, FadeOut(self.cur, shift=UP * .2))
        anims += [FadeOut(e) for e in self.extra]
        self.play(*anims, run_time=.6)
        self.cur = new
        self.extra = []
        return new

    def marks(self, cells_y, cells_b):
        """destaca o produto cruzado: amarelo = primeiro produto, azul = segundo."""
        bx = VGroup()
        for (r, c) in cells_y:
            bx.add(RoundedRectangle(width=1.25, height=.72, corner_radius=.1, color=Y, stroke_width=4).move_to(self.cell(r, c)))
        for (r, c) in cells_b:
            bx.add(RoundedRectangle(width=1.25, height=.72, corner_radius=.1, color=BL, stroke_width=4).move_to(self.cell(r, c)))
        return bx

    def calc(self, parts):
        """linha de conta com cores: lista de (texto, cor)."""
        return VGroup(*[txt(s, 40, c) for s, c in parts]).arrange(RIGHT, buff=.2)

    def construct(self):
        self.cur = None
        self.extra = []
        # polinômio
        terms = ['s⁴', '+ 2s³', '+ 3s²', '+ 4s', '+ 5']
        coef = ['1', '2', '3', '4', '5']
        poly = VGroup(*[txt(t, 50, TX) for t in terms]).arrange(RIGHT, buff=.28).move_to([0, 3.15, 0])
        self.wait_until(P[3][1])
        self.play(Write(poly), run_time=1.6)
        # grade da tabela
        lines = VGroup(Line([-5.3, 2.25, 0], [-5.3, -2.3, 0], color=AXIS, stroke_width=3))
        labs = VGroup(*[txt(l, 36, Y, 'SEMIBOLD').move_to([self.CX[0], y, 0]) for l, y in zip(ROWL, self.RY)])
        self.play(Create(lines), LaggedStart(*[FadeIn(l, shift=RIGHT * .2) for l in labs], lag_ratio=.15), run_time=1.2)
        V = [[None] * 3 for _ in range(5)]

        def fly(k, r, c):
            src = poly[k]
            m = txt(coef[k], 44, TX).move_to(src.get_center())
            V[r][c] = m
            return Succession(src.animate(run_time=.25).set_color(Y), AnimationGroup(m.animate.move_to(self.cell(r, c)), src.animate.set_color(TX), run_time=.8))

        # linha s⁴: pulando um
        self.wait_until(P[4][0])
        self.panel(txt('1ª linha: pulando um', 36, TX), txt('1, 3, 5', 40, Y))
        self.play(LaggedStart(fly(0, 0, 0), fly(2, 0, 1), fly(4, 0, 2), lag_ratio=.45), run_time=2.4)
        # linha s³: os que sobraram + zero
        self.wait_until(P[5][0])
        self.panel(txt('2ª linha: os que sobraram', 36, TX), txt('2, 4 e completa com 0', 40, Y))
        self.play(LaggedStart(fly(1, 1, 0), fly(3, 1, 1), lag_ratio=.45), run_time=1.8)
        z = txt('0', 44, MU).move_to(self.cell(1, 2)); V[1][2] = z
        self.play(FadeIn(z, scale=1.6), run_time=.5)

        # a regra do elemento, com o esquema de cores que se repete nas contas
        self.wait_until(P[6][0])
        g = VGroup(txt('a', 50, BL), txt('b', 50, Y), txt('c', 50, Y), txt('d', 50, BL))
        g[0].move_to([0, .6, 0]); g[1].move_to([1.4, .6, 0]); g[2].move_to([0, -.4, 0]); g[3].move_to([1.4, -.4, 0])
        x1 = Line(g[2].get_center(), g[1].get_center(), color=Y, stroke_width=3).scale(.55)
        x2 = Line(g[0].get_center(), g[3].get_center(), color=BL, stroke_width=3).scale(.55)
        sch = VGroup(g, x1, x2)
        f = self.calc([('(', TX), ('c·b', Y), (' − ', TX), ('a·d', BL), (') ÷ c', TX)])
        self.panel(txt('3ª linha em diante', 34, MU), sch, f, txt('c = pivô de baixo', 30, MU))
        self.play(Create(x1), Create(x2), run_time=.8)
        # o pivô é o primeiro de cada linha
        self.wait_until(P[6][1])
        pv = VGroup(*[RoundedRectangle(width=1.25, height=.72, corner_radius=.1, color=TX, stroke_width=3).move_to(self.cell(r, 0)) for r in (0, 1)])
        pt = txt('pivôs', 30, TX).move_to([self.CX[1], self.RY[2], 0])
        self.play(Create(pv), FadeIn(pt), run_time=.8)
        self.wait_until(P[7][0])
        q2 = txt('questão 2 da lista', 28, BL).to_corner(DL, buff=.5)
        self.play(FadeOut(pv), FadeOut(pt), FadeIn(q2), run_time=.6)

        def step(t_show, ys, bs, parts, res, r, c, col=TX, t_res=None):
            self.wait_until(t_show)
            mk = self.marks(ys, bs)
            line = self.calc(parts)
            self.play(Create(mk), run_time=.6)
            self.panel(txt('linha ' + ROWL[r] + ', ' + ('1º' if c == 0 else '2º') + ' elemento', 32, MU), line)
            if t_res:
                self.wait_until(t_res)
            out = txt('= ' + res, 48, col, 'SEMIBOLD').next_to(line, DOWN, buff=.35, aligned_edge=LEFT)
            self.play(Write(out), run_time=.6)
            self.extra.append(out)
            m = txt(res, 44, col).move_to(out[1:].get_center())
            V[r][c] = m
            self.play(m.animate.move_to(self.cell(r, c)), FadeOut(mk), run_time=.9)

        # s², 1º: (2·3 − 1·4)/2 = 1
        step(P[8][0], [(1, 0), (0, 1)], [(0, 0), (1, 1)], [('(', TX), ('2·3', Y), (' − ', TX), ('1·4', BL), (') ÷ 2', TX)], '1', 2, 0, t_res=P[8][1])
        # s², 2º: (2·5 − 1·0)/2 = 5
        step(P[9][0] + .3, [(1, 0), (0, 2)], [(0, 0), (1, 2)], [('(', TX), ('2·5', Y), (' − ', TX), ('1·0', BL), (') ÷ 2', TX)], '5', 2, 1, t_res=P[9][0] + 3.6)
        # s¹: (1·4 − 2·5)/1 = −6
        step(P[10][0] + .3, [(2, 0), (1, 1)], [(1, 0), (2, 1)], [('(', TX), ('1·4', Y), (' − ', TX), ('2·5', BL), (') ÷ 1', TX)], '−6', 3, 0, col=BAD, t_res=P[10][1])
        # s⁰: (−6·5 − 1·0)/(−6) = 5
        step(P[11][0], [(3, 0), (2, 1)], [(2, 0), (3, 1)], [('(', TX), ('−6·5', Y), (' − ', TX), ('1·0', BL), (') ÷ (−6)', TX)], '5', 4, 0)

        # primeira coluna
        self.wait_until(P[12][0])
        colbox = RoundedRectangle(width=1.45, height=4.55, corner_radius=.15, color=Y, stroke_width=4).move_to([self.CX[1], (self.RY[0] + self.RY[4]) / 2, 0])
        sq = VGroup(*[txt(a, 40, c) for a, c in [('1,', Y), ('2,', Y), ('1,', Y), ('−6,', BAD), ('5', Y)]]).arrange(RIGHT, buff=.3, aligned_edge=DOWN)
        self.play(Create(colbox), *[V[r][0].animate.set_color(BAD if r == 3 else Y) for r in range(5)], *[V[r][c].animate.set_opacity(.3) for r in range(5) for c in (1, 2) if V[r][c] is not None], run_time=.8)
        self.panel(txt('primeira coluna', 32, MU), sq)
        # trocas de sinal
        def swap(r1, r2, n):
            a, b = self.cell(r1, 0) + RIGHT * .8, self.cell(r2, 0) + RIGHT * .8
            arc = CurvedArrow(a, b, angle=-PI / 1.6, color=BAD, stroke_width=5, tip_length=.2)
            tag = txt(n, 30, BAD, 'SEMIBOLD').next_to(arc, RIGHT, buff=.12).shift(DOWN * .14)
            return arc, tag
        self.wait_until(P[13][0])
        a1, t1 = swap(2, 3, '1ª troca')
        self.play(Create(a1), FadeIn(t1), Indicate(V[3][0], color=BAD), run_time=1)
        self.wait_until(P[13][1])
        a2, t2 = swap(3, 4, '2ª troca')
        self.play(Create(a2), FadeIn(t2), Indicate(V[4][0], color=Y), run_time=1)
        # conclusão
        self.wait_until(P[14][0])
        self.panel(txt('instável', 52, BAD, 'SEMIBOLD'), txt('2 trocas = 2 polos', 34, TX), txt('no semiplano direito', 34, TX))
        # conferência no computador: as raízes no plano s
        self.wait_until(P[14][1])
        xr, yr = (-2, 1), (-2.2, 2.2)
        ax = Axes(x_range=[xr[0], xr[1], .5], y_range=[yr[0], yr[1], .5], x_length=4.0, y_length=4.2,
                  axis_config={'color': AXIS, 'stroke_width': 2, 'include_ticks': True, 'tick_size': .04}, tips=False)
        ax.move_to([4.4, -.7, 0])
        Lr, Rr, Ar = regions(ax, xr, yr, op=.14)
        ps = VGroup(pole(ax, -1.29, .86), pole(ax, -1.29, -.86), pole(ax, .29, 1.42, BAD), pole(ax, .29, -1.42, BAD))
        cap = txt('raízes conferidas no computador', 26, MU).next_to(ax, UP, buff=.45)
        cap.add(txt('σ', 26, TX).next_to(ax.c2p(1, 0), RIGHT, buff=.1), txt('jω', 26, TX).next_to(ax.c2p(0, 2.2), RIGHT, buff=.12).shift(DOWN * .2))
        self.play(FadeOut(self.cur), *[FadeOut(e) for e in self.extra], run_time=.4)
        self.cur = None
        self.play(FadeIn(Lr), FadeIn(Rr), Create(ax), FadeIn(cap), run_time=.9)
        self.play(LaggedStart(*[FadeIn(p, scale=3) for p in ps], lag_ratio=.25), run_time=1.2)
        l1 = txt('−1,29 ± j0,86', 26, Y).next_to(ax.c2p(-1.29, .86), LEFT, buff=.3)
        l2 = txt('0,29 ± j1,42', 26, BAD).next_to(ax.c2p(.29, -1.42), DOWN, buff=.25)
        self.wait_until(P[14][1] + 3.5)
        self.play(FadeIn(l1), run_time=.5)
        self.wait_until(P[14][1] + 7)
        self.play(FadeIn(l2), Indicate(VGroup(ps[2], ps[3]), color=BAD), run_time=.9)
        self.wait_until(P[15][0] - .1)
