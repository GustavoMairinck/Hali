# uso: sheet.py video.mp4 out.png t1 t2 ...  (grade 3 colunas, cada quadro 600x270 com o tempo)
import sys, subprocess
from PIL import Image, ImageDraw
v, out, ts = sys.argv[1], sys.argv[2], [float(x) for x in sys.argv[3:]]
ims = []
for t in ts:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', v, '-frames:v', '1', '/tmp/claude-0/sheets/_f.png'], check=True)
    im = Image.open('/tmp/claude-0/sheets/_f.png').convert('RGB'); im = im.resize((600, int(600 * im.size[1] / im.size[0])))
    ImageDraw.Draw(im).text((6, 4), '%.1f' % t, fill=(255, 80, 80)); ims.append(im)
w, h = ims[0].size; c = 3; r = (len(ims) + c - 1) // c
o = Image.new('RGB', (w * c, h * r), (60, 60, 60))
for i, im in enumerate(ims): o.paste(im, ((i % c) * w, (i // c) * h))
o.save(out)
