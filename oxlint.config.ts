import { react } from "@kasoa/oxlint-config/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...react,
  ignorePatterns: [
    "babel.config.js",
    "babel.config.cjs",
    "metro.config.js",
    "metro.config.cjs",
    "drizzle/migrations.js",
  ],
});
