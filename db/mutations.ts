import { db } from "@/db/client"
import { notes, type Note } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function saveNote(note: Pick<Note, "title" | "body">) {
	if (!note.title && !note.body) return
	db.insert(notes)
		.values(note)
		.onConflictDoUpdate({
			target: notes.id,
			set: {
				title: note.title,
				body: note.body,
				updatedAt: new Date().toISOString(),
			},
		})
		.run()
}

export function deleteNote(note: Note) {
	db.delete(notes)
		.where(eq(notes.id, Number(note.id)))
		.run()
}
