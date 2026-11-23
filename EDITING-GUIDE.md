# 313 Motorsports — Page-by-page editing

Each page now has its own JavaScript file in `pages/`:

- `home.js` — Homepage
- `sponsor.js` — Sponsors and partner cards (partner data is in `site-core.js`)
- `services.js` — Services
- `paddock.js` — The Paddock and featured story
- `gallery.js` — Gallery page entry (gallery renderer and media logic are shared in `site-core.js`)
- `karting.js` — New to Karting
- `contact.js` — Contact page

To edit a page, edit its corresponding file, save, commit/push that file to GitHub. Keep all files in the same folder structure. `index.html` loads the shared code, all page files, then `site.js` for navigation and forms.

`style.css` is shared across pages. `site-core.js` holds shared helpers, driver profiles, partners, and gallery functions. `site.js` handles routing, navigation, and forms. The existing content has been preserved; this change is organizational, not a redesign.

To preview locally, run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Do not open index.html as a file because the gallery fetches JSON.
