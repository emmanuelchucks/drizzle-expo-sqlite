# Drizzle + Expo SQLite (Modernized)

A notes app rebuilt on Expo SDK 55 with modern router, styling, and local data patterns.

## Demo

<video src="https://github.com/user-attachments/assets/f3e411de-5872-4518-9ab6-09c23f86c02e" controls width="100%" poster="https://github.com/user-attachments/assets/da3f91cc-c449-4128-b161-8b60bb84cf52"></video>

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 767px)" srcset="https://github.com/user-attachments/assets/06ebdfd8-79cc-4add-ae15-aa1765f2be25">
  <source media="(prefers-color-scheme: dark) and (min-width: 768px)" srcset="https://github.com/user-attachments/assets/59f0d4db-7038-4075-9d0c-71f06ac93718">
  <source media="(prefers-color-scheme: light) and (max-width: 767px)" srcset="https://github.com/user-attachments/assets/33c305ae-2ede-4572-9402-ec7a074b8ad6">
  <source media="(prefers-color-scheme: light) and (min-width: 768px)" srcset="https://github.com/user-attachments/assets/3910c166-794d-40c1-9734-4921faa6a795">
  <img alt="Drizzle Expo SQLite app screenshots in light and dark mode" src="https://github.com/user-attachments/assets/3910c166-794d-40c1-9734-4921faa6a795" width="100%">
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
