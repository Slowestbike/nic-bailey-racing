Upload approved JPG, JPEG, PNG, WEBP, GIF or AVIF photos here using GitHub → Add file → Upload files.
The GitHub workflow will add them to the public Gallery automatically.
To customize a photo title, rename the file (e.g., 2027-season-opener.jpg).
Remove a photo by deleting it from this folder and committing the change.
Do not upload photos featuring former drivers without explicit approval.


VIDEO SUPPORT
Place .mp4 videos in the same category folders as photos. GitHub Actions will automatically add them to videos.json. For YouTube, edit videos.json in the repository and add entries like:

[{"type":"youtube","url":"https://www.youtube.com/watch?v=YOUR_VIDEO_ID","title":"Race highlights","category":"Race Weekends"}]

Keep existing entries in the array when adding more. Valid categories: Race Weekends, Behind the Scenes, Team Events, Driver Development. Use public or unlisted YouTube links that permit embedding. GitHub has a 100 MB per-file upload limit via the browser; large MP4 files are better hosted on YouTube. Do not upload unapproved footage.
