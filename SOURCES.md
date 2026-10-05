# Sources and assistance disclosure

PokéLab was implemented locally on October 4, 2026 for CS 409 MP2. Application code and CSS were generated with Codex assistance for this assignment; the original course files and Vite scaffold were retained. No external application implementation was copied.

## Assignment and planning

- [Assignment README](README.md): required views, technologies, course rules, rubric, LLM policy, and submission instructions.
- [Technical implementation plan](IMPLEMENTATION_PLAN.md): archive scope, normalized model, cache/retry lifecycle, routing, design, and acceptance cases.
- [MP helper guide](../MP_HELPER_GUIDE.md): preservation, local verification, review, and publishing workflow.
- [Course deployment workflow](.github/workflows/deploy.yml): preserved without changes.

## Documentation consulted

- [PokéAPI v2 documentation](https://pokeapi.co/docs/v2): collection pagination, Pokémon response fields, source units, and caching policy.
- [React Router declarative installation](https://reactrouter.com/start/declarative/installation): installed package and BrowserRouter setup.
- [Vite getting started](https://vite.dev/guide/): in-place React/TypeScript scaffold and supported runtime.
- [Vite static deployment](https://vite.dev/guide/static-deploy.html): repository base and production output.
- [GitHub Pages custom 404 documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site): built app shell fallback for nested URLs.
- [Axios cancellation documentation](https://axios-http.com/docs/cancellation): request timeout and lifecycle background. The shared loader is owned above routes, so subscriber cleanup does not cancel shared requests.

## Data and media

- [PokéAPI collection](https://pokeapi.co/api/v2/pokemon?limit=100&offset=151): exactly 100 Pokémon with National IDs 152–251. Details are fetched from the URLs in this response through Axios.
- [Chikorita response](https://pokeapi.co/api/v2/pokemon/152/): browser verification of dimensions, experience, abilities, and stats.
- Pokémon sprites are remote `sprites.front_default` URLs supplied by PokéAPI, hosted in the [PokéAPI sprites repository](https://github.com/PokeAPI/sprites). Pokémon names and character artwork belong to their respective rights holders.
- No additional photos, icons, web fonts, audio, or generated raster artwork are used. The app uses system fonts, a CSS design, and text symbols.

## LLM assistance

[llm_logs.csv](llm_logs.csv) contains real shareable links for planning, the completed v1 implementation, and the October 5 local visual upgrade. The implementation snapshot was refreshed before the authorized v1 push, preserving the planning link. Complete the assignment's LLM experience questions in the submission form.

Temporary browser QA injected explicit Axios failures, a missing/broken sprite, and an unknown experience value to verify recovery. These test-only entry files were removed; the delivered app uses live PokéAPI data without mock fallback.

## October 5 local visual upgrade

Codex assisted with the Johto field-journal masthead, warm paper/grid/contour surfaces, type-colored specimen frames, larger detail composition, six native stat meters, neighbor sprites, and hover/keyboard/reduced-motion styling. The three starter illustrations reuse the loaded PokéAPI sprites. No new dependencies, image sources, web fonts, or generated artwork were introduced.

The meter scale uses the highest base stat in the current 100-record archive (255), shared across every record and stat. Numeric values and accessible names remain available. Reduced-motion declarations were exercised through a temporary external CSS override; the actual `prefers-reduced-motion` media query was restored after verification. No system preference was changed.

## October 5 shiny mode

Codex assisted with one shared, default-off shiny toggle and variant selection in `PokemonImage`. All archive sprites, starter illustrations, detail images, and neighbor images use the existing `front_shiny` field. The toggle keeps its state during route navigation and resets on a full reload. Shiny alt text and null/broken-image placeholders identify the variant clearly. No dependencies, additional data endpoints, inline styles/scripts, or layout tables were added.

Temporary QA consulted the installed Axios declarations (`node_modules/axios/index.d.ts`) for `getAdapter`, wrapped the existing adapter to count requests, and injected a null Chikorita shiny URL and broken Bayleef shiny URL. Fallbacks and restoration to standard sprites passed in the actual app. Data requests stayed at 101 through mode switching, search/sort, navigation, and gallery filtering; image requests are separate. The external QA entry file and injections were removed, and the normal entry was restored before the final build. The built preview uses live, unmodified data.

A new share URL for the shiny-mode assistance could not be recorded because thread sharing was not approved. Existing `llm_logs.csv` links are preserved. Add an approved snapshot covering this feature before submitting the new version.

## October 5 narrow-phone detail correction

Codex assisted with a small external-CSS breakpoint to stack the National ID below long names and constrain the body/detail grid at 320px. No new sources or dependencies were introduced. The existing pending chat-log coverage also applies to this correction.
