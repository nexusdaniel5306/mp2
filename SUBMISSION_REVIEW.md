# MP2 submission review — October 5, 2026

Publication update: the student has authorized pushing the corrected version to `main`. The assessment below preserves the pre-push review; consult Git history and the newest Pages run for the subsequent publication state.

The current local app satisfies every objective rubric item in the 90-point functional/technology portion. Design is cohesive and readable at the main tested sizes, with the narrow-phone layout finding now corrected. This is an evidence-based assessment, not a guaranteed grade. Submission preparation is still incomplete: current changes are unpublished, shiny-mode chat-log coverage is pending, and demo/form completion has not been verified.

Reviewed against the complete [assignment README](README.md), current source, current production build, local Chrome rendering, repository metadata, Actions status, and the actual GitHub Pages site. Application source was not changed during the original review. The subsequent narrow-phone correction is recorded below.

| Rubric requirement | Points | Assessment and evidence |
| --- | ---: | --- |
| List displays relevant API items | 4 | Pass. Exactly 100 live PokéAPI records, contiguous National IDs 152–251. |
| Search filters as the user types | 8 | Pass. `CHI` gives Chikorita/Chinchou; padded ` chikorita ` gives Chikorita. No-match message and Clear search restore 100 records. No submit step. |
| Sort by at least two properties | 8 | Pass. National ID, name, and base experience are available. |
| Ascending and descending ordering | 8 | Pass. All six combinations checked across all 100 rendered rows. ID: 152/251; name: Aipom/Yanma; experience: Sunkern 36/Blissey 608. |
| Gallery displays item media | 4 | Pass. API sprites, names, IDs, and type labels appear in linked specimen cards. |
| Clicking a gallery filter changes results | 8 | Pass. All 18 type filters plus All types checked against the full rendered collection; counts and IDs match. Dual-type entries appear under either applicable filter. |
| List item opens detail view | 10 | Pass. Chikorita opens `/mp2/pokemon/152`; keyboard Enter also works. |
| Gallery item opens detail view | 10 | Pass. Celebi opens `/mp2/pokemon/251` from the filtered gallery. |
| Detail view contains item attributes | 8 | Pass. Names, National IDs, types, sprites, height, weight, experience, abilities/hidden labels, and six numeric stats are present. Chikorita: 0.9 m, 6.4 kg, experience 64, stats 45/49/65/49/65/45. Meters preserve numbers and accessible labels. |
| Previous and Next work | 10 | Pass. 152 → Next → 153 → Previous → 152; 152 → Previous → 251; 251 → Next → 152. URLs and headings update. Order remains National ID order when list/gallery controls are applied. |
| React Router and TypeScript | 12 | Pass. BrowserRouter, Routes, Route, Link/NavLink, and useParams are used in TypeScript source. `tsc -b` passes. |
| Design | 10 | Strong overall. External CSS, consistent typography, framed sprites, visible focus, pressed filter states, responsive grid, and readable controls. The 320px detail-heading overflow is resolved. Final design score is the grader's judgment. |

The weighted totals are List 28, Gallery 12, Details 38, Router/TypeScript 12, and Design 10. The shiny toggle is optional polish and does not replace a required feature.

| Constraint or project requirement | Result |
| --- | --- |
| Axios for API requests | Pass. The shared service uses `axios.create` and typed GETs for the approved PokéAPI collection and detail endpoints. |
| No inline styling | Pass. No JSX style attributes or app-owned inline style attributes in the tested main content. Styles are external CSS; dynamic stat values use native meter attributes. Browser extension overlays are not app source. |
| No inline scripts | Pass. `index.html` only loads the external Vite module. No inline script code or injected QA entry remains. |
| No HTML tables for layout | Pass. No table elements in app source. Layout uses CSS grid/flex and semantic lists/definition lists. |
| Preserve the course template | Pass. README and deploy workflow match the initial commit byte-for-byte. |
| Vite/project path and deployment assets | Pass. Vite base and Router basename are `/mp2/`. Built assets exist under that path; `dist/404.html` equals the built app shell. |
| Dependency lockfile | Pass. `package-lock.json` is tracked. Package dependencies and lockfile have no local changes. |
| Public `mp2` repository and Actions Pages source | Pass. Repository is public; default branch is main; Pages `build_type` is workflow. |
| Sources and LLM disclosure | Partially complete. SOURCES declares data, media, documentation, and Codex assistance; three existing share links are retained. The shiny-feature snapshot is explicitly pending. All code-producing chats must be included, and the form's LLM questions answered. |
| Individual work / source provenance | Course policy permits disclosed LLM assistance. No new third-party implementation was introduced in this review. The existing declaration records the implementation as Codex-assisted; complete log coverage remains the student's submission responsibility. |

**Verification scope.** A fresh production build and lint pass on Node 22.23.2/npm 10.9.8. `git diff --check` passes. Chrome inspection covers List, Gallery, and Details at 1440×900, 768×1024, and 390×844; all nine checks have no horizontal overflow. Keyboard Tab exposes a solid 3px outline, Enter opens records, Space/Enter operate shiny mode, and shiny selection survives navigation while preserving search/sort/filter state. Reload resets shiny mode to off. Direct local detail refresh, an out-of-range ID, and an unknown route behave correctly. Normal local browser diagnostics contain no warnings/errors.

Loading/error/retry, partial cache recovery, missing/broken images, null experience, and request-count tests are documented in LOCAL_HANDOFF from the earlier implementation and shiny work. Their source paths were inspected here and were not changed; failure injection was not repeated during this review. Reduced-motion rules remain in external CSS; the earlier simulated reduce-branch verification is recorded in the handoff. The OS media preference was not toggled in this review.

**Resolved: narrow-phone detail overflow.** The original 320px Misdreavus case had document client/scroll widths of 305/345px. A CSS-only breakpoint at 380px now stacks the National ID below the name, overrides the fixed body minimum width, and allows the single detail grid column to shrink. The built preview reports 305/305px at 320px for Misdreavus, Typhlosion, Feraligatr, and Forretress, with complete IDs visible. A 375px viewport also stacks cleanly; 390px, 768px, and 1440px retain the side-by-side heading with no overflow. Build, lint, and diff checks pass. [Screenshot of the correction](/Users/dli/.codex/visualizations/2026/10/04/01a1092d-f500-7581-a3a1-c2b2235f9f80/misdreavus-320px-fixed.jpg).

**Published state.** The current successful [Pages workflow](https://github.com/nexusdaniel5306/mp2/actions/runs/37245383488) built commit `107cc7814ae7f7fb27abf29552195d5748915c7b` (v1). The [live site](https://nexusdaniel5306.github.io/mp2/) loads 100 records and passes live search, Name/Descending, list/gallery details, Grass filtering, both boundary wraps, and nested detail reloads. Its masthead and shiny toggle confirm the current local upgrades are absent. A direct nested Pages request returns HTTP 404 and renders the working app through the custom 404 shell; this is the existing intentional fallback behavior.

**Before submitting the current version:**

1. Narrow-phone overflow corrected and verified. Removing Grass/Water/Fire patterns for uniform backgrounds is optional visual polish; it was discussed but has not been applied.
2. Add a shareable log covering shiny-mode implementation to `llm_logs.csv`. The disclosures explicitly say the previous share attempt was not approved; no new sharing was attempted here.
3. Commit/push the reviewed version, including the currently untracked `src/components/ArchiveMasthead.tsx`, and verify its new Actions run and live site. The current local source and published v1 are different versions.
4. Record a demo of at most three minutes showing the deployed URL and every required feature. Upload to Google Drive and share with `uiuc.web.programming@gmail.com`; verify the intended viewer can open it. No demo file/link was found in the project, so completion is unverified.
5. Submit the [assignment form](https://forms.gle/PkYq9RaMFG8MaMjF7) with repository/site/demo links, required disclosures/chat logs, and LLM survey answers. This review did not submit or inspect a form response.

Deadline: **Tuesday, October 6, 2026, 11:59 PM Central Time**.

Two documentation cleanup items remain optional: SOURCES links to `../MP_HELPER_GUIDE.md`, which is outside the submitted repository, so provide an accessible copy/link if graders need that source; LOCAL_HANDOFF retains historical deployment-pending steps even though v1 is deployed. This review records the current state above.

Screenshots from this review are saved in `/Users/dli/.codex/visualizations/2026/10/05/01a10e08-dc3d-7e71-9670-7ef1e55a0ab6/` as `rubric-desktop-*`, `rubric-tablet-*`, `rubric-phone-*`, and `rubric-narrow-phone-detail.jpg`. The built local preview is available at `http://127.0.0.1:4173/mp2/` while its process remains running.
