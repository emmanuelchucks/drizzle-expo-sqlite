# Drizzle + Expo SQLite (Modernized)

A notes app rebuilt on Expo SDK 55 with modern router, styling, and local data patterns.

## Demo

<video src="https://github.com/user-attachments/assets/e6519edb-9592-4bef-8e01-2ae85dbce3ba" controls width="100%" poster="https://github.com/user-attachments/assets/aeaaee3e-eb0d-4160-aac9-1b75131ee246"></video>

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 767px)" srcset="https://github.com/user-attachments/assets/939b172c-0491-467b-b9e8-c087527408fa">
  <source media="(prefers-color-scheme: dark) and (min-width: 768px)" srcset="https://github.com/user-attachments/assets/68e88b89-4671-49f1-98cf-a62cba98b7ba">
  <source media="(prefers-color-scheme: light) and (max-width: 767px)" srcset="https://github.com/user-attachments/assets/83f6d973-2ad4-49ee-8349-e668d25bd021">
  <source media="(prefers-color-scheme: light) and (min-width: 768px)" srcset="https://github.com/user-attachments/assets/64f384c5-4559-4307-8f5a-4109f59112d7">
  <img alt="Drizzle Expo SQLite app screenshots in light and dark mode" src="https://github.com/user-attachments/assets/64f384c5-4559-4307-8f5a-4109f59112d7" width="100%">
</picture>

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
- Platform icon strategy via `expo-symbols` mappings (SF Symbols iOS + Material symbols Android/Web)
- Drizzle migrations run at app startup via `drizzle-orm/expo-sqlite/migrator`

## Run locally

```bash
pnpm install
pnpm start
pnpm ios
pnpm android
pnpm lint
pnpm format
pnpm typecheck
```

## Generate migrations

```bash
pnpm generate
```
