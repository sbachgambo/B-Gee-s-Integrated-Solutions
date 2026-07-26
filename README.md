# B-Gee's Integrated Solutions — Website

Premium multi-service company website for **B-Gee's Integrated Solutions**, a Nigerian
multidisciplinary firm offering home &amp; property finishing, real estate, HR outsourcing
and automotive maintenance.

A modern, motion-rich static website built with plain **HTML, CSS and JavaScript** — no
build step required.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Portfolio | `portfolio.html` |
| Insights / Blog | `blog.html` |
| Request a Quote | `quote.html` |
| Contact | `contact.html` |
| Privacy Policy | `privacy.html` |
| Terms &amp; Conditions | `terms.html` |

## Features

- Responsive design (mobile-first) with an animated slide-in mobile menu
- Scroll-reveal animations, animated stat counters, and a scroll-progress bar
- Sticky header that solidifies on scroll
- Auto-playing testimonial carousel
- Image-backed service cards, filterable portfolio grid, and a blog with article modals
- Toast notifications on form submission, back-to-top and WhatsApp quick-chat buttons
- Authentic Nigerian/African photography, stored locally in `assets/images/`
- Respects `prefers-reduced-motion`

## Structure

```
├── index.html, about.html, services.html, ...   # pages
├── css/style.css                                # design system + animations
├── js/main.js                                   # interaction & motion engine
└── assets/
    ├── favicon.svg
    └── images/                                  # local photography
```

## Running locally

It's a static site — open `index.html` in any browser, or serve the folder:

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

## Brand

- **Deep Navy** `#0A1A2F` · **Electric Blue** `#236BFF` · **Gold** `#E7B84B`
- Fonts: Playfair Display (headings) + Inter (body)
