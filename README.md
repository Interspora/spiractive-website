# Spiractive Trading Intelligence — Public Website

Static, dependency-free storefront (HTML/CSS/vanilla JS, system fonts, no build step, no external requests).
Sell the service first; the ArbOS validation engine stays private behind the operator.

## Files

| File | Purpose |
|---|---|
| `index.html` | Full site: hero, problem, what we test, case study, deliverables, pricing, intake form, FAQ, disclaimer, contact |
| `sample-report.html` | Public-safe sample validation report (print-to-PDF ready) |
| `styles.css` | All styling, responsive + print rules |
| `app.js` | Mobile nav, payment-button wiring, intake-form submission |
| `LAUNCH_CHECKLIST.md` | Everything Floyd must provide/do before and at launch |

## Run locally

```bash
cd spiractive-website
python3 -m http.server 8080
# open http://localhost:8080/
```

## Deploy (any static host — pick one)

- **Hostinger Website Builder / static hosting:** upload the 4 site files (`index.html`, `sample-report.html`, `styles.css`, `app.js`) to `public_html`. No server code required.
- **Netlify / Vercel / GitHub Pages:** drag-and-drop the folder or point it at a repo. No build command, publish directory = the folder itself.

## Wiring money and intake (the only two integrations)

1. **Stripe Payment Links** — create three links in the Stripe dashboard ($199 / $349 / $599), then either:
   - paste them into `PAYMENT_LINKS` at the top of `app.js`, **or**
   - set each pricing button's `href` in `index.html` directly.
   Until then the buttons are inert and say so — they never fake a checkout.
2. **Intake form** — three options, in order of speed:
   - create a free Tally/Typeform and set the form's `data-form-endpoint` (or replace the form with their embed);
   - point `data-form-endpoint` at any HTTPS form endpoint (e.g. Formspree);
   - do nothing: submissions fall back to opening a pre-filled email to `INTAKE_EMAIL` (set in `app.js`).

## Hard rules honoured by this site

- No customer accounts, dashboards, live trading, exchange connectivity, or engine exposure.
- The case study reports our own *rejected* strategy; nothing implies profitability.
- Every page carries the research-only / no-advice / no-custody disclaimer.
