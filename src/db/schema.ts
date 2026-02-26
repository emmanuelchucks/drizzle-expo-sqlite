import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import * as Crypto from "expo-crypto";

export const notes = sqliteTable("notes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => Crypto.randomUUID()),
  title: text("title"),
  body: text("body"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(CAST(unixepoch('subsec') * 1000 AS INTEGER))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdate(() => new Date()),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
