import { TextInput, View } from "@/components/themed"
import {
	useEditNote,
	useEditNoteActions,
	useNotes,
} from "@/hooks/use-note-store"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, Pressable, Text } from "react-native"

export default function EditNote() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { title, body } = useEditNote()
	const { onChangeTitle, onChangeBody, saveNote } = useEditNoteActions()
	const router = useRouter()

	const notes = useNotes()
	const note = notes.find((note) => note.id === Number(id))

	return (
		<View className="m-4 gap-y-4">
			<Stack.Screen
				options={{
					title: id ? "Edit note" : "New note",
					headerRight: () => (
						<Pressable
							onPress={() => {
								saveNote(id)
								router.back()
							}}
							className="active:opacity-50"
						>
							<Text className="text-lg font-medium text-blue-600 dark:text-blue-400">
								Save
							</Text>
						</Pressable>
					),
				}}
			/>
			<TextInput
				defaultValue={note?.title ?? ""}
				value={title}
				onChangeText={onChangeTitle}
				placeholder="Title"
				className="text-2xl font-semibold"
			/>
			<TextInput
				multiline
				defaultValue={note?.body ?? ""}
				value={body}
				onChangeText={onChangeBody}
				placeholder="Body"
				className="h-full"
			/>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	)
}
