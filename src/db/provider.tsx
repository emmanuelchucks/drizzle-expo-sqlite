import { drizzle, type ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { SQLiteProvider, type SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, type PropsWithChildren } from "react";
import migrations from "../../drizzle/migrations";

const DbContext = createContext<ExpoSQLiteDatabase | null>(null);

function DrizzleProvider({ children }: PropsWithChildren) {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

async function onInit(sqlite: SQLiteDatabase) {
  await sqlite.execAsync("PRAGMA journal_mode = WAL;");
  await migrate(drizzle(sqlite), migrations);
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
