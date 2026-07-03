# Ivan Kuang — Portfolio

Personal portfolio site for Ivan Kuang, Mechanical Engineering student at UC Berkeley.
Hosted on GitHub Pages — every push to `main` automatically deploys the site
(see `.github/workflows/static.yml`).

## How the site is organized

```
index.html                      Page shell: loads fonts, styles, libraries, and scripts
css/
  styles.css                    All custom styling (theme colors, animations, buttons)
js/
  data.js                       ★ SITE CONTENT — bio, contact info, and all project text
  tailwind-config.js            Tailwind theme (colors, fonts, animations)
  reveal.js                     Scroll-reveal animation helper
  app.jsx                       Main app: nav, hero, project grid, contact section
  components/
    ProjectCard.jsx             Project cards on the home page
    ProjectDetailPage.jsx       Full project page (sections, images, tables)
    PdfViewer.jsx               PDF page renderer, GD&T carousel, PDF modal
    Tables.jsx                  Materials and fits/tolerances tables
images/                         Project photos and renders
pdfs/                           Reports, drawings, and resume
```

## Editing the site

- **Change text, projects, or contact info** → edit `js/data.js`. Each project is
  one object in the `PROJECTS` array; the `details.sections` list fills the
  project's dedicated page.
- **Add a project** → add its image to `images/`, its PDF (if any) to `pdfs/`,
  and a new entry to `PROJECTS` in `js/data.js`.
- **Change colors/styling** → `css/styles.css` and `js/tailwind-config.js`.

## Tech notes

The site is fully static — no build step. React, Tailwind, PDF.js, and Babel are
loaded from CDNs; Babel compiles the `.jsx` files directly in the browser.

To preview locally, serve the folder over HTTP (opening `index.html` directly
from disk won't work):

```
python -m http.server 8000
# then open http://localhost:8000
```
