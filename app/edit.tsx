import { Text, TextInput, View } from "@/components/themed"
import { deleteNote, saveNote } from "@/db/mutations"
import { getNoteById } from "@/db/queries"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Platform } from "react-native"

export default function EditNote() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const router = useRouter()

	const noteQuery = useLiveQuery(getNoteById(Number(id)))
	const note = noteQuery.data.at(0)

	const [editedTitle, setEditedTitle] = useState<string>()
	const [editedBody, setEditedBody] = useState<string>()
	const title = editedTitle ?? note?.title ?? ""
	const body = editedBody ?? note?.body ?? ""

	const isEditing = id !== undefined
	const isiOS = Platform.OS === "ios"
	const isAndroid = Platform.OS === "android"

	const DeleteButton = (
		<Text
			onPress={() => {
				if (!note) return
				deleteNote(note)
				router.back()
			}}
			className="text-lg font-medium text-red-600 dark:text-red-400"
		>
			Delete
		</Text>
	)

	const SaveButton = (
		<View className="flex flex-row gap-x-8">
			{isEditing && isAndroid && DeleteButton}
			<Text
				onPress={() => {
					const newNote = { id, title, body }
					saveNote(newNote)
					router.back()
				}}
				className="text-lg font-medium text-blue-600 dark:text-blue-400"
			>
				Save
			</Text>
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
				value={title}
				onChangeText={setEditedTitle}
				placeholder="Title"
				className="text-2xl font-semibold"
			/>
			<TextInput
				multiline
				value={body}
				onChangeText={setEditedBody}
				placeholder="Body"
				className="h-full align-top"
			/>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	)
}
