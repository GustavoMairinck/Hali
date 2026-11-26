// uso: node still.mjs 13 t1 t2 ...  -> out/stills/13_t.png
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import fs from 'fs';
const [id, ...ts] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: './src/index.ts', publicDir: './public' });
const opts = { browserExecutable: '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', chromiumOptions: { gl: 'swangle' } };
const composition = await selectComposition({ serveUrl, id: 'ep' + id, ...opts });
fs.mkdirSync('out/stills', { recursive: true });
for (const t of ts) await renderStill({ composition, serveUrl, frame: Math.round(+t * 30), output: `out/stills/${id}_${t}.png`, ...opts });
console.log('ok');
