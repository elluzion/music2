---
name: Elluzion
description: Independent producer's release archive and listening shelf.
colors:
  primary: "#976567"
  on-primary: "#f6f3f3"
  secondary: "#907c7c"
  on-secondary: "#f6f4f3"
  background: "#f6f4f3"
  on-background: "#2e2e33"
  surface: "#ffffff"
  on-surface: "#2e2e33"
  surface-variant: "#ede7e4"
  primary-dark: "#c19396"
  on-primary-dark: "#1c1215"
  secondary-dark: "#a3a1a4"
  on-secondary-dark: "#131316"
  background-dark: "#0d0d0f"
  on-background-dark: "#ededee"
  surface-dark: "#17171a"
  on-surface-dark: "#ededee"
  surface-variant-dark: "#212125"
  spotify-green: "#1db954"
  playlist-ink: "#03150a"
  playlist-ink-dark: "#10281a"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "normal"
  subtitle:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-small:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  md: "6px"
  lg: "8px"
  "2xl": "16px"
  "3xl": "24px"
  sheet: "28px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "16": "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    height: "48px"
  button-primary-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: "40px"
    height: "40px"
    width: "40px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    height: "48px"
  button-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    height: "48px"
  stream-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    height: "56px"
    width: "100%"
  badge-surface-variant:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  player-bar:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "8px"
    height: "56px"
    width: "100%"
---

# Design System: Elluzion

## Overview

**Creative North Star: "The Liner Note"**

Elluzion's site is a producer's release archive laid out like the back of a record sleeve. A warm paper ground replaces the usual white page, a single dusty-rose label color stands in for the pressing plant's stamp, and every factual detail — durations, BPM, key, file formats, the year in the footer — is set in mono like sleeve credits. The artist wordmark is the one flourish: an expressive serif mark that anchors the top of the shelf and keeps the otherwise plainspoken system from reading as a generic app.

The personality is quiet, tactile and a little analog. Surfaces are flat and tone-separated rather than outlined; floating elements are full pills that hover above the paper like a record lifted off a platter. Saturated color is rationed: the pastel about-card and the platform-colored social tiles are fixed brand artifacts, and the rose accent marks only the action that matters in a given view. Nothing shouts; the work is meant to feel like a shelf you can browse with one thumb.

The layout is deliberately single-column at every size. On wide screens the same mobile shelf is centered at a fixed 600px rather than expanding into a dashboard, preserving the intimacy of the phone composition. Motion is restrained: a 300ms settle on hover, a 30px horizontal slide between pages, and a sheet that grows from a pill into a card.

**Key Characteristics:**
- Warm paper ground (`#f6f4f3`) and smoked charcoal type (`#2e2e33`); pure white is reserved for raised surfaces.
- One chromatic accent — a muted rose label color — for action and playback, not large fields.
- Four voices: a serif wordmark asset, Inter for headings, Space Grotesk for body and interface, JetBrains Mono for credits and measurements.
- Rounded content containers (16–28px) and fully pill-shaped floating chrome.
- Flat-by-default depth: a single tinted shadow exists only for elements detached from the page.
- Fixed brand patches — the iridescent about-card and platform-colored tiles — that stay the same in light and dark.

## Colors

A warm, low-chroma palette built from paper, ash and a single dusty-rose accent, with brand colors quarantined to their own artifacts.

### Primary
- **Dusty Rose Label** (`#976567`): The system's only UI accent. Fills primary buttons and the play control, marks the slider track and thumb, and tints the uploader progress and error ring. Its muted, almost brown rose reads as ink on paper rather than as a web accent color.
- **Rose Quartz** (`#c19396`): The dark-theme counterpart of the label color. Lightens enough to stay legible on near-black surfaces without becoming pink; used for the same controls in dark mode.

### Secondary
- **Warm Ash** (`#907c7c`): The system's muted voice. Sets supporting copy, artist names, the back link, footer text, select triggers and icon glyphs. It also supplies the color for the floating shadow tint, so elevation inherits the palette's warmth instead of gray. It is not a second brand hue and never fills a primary action.

### Neutral
- **Paper** (`#f6f4f3`): The light page ground. A warm off-white, never pure white; body text and the site shell sit on it.
- **White Surface** (`#ffffff`): Raised cards, stream-link buttons, the player bar, dropdown menus and the info sheet. Apart from the Apple Music brand tile, white appears only as a surface above the paper.
- **Pale Stone** (`#ede7e4`): Quiet fills for genre badges and the uploader's rest state.
- **Smoked Charcoal** (`#2e2e33`): Primary text in the light theme, with a faint violet cast that keeps it from feeling brown. `on-surface` resolves to the same value.
- **Selection** (`black/10` light, `white/20` dark): Text selection is a quiet neutral wash; it never borrows the rose accent.
- **Ink Black** (`#0d0d0f`): The dark page ground. Near-black with a slight blue cast; never `#000`.
- **Carbon** (`#17171a`): Dark-theme raised surface, one step above the ink ground.
- **Graphite** (`#212125`): Dark-theme quiet fill for badges and uploader rest states.

### Brand Accents
- **Spotify Green** (`#1db954`): The playlist banner's link text, the playlist icon and the Spotify social tile.
- **Playlist Ink** (`#03150a`, dark `#10281a`): The near-black green banner panel that hosts the playlist invitation.
- **Platform colors** (Spotify green, Apple white, SoundCloud orange `#ff5500`, YouTube red `#ff0000`, Instagram magenta `#e1306c`): Applied as social-tile backgrounds and as stream-link label colors. These are brand facts, not theme tokens.

### Named Rules
**The One Label Rule.** The rose primary appears on at most one or two controls per screen — the primary action and playback. It is a stamp on the sleeve, not a background wash.

**The Paper Ground Rule.** Page fields are warm neutrals (`#f6f4f3` or `#0d0d0f`). Pure white and pure black are surface and text extremes only; they never become the page.

**The Brand Quarantine Rule.** Platform colors stay inside their own tiles and stream labels. Never recolor a platform mark or the playlist banner into the rose palette, and never use a platform color as general UI chrome.

**The Fixed Patch Rule.** The iridescent about-card and the platform-colored social row are fixed brand artifacts: they keep their own colors in both themes instead of re-mapping with the palette.

## Typography

**Display Font:** Inter (with `sans-serif` fallback)
**Body Font:** Space Grotesk (with `sans-serif` fallback)
**Label/Mono Font:** JetBrains Mono (with `monospace` fallback)
**Wordmark:** `elluzion-textlogo.svg`, an expressive serif mark used as a mask filled with the current text color.

**Character:** A plainspoken editorial pairing with a producer's toolkit underneath. Inter sets titles with clean, confident weight; Space Grotesk gives interface copy a slightly mechanical, music-software character; JetBrains Mono turns facts into liner notes. The serif wordmark supplies the only calligraphic moment.

### Hierarchy
- **Display** (700, 3rem/48px, line-height 1): Page titles only (`h1`), with 16px of vertical padding.
- **Headline** (700, 1.875rem/30px, line-height 1.2): Release titles on permalink pages (`h2`), centered.
- **Title** (700, 1.5rem/24px, line-height 1.33): Section titles (`h3`); rarely used but part of the scale.
- **Subtitle** (600/500, 1.25rem and 1.125rem): Card headings and song titles (`h4` / `h5`); song titles are 1.125rem at 500.
- **Body** (400/500, 0.875rem–1rem, line-height 1.4–1.5): Interface copy and descriptions. Most reading copy is the 14px step at 500 in Warm Ash; buttons inherit the 16px base.
- **Label / Mono** (700, 0.75rem/12px, line-height 1): Footer credits, durations, BPM, key, file formats, bitrate, confidence values and the theme toggle. Uppercase is not used.

### Named Rules
**The Three-Voice Rule.** Inter never sets body copy; Space Grotesk never sets a page title; JetBrains Mono never sets a sentence. Mono is for credits, measurements, formats and micro-labels.

**The Flat Weight Rule.** Hierarchy comes from size and family, not from a widening weight range. Headings are 700 at most; interface copy sits at 400–500; mono labels are 700 because they are small.

## Layout

A single column at every viewport width. The shell is `flex min-h-dvh w-full flex-col px-4`; page content is a `flex-col gap-4` wrapper with `pt-16 pb-5`, where the 64px top inset clears the fixed back link.

At 600px and wider the column becomes exactly 600px and stays centered on the viewport (`ml-[50vw]`, `max-w-[600px]`, `-translate-x-1/2`) instead of expanding. This is the defining layout decision: desktop is the phone shelf, centered, not a multi-column dashboard.

- **Breakpoints:** `xs` 400px (info-sheet padding), shell switch at 600px, `md` 768px (song grid columns, expanded sheet width).
- **Release list:** vertical 80px rows — 80×80 cover art at 8px radius, 16px gap, title and a 14px artist line with an inline genre badge.
- **Release grid:** 2 columns on mobile, 3 at `md`, with 24px column gaps and 36px row gaps; cover art fills the tile at 16px radius; captions are centered.
- **Fixed chrome:** `<< go back` at the top-left with 16px padding; the info sheet floats at the bottom center with 16px padding (24px at `xs`) and caps at 500px when expanded.
- **Page rhythm:** 16px between major blocks; 4/8/12px inside cards and control clusters; 20–24px card padding; generous separation above the footer, which is pushed to the bottom with `mt-auto`.

## Elevation & Depth

Depth is tonal, not outlined. A white card on paper reads as raised because of the value step; on dark, Carbon on Ink Black does the same. There is a single shadow vocabulary, expressed in two theme values, and it belongs only to things that float above the page: the expanding info sheet and the select menu.

### Shadow Vocabulary
- **Floating, light** (`box-shadow: 0 20px 25px -5px rgb(144 124 124 / 0.15), 0 8px 10px -6px rgb(144 124 124 / 0.15)`): Dropdown menus and the info sheet. The shadow is tinted with Warm Ash, not black, so it reads as warmth under the element.
- **Floating, dark** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)`): The same elements in the dark theme, where the tint would disappear.

Hover is not a lift: buttons brighten with `filter: brightness(1.1)` and linked cards scale to 98%. The uploader's only ring is an inset hairline (`ring-1 ring-surfaceVariant`), and the theme toggle's only border is `1px secondary/25`.

### Named Rules
**The Float Only Rule.** A shadow means the element is detached from the page. Inline cards, list rows and controls never carry one; if it sits in the flow, it is flat.

**The Warm Shadow Rule.** In light mode the shadow is tinted from Warm Ash. Gray or black shadows are reserved for the dark theme, where no tint survives.

## Shapes

Content is rounded, chrome is fully round. Cards, menus, uploaders and grid tiles use 16px corners; the hero cover art uses 24px; the floating info sheet uses 28px; menu options use 6px. Everything that floats or is a control with no intrinsic rectangle — badges, icon buttons, the player bar, social tiles, the theme toggle, the slider thumb — is a full pill (`9999px`). Buttons and square thumbnails sit at 8px.

Borders are rare and always hairline: a 1px Warm Ash border on the theme toggle and inset 1px rings on the uploader and error panel. Cards have no stroke. The wordmark is an SVG mask filled with the current text color, so it flips between charcoal and off-white with the theme instead of shipping a second asset.

### Named Rules
**The Pill-Or-Panel Rule.** If it floats above the page, it is a pill. If it holds content in the flow, it is a rounded panel. Do not give a floating control a rectangle, and do not turn a content card into a pill.

## Components

### Buttons
- **Shape:** 8px corners (`rounded-lg`), 48px tall, 16px horizontal padding.
- **Primary:** Dusty Rose fill, warm off-white label, 16px Space Grotesk. Used for playback and the single main action.
- **Secondary:** Warm Ash fill with off-white label; used when a second action must sit beside a primary one.
- **Surface:** White fill with charcoal label; used for stream links (at 56px height and full width) and for utility actions such as "Copy results".
- **Icon:** 40px circle in Dusty Rose with an off-white glyph; the play control and the info-sheet chevron.
- **Hover / Focus:** `brightness(1.1)` on hover, optional `scale(0.97)` on press when marked `hoverAnim`; focus is a 2px rose ring at 60% opacity.
- **Ghost:** There is no ghost variant; text-only actions are plain links in Warm Ash with an underline on hover.

### Chips / Badges
- **Style:** Full pill, 4px × 10px padding, 12px JetBrains Mono bold label, Warm Ash text.
- **Variants:** Pale Stone fill for genre chips and the uploader rest state; Warm Ash fill for download and summary badges; primary fill for a highlighted status.
- **Download chip:** A secondary badge with a nested `black/20` pill in mono for the file format, rendered with `!pr-1` so the inner chip tucks into the edge.

### Cards / Containers
- **Corner Style:** 16px (`rounded-2xl`).
- **Background:** White surface on paper; Carbon on ink in dark.
- **Shadow Strategy:** None. Cards are flat; see Elevation.
- **Border:** None.
- **Internal Padding:** 16px for standard cards and data cards; 20px for the about-card.
- **Interaction:** Linked cards use the `hover-scale` utility (300ms ease-out to 98%).

### Inputs / Fields
- **Style:** There are no text inputs. The analyzer's uploader is a 128px tall pale-stone panel at 16px radius with a 1px inset stone ring and centered upload icon plus format line.
- **Focus / Drag:** Dragging swaps to `ring-2 ring-primary` and deepens the stone fill; the file input itself is visually hidden.
- **Progress:** A rose-at-15% fill grows from the left behind the label; the percentage is set in mono.
- **Error:** A white card with a 1px rose-at-30% ring and a rose Material Symbol, body copy in charcoal.

### Navigation
- **Back:** `<< go back` in 14px Space Grotesk medium, Warm Ash. After 16px of scroll it gains a white surface pill and horizontal padding; otherwise it is a bare text link with underline-on-hover.
- **Footer:** A single mono line at 12px bold in Warm Ash: copyright, the light/dark theme toggle, and a `tools >>` link. The toggle is a 2-option pill switch with a Warm Ash thumb that slides 40px.
- **No site navigation bar or menu.** Navigation is the back link, the footer link and the content itself.

### Player
A full-width white pill, 56px tall, with 8px padding and 24px right padding. The circular rose play/pause button anchors the left; current and total time are 14px mono bold in Warm Ash; the slider fills the middle. The bar only appears once metadata loads, fading in over 50ms.

### Song Row
The signature list unit: 80px tall, 16px gap, 80px square cover at 8px radius. The title is 18px Inter at 500; beneath it, the artist line is 14px Space Grotesk at 500 in Warm Ash with an inline genre badge. The grid variant centers the same content under a 16px-radius square and drops the badge. Rows scale to 98% on hover.

### Floating Info Sheet
A bottom-centered pill that expands into a 28px-radius card. The collapsed state shows an emoji preview row (calendar, tempo, key, genre, label, download formats) beside a rose chevron circle; the expanded state reveals the same facts as labeled rows, a zigzag divider, and a wrap of download badges. Width and height animate over 300ms with a 150ms content cross-fade; the chevron rotates 180°. Along with the select menu, it is one of only two elements that may cast a shadow.

### Select (View Switcher)
Trigger is a rotating chevron plus the selected label in Warm Ash, 16px gap. The menu is a white 16px-radius panel with 8px padding and the Floating shadow; options are 6px-radius rows at 16px/8px padding, tinted `secondary/10` when selected or hovered. It is used for List/Grid and is not a form control.

### Data Card (Analyzer)
A white 16px-radius card with 16px padding, holding a Material Symbol, a 14px title, a 20px mono value, and an optional mono hint. A copy button fades in on hover or focus and swaps to a check for two seconds. Cards rise 8px and fade in over 300ms on mount.

## Do's and Don'ts

### Do:
- **Do** keep the page on Paper (`#f6f4f3`) or Ink Black (`#0d0d0f`) and reserve pure white for surfaces.
- **Do** let Dusty Rose mark only the primary action and playback; keep it under roughly a tenth of the screen.
- **Do** keep the 600px single column on desktop instead of expanding into columns.
- **Do** use 16px corners for content panels, 8px for buttons and thumbnails, and full pills for floating chrome.
- **Do** set page titles in Inter, body and interface in Space Grotesk, and credits/measurements in JetBrains Mono.
- **Do** preserve platform brand colors on social tiles and stream-label text.
- **Do** use the single Warm Ash-tinted shadow only for the info sheet and menus.

### Don't:
- **Don't** introduce a second accent hue for UI chrome; saturated color belongs to the fixed brand patches.
- **Don't** use pure black or pure white as a page background.
- **Don't** add borders or shadows to inline cards, list rows or data cards.
- **Don't** set paragraphs in Inter or page titles in Space Grotesk.
- **Don't** use mono for prose, only for credits, numbers, formats and micro-labels.
- **Don't** recolor a platform mark or the playlist banner into the rose palette.
- **Don't** add a top navigation bar; the back link and footer are the navigation.
- **Don't** expand the desktop layout beyond the 600px shelf.
