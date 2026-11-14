# 313 Motorsports — GitHub Pages website

Official team website. The design uses a shared transparent 313 Motorsports logo and hash-based navigation, so all pages work on GitHub Pages without a server.

## Publish
1. Extract the ZIP **before** uploading. Upload the contents (including hidden `.github/`) into the root of a GitHub repository, not the enclosing folder or ZIP itself.
2. In repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
3. Open the GitHub Pages URL and check Home, Sponsor, Services, The Paddock, Gallery, New to Karting and Contact on desktop and mobile.
4. For automatic gallery updates, ensure Actions are enabled and GitHub Actions has **Read and write permissions** in Settings → Actions → General → Workflow permissions. Check any branch protection rules before relying on auto-commits.
5. When you purchase a custom domain, configure it in Settings → Pages and update DNS at your registrar; enable HTTPS after DNS resolves.

## Contact forms
All General, Sponsorship and Driver Interest inquiries use `https://formspree.io/f/mljjkzgv`. Verify Formspree notifications go to `313motorsportsLLC@gmail.com`, and send a live test from the published HTTPS site. Test the Nic Bailey #10 sponsorship button too. Delivery cannot be verified offline.

## Gallery
Place approved photos and small MP4 files in `assets/gallery/race-weekends/`, `behind-the-scenes/`, `team-events/`, or `driver-development/`. The workflow generates `gallery.json` and preserves YouTube entries in `videos.json`. Add public YouTube URLs to `videos.json` using `VIDEO-GALLERY-GUIDE.txt`. Do not upload unapproved or former-driver photos. GitHub browser uploads are limited to 25 MiB per file; YouTube is better for long videos.

## Updating the website
- Text and services: `site.js` (`serviceRates` controls service prices).
- Colors, layout and mobile styles: `style.css`.
- Header logo: `assets/313-logo.png` (transparent PNG).
- Photos: approved files in `assets/gallery/`.
- YouTube: `videos.json`.

## Before announcing the site
- Confirm every contact form submits and email arrives.
- Test mobile navigation and media playback.
- Verify gallery auto-update after an upload.
- Review draft Paddock stories, beginner resources, pricing marked TBA, and all text for publication readiness.

The site has not been deployed or browser-tested live as part of this package. No server or paid hosting is included.
