import { drizzle, type ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";
import { createContext, useContext, type PropsWithChildren } from "react";

const DbContext = createContext<ExpoSQLiteDatabase | null>(null);

function DrizzleProvider({ children }: PropsWithChildren) {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

async function onInit(sqlite: SQLiteDatabase) {
  await sqlite.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id text PRIMARY KEY,
      title text,
      body text,
      created_at integer DEFAULT (CAST(unixepoch('subsec') * 1000 AS INTEGER)) NOT NULL,
      updated_at integer
    );
  `);
}

export function DatabaseProvider({ children }: PropsWithChildren) {
  return (
    <SQLiteProvider
      databaseName="notes.db"
      options={{ enableChangeListener: true }}
      onInit={onInit}
    >
      <DrizzleProvider>{children}</DrizzleProvider>
    </SQLiteProvider>
  );
}

export function useDb() {
  const value = useContext(DbContext);
  if (!value) throw new Error("useDb must be used inside DatabaseProvider");

  return value;
}
