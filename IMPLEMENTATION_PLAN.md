# PokéLab: Johto Regional Research Archive

Technical implementation handoff for CS 409 MP2. Prepared October 4, 2026.

**Status:** planning complete; application implementation, browser verification, deployment, and submission remain outstanding. This document specifies the proposed implementation; it does not claim that the features already exist.

## 1. Objective and authoritative sources

Build a single-page React + TypeScript application using React Router, Axios, and PokéAPI. Present the 100 Pokémon introduced in Generation 2, identified by **National Pokédex IDs #152–251**, through searchable list, filterable gallery, and individually addressable detail views.

Read these sources before implementing:

- [MP2 assignment and rubric](README.md): authoritative course requirements.
- [MP completion guide](../MP_HELPER_GUIDE.md): development, review, verification, and submission workflow.
- [Existing deployment workflow](.github/workflows/deploy.yml): preserve the course deployment setup.
- This document: product decisions and implementation recommendations. If it conflicts with the assignment, follow the assignment and identify the discrepancy.

The concept covers all 100 rubric points without a backend or additional API families. Three sort properties modestly exceed the two-property minimum. Design is worth 10 points, so readable, consistent styling belongs in the core implementation; optional effects and media controls do not.

**Deadline:** Tuesday, October 6, 2026, at 11:59 PM Central Time.

### Repository baseline observed during planning

- Working directory: `/Users/dli/Desktop/CS409 Web Programming/mp2`.
- Independent Git repository; branch `main`, tracking `origin/main`, clean before this document was added.
- Origin: `https://github.com/nexusdaniel5306/mp2.git`.
- Existing commit: `8c7ef2f` (`Initial commit`).
- Only tracked files: `README.md` and `.github/workflows/deploy.yml`.
- No React scaffold, package manifest, lockfile, application source, or `llm_logs.csv` exists yet.
- Workflow uses Node 20, `npm ci`, `npm run build`, and the `dist/` artifact. It deploys on pushes to `main` and supports manual dispatch.
- Local runtime observed: Node `22.23.2`, npm `10.9.8`. Recheck installed dependency engine requirements at scaffold time. Vite's current guide specifies Node 20.19+ or 22.12+; the observed local runtime meets that stated requirement. Preserve the workflow unless a demonstrated compatibility issue requires a narrow change. [Vite setup reference](https://vite.dev/guide/)
- Repository visibility, Pages settings, and a live deployment have not been verified. Expected eventual URL: `https://nexusdaniel5306.github.io/mp2/`.

This session authorizes planning and the local handoff document. It does not authorize implementation, commits, pushes, deployments, account settings changes, or form submission. The implementation agent should follow the user's subsequent authorization and preserve unrelated work.

## 2. Product scope and settled defaults

| Decision | Implementation default |
| --- | --- |
| Collection | Exactly the 100 default Pokémon records with IDs 152 through 251 |
| Archive identity | “PokéLab” with subtitle “Johto Regional Research Archive” |
| Scope explanation | “100 Pokémon introduced in Generation 2 · National Pokédex #152–251” |
| Attributes | Current PokéAPI data; no historical type, ability, or stat reconstruction |
| Landing route | `/` is the List View |
| Gallery route | `/gallery` |
| Detail route | `/pokemon/:id`, accepting numeric IDs in the collection |
| Initial list order | National Pokédex number, ascending |
| Search | Case-insensitive name substring matching, updated on every input change |
| Sort controls | Property selector: Pokédex number, name, base experience; direction selector: ascending/descending |
| Gallery filter | One selected type at a time, plus “All types” |
| Detail navigation | Fixed ascending National Pokédex order, wrapping at both endpoints |
| View-state persistence | Keep list controls and gallery selection in `App` so they survive route changes; reset on a full reload |
| Data ownership | One shared loader called above the route views; pass data through props |
| Styling | Plain external CSS, CSS Grid/Flexbox, semantic HTML; no UI component library needed |

“Johto” is the archive theme, not a claim that this is the complete in-game Johto regional Pokédex. Use the word **National** wherever numbering could be ambiguous. Use current API types in filters, even when they differ from the original Gen 2 games.

Live checks on October 4 confirmed that the specified list endpoint returns 100 contiguous IDs, beginning with Chikorita at 152 and ending with Celebi at 251. Sample detail responses for 152, 175, and 251 exposed the proposed fields; Togepi currently has the Fairy type. These were sample checks, not a complete inspection of all 100 detail records. [Collection endpoint](https://pokeapi.co/api/v2/pokemon?limit=100&offset=151), [Togepi detail](https://pokeapi.co/api/v2/pokemon/175)

Do not add authentication, user accounts, a backend, a database, Redux, a query-state library, pagination, infinite scrolling, evolution trees, battle calculations, or searches across other generations. Do not fetch species, ability, or type detail endpoints for the baseline app.

## 3. Rubric-to-implementation matrix

The rubric groups its criteria by view rather than numbering them. Every row below must be verified against the rendered application.

| Assignment criterion | Points | Implementation location | Acceptance check |
| --- | ---: | --- | --- |
| List displays relevant API items | 4 | Shared loader + `ListView` | Initial list contains 100 unique records, IDs 152–251 only |
| Search filters items | 8 | `ListView` + list selector | Typing changes results without submit; mixed case, surrounding spaces, empty query, and no matches behave correctly |
| Sort by at least two properties | 8 | `ListView` + list selector | Name, ID, and base experience each change ordering correctly |
| Ascending and descending ordering | 8 | Same controls and selector | Check both directions for all three properties; numeric sorts are numeric |
| Gallery displays item media | 4 | `GalleryView` + `PokemonImage` | Pokémon sprites appear in a consistent grid with identifying text |
| Clicking a filter changes results | 8 | `GalleryView` type controls | Select Grass; every remaining record includes Grass in its types; All types restores 100 |
| List item opens Details | 10 | List row `Link` | Activate a result and confirm the URL and corresponding detail content |
| Gallery item opens Details | 10 | Gallery card `Link` | Activate a sprite/card and confirm the same detail route and record |
| Details contain item attributes | 8 | `DetailView` | Show name, National ID, sprite, types, base experience, height, weight, abilities, and six named base stats |
| Previous and Next work | 10 | `DetailView` | Test ordinary neighbors, 152 → Previous → 251, and 251 → Next → 152 |
| React Router and TypeScript | 12 | Entry point, route tree, typed components/API model | Three route views, typed data/props, working direct detail URLs, successful type-checked production build |
| Design | 10 | Shell, all views, CSS | Clear hierarchy, consistent spacing/colors, readable controls, coherent archive theme, usable narrow layouts |
| **Total** | **100** | | |

Axios is explicitly required even though the rubric does not assign it a separate row. All JSON API calls must use Axios. The assignment permits client-side filtering/sorting and a gallery with one or many selected filter attributes; a single type selection satisfies that wording.

## 4. Suggested file structure

Keep the Vite React/TypeScript scaffold and its configuration conventions. The following is a small target structure, not a requirement to create empty files in advance:

```text
mp2/
  README.md                       # preserve assignment text
  IMPLEMENTATION_PLAN.md           # this handoff
  SOURCES.md                      # actual reading, code inspiration, and media sources
  llm_logs.csv                    # real shareable assistance logs before submission
  .github/workflows/deploy.yml     # preserve existing workflow
  index.html                      # external Vite module entry; no inline code
  package.json
  package-lock.json
  vite.config.ts
  scripts/
    copy-pages-fallback.mjs        # small postbuild copy of index.html to 404.html
  src/
    main.tsx                      # BrowserRouter and application mount
    App.tsx                       # shared data hook, control state, shell, routes
    index.css                     # reset, tokens, global typography, focus styles
    App.css                       # shell, view layouts, controls, cards, type classes
    types/
      pokemon.ts                  # minimal API response and client model types
    services/
      pokemonApi.ts               # Axios, normalization, shared request/cache logic
    hooks/
      useJohtoPokemon.ts          # loading/error/data lifecycle and retry action
    utils/
      pokemon.ts                 # pure filtering/sorting and neighbor calculations
    components/
      AppNav.tsx                  # brand, List/Gallery NavLinks
      PokemonImage.tsx            # sprite and missing/broken-image fallback
      TypeBadges.tsx              # shared type labels with external CSS classes
    pages/
      ListView.tsx
      GalleryView.tsx
      DetailView.tsx
```

Keep a short unknown-route message in `App.tsx`; a separate NotFound page is unnecessary unless it grows. Keep loading/error markup in its owner rather than building a general status framework. List rows and gallery cards may remain in their page files. No Context provider is necessary at this scale because the three pages can receive props directly.

Data flow: **PokéAPI → Axios service → normalized collection → shared hook in App → route views → client-side selectors.** Route navigation and control changes must not trigger a collection reload.

## 5. TypeScript data contract

Define only the response fields consumed by the application. The API returns many more fields; do not model or retain them unnecessarily. The following interfaces are a proposed contract, not application code to scaffold in this planning session:

```ts
interface NamedResource {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: NamedResource[];
}

interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
  types: { slot: number; type: NamedResource }[];
  base_experience: number | null;
  height: number;
  weight: number;
  abilities: {
    slot: number;
    is_hidden: boolean;
    ability: NamedResource;
  }[];
  stats: { base_stat: number; stat: NamedResource }[];
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
  types: string[];
  base_experience: number | null;
  height: number; // API unit: decimetres
  weight: number; // API unit: hectograms
  abilities: { name: string; is_hidden: boolean }[];
  stats: { name: string; base_stat: number }[];
}

type SortKey = 'id' | 'name' | 'base_experience';
type SortDirection = 'asc' | 'desc';

type PokemonLoadState =
  | { status: 'loading' }
  | { status: 'success'; pokemon: Pokemon[] }
  | { status: 'error'; message: string };
```

Normalization copies the required scalar values, flattens named resources, and retains type/ability slot order. Retain both sprite fields at negligible extra cost; a shiny control remains optional. Keep API names as canonical values and format capitalization/hyphens for display separately. Height and weight display in metres and kilograms by dividing the API values by 10. The field meanings and source units are documented by [PokéAPI](https://pokeapi.co/docs/v2#pokemon).

Use `number | null` for base experience so missing values can display as “Unknown” instead of a fabricated zero. Numeric zero, if present, is valid. Sprite URLs may be absent or fail to load. TypeScript response annotations do not validate JSON at runtime; perform the small collection-boundary checks below rather than introducing a schema-validation dependency.

## 6. Fetching, caching, and failure behavior

### Fetching contract

1. Request `https://pokeapi.co/api/v2/pokemon?limit=100&offset=151` with Axios.
2. Fetch each returned `results[].url`, also with Axios. Do not treat the list response as a complete detail response.
3. Normalize each detail into `Pokemon` immediately, discarding unrelated payload fields.
4. Confirm the complete collection has exactly 100 unique IDs and every integer from 152 through 251. Sort the canonical collection by `id` ascending, regardless of response-completion order. Do not use the API's separate `order` field as the National ID.
5. Resolve the shared loader with that complete collection. The views reuse it without API calls of their own.

A cold successful load uses **101 JSON requests**, plus separate browser image requests. This is the main performance tradeoff in the proposed design, but it supplies all three sort fields and all detail attributes once for a small, fixed collection. PokéAPI requires no API key and asks clients to cache resources. [PokéAPI access and fair-use documentation](https://pokeapi.co/docs/v2#information)

Use a simple loop of batches of up to 10 detail requests. Within each batch, wait for all outcomes before deciding whether to continue or report failure; this prevents an early rejection from leaving a retry racing the same batch. No queue library, request scheduler framework, or automatic retry/backoff system is needed.

### Shared ownership and cache

- Keep the successful normalized records in a module-level in-memory cache keyed by ID.
- Keep one shared in-flight collection promise so simultaneous consumers and React development effect replays reuse the same work.
- On a failed load, clear the rejected in-flight promise. Keep successfully fetched records, and retry only missing details after rechecking the list endpoint.
- On subsequent navigation, return the completed cached collection. Do not place search, sort, route ID, or gallery type in fetching dependencies.
- Keep the hook mounted in `App` above the routes. Effect cleanup should prevent an obsolete subscriber from updating state. It should not cancel a shared promise another subscriber is using.
- Keep React StrictMode enabled. Confirm development effect replay does not launch two full successful loads.
- In-memory caching lasts for the loaded page. Full reloads may fetch again; browser HTTP caching may assist. Persistent storage, expiration rules, and service workers are outside baseline scope.

### Loading and error states

Use a complete-collection-or-error UI for the baseline. This keeps sorting and the stated count trustworthy and ensures every valid neighbor can be displayed.

- While loading: keep the app shell visible and show “Loading the Johto archive…” in the content area with a polite status announcement. Do not show a misleading empty-results message.
- On a collection or detail-request failure: show a concise explanation and a Retry button. Disable duplicate retry attempts while loading. Do not silently present 99 items as the complete archive.
- Set a reasonable Axios timeout, such as 15 seconds per request, so a stalled network call can reach the retry state.
- After success: use view-specific empty states only for genuine filtering with no matches.
- On missing/broken images: retain the name and ID and show a stable image placeholder. Avoid recursively retrying the same broken URL; reset image-failure state when the sprite URL changes.
- On an invalid route: show “Pokémon not in this archive” or “Page not found,” with a Link to the list. An invalid ID must not produce an API request for another generation.

Mock responses are permitted by the assignment during API outages. If used for development, label the mode and disclose it; do not silently fall back to invented data or leave a small fixture as the final 100-record archive.

## 7. Routing and GitHub Pages

Use React Router's declarative mode. The current official guide installs `react-router`; use the APIs and import paths for the installed major version consistently. Do not combine the assignment's older quick-start examples with incompatible modern APIs. No React Router framework scaffold, server loaders, or SSR is needed. [React Router installation](https://reactrouter.com/start/declarative/installation)

Configure Vite `base` as `/mp2/`. Mount `BrowserRouter` with `basename={import.meta.env.BASE_URL}`. Route definitions and `Link` destinations remain app-relative (`/`, `/gallery`, `/pokemon/152`); do not manually prepend `/mp2` to each link. The router supplies the basename. Use `NavLink` for navigation and make the list link an exact/end match. [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages)

| App route | Content | Eventual deployed URL example |
| --- | --- | --- |
| `/` | List View | `https://nexusdaniel5306.github.io/mp2/` |
| `/gallery` | Gallery View | `https://nexusdaniel5306.github.io/mp2/gallery` |
| `/pokemon/:id` | Detail View | `https://nexusdaniel5306.github.io/mp2/pokemon/152` |
| `*` | Helpful unknown-route message | Any unmatched path under the app |

### Direct-link fallback is part of the baseline

`basename` fixes client-side routing and asset paths; it does not make GitHub Pages serve a nonexistent nested file. Plan a small postbuild script that copies the **built** `dist/index.html` to `dist/404.html`. Wire it through npm's `postbuild` lifecycle so the existing workflow's `npm run build` automatically creates the fallback before upload. Do not maintain a second hand-written app shell or copy the source `index.html`, whose entry points have not been built.

GitHub Pages supports a custom `404.html`. Serving the built app shell there should allow BrowserRouter to read the original nested URL and render the matching view. This is the proposed application of that documented mechanism and must be verified on the deployed site. No inline redirect script is needed. [GitHub custom 404 documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

**Known tradeoff:** an initial request handled by the custom fallback still has HTTP status 404 even when the browser displays the functioning application. The assignment specifies addressable details, not SEO or a 200 response for every nested URL. If clean 200 responses become a separate requirement, revisit static route-entry generation; do not add it preemptively. HashRouter would simplify static hosting but change the URL format and depart from the README's BrowserRouter setup, so it is not this plan's default.

Keep custom scripts in files and application styling in CSS. Vite's external module script tag is necessary; the prohibition concerns inline script code. Use imports or `import.meta.env.BASE_URL` for local assets so nested URLs do not break them.

## 8. View behavior

### List View

- Put the searchable archive on the initial screen without a separate splash page.
- Show a labeled search input, sort-property select, direction select, and visible result count.
- Derive results from the shared collection: normalize query with trimming and lowercase, filter by `name.includes(query)`, then sort a fresh array. Never mutate the cached array in place.
- Name sorting uses a string comparator; ID and experience use numeric comparison. Use ascending ID as a deterministic secondary key when primary values tie.
- Unknown base experience sorts after known values in both directions. Handle that rule before applying the ascending/descending multiplier to the primary comparison.
- Empty or whitespace-only queries show all records. A nonsense query shows a clear no-results message and a way to clear the query.
- Each list row shows National ID, name, types, and base experience so all sort choices are understandable. A small sprite is optional here because the gallery supplies the graded image view.
- Make each result a semantic `Link` with an informative accessible name. Use list elements with CSS Grid/Flexbox for the layout; do not use a table to arrange the page.
- Filtering 100 records is inexpensive. Do not debounce input or make API requests as the user types. Memoization is optional, not an architecture requirement.

### Gallery View

- Show a responsive sprite grid with name, National ID, and type badges per card.
- Derive available types from the loaded collection, deduplicate, and sort alphabetically. Do not hard-code a historical Gen 2 type list or fetch the type endpoint.
- Use a wrapping row of labeled type buttons, with `aria-pressed` for the selected button, plus “All types.” This makes the rubric's click-to-filter behavior obvious.
- Keep one selection. A dual-type Pokémon appears whenever either of its types matches the selected type. Reset to all 100 with All types.
- Keep the gallery in ascending National ID order. No gallery sort or second search box is needed.
- Make the entire card a single `Link`, with no nested buttons. Use `sprites.front_default`, explicit image dimensions to prevent layout shifts, useful alt text, and lazy loading where appropriate.

### Detail View

- Read `id` from the URL. Accept only a digit-only integer between 152 and 251; reject malformed values such as `152abc`, fractions, and out-of-range IDs. Do not rely on permissive `parseInt` alone.
- Find the selected Pokémon in the shared collection. A cold deep link runs the same shared loader; it must not depend on prior list navigation or router navigation state.
- Display the complete core attributes in the rubric matrix. Use a definition list for scalar attributes and a clearly labeled list for six base stats: HP, Attack, Defense, Special Attack, Special Defense, Speed.
- Abilities are readable names, with a “Hidden” label where applicable. Ability descriptions would require extra endpoint requests and are outside baseline scope.
- Previous ID is 251 when the current ID is 152, otherwise current ID minus one. Next ID is 152 when current ID is 251, otherwise current ID plus one.
- Render Previous and Next as Links styled as controls. Include destination names/IDs if convenient from the already-loaded collection.
- The navigation sequence is always the full fixed archive, independent of search results, list sort, and type selection. Include a small label such as “Browse by National Pokédex number.”
- Provide an explicit Back to list link and the shared Gallery navigation. Do not rely solely on browser-history back, which may leave the app on a direct visit.

## 9. Design and accessibility baseline

Recommended visual direction: a readable research archive with a warm off-white background, dark green text/accents, restrained gold highlights, subtle panel borders, and sprite-forward cards. Use the same header, content width, controls, badges, and spacing across all views. Treat this as a reasonable default for student review, not an approved final mockup.

Use system fonts to avoid unnecessary loading and attribution work. Keep the archive identity concise; the controls and data should be prominent. Use color plus type text, clear selected and hover states, visible keyboard focus, proper labels, one main heading per view, and comfortable contrast. Avoid image-only navigation.

Use external CSS classes for type colors and state styling. No JSX `style` props, literal `style` attributes, inline scripts, or tables used for layout. A component library is permitted by MP2, but unnecessary and potentially introduces inline-style output to audit.

The MP2 README specifies **no exact viewport list**. Do not import MP1's required resolutions as MP2 requirements. Recommended QA sizes: 1440×900 desktop, 768×1024 tablet, and 390×844 phone. At each, ensure controls wrap, cards resize, detail content stays readable, and the page has no horizontal overflow.

## 10. Implementation order and verification gates

1. **Protect and scaffold.** Re-read current files, inspect Git status, preserve the assignment README and workflow, then run the README's Vite `react-ts` setup in `mp2`. Choose “Ignore files and continue,” restore only any scaffold-overwritten assignment text, install dependencies, and add Axios and React Router. Preserve TypeScript/config files generated by Vite and commit the lockfile only when committing is authorized. **Verify:** starter dev page renders, actual build/type-check and lint scripts pass, no existing files were unintentionally lost. Do not run `npm audit fix` or unrelated upgrades.

2. **Establish routes and deployment structure.** Set the Vite base and router basename, build the shell and three placeholder routes, and add the postbuild fallback. **Verify:** links update the URL, browser back/forward work, local direct detail paths render a placeholder, built asset URLs start with `/mp2/`, and `dist/404.html` matches the built entry. This early step catches deployment architecture mistakes before UI work.

3. **Implement the model and shared loader.** Add the API response/client types, normalizer, bounded batches, in-memory caching, hook, and status UI. **Verify:** 100 unique IDs, correct boundaries, sample normalized values, a working forced-failure retry, and no new JSON requests during route changes. Confirm StrictMode does not duplicate the whole load.

4. **Complete List View.** Add live filtering, all three sort keys, both directions, count, empty state, and detail links. **Verify:** every list rubric row, including mixed-case queries, numeric ordering, and all six sort combinations.

5. **Complete Detail View.** Add attributes, route validation, and fixed-order neighbors. **Verify:** direct load, reload, list-to-detail navigation, invalid IDs, ordinary neighbors, both wrap boundaries, and returning to preserved list controls.

6. **Complete Gallery View.** Reuse the image/type components, add the grid and type controls, and link cards to details. **Verify:** type membership, both types of a dual-type Pokémon, All types, gallery-to-detail navigation, and retained selection after returning.

7. **Finish baseline design and integrated QA.** Apply cohesive styling and accessibility, inspect all recommended viewport sizes, check network/console output, run build/lint and `git diff --check`, and inspect the full diff against the rubric and rules. **Verify:** no incomplete rubric rows, no unintended inline styles/scripts, no missing sources, and no broken interactions.

8. **Student review, then authorized publishing and submission.** Leave the local preview open for review. Once authorized, commit reviewed explicit files, push, verify GitHub Actions and the actual live site, then prepare the demo and disclosures. **Verify:** published direct detail URL works in a fresh tab and after refresh; submission checklist below is complete. A local build alone does not satisfy this gate.

Do not start stretch goals while baseline defects remain. With the stated deadline, prioritize a deployed, testable baseline before spending remaining time on enhancements.

## 11. Concrete QA cases

Record pass/fail evidence during implementation; all checks below are currently pending. Small pure-function tests for filtering, sorting, and wrapping are useful if test tooling is available, but do not add a large testing framework just to mirror trivial markup. Browser checks remain required.

| Area | Cases and expected results |
| --- | --- |
| Dataset | 100 unique IDs; min 152, max 251; every ID in between exists; no alternate-form records |
| Sample data | Chikorita displays 0.9 m and 6.4 kg from raw height 9 and weight 64; verify other displayed attributes against its current response |
| Search | Empty query and spaces → 100; `CHI` and ` chikorita ` match Chikorita; impossible name → zero; clearing restores results |
| Sort | ID ascending begins 152 and ends 251; descending reverses boundaries; names compare correctly; experience compares numerically; ties deterministic; unknown experience last either way |
| Combined controls | Search remains applied when property/direction changes; query does not reset unexpectedly |
| Gallery | Grass results all contain Grass; dual-type Celebi appears under Grass and Psychic; All types restores 100 |
| Link parity | Selecting the same Pokémon from list and gallery opens the same URL and details |
| Detail routes | Fresh `/pokemon/152` and `/pokemon/251` work; `/pokemon/151`, `/pokemon/252`, `/pokemon/152abc`, and unknown paths show a helpful message |
| Neighbor navigation | 152 Next → 153; 153 Previous → 152; 152 Previous → 251; 251 Next → 152; URLs and displayed records both update |
| Filter independence | Open a filtered/sorted result, then Next; it follows National ID order, not the prior filtered order |
| State ownership | Back to list restores the in-session query and sort; return to gallery retains type; refreshing resets controls and reloads the current route |
| Network lifecycle | One list request plus 100 details for a cold successful production load; no JSON refetch on typing, filtering, sorting, or detail navigation |
| Failure recovery | Simulate a cold list failure and a missing-detail failure using browser tooling; show error, restore network, Retry reaches all 100 without a stuck rejected promise |
| Images | Force one broken sprite; placeholder preserves layout and the item remains identifiable and clickable |
| Keyboard/layout | Tab through controls and links, activate them, inspect focus, and check desktop/tablet/phone overflow |
| Production | Build and available lint checks pass; browser console has no unexplained errors; generated fallback and assets are present |
| Deployed deep link | Paste a detail URL into a fresh tab and reload it; app content and assets work. The documented initial fallback 404 status is understood and distinguished from broken JS/CSS/API requests |

## 12. Submission checklist

The authoritative MP2 submission instructions require:

- [ ] Public GitHub repository named `mp2`; verify actual visibility.
- [ ] Vite project in the current repository, original assignment README and deploy workflow preserved.
- [ ] `package-lock.json` included so workflow `npm ci` succeeds.
- [ ] Vite base `/mp2/`, matching router basename, and working deployed assets/routes.
- [ ] Pages deployment source set to GitHub Actions when authorized.
- [ ] Reviewed work committed and pushed when authorized; workflow build and deployment succeed.
- [ ] Actual published URL checked, including list/gallery navigation, filters/sorts, detail deep links, and both wrap boundaries.
- [ ] All external reading, code inspiration, and media sources declared. Maintain `SOURCES.md` and use it to fill submission disclosures.
- [ ] Real shareable LLM chat logs included with source code, covering planning and implementation assistance; use `llm_logs.csv` as the helper-guide convention because no starter file exists. Do not invent links. Answer the LLM questions in the grading form.
- [ ] Demo video is **3 minutes maximum**, demonstrates the **deployed** URL and all required features, is uploaded to Google Drive, and is shared with **uiuc.web.programming@gmail.com**.
- [ ] Submission form completed and submitted by the student or through explicit authorization: [MP2 submission form](https://forms.gle/PkYq9RaMFG8MaMjF7).
- [ ] Final commit hash, verified deployed URL, demo link, and submission status recorded in the handoff.

Suggested demo order: show deployed URL and archive scope → live name filtering → property and direction sorting → click a list item → show attributes and Previous/Next, including wrap → gallery and type filtering → click a gallery card → refresh the detail URL to show direct addressing. Keep the walkthrough comfortably under three minutes.

The README says a local-only demo is hard capped at 80%, with `git status` and `git log` shown first. Treat deployment as essential. It does **not** name repository collaborators to invite or specific required screen resolutions; do not invent these from other MPs or the generic helper guide.

The work remains an individual assignment. Reference sources for understanding rather than copying external implementation code. The explicit LLM policy permits generated code with the required logs and survey disclosure. Escalate a genuine unresolved course-policy ambiguity to the student/Piazza rather than guessing.

## 13. Stretch goals, only after baseline completion

1. **Stat bars:** retain visible numeric values; use native meter elements or external CSS classes so dynamic widths do not introduce prohibited inline styles.
2. **Shiny sprite toggle:** use the already retained `front_shiny`, with clear state and missing-image behavior.
3. **Cry playback:** add the API cry field only when implementing this feature, make playback user initiated, and handle unavailable audio without blocking details. No autoplay.

These carry no separate rubric points. Skip them if they compete with design quality, deployment verification, documentation, or the demo deadline.

## 14. Reference record for source disclosure

Sources consulted for this plan are linked near the relevant decisions. Carry them into the implementation's `SOURCES.md` if used, and add any further material actually consulted:

- MP2 local `README.md`, `../MP_HELPER_GUIDE.md`, and `.github/workflows/deploy.yml`.
- [PokéAPI v2 documentation](https://pokeapi.co/docs/v2): resource pagination, Pokémon fields, units, and fair use.
- [Johto collection query](https://pokeapi.co/api/v2/pokemon?limit=100&offset=151), [Chikorita](https://pokeapi.co/api/v2/pokemon/152), [Togepi](https://pokeapi.co/api/v2/pokemon/175), [Celebi](https://pokeapi.co/api/v2/pokemon/251): live response spot checks.
- [React Router declarative installation](https://reactrouter.com/start/declarative/installation): current package and router setup.
- [Vite getting started](https://vite.dev/guide/) and [static deployment](https://vite.dev/guide/static-deploy.html): runtime requirements, repository base, and Pages build setup.
- [GitHub Pages custom 404 documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site): fallback hosting mechanism.
- [Axios cancellation documentation](https://axios-http.com/docs/cancellation): background reading on request lifecycle; shared-loader ownership in this plan deliberately avoids per-subscriber cancellation.

No app has been scaffolded, no application tests have been run, and no publishing actions have been taken as part of this planning document.
