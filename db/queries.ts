import { db } from "@/db/client"
import { notes } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export function getAllNotes() {
	return db.select().from(notes).orderBy(desc(notes.id))
}

export function getNoteById(id: number) {
	return db.select().from(notes).where(eq(notes.id, id))
}
