<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- All portfolio copy, projects, awards and image slots live in `src/data/portfolio.ts`; UI reads from it so content edits never touch components.
- The macOS-style shell lives in `src/os/` (store = window manager + prefs in localStorage, one file per app under `apps/`); new apps register in `apps-registry.ts` and `AppBody` in `Desktop.tsx`.
- Below 768px the app renders a separate iOS shell showing the top window full-screen; native Files and editable Notes have separate modules, while Photos/Settings/Recruiter use the IOSPage scaffold, preserving one window store and content source.
- Media files live in `public/media/` (behance covers named by Behance project id, award photos per `public/media/awards/README.md`); award `images` point at their expected file paths (same as `pendingImages`); `MediaPlaceholder` falls back to a placeholder when a file is missing.
- App icons are original SVG drawings in `src/os/icons.tsx` (illustration colours allowed there only).
- Brand logos: files in `public/media/logos/`, mapped by brand name in `src/data/brandLogos.ts`, rendered only via `BrandLogo`/`BrandStrip` (text fallback); competition case brands never get logo entries.
- Photos work taxonomy and separate achievements collection are defined in `photoRoots`; `workRoots` and `workProjects` exclude awards, and legacy category payloads resolve centrally so existing shortcuts keep working.
- ProjectCover renders actual project imagery or verified branded/neutral covers so work without photographs remains distinct from award media.
- CollectionCover reads collection-level cover styles from the shared taxonomy to distinguish designed career covers from project and award imagery.
- RecruiterContent is shared across desktop and the native phone page to keep career facts and actions identical; sanitized PDFs are generated on demand in the browser from portfolio data, never from private CV fields.
- Music links to external Spotify discovery searches only; no simulated playback or invented personal recordings.
- Notes merge missing seed IDs into stored user notes without overwriting saved edits; explicit Reset remains the only destructive seed restore.
