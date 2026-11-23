// Paddock stories are stored separately in stories/*.json.
const paddockEscape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function loadPaddockStories() {
  const target=document.getElementById('paddockStories');
  if(!target)return;
  try {
    const response=await fetch('stories/index.json',{cache:'no-store'});
    if(!response.ok)throw new Error('Story list unavailable');
    const files=await response.json();
    const stories=await Promise.all(files.map(async item=>{
      const r=await fetch('stories/'+encodeURIComponent(item.file),{cache:'no-store'});
      if(!r.ok)throw new Error('Could not load '+item.file);
      return r.json();
    }));
    stories.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    if(!stories.length){target.innerHTML='<p class="paddock-note">New stories are coming soon.</p>';return;}
    target.innerHTML=stories.map((story,index)=>{
      const id='story-'+String(story.id||index).replace(/[^a-z0-9-]/gi,'');
      const image=story.image?`<div class="paddock-story-art paddock-story-art-photo"><img src="${paddockEscape(story.image)}" alt="${paddockEscape(story.imageAlt||story.title)}" loading="lazy"></div>`:'';
      return `<article class="paddock-featured-story">${image}<div class="paddock-story-copy"><div class="eyebrow">${index===0?'LATEST STORY':'FROM THE PADDOCK'} · ${paddockEscape(story.category||'Team Update')}</div><h3>${paddockEscape(story.title)}</h3><p>${paddockEscape(story.summary||'')}</p><p class="paddock-story-byline">By ${paddockEscape(story.author||'313 Motorsports')} · ${paddockEscape(story.date||'')}</p><a class="paddock-inline-read" href="#${id}" data-story-open="${id}">Read the full story ↓</a></div></article><article class="paddock-inline-article" id="${id}">${story.body||''}</article>`;
    }).join('');
    target.querySelectorAll('[data-story-open]').forEach(link=>link.addEventListener('click',e=>{
      e.preventDefault();document.getElementById(link.dataset.storyOpen)?.scrollIntoView({behavior:'smooth'});
    }));
  }catch(error){console.error('Paddock stories:',error);target.innerHTML='<p class="paddock-note">Stories are temporarily unavailable. Please check back soon.</p>';}
}
