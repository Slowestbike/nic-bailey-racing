#!/usr/bin/env python3
"""Build the list of Paddock stories from stories/*.json."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent.parent
items=[]
for p in sorted((root/'stories').glob('*.json')):
    if p.name=='index.json': continue
    story=json.loads(p.read_text(encoding='utf-8'))
    for required in ('id','date','title','body'):
        if not story.get(required): raise ValueError(f'{p}: missing {required}')
    items.append({'file':p.name,'date':story['date'],'id':story['id']})
items.sort(key=lambda x:(x['date'],x['id']),reverse=True)
(root/'stories/index.json').write_text(json.dumps(items,indent=2)+'\n',encoding='utf-8')
print(f'Indexed {len(items)} Paddock stories')
