---
name: Bocatto Experience
description: Bocatto Dolci's kraft cup seen from above, sealed with a round carmine sticker; an unofficial DeepSun Studio concept that leads to OlaClick.
colors:
  peach: "#fcecdf"
  peach-deep: "#f6d8c1"
  kraft: "#d8be97"
  kraft-deep: "#b8956a"
  carmine: "#9e122c"
  carmine-deep: "#760c20"
  orange: "#ee6a43"
  orange-ink: "#b23d18"
  cacao: "#2a1712"
  cacao-soft: "#5a3a2e"
  cream: "#fff7eb"
  passion: "#f2b33d"
  nutella-brown: "#6b3a22"
typography:
  display:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(3.6rem, 15.5vw, 9.25rem)"
    fontWeight: 860
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'SOFT' 100, 'WONK' 1, 'opsz' 144"
  headline:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 5.5rem)"
    fontWeight: 860
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'SOFT' 100, 'WONK' 1, 'opsz' 144"
  title:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 100, 'WONK' 0, 'opsz' 72"
  body:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
  price:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "'tnum' 1"
rounded:
  focus: "6px"
  panel: "1rem"
  card: "1.75rem"
  plate: "2.5rem"
  pill: "999px"
spacing:
  gutter-sm: "1rem"
  gutter-md: "1.5rem"
  gutter-lg: "2.5rem"
  section: "5rem"
  section-md: "7rem"
  container: "88rem"
components:
  button-primary:
    backgroundColor: "{colors.carmine}"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.carmine-deep}"
    textColor: "{colors.cream}"
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.carmine}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
    height: "3.25rem"
  button-ghost:
    textColor: "{colors.carmine}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
    height: "3.25rem"
  chip-filter:
    backgroundColor: "{colors.peach-deep}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    height: "2.75rem"
  chip-filter-active:
    backgroundColor: "{colors.carmine}"
    textColor: "{colors.peach}"
  badge-discount:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.5rem"
  ticket:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.cacao}"
    padding: "0.75rem 1.25rem"
  receipt:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.focus}"
    padding: "2rem 2.5rem 3rem"
    width: "40rem"
  striped-card:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.card}"
    padding: "2rem"
  thumb-round:
    backgroundColor: "{colors.kraft}"
    rounded: "{rounded.pill}"
    size: "7rem"
  sticky-order-bar:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.peach}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.375rem 0.375rem 1.25rem"
---

# Design System: Bocatto Experience

## Overview

**Creative North Star: "The Cup From Above"**

The system is Bocatto Dolci's own packaging, laid flat on a peach counter. Every dessert is shown as it is in life: a circle of cream inside a kraft rim, closed with the round carmine sticker. Kraft paper, die-cut tickets, a toothed receipt and the striped border of the brand's personalised card are the furniture; carmine is the ink and the seal. Nothing is borrowed from a generic restaurant template: no split-hero-plus-three-cards, no grid of identical product tiles.

Density is generous and warm. Headlines are huge, heavy and soft-cornered (Fraunces at weight 860 with SOFT 100 and WONK on) so they rhyme with the hand-lettered logo, while every functional word (prices, nav, buttons, notes) is set in a plain, friendly DM Sans. Whole sections are drenched in one material (peach, kraft, carmine, cacao, or a flavor's own colour) rather than boxed into cards. A fine paper grain sits over the drenched fields.

Motion is tactile: things are served, stamped and squished. The signature is "la espiral", a single-stroke cream swirl inside the seal that pipes itself in. Under reduced motion everything is present and still.

**Key Characteristics:**
- Peach ground, kraft fields, carmine drenches; cacao for type and chocolate chapters.
- Fraunces heavy SOFT/WONK headlines against DM Sans UI.
- Packaging objects as components: round seal, notched kraft ticket, toothed receipt, striped card, round kraft-rimmed thumbnails.
- Soft, long, tinted drop shadows; no hard offsets, no glass.
- Squish on touch, expo on reveal, a self-drawing spiral as signature.
- The order is always one tap away (carmine pill button, mobile sticky bar).

## Colors

A warm packaging palette: paper and kraft neutrals, one saturated carmine voice, orange reserved for deals and the striped border.

### Primary
- **Sticker Carmine** (carmine): the brand ink. Display headlines on peach, primary buttons, active chips, the seal disc, selection, scrollbar thumb, focus ring, and whole drenched regions (the footer, the XL spread, the Frutos Rojos explorer state). Also the browser `theme-color`.
- **Deep Carmine** (carmine-deep): pressed/hover state of carmine surfaces and the tint of carmine shadows. Never a standalone fill.

### Secondary
- **Bag Orange** (orange): discount badges and the alternating stripe of the striped card. A fill, never body text on peach.
- **Orange Ink** (orange-ink): the AA-safe form of orange when orange must be read as text on peach. Declared in the theme; the shipped surface has no orange text yet.

### Tertiary
- **Maracuyá Yolk** (passion): explorer ground for the Maracuyá flavor.
- **Hazelnut Brown** (nutella-brown): explorer ground for the Nutella flavor. Lives in the flavor data, not the theme.

### Neutral
- **Counter Peach** (peach): page ground and the cream of the default seal; text colour on dark drenches.
- **Deep Peach** (peach-deep): quiz ground, inactive filter chips, menu detail panels, scrollbar track.
- **Kraft** (kraft): tickets, the receipt, the How-to-order spread, image plates, the rim ring on photos and thumbnails.
- **Kraft Shadow** (kraft-deep): inner rim of unselected kraft quiz answers.
- **Cacao** (cacao): all running text on light grounds, the unofficial-concept strip, the How-to-order spread, the sticky order bar, the Oreo explorer ground.
- **Soft Cacao** (cacao-soft): secondary text, field labels, category pills' text.
- **Card Cream** (cream): text on carmine buttons, the striped card's interior, cream button fill.

### Named Rules
**The Drench Rule.** A section changes material, not decoration: it takes one full-bleed ground (peach, peach-deep, kraft, carmine, cacao, or a flavor colour) with grain, and its ink flips to match. Never a white card floating on a coloured section.

**The Flavor Wardrobe Rule.** In the flavor explorer each cheesecake owns a ground, ink, accent and seal cream (Frutos Rojos carmine/#fff1e6, Maracuyá passion/cacao, Oreo cacao/peach, Nutella brown/peach, Milo kraft/cacao). Section background and colour transition together over 0.7s expo-out, and the focus ring follows the ink via `--focus`.

**The Orange Is a Deal Rule.** Orange marks discounts and the striped border. It does not become a second button colour or a heading colour.

## Typography

**Display Font:** Fraunces Variable (with Fraunces, Georgia, serif)
**Body Font:** DM Sans Variable (with DM Sans, system-ui, sans-serif)

**Character:** A plump, wonky, soft-shouldered serif set very heavy and very tight, echoing the hand-lettered logo, paired with a round, plain sans that handles every fact and action.

### Hierarchy
- **Display** (Fraunces 860, SOFT 100 / WONK 1 / opsz 144, clamp(3.6rem, 15.5vw, 9.25rem), line-height 0.9, -0.035em): the hero stack and the footer sign-off only. Lines are stacked, left-heavy, carmine on peach or peach on carmine.
- **Headline** (same setting, clamp(2.75rem, 8vw, 5.5rem)): one per section, short declarative sentences ending in a full stop ("El menú completo."). Smaller steps reuse the same setting at clamp(2rem, 5vw, 3.75rem) for anatomy layer names and the quiz result name, and 2.25rem for receipt step numerals.
- **Title** (Fraunces 600, SOFT 100 / WONK 0 / opsz 72, 1.3rem to 1.5rem, leading tight, -0.02em): product names in the menu, quiz question and answers, occasion names, brand-slogan italics inside body copy, image-error fallbacks.
- **Body** (DM Sans 400, 1.0625rem, line-height 1.6): running text; leads go to 1.125rem to 1.25rem with max-width about 34ch. Paragraphs use `text-wrap: pretty`, headings `balance`.
- **Price** (DM Sans 700, tabular numerals, 1.125rem; 1.5rem to 1.875rem large): every COP figure, with struck-through previous price at 70% opacity.
- **Label** (DM Sans 600, 0.75rem, uppercase, 0.14em): field labels printed on tickets and the receipt ("Frutos Rojos", "Rinde", "Tu pedido"). The seal's ring text uses the same register (700, 0.16em).

### Named Rules
**The Two Voices Rule.** Fraunces speaks (headlines, names, the slogan); DM Sans informs (prices, nav, buttons, notes). Never set a price or a button in Fraunces, never set a headline in DM Sans.

**The Printed Label Rule.** Uppercase tracked labels exist only as fields printed on a packaging object (ticket, receipt, seal ring). They never float above a section headline.

## Layout

A 12-column grid inside a centred container (88rem) with gutters of 1rem / 1.5rem / 2.5rem at mobile / sm / lg. Sections breathe at 5rem vertical padding, 7rem from md. Compositions are asymmetric: the hero splits 7/5 with the type column dominant; the explorer swaps sides so the heading sits in columns 7 to 12. Content stacks to one column below lg; filter rows and flavor tabs become horizontal scrollers with hidden scrollbars on mobile and wrap or stack on desktop. A mobile-only sticky order bar rises once the hero is passed; the header is sticky with a 5.5rem scroll padding. Breakpoints are Tailwind defaults plus `xs` at 25rem.

Objects are placed, not slotted: tickets are pinned at a slight rotation (-3deg to 6deg), the receipt sits at -1.2deg, the seal overlaps the photo frame's edge, and SVG ingredients drift at section margins.

## Elevation & Depth

Depth is physical and soft: long, low, negatively spread drop shadows tinted with cacao or carmine, as if paper objects sit on a counter under warm light. Shadows sit on objects that are things in the world (buttons, tickets, receipt, photo frames, the striped card, the sticky bar), never on the section grounds. A multiplied paper grain gives drenched fields their surface.

### Shadow Vocabulary
- **Button lift** (`box-shadow: 0 10px 22px -12px rgb(118 12 32 / 0.75)`; hover `0 16px 28px -14px rgb(118 12 32 / 0.85)`): carmine buttons and active carmine chips.
- **Object on counter** (`box-shadow: 0 40px 60px -30px rgb(42 23 18 / 0.55)` to `0 40px 80px -40px rgb(0 0 0 / 0.8)`): photo frames, the receipt, the striped card.
- **Small object** (`box-shadow: 0 12px 20px -16px rgb(42 23 18 / 0.6)` to `0 18px 30px -22px rgb(42 23 18 / 0.6)`): result rows, the duo card, the header once scrolled (`0 8px 24px -18px`).
- **Sticker drop** (`filter: drop-shadow(0 18px 22px rgb(42 23 18 / 0.35))`): the seal, which is not a box.

### Named Rules
**The Counter Light Rule.** Shadows always fall straight down, long and soft, with a negative spread and a cacao or carmine tint. No hard offset shadows, no grey ambient glows, no glassmorphism.

## Shapes

The vocabulary is the cup: circles, pills and arches. Buttons, chips, badges and the sticky bar are full pills (999px). Product thumbnails are perfect circles ringed in kraft (6px in the menu, 4px in quiz results), reading as a cup seen from above. The hero photo sits in a tall arch (top 999px, bottom 32px) with a 10px kraft ring. Large photos use a 2.5rem plate radius; the striped card 1.75rem; detail panels 1rem.

Packaging die-cuts are done with masks, not borders: the ticket has semicircular 9px notches on both sides; the receipt has a 22px zig-zag bottom edge and 6px top corners; the striped card has a 14px border of -45deg carmine/orange stripes. Dotted leaders (2px dotted at 35% of the ink) run from item names to prices.

## Components

### Buttons
Tactile and confident: soft pills that squish on press.
- **Shape:** full pill (999px), min-height 3.25rem (2.75rem in compact contexts), 0.6rem icon gap, DM Sans 700 at 1rem.
- **Primary:** carmine fill, cream text, button-lift shadow. Every order action is primary and ends in an up-right arrow, because it opens OlaClick in a new tab.
- **Hover / Focus:** fill deepens to carmine-deep, shadow lengthens, the arrow nudges 4px right and tilts -8deg (0.45s expo-out). Press scales to 0.94 in 0.12s; release springs back on the squish curve (0.45s). Focus is a 3px outline offset 3px in the current `--focus` colour.
- **Cream:** cream fill, carmine text, for use on carmine drenches.
- **Ghost:** transparent with a 2px inset ring in currentColor; hover tints 10% of currentColor. Used for secondary actions on cacao and in the quiz (restart).
- **Text link:** DM Sans 600 with a 2px underline drawn as a background that retracts to the right on hover (0.45s expo-out), followed by an arrow.

### Chips
- **Filter chip:** peach-deep pill, cacao DM Sans 600, a count bubble at 10% cacao; hover goes to kraft. Active is carmine with peach text, button-lift shadow and a 20% peach count bubble. Transitions on the squish curve; press scales to 0.95.
- **Discount badge:** small orange pill, cacao 700 text, "−N%", always next to a struck previous price.
- **Category tag:** pill at 7% cacao with cacao-soft text.

### Cards / Containers
- **Corner Style:** plate 2.5rem for photos, card 1.75rem for the striped card, panel 1rem for details.
- **Background:** the section's own drench; inner panels step one tone (peach-deep at 70% on peach).
- **Shadow Strategy:** see Elevation; only objects lift.
- **Border:** none except the striped border and kraft rings; menu rows are separated by 2px dashed rules at 30% cacao.
- **Internal Padding:** 1.25rem to 2rem.

### Navigation
- **Header:** sticky, peach (95% with a soft shadow once scrolled), logo at 3rem to 3.5rem with a two-line "Bocatto / Experience" label from `xs`. Section links are DM Sans 600 cacao pills that tint 10% carmine and turn carmine on hover; hidden below md. A compact primary "Pedir" button sits at the right.
- **Unofficial strip:** a cacao band above the header at 0.8125rem in peach states that this is an independent DeepSun Studio concept. It is part of the system, not a dismissible banner.
- **Mobile sticky order bar:** a cacao pill pinned to the bottom with safe-area padding, "Ver menú" text link plus a compact primary button; slides up 120% out of view with 0.5s expo-out.

### The Seal ("la espiral")
The signature. A 200-unit SVG: carmine disc (r 98), a faint 1.2px ring at 35% (r 68), uppercase DM Sans 700 ring text at 0.16em on a circular path ("¡Bocados que enamoran! · La dolce vita en cada cucharada"), and a single-stroke cream spiral of 3.2 turns, 12px wide with round caps, carrying an offset shadow stroke and a 45% white gloss stroke. The spiral uses pathLength 1 so it can be "served" by animating dash offset 1 to 0. Disc, ring and cream are props, so the explorer recolours it per flavor. The ring may spin slowly (38s per turn).

### Ticket
A kraft label with notched sides, cacao text, a printed field label above a large tabular price, pinned at a slight rotation with a shadow. Used for the hero price, the explorer price and the XL order conditions.

### Receipt
A grained kraft slip with a zig-zag bottom, -1.2deg tilt and object-on-counter shadow. A dashed-rule header row of printed labels, then numbered steps with Fraunces numerals in carmine, dashed dividers and dotted leaders.

### Striped Card
The brand's personalised card: cream interior inside a 14px carmine/orange diagonal-stripe border, 1.75rem corners, long cacao shadow. Holds the quiz result and stamps the seal on arrival.

### Menu Line
A round kraft-rimmed thumbnail, then a Fraunces title whose last line is followed by dot leaders that run to the right-aligned price (from 40rem up; the price sits on a peach chip that masks the dots). Below: description clamped, price row with badge and category tag, primary "Pedir" and an expandable "Detalles y adicionales" panel listing add-ons with dotted leaders.

### Motion
- **Default reveal:** GSAP defaults `expo.out` 0.9s; staggered rises of about 22px with fade.
- **Squish:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for press release, chip state, hover lifts and the anatomy layers dropping into the cup.
- **Spiral draw:** dash offset 1 to 0 on `power2.inOut` (1.6s in the hero, 1.1s on each explorer flavor change, 1s for the quiz stamp); the anatomy lid uses a 0.55s CSS transition.
- **Circular wipe:** flavor photos enter with `clip-path: circle(0% → 75%)` on `expo.inOut` 0.85s while the image settles from scale 1.18 / -4deg.
- **Ingredients:** pop in from scale 0 with random rotation on `back.out(2.2)`; idle ones float 10px over 6s.
- **Reduced motion:** all GSAP timelines run only under `prefers-reduced-motion: no-preference`; otherwise content is static and fully visible, photos swap without clip-path, anatomy shows its finished state, float/spin stop, button transitions drop to 0.01ms and smooth scrolling is off.

### Browser Surface
`color-scheme: light`; `theme-color` carmine; text selection carmine with peach text; scrollbar thumb carmine on a peach-deep track (12px, pill thumb with a 3px track-coloured border); focus outline follows `--focus`, which drenched sections set to their ink.

## Do's and Don'ts

### Do:
- **Do** drench whole sections in one material (peach, peach-deep, kraft, carmine, cacao or a flavor ground) with grain, and flip the ink and `--focus` to match.
- **Do** show product photos as circles or arches ringed in kraft, the cup seen from above.
- **Do** express prices, conditions and steps as packaging objects: tickets, the receipt, dotted leaders.
- **Do** keep every order action a carmine pill with an up-right arrow that opens the exact OlaClick product.
- **Do** set headlines in Fraunces 860 with SOFT 100 / WONK 1 and functional text in DM Sans.
- **Do** use the seal's self-drawing spiral to confirm moments (hero arrival, flavor change, quiz result), and give every animation a still, complete reduced-motion state.
- **Do** keep the unofficial-concept strip visible above the header.

### Don't:
- **Don't** use orange as body text on peach; use orange-ink, or keep orange to badges and stripes.
- **Don't** put uppercase tracked kickers or eyebrows above headlines; printed labels belong on tickets, the receipt and the seal ring only.
- **Don't** use hard offset shadows, grey ambient glows or glass blur; shadows fall long, soft and tinted.
- **Don't** set prices, buttons or nav in Fraunces, or headlines in DM Sans.
- **Don't** redraw the logo or invent a second seal; the round sticker with the spiral is the only emblem.
- **Don't** fall back to the restaurant template (split hero, three equal cards, uniform product grid).
- **Don't** use emoji or icon-font glyphs; icons and ingredients are inline SVG.

## Order Flow Components (extension, 2026-11-07)

Same world, no new tokens. Added when the site became Bocatto's self-contained menu.

- **Sheet**: native `<dialog>`. Bottom sheet on mobile (rounded 2rem top, grab handle), right panel on desktop (30rem, rounded 2rem left). Peach ground, cacao 55% backdrop. Enters with `expo.out` 0.65s, leaves with `power3.in` 0.38s; content staggers in (`.sheet-stagger`). Static under reduced motion.
- **Choice card**: modifier option as a peach-deep pill row (min 48px) with name and price ("+$ 1.000" / "Sin costo"); checked turns carmine with cream text. Required groups default to the free option.
- **Quantity stepper**: peach-deep capsule, ghost minus, carmine plus, tabular count; buttons labelled "Disminuir/Aumentar cantidad".
- **Cart line**: round kraft-rim thumbnail, Fraunces soft title, subtotal right, options and "c/u" price in cacao-soft, stepper + "Quitar". Removal collapses the row (0.35s).
- **Added toast**: cacao pill with a mini seal drawing its spiral, "Agregado · n × producto", cream "Ver pedido" button. 4.2s.
- **Sent state**: the seal stamps in (scale 2.2 to 1, rotate) and the copy says the order is not confirmed until Bocatto replies.
- **Cart button**: carmine pill "Tu pedido" with an orange count badge that bumps (squish) when items are added.
- **WhatsApp quick access**: desktop cacao pill bottom-right that expands to "¿Una consulta?" on hover/focus; on mobile it lives in the sticky order bar.
