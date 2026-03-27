import { react } from "@kasoa/vite-plus-config/react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  ...react,
  lint: {
    ...react.lint,
    ignorePatterns: ["drizzle/migrations.js"],
  },
});
