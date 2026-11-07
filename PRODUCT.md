# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger, Flip) + @gsap/react. Pinned by the brief; deploy target Vercel (static build). No push or deploy without explicit authorization.

## Users

People in Riohacha (La Guajira, Colombia) who find Bocatto Dolci through Instagram or WhatsApp, mostly on mid-range phones, deciding on a dessert to order for themselves, to share, or as a gift. Secondary audience: Bocatto Dolci's owners, evaluating this demo as a collaboration proposal from DeepSun Studio.

## Product Purpose

Bocatto's complete, self-contained digital menu (decided 2026-11-07): discover desserts, choose options and quantities, build the order in an integrated cart, and send it by WhatsApp for Bocatto to confirm. Success = a visitor finds a dessert that fits their craving and sends a well-formed order message in under a minute on a phone.

## Positioning

Bocatto Dolci makes artisanal cheesecakes served in kraft cups (individual, duos, and an XL cake by order), with homemade jams (berries, maracuyá). Slogans on their own channels: "¡Bocados que enamoran!" (logo) and "La dolce vita en cada cucharada." (OlaClick).

## Operating Context

- OlaClick is a data source only (products, categories, photos, descriptions, prices, options). The site never redirects there to order.
- Ordering: integrated cart → "Pedir por WhatsApp" opens wa.me/573009655684 with a generated message (products, quantities, options, unit price, subtotal, estimated total). WhatsApp is the confirmation channel; sending is not a confirmed purchase. No online payments or automatic confirmation in this phase.
- WhatsApp number confirmed by the team: +57 300 965 5684 (`src/config/ordering.ts`).
- Delivery cost and payment methods are confirmed by Bocatto in WhatsApp; the site does not add or quote them (OlaClick showed a $5.000 fixed fee, kept only as an unconfirmed reference).
- XL cheesecake requires 24 hours' notice.
- Business hours: all days marked inactive in OlaClick at time of capture → pending verification, not shown.

## Capabilities and Constraints

- Catalog data captured from OlaClick on 2026-11-07; prices can change. The site must say so and never imply real-time availability.
- Products must not be invented; data lives in `src/data/catalog.ts`.
- Recommendations run locally from verifiable product traits (no AI API).

## Brand Commitments

- Logo: hand-lettered heavy wordmark "BOCATTO DOLCI" in carmine with "¡BOCADOS QUE ENAMORAN!" in orange. Use the original file only; never redraw.
- Colors verified from OlaClick settings: carmine `#9E122C` (primary/buttons/title), peach `#FCECDF` (background), orange `#EE6A43` (footer/discounts). Packaging: kraft cups and bags, round carmine stickers, personalized cards with carmine/orange striped borders.
- User decisions (2026-11-07): build on the real brand palette plus a cacao dark; headlines in Fraunces set heavy with the SOFT/WONK axes to rhyme with the lettered logo; DM Sans for UI.
- Unofficial: the demo is an independent DeepSun Studio concept and must be labeled as such everywhere it could be mistaken for an official site.

## Evidence on Hand

- Product photos (OlaClick, 800×800) copied to `public/images/products/` — require Bocatto's authorization before any public release.
- Logo `public/brand/bocatto-dolci-logo.png` — requires authorization.
- Instagram @bocatto.dolci: only public meta readable (941 followers, 25 posts at capture). No posts, testimonials, or ratings were verified; none may be fabricated.

## Product Principles

1. The order is never more than one tap away.
2. Every fact on screen comes from Bocatto's own catalog.
3. Discovery should feel like opening the cup: playful, warm, crafted.
4. Fast on a mid-range phone beats spectacular on a desktop.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard operation, `prefers-reduced-motion` honored, Spanish (es-CO) copy.
