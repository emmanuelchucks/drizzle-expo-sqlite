# Drizzle + Expo SQLite (Modernized)

A notes app rebuilt on Expo SDK 55 with modern router, styling, and local data patterns.

## Demo

<video src="https://github.com/user-attachments/assets/deaf0af6-aba7-4ba3-af69-a8e7d8909bb2" controls width="100%" poster="https://github.com/user-attachments/assets/c3cf3a59-6c91-473a-98b5-811348c15d16"></video>

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 767px)" srcset="https://github.com/user-attachments/assets/9cbafee7-5baf-42c3-99f6-d48310f3a780">
  <source media="(prefers-color-scheme: dark) and (min-width: 768px)" srcset="https://github.com/user-attachments/assets/b8a3e51a-5254-4f1a-9e0e-6e4dbb243b10">
  <source media="(prefers-color-scheme: light) and (max-width: 767px)" srcset="https://github.com/user-attachments/assets/3fd379ac-9a71-4827-87cc-bb97701f84b1">
  <source media="(prefers-color-scheme: light) and (min-width: 768px)" srcset="https://github.com/user-attachments/assets/b5298d18-ac34-4a1f-974a-fe530a86a01f">
  <img alt="Drizzle Expo SQLite app screenshots in light and dark mode" src="https://github.com/user-attachments/assets/b5298d18-ac34-4a1f-974a-fe530a86a01f" width="100%">
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
