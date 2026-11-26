// gera manim/epXX.json a partir do audio-sync do site
global.window = {}; require(__dirname + '/../assets/js/audio-sync.js');
for (const id of process.argv.slice(2)) {
  const s = window.SYNC[id], paras = {};
  s.segs.forEach(([t0, t1, p]) => { (paras[p] = paras[p] || []).push(t0); });
  require('fs').writeFileSync(__dirname + `/manim/ep${id}.json`, JSON.stringify({ dur: s.dur, paras, segs: s.segs }));
}
