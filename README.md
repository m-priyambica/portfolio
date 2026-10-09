# M. Priyambica — Personal Portfolio

A responsive, accessible personal portfolio web application built for **Full Stack Development – Assignment 1** (SPC0701CS, B.E. CSE VII Semester, Stanley College of Engineering & Technology for Women).

It showcases my profile, education, technical skills, projects, certifications and contact details.

## Tech stack

- **HTML5** — semantic structure (`header`, `nav`, `main`, `section`, `article`, `figure`, `footer`), headings, lists, links, images, a table and a contact form
- **CSS3** — custom properties (light/dark themes), Flexbox, Grid (via Bootstrap), mobile-first media queries, animations
- **Bootstrap 5.3** — navbar, grid, cards, buttons, forms, table, alerts, badges, progress bars, collapse
- **JavaScript (ES6+)** — `const`/`let`, arrow functions, arrays/objects, loops/conditions, DOM manipulation, event handling

## Assignment requirements → where they are implemented

| Task | Requirement | Implementation |
|------|-------------|----------------|
| 1. HTML5 Structure | Home, About, Education, Skills, Projects, Contact sections; headings, lists, links, images, tables, contact form | `index.html` — all six sections; education `<table>`; `<form id="contactForm">`; `assets/profile.jpg` image |
| 2. CSS3 & Responsive | Selectors, box model, typography, colours, positioning, Flexbox/Grid, mobile-first media queries | `css/style.css` — design tokens, `position: fixed/absolute/sticky` usage, flex layouts, breakpoints at 768px / 992px (min-width) |
| 3. Bootstrap UI | Grid, navbar, cards, buttons, forms, tables, alerts | Responsive navbar, `row`/`col-*` grid, project cards, `btn` variants, form controls, `table table-hover`, `alert` messages |
| 4. JavaScript Interactivity | ES6+, DOM manipulation, ≥ 2 interactive features | **Theme switching** (dark/light, saved in `localStorage`), **skills category tabs**, **project filtering**, typing effect, animated counters, scroll reveal, back-to-top |
| 5. Validation & Integration | Event handling, client-side validation, dynamic error/success messages | `js/script.js` — field-level validation (name, email, phone, subject, message), live feedback, Bootstrap alerts, character counter |

## Project structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── profile.jpg
│   ├── favicon.svg
│   └── Priyambica_Resume.pdf
└── README.md
```

## Run locally

No build step is needed. Open `index.html` in a browser (internet connection required for the Bootstrap, icon and font CDNs).

Optional local server:

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages (optional)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<username>.github.io/<repository>/`.

## Accessibility & responsiveness

- Skip-to-content link, visible focus styles, ARIA labels and live regions
- Respects `prefers-reduced-motion` and the system colour scheme
- Mobile-first layout tested from small phones to large desktops

## Contact form

Client-side validation runs on every field. When the form is valid, the message opens in your email app (`mailto:`) addressed to the portfolio owner, and a success alert is shown.

## Author

**M. Priyambica** — B.E. Computer Science & Engineering (2023–2027)
GitHub: [m-priyambica](https://github.com/m-priyambica) · Email: priyambica25@gmail.com
