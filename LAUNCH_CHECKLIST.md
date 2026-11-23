# Launch Checklist — what only Floyd can provide

The site is code-complete. These are the business-side items that must come from you before the first client can pay.

## Must provide (site will not transact without these)

1. **Three Stripe Payment Links** — $199 / $349 / $599 (Stripe dashboard → Payment Links). Paste into `app.js` → `PAYMENT_LINKS`, or directly into the three `btn-pay` hrefs in `index.html`.
2. **Public contact email** — replace `hello@spiractive.example` in `index.html` (footer) and `app.js` (`INTAKE_EMAIL`).
3. **Intake destination** — Tally/Typeform/Formspree URL set as `data-form-endpoint` on `#intakeForm`, or accept the email fallback.
4. **Domain + hosting** — upload the folder to Hostinger (or any static host) and point the domain.

## Should decide before launch

5. **Legal entity name** for the footer/terms (currently "Spiractive Trading Intelligence", no entity suffix).
6. **Stripe business details + payout account** (Stripe supports Brazil).
7. **Fulfillment SLA wording** — the FAQ currently says 3–5 business days per strategy; confirm you can honour it.
8. **Confirmation email template** — Stripe can send one; align it with the intake flow ("after payment, complete the intake form").
9. **Tax/VAT settings in Stripe** for your jurisdiction.

## Launch-day smoke test (5 minutes)

- [ ] Open the site on phone + desktop; all 11 sections render.
- [ ] Each ORDER NOW button reaches the correct Stripe link (use Stripe test mode first).
- [ ] Submit the intake form; confirm it arrives where you expect.
- [ ] Open `sample-report.html`, print-to-PDF; check the PDF looks right.
- [ ] Read the disclaimer on the live site once, out loud. It is your legal cover.

## Explicitly not in scope for launch

Customer accounts, dashboards, subscriptions, live trading, API keys, exchange connectivity, mobile app, multi-tenancy, engine hosting. Those come after somebody pays.
