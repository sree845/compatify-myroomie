# Matching Algorithm Module

This folder is structured like a backend service, even though it currently runs
in the browser. It contains **no UI code** and **no framework dependencies**,
so it can be lifted into a real serverless function (e.g. Lovable Cloud,
Supabase Edge Functions, Node API) with minimal changes.

## Structure

- `types.ts` — Shared TypeScript types (`UserProfile`, `MatchResult`, etc.)
- `labels.ts` — Human-readable labels for preference enum values
- `sampleUsers.ts` — Mock candidate dataset (replace with DB query later)
- `scoring.ts` — Pure scoring functions + tunable `WEIGHTS`
- `matcher.ts` — Main `calculateMatches(profile)` entry point
- `index.ts` — Public API — UI code imports from `@/algorithm`

## Migrating to a real backend later

1. Move `scoring.ts`, `matcher.ts`, `types.ts`, `labels.ts` into your server.
2. Replace `sampleUsers.ts` with a database query inside `matcher.ts`.
3. Expose `calculateMatches` behind an HTTP endpoint.
4. In the client, replace the direct import with a `fetch()` call.
