# Easy gallery uploads — 313 Motorsports

## One-time installation
Upload the **contents** of `313_Motorsports_Website` into the root of your GitHub repository, keeping the `.github/workflows/update-gallery.yml` file and all folders. GitHub's web uploader may not include empty folders, but each category folder contains a README to preserve it.

## Every time you add photos
1. Open your GitHub repository and go to `assets/gallery/`.
2. Open one of these folders: `race-weekends`, `behind-the-scenes`, `team-events`, `driver-development`.
3. Click **Add file → Upload files**, select one or more JPG/PNG/WEBP photos, then **Commit changes**.
4. Open the repository **Actions** tab. Wait for **Automatically update photo and video gallery** to finish successfully.
5. Refresh your website's Gallery page (Ctrl+F5 if necessary). New photos should appear without editing JavaScript or JSON.

Photo titles are based on filenames. Example: `new-castle-race-day.jpg` becomes “New Castle Race Day”. Deleting an image and committing removes it from the gallery listing automatically.

MP4 uploads in these folders are also added to the video listing; existing YouTube links in `videos.json` are preserved. Avoid large MP4 uploads; YouTube is better for long videos.

## If the action fails with a permissions error
In the repository go to **Settings → Actions → General → Workflow permissions**, select **Read and write permissions**, and save. The workflow requires permission to commit `gallery.json` and `videos.json`. If branch protection prevents automated pushes, a repository administrator will need to allow the workflow or use a different deployment setup.

## Notes
- The workflow runs on pushes to `main` or `master`, and can also be run manually from **Actions → Automatically update photo and video gallery → Run workflow**.
- GitHub Pages publication may take a few minutes after the workflow finishes.
- Keep the folder names as written above; the generator uses them to assign categories.
- Only upload photos and videos that the team has permission to publish.
