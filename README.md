# Portfolio

My personal portfolio site: https://okane12.github.io/IvanK/

Static site built with React and Tailwind (loaded from CDNs, no build step).
Every push to `main` auto-deploys through GitHub Pages.

## Layout

- `index.html` — page shell, loads fonts/libraries/scripts
- `js/data.js` — all the site content: bio, contact info, and every project
- `js/app.jsx`, `js/components/` — React components for the page
- `css/styles.css` — styling
- `js/tailwind-config.js` — theme colors and fonts
- `images/`, `pdfs/` — project photos, reports, resume

To update the site, edit `js/data.js`. Adding a project = new entry in the
`PROJECTS` array plus its image/PDF in the right folder.
