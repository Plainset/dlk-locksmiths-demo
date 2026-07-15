# Build Brief

Keep this compact. Add only sourced facts and assets actually used or deliberately rejected.

## Contact
- Email: info@dlklocksmiths.co.uk
- Email source URL: http://web.archive.org/web/20241122033605/https://dlklocksmiths.co.uk/ (own-domain Wayback snapshot, 22 Nov 2024, latest fully-rendered homepage capture — appears in contact card: "info@dlklocksmiths.co.uk"). Also present independently on the older archived contact-us page: http://web.archive.org/web/20200919162214/https://dlklocksmiths.co.uk/contact-us/ ("E-mail: info@dlklocksmiths.co.uk"). Two independent own-site snapshots, 4 years apart, agree.
- Rechecked date: 2026-07-15 (live domain re-curled today; own site down, see Business State Check — email reconfirmed via archive.org instead, per session constraints)
- Phone: Mobile 07846 668941 · Text/WhatsApp 07578 800441 · Office 01279 260222 (all three shown together on the 22 Nov 2024 homepage snapshot; 07846 668941 matches LEADS.md exactly)
- Address: Tuppenny Breeze, Park Road, Elsenham, Essex, CM22 6DE — logged on the archived site as "Head Office/Admin only" (2020 contact-us snapshot), i.e. not a customer-facing shopfront; DLK is a mobile call-out locksmith, not a walk-in premises.

## Business State Check
- Status: still open / trading, current website down for technical reasons (not closure)
- Checked sources:
  - Live domain re-curled today 2026-07-15 via `curl -sS -v` on both `dlklocksmiths.co.uk` and `www.dlklocksmiths.co.uk`, http and https (4 requests total): all four return the same WordPress "There has been a critical error on this website" die-page (visible in the actual response body, not a blank/timeout) — independently reconfirms LEADS.md's "persistent HTTP 500" note.
  - `archive.org/wayback/available` for the domain: snapshot exists and resolves.
  - Wayback CDX index (`web.archive.org/cdx/search/cdx?url=dlklocksmiths.co.uk*`) shows the site was crawled successfully (HTTP 200, real content, not an error page) as recently as the `/reviews/` page captured 2026-02-15 — footer copyright reads "© 2026 DLK Locksmiths - Local Emergency Locksmith since 1999", i.e. the live site was healthy and being actively served only ~5 months before today's session.
  - The fullest homepage capture (22 Nov 2024, 111,755 bytes, HTTP 200) shows current phone numbers, current service list, and the same address/email as older snapshots — content is stable and consistent across a multi-year span, not a business in flux.
- Notes: No evidence anywhere (own site history, archived content) of closure, relocation, or a switch to online-only. The single, isolated, currently-reproducing fault is the live WordPress install throwing a PHP/plugin-level critical error — exactly the kind of "your own site is broken right now" situation this pipeline targets. LEADS.md's independent note of "active Facebook presence, verified positive reviews on Trustindex" (compiled 2026-07-07, 8 days before this session) is consistent with an operating business.
- Build decision: proceed

## Page Plan
- Scope: 3-page default
- Pages: Home (index.html), Services (services.html), Contact & Booking (contact.html)
- Reason for any extra page: n/a — sticking to the 3-page default. Verified content (About/founding story, 3 named services, FAQs, service-area list, one real customer testimonial, contact/hours) fills three focused pages without padding.

## Pitch Hook
- Verified observation: DLK Locksmiths' own website (dlklocksmiths.co.uk) currently throws a hard WordPress "critical error" on every single load — home page, both bare and www, both http and https — so a 24-hour emergency locksmith's own site cannot be reached by a prospective customer at all, right when they'd need it most.
- Source URL: direct `curl -sS -v` against https://dlklocksmiths.co.uk/ and https://www.dlklocksmiths.co.uk/, run today (2026-07-15); response body is WordPress's own `<div class="wp-die-message"><p>There has been a critical error on this website.</p>` page.

## Allowed Facts
| Fact | Source URL | Used where |
|---|---|---|
| Founded 1999 by Darren and Lisa, local family-run and family-owned 24-hour emergency locksmith | http://web.archive.org/web/20241122033605/https://dlklocksmiths.co.uk/ ("Founded in 1999 by Darren and Lisa; DLK Locksmiths are a local family run and owned 24 hour emergency locksmith service...") | Home, Services footer strip, Contact |
| Over 20 years' experience in locks and security; installations, non-destructive emergency lock opening, burglary repairs, insurance surveys, burglary prevention | same URL as above | Home (about section) |
| All locksmiths Essex Police & Met Police Registered/Vetted | same URL; also stated as "Vetted" on the earlier 2020 about-us snapshot (http://web.archive.org/web/20200919161313/https://dlklocksmiths.co.uk/about-us/) | Home trust strip, Services, Contact |
| Services: Lock Opening (non-destructive), Lock Fitting & Upgrades, Emergency 24hr Locksmith, safe opening/repairs, boarding up & securing premises, key safes fitted, burglary damage repairs | http://web.archive.org/web/20241122033605/https://dlklocksmiths.co.uk/ (nav + services summary blocks) | Home services grid, Services page |
| No call-out fees; prices inclusive of labour and materials | same URL ("NEVER any CALL-OUT FEES added to our charges", "Prices inclusive of labour and materials") | Home, Services, Contact |
| Price-match style guarantee: "Found a cheaper quote by another genuine Locksmith? Tell us and let us BEAT it!" | same URL | Home hero strip |
| Accepts all major credit/debit cards, cash and BACS | same URL | Services, Contact |
| Locks supplied/fitted to insurance specifications; brands historically named include Yale, Chubb, Union, Era, Cisa, Ingersoll | http://web.archive.org/web/20200919150146/https://dlklocksmiths.co.uk/emergency-24hr-locksmith/ | Services page |
| Genuine, locally-manned phones — "not a call centre"; used by local police, UK Customs, Trading Standards and local councils (business's own claim) | http://web.archive.org/web/20241122033605/https://dlklocksmiths.co.uk/ | Home trust strip (attributed as the business's own description, not an independently-verified rating) |
| Service area: Essex, Hertfordshire, Cambridgeshire, Suffolk, Norfolk and London, incl. Bishop's Stortford, Chelmsford, Epping, Stansted, Saffron Walden, Loughton, Chigwell, Harlow, Cheshunt, Great Dunmow, Sawbridgeworth, Braintree, Hertford, Ware, Newmarket | http://web.archive.org/web/20241122033605/https://dlklocksmiths.co.uk/ (footer location links) | Services, Contact |
| Customer testimonial — Lisa James: "Thank you Darren for helping my mum get back into her house in Bishops Stortford. No damage and a really quick service." | http://web.archive.org/web/20200919161313/https://dlklocksmiths.co.uk/about-us/ and matching copy on http://web.archive.org/web/20200919162214/https://dlklocksmiths.co.uk/contact-us/ | Home testimonial section |
| FAQ content (12-month parts guarantee; receipt always provided; cards/cash/BACS; 3-lever vs 5-lever lock explanation; won't remove a snapped key yourself; can't gain entry to a friend/relation's property without the owner's express permission) | http://web.archive.org/web/20200919142844/https://dlklocksmiths.co.uk/faqs/ | Services page FAQ accordion |
| Address: Tuppenny Breeze, Park Road, Elsenham, Essex, CM22 6DE (head office/admin — mobile call-out business, not a shopfront) | http://web.archive.org/web/20200919162214/https://dlklocksmiths.co.uk/contact-us/ ("Head Office/Admin only") + confirmed again on 22 Nov 2024 homepage footer | Contact page |

## Do Not Claim
| Claim or uncertainty | Reason |
|---|---|
| Exact review count/star rating (site shows conflicting "Based on 2 reviews" widget text next to a separate "5/5 rating based on 12 reviews" footer line on the same 2020 page) | Internal inconsistency in the archived source itself — no single reliable number. Only the one verbatim, individually-attributed testimonial (Lisa James) is used; no aggregate star/review count is stated anywhere on the new site. |
| "Optimum SEO" 2020 testimonial ("Darren changed our office door lock for us...") | Reviewer name matches the site's web-development/SEO credit line ("Website development and online marketing/seo by Optimum SEO") on the same 2020 page — plausibly the agency's own placeholder/demo review rather than an independent customer, so excluded to avoid presenting an uncertain source as a genuine testimonial. |
| Exact response-time promise | 2020 copy says "within the hour"; 2024 copy says "At your door within 30 minutes" — inconsistent across time, so the site uses a non-numeric "fast response" framing instead of committing to a specific minute figure. |
| "0800 015 1552" freephone number | Present on 2020 snapshots only; absent from the most recent (Nov 2024 / Feb 2026) snapshots, which show only the mobile/WhatsApp/office numbers — treated as retired and not used. |
| Any Trustindex/Facebook review text or rating figure | WebFetch/WebSearch/Facebook scraping are all out of scope for this session per the task's tool constraints; LEADS.md's mention of "verified positive reviews on Trustindex" is noted only in the Business State Check as corroborating context, no specific rating or quote from it is used as site copy. |
| Any specific "X-minute" or "X-mile" coverage claim not in the sourced copy | Not stated on any archived page; not invented. |

## Asset Manifest
No images are used anywhere on this build. Checked the business's own domain via the Wayback Machine CDX index for every `/wp-content/uploads/...` image referenced by the archived site (11 files) and downloaded/inspected the largest, most prominent ones:

| Candidate file | Native size | Inspection result |
|---|---|---|
| local-Locksmith-near-me.jpg | 1920×879 | Generic stock photo of an antique key bunch on a dark marble surface — no van, shopfront, staff, or DLK branding visible. |
| Locksmith-for-local-lock-changing.jpg | 1000×667 | Generic stock photo of anonymous hands picking a brass doorknob lock — Canon EXIF from 2011, no business-identifying detail, textbook stock composition. |
| locksmith-lock-picking-scaled.jpg | 2560×1053 | Generic stock close-up of lock-picking tools and keys on a workbench — no branding, could be any locksmith stock library shot. |
| Locksmith-near-me.jpg (2020 upload) | 400×300 | Confirmed stock/clipart: EXIF description field literally reads "text 24h service 3d red white banner, letters and block, business concept", software tag "Adobe Photoshop CS5" — a purchased 3D-text graphic, not a photo of the business at all. |

Conclusion: every image on the archived site is third-party stock photography (some with EXIF metadata that explicitly confirms it), not real photos of DLK Locksmiths, its van, premises, or staff. No Facebook/Instagram was reachable this session (WebFetch/WebSearch blocked) to check for a fallback, and Google Business Profile photos were likewise out of reach. Per AGENTS.md step 5 and the task brief, this build is **text-forward with no photographic imagery** — CSS/typographic treatment only (a large key-line SVG motif built in code, not a photo). This is the correct, lower-risk choice for a locksmith demo versus substituting unrelated stock photography.

## Design Notes
- Palette: deep steel/gunmetal navy (`#12203a` family) as the primary dark, with a warm brass/amber accent (`#c8862b` family) evoking a physical brass key/lock finish, on a cool light-grey/white neutral background — distinct from this pipeline's other builds (no teal, no coral, no forest-green repeats seen in nearby folders) and thematically tied to "keys and locks" without needing a photo to sell that identity.
- Image layout pattern: n/a — no raster images used. One inline SVG key/keyhole motif reused as a decorative accent in the hero and section dividers.
- Risk notes: an all-text/graphic-only build for a trades business is a deliberate, sourced decision (see Asset Manifest) — not an oversight. If Alex later finds real DLK van/team photos (e.g. from a phone call or a reachable Facebook album), they can be dropped into `assets/images/` and swapped into the hero/about sections without a redesign, since the layout doesn't currently depend on any photo slot.

## Builder QA
- Contrast: PASS — 3 real violations found and fixed (mismatched button text colour on light cards, an under-threshold figcaption overlay, a two-stop gradient button with no single AA-safe text colour) — see QA_REPORT.md for full evidence
- Upscale mobile: PASS — no raster images in the build (0 candidates, 0 violations, 0 broken)
- Upscale tablet: PASS — no raster images in the build (0 candidates, 0 violations, 0 broken)
- Upscale desktop: PASS — no raster images in the build (0 candidates, 0 violations, 0 broken)
- Broken images: PASS (0 — no `<img>` tags in the build)
- Manual checks: PASS — see QA_REPORT.md for full detail (text-overflow with real content, mobile nav, scroll-reveal above-the-fold and full-page, FAQ accordion, internal links, contact-detail consistency)
