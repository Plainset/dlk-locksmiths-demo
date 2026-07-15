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

## Independent Reviewer Pass (2026-07-15)
Reviewed fresh, not the original builder. Treated BUILD_BRIEF/QA_REPORT/PIPELINE_STATUS as a map, re-verified independently.

| Check | Result | Evidence |
|---|---|---|
| Live domain critical error (pitch hook) | CONFIRMED | Own `curl -sS -v` today on all 4 combos (`http`/`https` × bare/`www`): all 4 return HTTP 500 with WordPress body `There has been a critical error on this website.` |
| Wayback homepage snapshot (22 Nov 2024) content | CONFIRMED | Fetched `web.archive.org/web/20241122033605/https://dlklocksmiths.co.uk/` directly. Verified verbatim on-page text (not just JSON-LD): all 3 phone numbers (`07846 668941`, `07578 800441`, `01279 260222`), email `info@dlklocksmiths.co.uk`, "Founded in 1999 by Darren and Lisa...", "Essex Police" vetting line, "BEAT it!" price-match line, visible itemprop address block reading "Tuppenny Breeze, Elsenham, CM22 6DE". Note: this snapshot's JSON-LD schema block is internally messy (one schema entity lists an unrelated "Heath Row, CM23 5BJ" address) — this is noise in the source site's own SEO-plugin markup, not something the build brief used; the brief correctly sourced the visible itemprop address instead. |
| Wayback `/reviews/` snapshot (Feb 2026) | CONFIRMED | CDX index shows `20260215111336` capture exists, HTTP 200. Fetched it directly: footer reads "© 2026 DLK Locksmiths - Local Emergency Locksmith since 1999", and it contains `07846 668941` / `07578 800441` — matches BUILD_BRIEF's claim exactly. |
| 2020 contact-us snapshot address/email | CONFIRMED | Fetched `web.archive.org/web/20200919162214/.../contact-us/` directly. Visible text reads "Head Office/Admin only: Tuppenny Breeze, Park Road, Elsenham, Essex, CM22 6DE" and a separate mailto link displaying `info@dlklocksmiths.co.uk` — both exact matches. (One curiosity: the *heading* "E-mail:" link on that page is a stray `mailto:info@demolink.org` theme-template artifact, but the actual displayed email/address text used by BUILD_BRIEF is correct and unaffected.) |
| Testimonial quote (Lisa James) | CONFIRMED | Found verbatim in `web.archive.org/web/20200919161313/.../about-us/`: "Thank you Darren for helping my mum get back into her house in Bishops Stortford. No damage and a really quick service." attributed to a review card with alt="Lisa James". |
| EXIF stock-photo claim | CONFIRMED independently | Located and downloaded the actual archived file (`wp-content/uploads/2020/09/Locksmith-near-me.jpg`, native 400×300) via Wayback CDX + fetch. Read EXIF directly with Python/Pillow: `ImageDescription = "text 24h service 3d red white banner, letters and block, business concept"`, `Software = "Adobe Photoshop CS5 Windows"`, `DateTime = 2013:02:28`. Matches the claim verbatim — this is a purchased stock graphic, not a photo of the business. |
| No photography smuggled into final build | CONFIRMED | Grepped all 3 HTML files for `<img` (zero matches), grepped `css/styles.css` for `background-image`/`url(` (zero matches), and searched the whole repo for `.jpg/.png/.jpeg/.webp/.gif` (zero files exist). The "text/SVG-only" claim is structurally enforced, not just asserted. |
| Do-Not-Claim leaks | NONE FOUND | Grepped all 3 pages for the excluded claims (0800 number, "Optimum SEO", any review-count figure, "within the hour"/"30 minutes"/"15 to 30 minutes" response-time claims) — zero matches. |
| Contact detail consistency | CONFIRMED | Counted phone/email occurrences across all 3 pages — `07846 668941`, `07578 800441`, `01279 260222`, `info@dlklocksmiths.co.uk` appear only in matching digit/text form everywhere, no mismatches. |
| Upscale audit (re-run independently) | PASS, 0/0/0 at 390/820/1440 on all 3 pages | Re-ran `.pipeline/qa/upscale-audit.js` via `.pipeline/qa/run-audit.js` against a fresh local server. **Note:** first attempt on port 4599 accidentally hit a stale server from an unrelated business (Dollimore Upholstery) left running from an earlier session — caught via `totalChecked: 5` and a page-text mismatch, killed the stale process, re-served DLK Locksmiths on port 4823, re-ran clean: `totalChecked: 0` (correct, no raster images) at all 3 widths on all 3 pages. |
| Contrast audit (re-run independently) | PASS, 0 violations at 390/820/1440 on all 3 pages | Re-ran `.pipeline/qa/contrast-audit.js`. Also independently recomputed WCAG contrast in Python for every `needsManualCheck` gradient/text pairing (hero/page-hero text on `--brand-gradient`): cream/navy-mid 13.45, cream/navy-deep 16.8, navy-pale/navy-mid 7.4, navy-pale/navy-deep 9.24, brass-light/navy-mid 8.92, brass-light/navy-deep 11.14 — all match QA_REPORT's figures exactly and clear AA. |
| Mobile layout / text-overflow (re-run independently) | PASS | At 390px, scripted `scrollWidth > clientWidth` check across `.info-card`, `.badge`, `.card`, `.testimonial`, `.footer-inner a`, `.area-chips li`, `.nav-links a`, `.btn`, `.policy-list li`, `.address`, `figcaption` on all 3 pages with real content: 0 overflowing elements. Nav toggle scripted-click: `display none→flex`, `aria-expanded false→true` on all 3 pages. |
| Scroll-reveal above-the-fold | PASS | At 1440×900 with no scroll, `[data-reveal]` elements already within `getBoundingClientRect()` bounds (`trust-quote`, `badge-row`, `two-col` about section) report `is-visible: true`; below-fold elements correctly `false` until scrolled. Confirmed the standing `getBoundingClientRect` pre-check rule is present in `js/main.js` (lines 47-62). |
| Screenshots (2 used, taken last) | Confirmed non-issue | Initial desktop/mobile `fullPage` screenshots showed large blank navy/cream gaps and an apparent duplicate header — reproduced the same artifact QA_REPORT already documented. Independently forced a scroll pass (`scrollTo(bottom)` → wait → `scrollTo(0)` → wait) before a third screenshot: all 8 `[data-reveal]` elements report `is-visible`, `document.querySelectorAll('.site-header').length === 1`, and the re-captured screenshot renders every section correctly with no gaps. Confirms this is a Playwright fullPage-capture artifact from `position: sticky`, not a real page defect. |

**Verdict: PASS, no blocking or advisory issues found.** Fabricated-facts risk, image-integrity risk, and contrast risk — the three highest-cost failure modes for this pipeline — were all independently re-verified from primary sources (live curl + direct Wayback fetches + EXIF inspection) rather than trusted from the builder's report, and all held up. The only non-content problem found was environmental (a stale server process from a different business's QA session squatting on port 4599), not a defect in this build; it was caught immediately because the DOM content didn't match the expected page, and corrected before drawing any conclusions from it.
