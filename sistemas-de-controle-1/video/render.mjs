import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
const id = process.argv[2] || '01', frames = process.argv[3];
const serveUrl = await bundle({ entryPoint: './src/index.ts', publicDir: './public' });
const opts = { browserExecutable: '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', chromiumOptions: { gl: 'swangle' } };
const composition = await selectComposition({ serveUrl, id: 'ep' + id, ...opts });
const t0 = Date.now();
await renderMedia({ composition, serveUrl, codec: 'h264', crf: 22, audioBitrate: '96k', outputLocation: `out/ep${id}${frames ? '-preview' : ''}.mp4`, concurrency: 4,
  frameRange: frames ? frames.split('-').map(Number) : undefined, ...opts,
  onProgress: ({ progress }) => { if (Math.round(progress * 100) % 10 === 0) process.stdout.write(Math.round(progress * 100) + '% '); } });
console.log('\ndone', (Date.now() - t0) / 1000, 's');
