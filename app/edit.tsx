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
	const { onChangeTitle, onChangeBody, saveNote, deleteNote } =
		useEditNoteActions()
	const router = useRouter()

	const notes = useNotes()
	const note = notes.find((note) => note.id === Number(id))

	const isEditing = id !== undefined
	const isiOS = Platform.OS === "ios"
	const isAndroid = Platform.OS === "android"

	console.log("changes: ", isEditing, isiOS, isAndroid, id)

	const DeleteButton = (
		<Pressable
			onPress={() => {
				id && deleteNote(id)
				router.back()
			}}
			className="active:opacity-50"
		>
			<Text className="text-lg font-medium text-red-600 dark:text-red-400">
				Delete
			</Text>
		</Pressable>
	)

	const SaveButton = (
		<View className="flex flex-row gap-x-8">
			{isEditing && isAndroid && DeleteButton}
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
		</View>
	)

	return (
		<View className="m-4 gap-y-4">
			<Stack.Screen
				options={{
					title: id ? "Edit note" : "New note",
					headerLeft: () => isEditing && isiOS && DeleteButton,
					headerRight: () => SaveButton,
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
				className="h-full align-top"
			/>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	)
}
