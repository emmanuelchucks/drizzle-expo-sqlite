import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const notes = sqliteTable("notes", {
	id: integer("id").primaryKey(),
	title: text("title"),
	body: text("body"),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at"),
})

export type SelectNote = typeof notes.$inferSelect
export type InsertNote = typeof notes.$inferInsert
