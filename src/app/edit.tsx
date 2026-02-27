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
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const existing = useLiveQuery(getNoteById(db, id ?? "")).data[0];
  const formVersion = existing?.updatedAt?.valueOf() ?? existing?.createdAt?.valueOf() ?? "initial";
  const formId = id ? `edit-${id}-${formVersion}` : "new-note";

  const form = useForm({
    formId,
    defaultValues: {
      title: existing?.title ?? "",
      body: existing?.body ?? "",
    },
    onSubmit: async ({ value }) => {
      await saveNote(db, {
        id: id ?? Crypto.randomUUID(),
        title: value.title.trim(),
        body: value.body.trim(),
      });
      router.back();
    },
  });

  async function onDelete() {
    if (!id) return;
    await deleteNote(db, id);
    router.back();
  }

  return (
    <View className="bg-background flex-1 gap-4 p-4">
      <Stack.Screen
        options={{
          title: id ? "Edit note" : "New note",
          headerRight: () => (
            <Pressable onPress={() => void form.handleSubmit()} className="active:opacity-70">
              <AppIcon name="save" size={26} />
            </Pressable>
          ),
          headerLeft: id
            ? () => (
                <Pressable
                  onPress={() =>
                    Alert.alert("Delete note", "This action cannot be undone.", [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => void onDelete(),
                      },
                    ])
                  }
                  className="active:opacity-70"
                >
                  <AppIcon name="delete" size={24} />
                </Pressable>
              )
            : undefined,
        }}
      />

      <form.Field name="title">
        {(field) => (
          <TextInput
            value={field.state.value}
            onChangeText={field.handleChange}
            placeholder="Title"
            style={{ lineHeight: 0 }}
            className="bg-card text-foreground rounded-xl border border-border p-4 text-2xl font-semibold placeholder:text-muted"
          />
        )}
      </form.Field>

      <form.Field name="body">
        {(field) => (
          <TextInput
            multiline
            value={field.state.value}
            onChangeText={field.handleChange}
            placeholder="Start writing..."
            textAlignVertical="top"
            style={{ lineHeight: 0 }}
            className="bg-card text-foreground min-h-80 flex-1 rounded-xl border border-border p-4 text-lg placeholder:text-muted"
          />
        )}
      </form.Field>
    </View>
  );
}
