import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const notes = sqliteTable("notes", {
	id: integer("id").primaryKey(),
	title: text("title"),
	body: text("body"),
	createdAt: text("created_at")
		.default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
		.notNull(),
	updatedAt: text("updated_at"),
})

export type Note = typeof notes.$inferSelect
