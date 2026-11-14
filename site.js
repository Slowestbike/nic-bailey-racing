// Shared navigation, page routing, form handling, and site interactions.
// Edit page content in pages/*.js instead.

let formType='general';
function render(){const hash=decodeURIComponent(location.hash.slice(1)||'home'),page=hash.split('?')[0];document.getElementById('app').innerHTML=(pages[page]||pages.home)();document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+page));document.getElementById('nav').classList.remove('open');window.scrollTo(0,0);if(page==='gallery'){document.querySelectorAll('[data-gallery-category]').forEach(b=>b.addEventListener('click',()=>{activeGalleryCategory=b.dataset.galleryCategory;render();}));document.querySelectorAll('[data-gallery-index]').forEach(b=>b.addEventListener('click',()=>{const p=galleryPhotos[Number(b.dataset.galleryIndex)];if(!p)return;const d=document.getElementById('galleryLightbox');d.querySelector('img').src=p.src;d.querySelector('img').alt=p.title;d.querySelector('figcaption').textContent=p.title;d.showModal()}));document.querySelectorAll('[data-media-type]').forEach(b=>b.addEventListener('click',()=>{activeMediaType=b.dataset.mediaType;render()}));document.querySelectorAll('[data-video-index]').forEach(b=>b.addEventListener('click',()=>playGalleryVideo(Number(b.dataset.videoIndex))))}if(page==='paddock'){document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelectorAll('.post').forEach(p=>p.classList.toggle('hidden',b.dataset.filter!=='All'&&p.dataset.category!==b.dataset.filter))}))}if(page==='contact'){const query=new URLSearchParams(hash.split('?')[1]||'');const t=query.get('type');window.selectedSponsorDriver=query.get('driver')==='10'?'Nic Bailey #10':'';formType=t==='sponsor'?'sponsor':t==='driver'?'driver':'general';setupForm();document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{formType=b.dataset.type;setupForm()}));document.getElementById('contactForm').addEventListener('submit',submitInquiry)}}
function setupForm(){document.getElementById('inquiryType').value=({general:'General inquiry',sponsor:'Sponsorship inquiry',driver:'Driver interest'})[formType];document.getElementById('inquirySubject').value=window.selectedSponsorDriver&&formType==='sponsor'?'313 Motorsports — Sponsor Nic Bailey #10':'313 Motorsports — '+formType+' inquiry';document.getElementById('formStatus').textContent='';document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.type===formType));const extra=document.getElementById('extra');extra.innerHTML=formType==='sponsor'?`<label for="org">Company / organization</label><input id="org" name="Company" required><label for="interest">How would you like to help?</label><select id="interest" name="Partnership type"><option ${window.selectedSponsorDriver?'':'selected'}>Not sure yet — let’s talk</option><option>Community Supporter</option><option>Team Partner</option><option>Driver Development Partner</option><option ${window.selectedSponsorDriver?'selected':''}>Individual driver support</option><option>Products or services (in-kind)</option><option>Another partnership idea</option></select>${window.selectedSponsorDriver?'':'selected'}>Team sponsorship</option><option ${window.selectedSponsorDriver?'selected':''}>Individual driver sponsorship</option><option>Custom partnership</option></select>${window.selectedSponsorDriver?'<div class="selected-driver"><strong>Selected driver: Nic Bailey #10</strong><p>LO206 Masters · Team owner & driver</p><input type="hidden" name="Selected driver" value="Nic Bailey #10"><a href="#contact?type=sponsor">Change to a general sponsorship inquiry</a></div>':''}<p class="muted">No minimum contribution or preset package is required. Tell us what kind of partnership interests you in your message.</p>`:formType==='driver'?'<label for="age">Driver age group</label><select id="age" name="Driver age group"><option>Junior</option><option>Senior</option><option>Masters</option><option>Not sure</option></select><label for="experience">Racing experience</label><select id="experience" name="Racing experience"><option>New to karting</option><option>Recreational</option><option>Competitive</option></select><p class="muted">For minors, a parent or guardian should submit the inquiry.</p>':'';}

document.getElementById('menu').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));window.addEventListener('hashchange',render);render();

document.addEventListener('click',e=>{const card=e.target.closest('[data-profile]');if(card)openProfile(card.dataset.profile);});
const profileDialog=document.getElementById('teamProfile');profileDialog.addEventListener('click',e=>{if(e.target===profileDialog)profileDialog.close();});
profileDialog.querySelector('.profile-close').addEventListener('click',()=>profileDialog.close());
profileDialog.querySelector('#profileAction').addEventListener('click',()=>profileDialog.close());
loadGallery();

async function submitInquiry(e){
 e.preventDefault();
 const form=e.currentTarget, status=document.getElementById('formStatus'), button=document.getElementById('formSubmit');
 button.disabled=true;button.textContent='Sending…';status.textContent='Sending your inquiry…';status.className='form-status';
 try {
  const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
  if(!response.ok)throw new Error('Form service returned '+response.status);
  status.textContent='Thank you! Your inquiry was sent successfully. We’ll be in touch soon.';
  status.className='form-status form-success';
  form.reset();
  // Keep selected driver visible after submission until the visitor changes the inquiry.
 } catch(error){
  status.textContent='Your message could not be sent. Please try again, or email 313motorsportsLLC@gmail.com directly.';
  status.className='form-status form-error';
 } finally {button.disabled=false;button.textContent='Send inquiry';}
}
