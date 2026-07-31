# Adding or removing projects

Each project is independent and is discovered automatically.

## Add a project

1. Add `src/data/projects/<slug>.ts` and export:
   - `projectOrder` for its position in public project lists.
   - A default object satisfying the `Project` type.
2. Add any image or video URL to `src/config/assets.ts`.
3. Optional: add `src/pages/projects/<slug>.tsx` for a custom page layout.
   If this file is omitted, the reusable `GenericProjectPage` is used.
4. Run `npm run typecheck`, `npm test`, and `npm run build`.

The file name and exported `slug` must match. No router edit is required.

## Remove a project

Delete its metadata file from `src/data/projects` and its optional custom page
from `src/pages/projects`. It disappears from public project lists and its old
URL safely redirects to `/projects`.

