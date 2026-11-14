// Shared site data, helper functions, media gallery, and partners.
// EDIT PRICES HERE when 313 Motorsports finalizes service rates.
// Example: change 'To be announced' to '$75 / hour'.
const serviceRates = [
  {name:'Driver development & coaching', rate:'To be announced', note:'Individual or group coaching details available by inquiry.'},
  {name:'Race-day support', rate:'To be announced', note:'Race-weekend assistance tailored to the event.'},
  {name:'Team participation', rate:'To be announced', note:'Participation arrangements depend on the program and availability.'},
  {name:'New driver & parent guidance', rate:'To be announced', note:'Getting-started guidance for drivers and families.'},
  {name:'Kart setup & technical support', rate:'To be announced', note:'Equipment assessment, preparation and setup support.'},
  {name:'Arrive & drive / team kart opportunities', rate:'To be announced', note:'By inquiry; kart, schedule and driver suitability determine availability. No seat is guaranteed.'}
];
const servicePricingCards = () => serviceRates.map((item) => `<article class="service-price-card"><div class="service-price-top"><span class="service-price-label">SERVICE PRICING</span><span class="service-price-status">AVAILABLE · BY INQUIRY</span></div><h3>${item.name}</h3><div class="service-price-value">${item.rate}</div><p>${item.note}</p><a class="service-price-link" href="#contact?type=services">Ask about this service →</a></article>`).join('');

const link=(hash,label,alt=false)=>`<a class="btn ${alt?'alt':''}" href="#${hash}">${label}</a>`;
const hero=(eyebrow,title,desc,actions='')=>`<div class="hero"><div class="wrap"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="lead">${desc}</p><div class="buttons">${actions}</div></div></div>`;
const card=(tag,title,desc,extra='',red=false)=>`<article class="card ${red?'red':''}"><div class="kicker">${tag}</div><h3>${title}</h3><p>${desc}</p>${extra}</article>`;
const teamProfiles={
 '10':{name:'Nic Bailey',role:'Team owner & driver',className:'LO206 Masters',status:'Active team driver',bio:'Founder of 313 Motorsports in 2023. Raised around racing and inspired by a lifelong goal of becoming a driver, Nic is focused on competing, sharing what he has learned, and helping others discover karting.',photo:'Photo coming soon',action:'Sponsor This Driver',actionUrl:'#contact?type=sponsor&driver=10'},
 '20':{name:'Driver not yet assigned',role:'313 Motorsports team kart',className:'To be determined',status:'In the team garage',bio:'Kart #20 is part of the 313 Motorsports garage. Driver assignment and participation plans have not been announced.',photo:'Kart photo coming soon',action:'Ask about team opportunities',actionUrl:'#contact?type=driver'},
 '88':{name:'Driver not yet assigned',role:'313 Motorsports team kart',className:'To be determined',status:'In the team garage',bio:'Kart #88 is part of the 313 Motorsports garage. Driver assignment and participation plans have not been announced.',photo:'Kart photo coming soon',action:'Ask about team opportunities',actionUrl:'#contact?type=driver'},
 '313':{name:'Driver not yet assigned',role:'313 Motorsports team kart',className:'To be determined',status:'In the team garage',bio:'Kart #313 represents the team name and its next chapter. Driver assignment and participation plans have not been announced.',photo:'Kart photo coming soon',action:'Ask about team opportunities',actionUrl:'#contact?type=driver'}
};
const teamCard=(num,name,detail)=>`<button type="button" class="team-card" data-profile="${num}" aria-label="View profile for kart ${num}"><span class="team-number">#${num}</span><span class="kicker">${num==='10'?'TEAM OWNER / DRIVER':'313 MOTORSPORTS GARAGE'}</span><span class="team-name">${name}</span><span class="team-detail">${detail}</span><span class="team-link">VIEW PROFILE →</span></button>`;
function openProfile(num){const profile=teamProfiles[num],dlg=document.getElementById('teamProfile');if(!profile||!dlg)return;document.getElementById('profileNumber').textContent='#'+num;document.getElementById('profileName').textContent=profile.name;document.getElementById('profileRole').textContent=profile.role;document.getElementById('profileClass').textContent=profile.className;document.getElementById('profileStatus').textContent=profile.status;document.getElementById('profileBio').textContent=profile.bio;document.getElementById('profilePhoto').textContent=profile.photo;const a=document.getElementById('profileAction');a.textContent=profile.action;a.href=profile.actionUrl;dlg.showModal();}
// Gallery keeps the existing category filtering and photo viewer.
// MP4 files are indexed by GitHub Actions; YouTube entries live in videos.json.
let galleryPhotos=[];
let galleryVideos=[];
let activeGalleryCategory='All Photos';
let activeMediaType='all';
const galleryCategories=['All Photos','Race Weekends','Behind the Scenes','Team Events','Driver Development'];
const mediaTypes=[['all','All Media'],['photos','Photos'],['videos','Videos']];
const galleryEscape=(value)=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function youtubeId(value){
  if(typeof value!=='string')return null;
  try {const u=new URL(value);const h=u.hostname.toLowerCase().replace(/^www\./,'');let id=null;
    if(h==='youtu.be')id=u.pathname.slice(1).split('/')[0];
    else if(h==='youtube.com'||h==='m.youtube.com'||h==='youtube-nocookie.com')id=u.pathname.startsWith('/shorts/')||u.pathname.startsWith('/embed/')?u.pathname.split('/')[2]:u.pathname==='/watch'?u.searchParams.get('v'):null;
    return /^[a-zA-Z0-9_-]{11}$/.test(id||'')?id:null;
  }catch{return null;}
}
async function loadGallery(){
  try {
    const [photosResponse,videosResponse]=await Promise.all([fetch('gallery.json?updated='+Date.now(),{cache:'no-store'}),fetch('videos.json?updated='+Date.now(),{cache:'no-store'})]);
    if(photosResponse.ok){const photos=await photosResponse.json();galleryPhotos=Array.isArray(photos)?photos.filter(p=>typeof p.src==='string'&&p.src.startsWith('assets/gallery/')&&typeof p.title==='string'):[];}
    if(videosResponse.ok){const videos=await videosResponse.json();galleryVideos=Array.isArray(videos)?videos.filter(v=>v&&typeof v.title==='string'&&['youtube','mp4'].includes(v.type)&&(v.type==='youtube'?!!youtubeId(v.url):typeof v.src==='string'&&v.src.startsWith('assets/gallery/')&&/\.mp4$/i.test(v.src))):[];}
  }catch(error){console.info('Gallery media will appear when published.',error.message);}
  if((location.hash.slice(1)||'home').split('?')[0]==='gallery')render();
}
const galleryPage=()=>{
  const photos=galleryPhotos.map(p=>({...p,type:'photo'}));
  const videos=galleryVideos;
  const combined=[...(activeMediaType==='videos'?[]:photos),...(activeMediaType==='photos'?[]:videos)];
  const visible=activeGalleryCategory==='All Photos'?combined:combined.filter(p=>p.category===activeGalleryCategory);
  const types=mediaTypes.map(([key,label])=>`<button type="button" class="gallery-filter ${activeMediaType===key?'selected':''}" data-media-type="${key}" aria-pressed="${activeMediaType===key}">${label}</button>`).join('');
  const tabs=galleryCategories.map(c=>`<button type="button" class="gallery-filter ${activeGalleryCategory===c?'selected':''}" data-gallery-category="${c}" aria-pressed="${activeGalleryCategory===c}">${c}</button>`).join('');
  const content=visible.length?`<div class="team-photo-grid">${visible.map(p=>{
    const index=p.type==='photo'?galleryPhotos.indexOf(galleryPhotos.find(x=>x.src===p.src)):galleryVideos.indexOf(p);
    const isVideo=p.type!=='photo';
    const thumb=p.type==='youtube'?`<img src="https://i.ytimg.com/vi/${youtubeId(p.url)}/hqdefault.jpg" alt="" loading="lazy">`:p.type==='photo'?`<img src="${galleryEscape(p.src)}" alt="" loading="lazy">`:`<div class="gallery-video-placeholder" aria-hidden="true">313 <span>▶</span></div>`;
    return `<button type="button" class="photo-card" data-${isVideo?'video':'gallery'}-index="${index}" aria-label="${isVideo?'Play':'View'} ${galleryEscape(p.title)}"><div class="gallery-thumb">${thumb}${isVideo?'<span class="gallery-play" aria-hidden="true">▶</span>':''}</div><span>${galleryEscape(p.title)}</span><small>${galleryEscape(p.category||'313 Motorsports')} · ${isVideo?'Video':'Photo'}</small></button>`;
  }).join('')}</div>`:`<div class="gallery-empty"><div class="gallery-empty-mark">313</div><h3>COMING SOON</h3><p>Approved team photos and videos will appear here. Try another filter or check back after race weekend.</p></div>`;
  return hero('313 Motorsports gallery','Life at the track.','A look behind the scenes, on race day, and throughout the 313 Motorsports journey.')+`<section class="section-dark"><div class="wrap"><div class="eyebrow">TEAM MEDIA GALLERY</div><h2>THE MOMENTS THAT MATTER.</h2><p>Browse approved 313 Motorsports photos, race footage, and highlights.</p><div class="gallery-filters" role="group" aria-label="Filter media type">${types}</div><div class="gallery-filters" role="group" aria-label="Filter gallery category">${tabs}</div>${content}</div></section>`;
};
function playGalleryVideo(index){
  const v=galleryVideos[index],d=document.getElementById('galleryVideoDialog');if(!v||!d)return;
  const frame=d.querySelector('.gallery-video-content');frame.replaceChildren();
  if(v.type==='youtube'){
    const id=youtubeId(v.url);if(!id)return;
    const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;iframe.title=v.title;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';frame.append(iframe);
  }else{
    const video=document.createElement('video');video.src=v.src;video.controls=true;video.autoplay=true;video.playsInline=true;video.preload='metadata';frame.append(video);
  }
  d.querySelector('.gallery-video-title').textContent=v.title;d.showModal();
}
// Current partners: reorder entries to change display order; set featured:true for optional priority styling.
const currentPartners = [
  {name:'A2Z Mechanical', logo:'assets/partners/a2z-mechanical.jpg', url:'https://www.facebook.com/p/A2Z-Mechanical-61568427236015/', featured:false},
  {name:'Elite Earth Workx', logo:'assets/partners/elite-earth-workx.jpg', url:'https://www.facebook.com/eliteearthworkx/', featured:false}
];
function currentPartnerCards(){return currentPartners.map(p=>`<a class="partner-card${p.featured?' partner-featured':''}" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${p.name} on Facebook"><span class="partner-logo"><img src="${p.logo}" alt="${p.name} logo" loading="lazy"></span><strong>${p.name}</strong><span class="partner-visit">Visit partner ↗</span></a>`).join('');}


const pages = {};
