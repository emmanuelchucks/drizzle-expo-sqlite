import { react } from "@kasoa/oxlint-config/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...react,
  ignorePatterns: ["babel.config.js", "metro.config.js", "drizzle/migrations.js"],
});
