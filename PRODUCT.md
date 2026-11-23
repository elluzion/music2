# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: fans of Elluzion's music who arrive from a social bio or link-in-bio on a phone, often mid-scroll, wanting to hear a release or reach the streaming service they already use in one tap. Desktop visitors browse the same single-column shelf.

Secondary: fellow producers and DJs looking for edits, remixes and downloads, and visitors using the browser-based production tools.

## Product Purpose

A single, artist-owned home for everything Elluzion releases: a newest-first archive of originals, remixes, flips and VIPs, each with artwork, credits, measured facts and links out to every streaming service, plus in-page previews where a file exists. It also hosts small browser-local production tools — currently an audio analyzer and a link to a SoundCloud downloader — that make the site useful to other producers.

Success means a fan reaches a listen link in one tap, and a producer can get a release's facts (or a track's key, tempo and loudness) without leaving the site or uploading a file.

## Positioning

An artist-owned release archive, not a page on a platform. It is not locked to one streaming service; it shows the credits and technical facts the services omit (BPM, key, label, edit names, file formats); and it pairs the catalog with free, privacy-respecting tools. A neighboring artist site could copy the look, but not the complete discography, the direct download edits, or the on-device analyzer.

## Operating Context

Visitors mostly arrive on phones from Instagram, SoundCloud, YouTube and other social profiles; desktop visitors get the same centered 600px shelf. Publishing happens by editing one YAML file and redeploying a SvelteKit site — there is no CMS, login or database. Releases may carry a local MP3 preview, outbound streaming links, and Google Drive download links for edits and instrumentals. The tools page is a real second destination and links out to an external downloader at `tools.elluzion.space`.

## Capabilities and Constraints

- 26 releases currently published, spanning July 2022 to October 2026: originals, remixes, flips and VIPs, listed newest first.
- List and grid catalog views, persisted per browser; light/dark theme, persisted per browser.
- Release pages show artwork, artist credits, genre, release date, label, tempo, key, outbound streaming buttons resolved by domain, download badges with edit and format, and an expandable info sheet.
- In-page audio player with Media Session metadata when the release has a local preview track; four preview MP3s ship with the site.
- Outbound links to Spotify, Apple Music, SoundCloud, YouTube, Deezer, Tidal, Amazon Music and Pandora. Playback, purchase and downloads happen on those third-party services or Google Drive.
- Audio analyzer reports key, tempo, EBU R128 integrated loudness, loudness range and sample peak, processed in a Web Worker; results are copyable. Files never leave the device.
- An Instagram reel route redirects to the reel's media and exposes embed/preview metadata.
- No accounts, database, CMS, payments, comments or server-side user data.
- All content — releases, stream links, downloads, socials and the playlist URL — is edited only in `src/lib/data/content.yaml`; no environment variables are required.
- Artwork is hotlinked from SoundCloud CDN URLs at several sizes, so display depends on those URLs staying valid.

## Brand Commitments

- Name: **Elluzion**; the footer copyright uses lowercase `elluzion`.
- The serif wordmark `elluzion-textlogo.svg` is the artist's mark, used as a mask filled with the current text color.
- "1 mil + streams" is a confirmed real claim and may be used as proof.
- The Spotify, Apple Music, SoundCloud, YouTube and Instagram profiles linked in `content.yaml` are the artist's real accounts.
- Existing release descriptions are first-person, casual and often lowercase ("quick n dirty flip", "hope you enjoy!"); release titles keep their own casing, including all-caps.

## Evidence on Hand

- `src/lib/data/content.yaml` — 26 real releases with titles, dates, genres, labels, tempos, keys, artists, stream links and Drive downloads.
- `static/tracks/` — four real preview MP3s: Wilderness, I Still Love You, Sing For You (flip), Hands On You (remix).
- `static/elluzion-textlogo.svg`, `static/image-card-bg.svg`, `static/zigzag.svg`, and the favicon set.
- Real streaming and social profile URLs.
- No testimonials, press quotes, case studies, benchmarks or photography exist; future work must not invent them.

## Product Principles

1. **One tap to the music.** Every path ends at a listen; artwork and the primary action lead, and chrome recedes.
2. **Facts are the flex.** Credits, BPM, key, label, edits and formats are first-class content, not metadata buried after a pitch.
3. **Artist-owned, platform-neutral.** The catalog belongs to the artist; streaming services are exits, not the house.
4. **Tools earn their place.** The analyzer and downloader give producers real utility, and they respect privacy by working on-device.
5. **One person can still publish.** A single YAML file plus a redeploy remains the entire publishing workflow.
