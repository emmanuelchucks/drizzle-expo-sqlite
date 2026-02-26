import { notes, type Note } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite"

export async function saveNote(
	db: ExpoSQLiteDatabase,
	note: Pick<Note, "id" | "title" | "body">,
) {
	if (!note.title && !note.body) return

	await db
		.insert(notes)
		.values({ id: note.id, title: note.title, body: note.body })
		.onConflictDoUpdate({
			target: notes.id,
			set: {
				title: note.title,
				body: note.body,
				updatedAt: new Date(),
			},
		})
}

export async function deleteNote(db: ExpoSQLiteDatabase, id: string) {
	await db.delete(notes).where(eq(notes.id, id))
}
