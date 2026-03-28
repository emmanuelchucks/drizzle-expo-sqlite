import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import type { Note } from "@/db/schema";
import { notes } from "@/db/schema";

export async function saveNote(
  db: ExpoSQLiteDatabase,
  note: Pick<Note, "id" | "title" | "body">,
): Promise<void> {
  const title = note.title?.trim() ?? "";
  const body = note.body?.trim() ?? "";
  if (title === "" && body === "") return;

  await db
    .insert(notes)
    .values({ id: note.id, title, body })
    .onConflictDoUpdate({
      target: notes.id,
      set: {
        title,
        body,
        updatedAt: new Date(),
      },
    });
}

export async function deleteNote(db: ExpoSQLiteDatabase, id: string): Promise<void> {
  await db.delete(notes).where(eq(notes.id, id));
}
