import { formatDistanceToNowStrict } from "date-fns";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, type ListRenderItem, Pressable, Text, TextInput, View } from "react-native";
import { AppIcon } from "@/components/icon";
import { useDb } from "@/db/provider";
import { getAllNotes } from "@/db/queries";
import { noteCardStyles } from "@/lib/ui";

function formatNoteDate(value: Date | number | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return `${formatDistanceToNowStrict(date)} ago`;
}

export default function NotesScreen() {
  const db = useDb();
  const notesQuery = useLiveQuery(getAllNotes(db));
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string | string[] }>();
  const queryParam = Array.isArray(params.q) ? (params.q[0] ?? "") : (params.q ?? "");

  const trimmedQuery = queryParam.trim();
  const term = trimmedQuery.toLowerCase();
  const filtered = term
    ? notesQuery.data.filter(
        (note) =>
          note.title?.toLowerCase().includes(term) || note.body?.toLowerCase().includes(term),
      )
    : notesQuery.data;

  type NoteListItem = (typeof filtered)[number];
  const renderNoteItem: ListRenderItem<NoteListItem> = ({ item }) => (
    <Link
      href={{
        pathname: "/edit",
        params: { id: item.id },
      }}
      asChild
    >
      <Pressable className={noteCardStyles()}>
        <Text className="text-foreground line-clamp-1 text-xl font-semibold">
          {item.title || "Untitled"}
        </Text>
        <Text className="text-foreground line-clamp-4 min-h-14 flex-1">
          {item.body || "No content"}
        </Text>
        <Text className="text-muted text-xs">
          {formatNoteDate(item.updatedAt ?? item.createdAt)}
        </Text>
      </Pressable>
    </Link>
  );

  return (
    <View className="bg-background flex-1 px-4">
      <View className="bg-card mt-4 mb-3 flex-row items-center gap-2 rounded-xl border border-zinc-300 px-3 dark:border-zinc-700">
        <AppIcon name="search" color="#8E8E93" size={20} />
        <TextInput
          value={queryParam}
          onChangeText={(text) => router.setParams({ q: text || undefined })}
          placeholder="Search notes"
          placeholderTextColor="#8E8E93"
          style={{ lineHeight: 0 }}
          className="text-foreground flex-1 py-3 text-[16px]"
        />
      </View>

      <View className="relative flex-1">
        {filtered.length === 0 ? (
          <View className="pointer-events-none absolute inset-x-0 top-24 items-center">
            <Text className="text-foreground animate-spin text-8xl">⓿</Text>
            <Text className="text-foreground mt-2 w-56 text-center">
              {trimmedQuery ? `No notes found for “${trimmedQuery}”` : "Nothing yet"}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-3 pb-8"
            columnWrapperClassName="gap-3"
            renderItem={renderNoteItem}
          />
        )}
      </View>
    </View>
  );
}
