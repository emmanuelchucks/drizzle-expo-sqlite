import { notes } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite"

export function getAllNotes(db: ExpoSQLiteDatabase) {
	return db
		.select()
		.from(notes)
		.orderBy(desc(notes.updatedAt), desc(notes.createdAt))
}

export function getNoteById(db: ExpoSQLiteDatabase, id: string) {
	return db.select().from(notes).where(eq(notes.id, id)).limit(1)
}
