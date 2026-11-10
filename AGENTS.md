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
- Website copy, projects, awards and image slots live in `src/data/portfolio.ts`; verbatim public CV content lives separately in `src/data/resume.ts` so website rewrites never alter the CV.
- The macOS-style shell lives in `src/os/` (store = window manager + prefs in localStorage, one file per app under `apps/`); new apps register in `apps-registry.ts` and `AppBody` in `Desktop.tsx`.
- Below 768px the app renders a separate iOS shell showing the top window full-screen; native Files and editable Notes have separate modules, while Photos/Settings/Recruiter use the IOSPage scaffold, preserving one window store and content source.
- Media files live in `public/media/` (behance covers named by Behance project id, award photos per `public/media/awards/README.md`); award `images` point at their expected file paths (same as `pendingImages`); `MediaPlaceholder` falls back to a placeholder when a file is missing.
- App icons are original SVG drawings in `src/os/icons.tsx` (illustration colours allowed there only).
- Brand logos: files in `public/media/logos/`, mapped by brand name in `src/data/brandLogos.ts`, rendered only via `BrandLogo`/`BrandStrip` (text fallback); competition case brands never get logo entries.
- Photos work taxonomy and separate achievements collection are defined in `photoRoots`; `workRoots` and `workProjects` exclude awards, and legacy category payloads resolve centrally so existing shortcuts keep working.
- ProjectCover and CollectionCover share GradientCover for explicitly configured career covers using CSS palette tokens; original images remain accessible in ProjectStory and awards retain image-first covers.
- CollectionCover reads collection-level cover styles from the shared taxonomy to distinguish designed career covers from project and award imagery.
- RecruiterContent is shared across desktop and the native phone page to keep career facts and actions identical; sanitized PDFs and Preview read the same separate verbatim CV content source, never private CV fields.
- Music shares one playlist/reel configuration and UI across shells; preserve YouTube queue/opening track without autoplay/shuffle, prefer verified native sources, otherwise use official public Instagram embeds framed only outside the cross-origin document; known unavailable embeds use explicit original-link fallbacks, with no fake imagery and one accessible selected-player dialog.
- Notes replace only exact known historical defaults and merge missing IDs; preserve custom text and existing date/timestamp fields during default refreshes, with explicit Reset the only destructive restore.
- ProjectStory owns shared work metrics and award photo viewing across desktop/mobile so captions, accessible navigation and case attribution stay identical.
- MOBILE_APPS defines phone-visible apps for home, Spotlight and Files; résumé and awards remain reachable as content without desktop-only tools.
- Messages and SystemSettings share desktop/phone behavior with dedicated full-height phone bodies; no nested viewport box, so compact screens remain usable.
- NoteList shares date grouping and decorative icons across shells; coarse seed dates remain in Portfolio notes and real edits use optional timestamps without changing storage migration.
- CampaignMedia reuses one center preview element and attempts playback synchronously during navigation; a single policy refusal falls back muted with an explicit gesture retry to avoid competing audio and rejection loops.
- CampaignMedia packs native-ratio poster faces by adjoining projected widths and a small gap, hiding out-of-frame neighbors rather than clipping them; this keeps the shelf compact across screen sizes.
- Shell selection uses a hydration-safe viewport subscription and matching CSS width guards; pending phones show only wallpaper while desktop SSR remains visible, without mounting two live shells.
- Desktop dock magnification animates occupied target widths/heights and centered glass together; invert a deterministic baseline layout including LinkedIn/divider gaps, never animated DOM measurements, to avoid feedback jitter. Launch bounce is a separate nested transform.
