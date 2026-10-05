# PokéLab local implementation handoff

Local implementation and verification completed October 4, 2026. The student subsequently authorized committing and pushing this version as `v1`. Deployment, live verification, demo recording, and submission are tracked separately from these local checks. The earlier `IMPLEMENTATION_PLAN.md` remains the preserved planning record; this file records the actual implementation results.

## October 5 — publication authorization

The student authorized committing and pushing the reviewed field-journal, shiny-mode, and 320px detail fixes to `main`. Final production build/type check, lint, and diff checks pass. The sections below preserve the local-review state at the time their checks were recorded. The existing `v1` tag identifies the original release; this update does not move it. The new Pages workflow and live checks are verified after the push and reported in the chat. Shiny-mode/narrow-phone chat-log coverage remains a submission follow-up because the previous share was not approved.

## October 5 — 320px detail fix

A CSS-only breakpoint at 380px stacks the National ID below the record heading, removes the body's fixed minimum width at narrow sizes, and lets the single detail grid column shrink. At 320px, Misdreavus, Typhlosion, Feraligatr, and Forretress all have document client/scroll widths of 305/305px, with the full ID visible. At 375px the heading stacks; 390px, 768px, and 1440px retain the side-by-side heading. All inspected sizes have zero horizontal overflow. Production build/type check, lint, diff whitespace checks, and browser diagnostics pass. The fix remains local.

## October 5 — shiny mode

One archive-wide **Shiny mode** button now switches List, Gallery, Details, the three starter illustrations, and Previous/Next sprites. It starts off, keeps its selection during navigation, and resets on reload. The button exposes `aria-pressed`, visible On/Off text, and the existing keyboard focus outline. The shared image component selects the already loaded `front_shiny` field and identifies shiny sprites in alternative text. Missing/broken shiny URLs display a labeled placeholder; switching off restores the standard image.

Verification: production build/type check, lint, and `git diff --check` pass. Space and Enter toggle the button. Search `CHI` and Name/Descending remain applied during toggling; Grass selection and its ten records remain applied. Both boundary wraps retain shiny mode, all detail/neighbor image URLs use the selected variant, and the six original stat values remain unchanged. The control and shiny sprites were inspected at desktop, tablet, and phone widths; no horizontal overflow was observed. The final built preview passes default-off, keyboard activation, cross-route persistence, and clean console checks.

A temporary Axios adapter counter recorded 101 data requests for the initial live collection and still 101 after toggling, searching, sorting, navigating, and filtering. Injected null and broken shiny URLs produced accessible placeholders in List, Gallery, Details, and neighbors. Standard images recovered after toggling off. All QA injections and entry files were removed before the final build. No loader/cache, data model, dependency, course-template, or hosting changes were made.

This feature and the field-journal edits remain local and uncommitted. The built review preview stays open at **http://127.0.0.1:4173/mp2/**. Source disclosure is updated. The shiny-mode chat-share URL remains pending because thread sharing was not approved; the existing log links are preserved.

## October 5 — local field-journal upgrade

The visual upgrade is ready for review on top of published v1 (`107cc78`). These edits remain local and uncommitted. No push, deployment, GitHub settings changes, or submission was performed for this upgrade.

- List and Gallery share an asymmetric serif masthead with layered Chikorita, Cyndaquil, and Totodile specimen slips, using the existing loaded records.
- Warm paper, a faint grid and static contours, and marginal labels establish the field-journal surface. All styling remains in external CSS.
- Gallery cards use primary-type backgrounds, botanical lines for Grass, ripple rings for Water, and a warm radial glow for Fire. Inset framing, registration marks, faint National IDs, serif names, and small shadows add depth.
- Details use a large specimen panel beside a narrower information column. Six labeled native stat meters span the full-width section below, with visible numbers and a common 0–255 archive scale.
- Previous/Next cards include sprites. Card lift, stronger borders, sprite movement, and visible outlines work for keyboard focus; a brief detail entrance animation respects reduced motion.

Verification: production build, TypeScript, lint, and `git diff --check` pass. Rendered List, Gallery, and Details were inspected at 1440×900, 768×1024, and 390×844 with no horizontal overflow. Live/trimmed/case-insensitive search, the no-match reset, all six sorting combinations, every type filter, list and gallery detail entry, ordinary neighbors, and both boundary wraps pass. Keyboard Tab shows a solid focus outline; Enter opens a record. Meters expose all six labels, original values, and their min/max. Browser diagnostics report no warnings/errors.

Reduced-motion verification used a temporary external CSS override to exercise the reduce branch: card/sprite transforms were `none`, transitions were `0s`, and the detail animation was `none`; keyboard focus stayed visible. The real media query was restored. The preview browser does not expose media emulation, so the user's actual OS preference was not toggled.

The built production preview at `http://127.0.0.1:4173/mp2/` also passes fresh detail loading and refresh, both boundary wraps, live search and name sorting, Water filtering, and console checks. The review browser tab remains open.

The loader, Axios requests, cache, routes, controls, data model, dependencies, README, and deployment workflow are unchanged. `SOURCES.md` and `llm_logs.csv` include the visual assistance. The October 4 checks below remain the baseline record; their deployment-pending notes are historical, and the new visual work has not been published.

## Review the app

The production preview is running and open at **http://127.0.0.1:4173/mp2/**. It uses the built app and live PokéAPI data, with no mock fallback. The preview process must remain running for this URL to work.

From the `mp2` directory:

```sh
npm install
npm run dev
```

Use the actual Vite URL, including `/mp2/`. For a rebuilt production preview:

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

## Implemented behavior

- Shared normalized collection of exactly 100 default Pokémon, National IDs 152–251. Axios fetches the list and each detail record in batches of up to ten.
- Searchable List View at `/`: live, trimmed, case-insensitive name substring matching; National ID, name, and base experience sorting, each ascending or descending. Ties use ascending ID. Unknown experience stays after known values in either direction.
- Sprite Gallery at `/gallery`: current API types derived from the collection, one selected type, All types reset, identifying names/IDs, and links to details.
- Details at `/pokemon/:id`: name, National ID, sprite, types, height in metres, weight in kilograms, base experience, abilities with hidden labels, and six named base stats.
- Previous/Next browse the full archive in National ID order, including 152 → Previous → 251 and 251 → Next → 152, independently of filtering or sorting.
- List controls and gallery selection survive route changes. A full reload resets controls while preserving the requested route. Route changes scroll to the top.
- Loading, complete-collection errors, explicit Retry, no-match search, invalid route, and missing/broken image states are implemented.
- Module-level successful-record cache and one shared in-flight promise prevent duplicate loads and interaction refetching. Failed requests retain successful records; Retry checks the list and fetches only missing details. Cache lifetime is the loaded page.
- Responsive archive styling uses external CSS, semantic lists/definition lists, labeled native controls, pressed filter states, visible keyboard focus, a skip link, and useful sprite alternative text.
- Vite base is `/mp2/`; BrowserRouter uses `import.meta.env.BASE_URL`. `postbuild` copies the built `dist/index.html` to `dist/404.html` automatically for the existing workflow.

No backend, state library, persistent cache, or extra API families were added.

## Verification evidence

| Area | Result and evidence |
| --- | --- |
| Starter preservation | Selected Vite “Ignore files and continue.” Restored assignment README. README and deploy workflow compare byte-for-byte with pre-scaffold copies. Original plan and LLM log were preserved. |
| Dataset | Browser list contains 100 records, all contiguous IDs 152–251; Chikorita first, Celebi last. |
| Search | `CHI` matches Chikorita and Chinchou; ` chikorita ` matches Chikorita; whitespace shows 100; impossible query shows zero and Clear search restores 100. No submission required. |
| Sort | All six property/direction combinations checked across all rendered rows. ID endpoints reverse correctly; name endpoints are Aipom/Yanma; experience endpoints are Sunkern 36/Blissey 608. Combined search/sort remains applied. |
| Selector edge cases | Ten temporary Node assertions pass for trimming, empty/no matches, numeric 9 versus 100, valid zero, null values last in both directions, deterministic ties, input immutability, and neighbor boundaries. |
| List → detail | Chikorita list link opens `/mp2/pokemon/152` and matching content. |
| Gallery | All types shows 100. Grass shows ten, every card includes Grass. Psychic shows ten, every card includes Psychic. Celebi appears under both filters. |
| Gallery → detail | Celebi card opens `/mp2/pokemon/251` and matching attributes. The same route model is used from both views. |
| Attributes | Chikorita shows 0.9 m, 6.4 kg, experience 64, Overgrow, hidden Leaf Guard, and stats 45/49/65/49/65/45. Celebi shows its six stats and both current types. |
| Neighbors | 152 Next → 153; 153 Previous → 152; 152 Previous → 251; 251 Next → 152. URL and heading both update. Filtered/sorted navigation still follows National ID order. |
| State/history | `CHI`, Name, Descending survive detail navigation and Back to list. Psychic selection survives gallery → detail → gallery. Browser Back returns to the list; Forward restores the matching detail URL/content. |
| Direct routes | Fresh built `/pokemon/152` and `/pokemon/251` render; refresh works. IDs 151, 252, `152abc`, and `152.5` show the archive message. Unknown path shows Page not found. |
| Cache/StrictMode | Temporary Axios adapter counter records one list + 100 detail requests for a cold successful StrictMode load. Search, sort, list → detail, Next, gallery, and type filter keep total at 101. |
| List failure | Deliberate initial list failure shows error and Retry. Retry reaches 100: two list attempts, 100 detail attempts, 102 total. |
| Detail failure | Deliberately reject ID 161 in first batch. Error after ten detail attempts. Retry reaches 100 with two list attempts and 101 detail attempts total; ID 152 was requested only once, proving successful partial records were retained. |
| Images/unknown values | Injected missing Bayleef sprite and broken Chikorita URL show stable identifiable placeholders. Chikorita remains clickable and its detail placeholder works. Injected null experience displays Unknown and sorts last both ways. |
| Keyboard | Tab from search focuses Sort by with a visible solid outline. Enter activates a record and opens its detail route. |
| Layout | Screenshots inspected for all three views at 1440×900 desktop, 768×1024 tablet, and 390×844 phone. No horizontal overflow. Controls, gallery, and details remain readable. National ID sort label was shortened to fit phones. |
| Build/type check | `npm run build` (`tsc -b && vite build`, then postbuild) passes on local Node 22.23.2 and temporary Node 20.20.2. |
| Lint | `npm run lint` passes. |
| Static rules | No JSX inline styles or HTML layout tables. `index.html` contains only the required external Vite module script, no inline script code. `git diff --check` passes. |
| Console | Normal development and production browser runs have no warnings/errors. Injected missing sprite produced only its expected failure in the temporary QA session. |
| Build assets/fallback | Built JS/CSS asset URLs use `/mp2/assets/`; referenced files exist; `dist/404.html` equals built `dist/index.html`. |
| Pages simulation | Temporary static server returns built `404.html` for `/mp2/pokemon/251` with HTTP 404. Browser renders Celebi and refreshes successfully. Actual GitHub Pages verification is still pending. |

Temporary QA entry files, injected data, and temporary test servers were removed/stopped after verification. The production review preview remains running. The checks used actual live data except the explicitly injected failure/null-image/null-experience cases.

## Dependency and hosting decisions

Vite generated the React/TypeScript scaffold. Axios is the required HTTP client. React Router **7.18.4** was selected because its Node engine supports the existing Node 20 workflow; the newest Router 8 required Node 22. No workflow edit was needed. Installed dependency audit reported zero vulnerabilities.

The custom 404 app shell supports nested routes without inline redirects. On GitHub Pages, a fresh nested URL will still initially return HTTP 404 while rendering the functioning app. This tradeoff was specified in the plan. Local simulation passes; test the actual deployed URL and refresh after publishing.

## Repository and disclosures

- Independent repository: `/Users/dli/Desktop/CS409 Web Programming/mp2`.
- Branch: `main`; baseline commit `8c7ef2f` (`Initial commit`). The student authorized a v1 implementation commit and `v1` Git tag; use Git history for their exact revision.
- Original tracked README and `.github/workflows/deploy.yml` are unchanged.
- `package-lock.json` is retained for deployment's `npm ci`.
- `SOURCES.md` declares documentation, data/media, Vite scaffold, and Codex assistance.
- `llm_logs.csv` preserves the planning share URL and contains the completed local implementation snapshot. The implementation share was successfully refreshed before the authorized v1 push.

The student authorized the v1 commit and push after local review. Pushing `main` triggers the preserved Pages workflow. GitHub setting changes, collaborator invitations, and form submission are outside this authorization.

## Remaining completion steps

1. Local review and v1 commit/push authorization received.
2. Planning and completed-implementation chat snapshots recorded in `llm_logs.csv`.
3. Commit and push v1, then inspect the automatic workflow. Verify repository visibility and Pages source; obtain authorization if settings need changes.
4. Verify GitHub Actions succeeds and inspect the actual published site, expected at `https://nexusdaniel5306.github.io/mp2/`. Test fresh detail URLs and refresh on the real host, plus the critical search/sort/filter/wrap cases.
5. Record a demo of at most three minutes. Show the deployed URL, live search, multiple sort properties and both directions, list detail attributes and Previous/Next wrapping, gallery type filters and gallery detail navigation, and refresh of a detail route.
6. Upload the demo to Google Drive and share it with `uiuc.web.programming@gmail.com`.
7. Complete and submit the [MP2 form](https://forms.gle/PkYq9RaMFG8MaMjF7), including sources, LLM questions, repository/site, and demo links.

Deadline: **Tuesday, October 6, 2026, 11:59 PM Central Time**. The assignment's local-only demo cap makes deployment an essential remaining step. MP2 does not name collaborators to invite or exact mandatory viewports.
