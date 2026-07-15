# QA Report

Use exact pass/fail evidence. "Looks fine" is not a result.

## Pages Checked
- index.html, services.html, contact.html — served locally via `python3 -m http.server 4599`, driven with the shared `.pipeline/qa/run-audit.js` Playwright runner (chrome-devtools MCP was permission-denied this session).

## Audit Results
| Check | Result | Evidence |
|---|---|---|
| Contrast audit | PASS | `contrast-audit.js` run at 390/820/1440px on all 3 pages: 0 `violations` after two fixes (see Blocking Issues → Fixed). `needsManualCheck` items (text on the navy `--brand-gradient` in `.hero`/`.section-dark`/`.cta-band`) manually verified by computing WCAG contrast for every text colour against both gradient stops: cream on navy-mid/navy-deep = 13.45/16.80, navy-pale on navy-mid/navy-deep = 7.40/9.24, brass-light on navy-mid/navy-deep = 8.92/11.14 — all clear AA (4.5:1) at both ends. |
| Upscale mobile | PASS | `upscale-audit.js` at 390px on all 3 pages: `totalChecked: 0` (build uses zero raster `<img>` elements — text/SVG-only per BUILD_BRIEF Asset Manifest), 0 violations, 0 broken. |
| Upscale tablet | PASS | Same script at 820px on all 3 pages: 0/0/0. |
| Upscale desktop | PASS | Same script at 1440px on all 3 pages: 0/0/0. |
| Broken images | PASS | 0 `<img>` tags exist anywhere in the build; all imagery is inline SVG (key/keyhole motif), so there is nothing to break. |
| Aspect mismatch advisory | N/A | No raster images. |

## Manual Checks
| Check | Result | Notes |
|---|---|---|
| Text on photo | N/A | No photographic imagery used anywhere (see BUILD_BRIEF Asset Manifest — every candidate image on the archived source site was confirmed third-party stock, one with EXIF explicitly reading "text 24h service 3d red white banner ... business concept"). |
| Gradient/::before backgrounds | PASS | See Audit Results row above — every gradient/text combination manually contrast-checked at both stops, not just spot-checked. |
| Image/content match | N/A | No images to mismatch. |
| Fabricated claims | PASS | Every factual claim on the site traces to a row in BUILD_BRIEF.md's Allowed Facts table, sourced from an archive.org snapshot of DLK Locksmiths' own domain. Uncertain/contradictory source claims (exact review count, the "Optimum SEO" 2020 testimonial, an exact response-time figure, the retired 0800 number) are listed in Do Not Claim and excluded from the site. |
| Mobile layout | PASS | 390px nav-toggle scripted-click test: `.nav-links` display goes `none` → `flex`, `aria-expanded` flips `false`→`true`. Full page-content text-overflow scan (`.info-card`, `.badge`, `.card`, `.testimonial`, `.footer-inner a`, `.area-chips li`, `.nav-links a`, `.btn`) at 390px on all 3 pages, using the actual longest real strings on the site (`info@dlklocksmiths.co.uk`, full address lines, phone numbers): 0 elements with `scrollWidth > clientWidth`. |
| Scroll-reveal above-the-fold | PASS | At 1440px with no scroll: `.trust-quote`/`.badge-row` (in-viewport at load, inside `[data-reveal]`) already report `is-visible: true`; a below-fold `[data-reveal]` element (`about` two-col) correctly still `false` until scrolled — confirms the standing `getBoundingClientRect` pre-check rule in `js/main.js` (copied verbatim from the shared pattern) is both present and functioning, not just present in code. |
| Scroll-reveal full-page | PASS (after investigation) | Initial `fullPage` screenshots showed large blank navy/cream gaps below the first two sections. Investigated per the documented pattern from prior builds (see feet-first-chiropody/QA_REPORT.md): confirmed this is a Playwright fullPage-capture artifact, not a real defect — a script that does `scrollTo(bottom)` → wait 400ms → `scrollTo(0)` → wait 400ms then queries all `[data-reveal]` elements shows **0 of 8 (index), 0 of 6 (services), 0 of 4 (contact)** remain non-`is-visible` after a real scroll pass. Re-captured screenshots after forcing the scroll pass first — all sections render correctly with no blank gaps (see Screenshots row). |
| "Duplicate header" in full-page screenshot | CONFIRMED NON-ISSUE | Same artifact class as above — `document.querySelectorAll('.site-header').length === 1` confirms a single sticky DOM element; the apparent double-header in the desktop capture is Playwright's fullPage stitching around a `position: sticky` element, not a real second header. |
| FAQ accordion | PASS | `services.html` has 9 `<details class="faq-item">` elements (from the archived site's FAQ content); scripted-open test on the first item confirms `.open` toggles and reveals its `<p>` text correctly. Used only for supplementary Q&A, not for hiding essential facts (pricing/guarantee/service-area facts are all plain visible text per AGENTS.md). |
| Internal links | PASS | Grepped all 3 pages for `href="*.html"` — every page links to all 3 pages (`index.html`, `services.html`, `contact.html`), no dead internal links. |
| Contact detail consistency | PASS | Grepped all 3 pages for phone numbers/tel/sms/mailto hrefs — `07846 668941`, `07578 800441`, `01279 260222`, `info@dlklocksmiths.co.uk` are identical everywhere they appear, with `href` values matching the digits shown (e.g. `tel:07846668941`). |

## Blocking Issues
| Issue | Evidence | Required fix |
|---|---|---|
| `.card` "View services" ghost buttons styled with `--color-brass-light` text/border, but `.card` always sits on light `--color-cream-deep` (even inside `.section-dark`) | `contrast-audit.js` at 390/820/1440px on index.html: `a.btn.btn-ghost` "View services" ratio 1.36 vs 4.5 threshold (×3 instances) | Removed the mismatched inline `style` override so the buttons fall back to the default `.btn-ghost` (navy-deep on transparent) — re-audit: 0 violations. |
| `.key-panel figcaption` brass-light text on a `rgba(10,22,38,0.72)` overlay | `contrast-audit.js`: ratio 4.47 vs 4.5 threshold (just under) | Darkened overlay to `rgba(10,22,38,0.88)` — re-audit: 0 violations. |
| `.btn-primary` used the two-stop `--brass-gradient` (brass → brass-deep) with `navy-deep` text | Manual WCAG calc: navy-deep on brass (gradient start) = 5.97 (safe) but navy-deep on brass-deep (gradient end) = 3.07 (fails 4.5:1) — no single text colour clears AA across both stops of that particular gradient | Switched `.btn-primary` to a solid `--color-brass-deep` fill with `--color-cream` text (5.47:1, safe); repurposed `--brass-gradient` as a decorative-only `border-image` on `.card` (borders have no text-contrast requirement) instead of leaving it unused. |

## Advisory Issues
- None outstanding.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| "View services" button contrast (1.36:1) | Removed inline brass-light override on 3 buttons in index.html | `contrast-audit.js` re-run at 390/820/1440px: 0 violations |
| `figcaption` overlay contrast (4.47:1) | Overlay alpha 0.72 → 0.88 in `css/styles.css` | `contrast-audit.js` re-run at 390/820/1440px: 0 violations |
| `.btn-primary` gradient-endpoint contrast risk (3.07:1 at one stop) | Solid `--color-brass-deep` fill + cream text, replacing the two-stop gradient | `contrast-audit.js` re-run: 0 violations; manual WCAG recompute of new pairing = 5.47:1 |
| Blank sections / "duplicate header" in initial fullPage screenshots | Confirmed non-issue via scripted scroll-then-query and `querySelectorAll` DOM count (see Manual Checks) | Re-captured screenshots after a forced scroll pass — all sections render, single header confirmed |

## Verdict
PASS
