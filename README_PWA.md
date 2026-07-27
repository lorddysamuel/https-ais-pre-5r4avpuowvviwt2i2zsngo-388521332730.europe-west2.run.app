PWA helper: generating PNG icons and updated metadata

This branch adds updated manifest and HTML metadata and a small Node script to generate PNG icons from the existing SVGs.

Steps to produce final PNG icons locally and add them to the repo:

1. Install dependencies

   npm init -y
   npm install sharp

2. Run the generator

   node generate-pngs.js

   This will produce:
   - icon-192.png
   - favicon-32x32.png
   - icon-512.png
   - apple-touch-icon-180x180.png

3. Verify the files look correct, then add and commit them:

   git add icon-192.png icon-512.png apple-touch-icon-180x180.png favicon-32x32.png
   git commit -m "chore(pwa): add generated PNG icons"
   git push origin pwa/fix-icons-manifest

Notes
- I did not add binary PNGs in this commit; the script lets you generate them locally so the repo history doesn't contain large binaries unless you choose to add them.
- If you want, I can also add the generated PNGs in this branch for you — tell me and I'll commit them.
