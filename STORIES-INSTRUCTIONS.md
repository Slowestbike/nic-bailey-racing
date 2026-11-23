# Add a Paddock story — no JavaScript editing needed

1. Open the `stories` folder in GitHub.
2. Click **Add file → Create new file**.
3. Name it something unique ending in `.json`, for example `2027-03-15-new-castle-recap.json`.
4. Copy the contents of `STORY-TEMPLATE.json.txt` and fill in your story. Use a date formatted `YYYY-MM-DD`. The date controls the order, **newest first**.
5. For images, upload them to `assets/paddock/` and put the path in the `image` field. You can omit the image by leaving its value empty.
6. Write paragraphs in the `body` using `<p>...</p>` and headings using `<h2>...</h2>`. Keep JSON quotation marks and escape any double quotes within the body (`\"`).
7. Commit changes. GitHub Actions will automatically rebuild `stories/index.json`. After Pages finishes deploying, your story appears at the top if it has the newest date.

**One-time installation:** Upload the complete website including `.github/workflows/update-stories.yml`, `paddock-stories.js`, `stories/`, `scripts/build_stories.py`, and the updated `index.html`, `site.js`, and `pages/paddock.js`. GitHub's web upload sometimes does not include hidden `.github` directories, so verify that workflow file exists in the repository after uploading. In Settings → Actions → General, workflow permissions may need Read and write permissions. Existing live gallery photos and gallery automation should be retained; do not delete those files when uploading.

**Important:** This ZIP is based on the last available website copy, which does not contain photos uploaded directly to GitHub after that copy. Do not delete your existing gallery images or overwrite your live `gallery.json` with the empty copy from this ZIP.
