# Drizzle + Expo SQLite (Modernized)

A notes app rebuilt on Expo SDK 55 with modern router, styling, and local data patterns.

## Stack

- Expo SDK 55
- React Native 0.83 / React 19.2
- Expo Router (`src/app` layout)
- Drizzle ORM v1 beta + Expo SQLite
- NativeWind v5 preview + Tailwind CSS v4 + react-native-css
- tailwind-variants
- TanStack Form

## Key architecture choices

- `src/app` route-first app structure
- URL-backed search state (`/?q=...`)
- Platform icon strategy (SF Symbols on iOS, Material fallback on Android)
- Drizzle migrations run at app startup via `drizzle-orm/expo-sqlite/migrator`

## Run locally

```bash
pnpm install
pnpm start
pnpm ios
pnpm android
pnpm type-check
```

## Generate migrations

```bash
pnpm generate
```

## Known tradeoffs

- Uses **NativeWind v5 preview** and **Drizzle beta** for latest APIs.
- `lineHeight: null as never` is intentionally applied on inputs to preserve the desired text rendering behavior.

## Pre-merge smoke checklist

- [ ] App boots on iOS and Android
- [ ] Create note
- [ ] Edit note
- [ ] Delete note
- [ ] Search filters via query param (`q`) and survives refresh/back
- [ ] Existing note persists after app restart
- [ ] `pnpm type-check` passes
- [ ] `npx expo-doctor` passes
