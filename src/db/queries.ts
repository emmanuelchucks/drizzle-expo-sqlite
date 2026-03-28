import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { desc, eq } from "drizzle-orm";
import { notes } from "@/db/schema";

const getAllNotesImpl = (db: ExpoSQLiteDatabase) =>
  db.select().from(notes).orderBy(desc(notes.updatedAt), desc(notes.createdAt));

const getNoteByIdImpl = (db: ExpoSQLiteDatabase, id: string) =>
  db.select().from(notes).where(eq(notes.id, id)).limit(1);

export const getAllNotes: typeof getAllNotesImpl = getAllNotesImpl;

export const getNoteById: typeof getNoteByIdImpl = getNoteByIdImpl;
