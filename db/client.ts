import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite/next"

const expoDb = openDatabaseSync("notes.db")

export const db = drizzle(expoDb)
