#!/usr/bin/env python3
"""Create public gallery manifest from approved photos in assets/gallery/."""
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
FOLDER=ROOT/'assets'/'gallery'
EXTENSIONS={'.jpg','.jpeg','.png','.webp','.gif','.avif'}
categories={'race-weekends':'Race Weekends','behind-the-scenes':'Behind the Scenes','team-events':'Team Events','driver-development':'Driver Development'}
photos=[]
mp4s=[]
for path in sorted(FOLDER.rglob('*'),key=lambda p:p.as_posix().lower()):
    if not path.is_file() or path.suffix.lower() not in EXTENSIONS | {'.mp4'}:
        continue
    relative=path.relative_to(ROOT).as_posix()
    name=path.stem.replace('_',' ').replace('-',' ').strip().title()
    category=categories.get(path.relative_to(FOLDER).parts[0], 'Other')
    if path.suffix.lower()=='.mp4':
        mp4s.append({'type':'mp4','src':relative,'title':name or '313 Motorsports video','category':category})
    else:
        photos.append({'src':relative,'title':name or '313 Motorsports photo','category':category})
(ROOT/'gallery.json').write_text(json.dumps(photos,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(f'Gallery manifest updated: {len(photos)} photos')

# Preserve manually curated YouTube entries while refreshing uploaded MP4 entries.
video_manifest=ROOT/'videos.json'
try:
    existing=json.loads(video_manifest.read_text(encoding='utf-8'))
except (OSError,ValueError):
    existing=[]
youtube=[v for v in existing if isinstance(v,dict) and v.get('type')=='youtube'] if isinstance(existing,list) else []
video_manifest.write_text(json.dumps(youtube+mp4s,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(f'Video manifest updated: {len(youtube)} YouTube links and {len(mp4s)} MP4 files')
