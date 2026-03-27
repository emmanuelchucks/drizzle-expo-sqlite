import { useForm } from "@tanstack/react-form";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, TextInput, View } from "react-native";
import { AppIcon } from "@/components/icon";
import { deleteNote, saveNote } from "@/db/mutations";
import { useDb } from "@/db/provider";
import { getNoteById } from "@/db/queries";

export default function EditScreen() {
  const db = useDb();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const noteId = params.id === "" ? undefined : params.id;

  const existingNoteQuery = useLiveQuery(getNoteById(db, noteId ?? ""));
  const existingNote = existingNoteQuery.data.at(0);
  const formVersion =
    existingNote?.updatedAt?.valueOf() ?? existingNote?.createdAt.valueOf() ?? "initial";

  const form = useForm({
    formId: noteId === undefined ? "new-note" : `edit-${noteId}-${formVersion}`,
    defaultValues: {
      title: existingNote?.title ?? "",
      body: existingNote?.body ?? "",
    },
    onSubmit: async ({ value }) => {
      await saveNote(db, {
        id: noteId ?? Crypto.randomUUID(),
        title: value.title.trim(),
        body: value.body.trim(),
      });
      router.back();
    },
  });

  return (
    <View className="bg-background flex-1 gap-4 p-4">
      <EditScreenHeader
        noteId={noteId}
        onDeleteConfirmed={async () => {
          if (noteId === undefined) return;
          await deleteNote(db, noteId);
          router.back();
        }}
        onSave={() => {
          void form.handleSubmit();
        }}
      />

      <form.Field name="title">
        {(field) => <TitleInput value={field.state.value} onChangeText={field.handleChange} />}
      </form.Field>

      <form.Field name="body">
        {(field) => <BodyInput value={field.state.value} onChangeText={field.handleChange} />}
      </form.Field>
    </View>
  );
}

function EditScreenHeader({
  noteId,
  onDeleteConfirmed,
  onSave,
}: {
  noteId: string | undefined;
  onDeleteConfirmed: () => void | Promise<void>;
  onSave: () => void;
}) {
  const confirmDelete = () => {
    Alert.alert("Delete note", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          void onDeleteConfirmed();
        },
      },
    ]);
  };

  return (
    <Stack.Screen
      options={{
        title: noteId === undefined ? "New note" : "Edit note",
        headerRight: () => <SaveNoteButton onPress={onSave} />,
        headerLeft:
          noteId === undefined ? undefined : () => <DeleteNoteButton onPress={confirmDelete} />,
      }}
    />
  );
}

function TitleInput({
  onChangeText,
  value,
}: {
  onChangeText: (value: string) => void;
  value: string;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Title"
      style={{ lineHeight: 0 }}
      className="bg-card text-foreground border-border placeholder:text-muted rounded-xl border p-4 text-2xl font-semibold"
    />
  );
}

function BodyInput({
  onChangeText,
  value,
}: {
  onChangeText: (value: string) => void;
  value: string;
}) {
  return (
    <TextInput
      multiline
      value={value}
      onChangeText={onChangeText}
      placeholder="Start writing..."
      textAlignVertical="top"
      style={{ lineHeight: 0 }}
      className="bg-card text-foreground border-border placeholder:text-muted min-h-80 flex-1 rounded-xl border p-4 text-lg"
    />
  );
}

function SaveNoteButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="active:opacity-70">
      <AppIcon name="save" size={26} />
    </Pressable>
  );
}

function DeleteNoteButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="active:opacity-70">
      <AppIcon name="delete" size={24} className="text-danger" />
    </Pressable>
  );
}
