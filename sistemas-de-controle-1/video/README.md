# Vídeos explicativos

Os vídeos dos tópicos da prova (13 a 18) e o piloto (01) são gerados aqui. O resultado final fica em `../videos/episodio-XX.mp4`.

São três ferramentas com o mesmo visual (fundo #0f0f0f, amarelo #f5c518, azul #7cc4ff, fonte Inter):

- **Manim** (`manim/epXX.py`) faz as cenas de matemática: plano s, tabela de Routh, curvas. Cada cena segue o relógio do áudio (`wait_until(t)`), com os tempos de cada frase em `manim/epXX.json`.
- **Remotion** (`src/`) monta o episódio: narração, legenda palavra a palavra, título do trecho, os cartões do site (animados com GSAP, o mesmo motor de `../assets/js/anim.js`) e os clipes do Manim nos parágrafos listados em `src/episodes.ts`.
- **GSAP** anima os cartões, com a linha do tempo presa ao quadro do vídeo.

## Como gerar um episódio

```bash
npm install
python3 -m venv ../../.mvenv && ../../.mvenv/bin/pip install manim   # precisa de libpango1.0-dev e libcairo2-dev
node mkjson.js 13                     # tempos das frases a partir de ../assets/js/audio-sync.js
cd manim && ../../../.mvenv/bin/manim render ep13.py Ep13Bola -r 1200,540 --fps 30 --disable_caching
# copie os .mp4 do Manim para public/ep13/ e o áudio ../audios/topico-13.mp3 para public/ep13/
cp ../assets/js/{visuals-lib,visuals,audio-sync,anim}.js src/site/
node still.mjs 13 20 60 120           # quadros soltos para revisar
node render.mjs 13                    # vídeo completo em out/ep13.mp4
```

`render.mjs` e `still.mjs` usam o Chromium em `/opt/pw-browsers`. Em outra máquina, troque `browserExecutable` ou remova a opção.
`manim/sheet.py` monta uma grade de quadros de um vídeo para revisão.

Se um roteiro mudar, gere de novo o áudio e o `audio-sync.js`, rode `mkjson.js` e confira os índices de parágrafo das cenas e de `src/episodes.ts`.
