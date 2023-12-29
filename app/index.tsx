import { Text, View } from "@/components/themed"
import { useNoteActions, useNotes, useSearchText } from "@/hooks/use-note-store"
import { formatDistanceToNowStrict } from "date-fns"
import { Link } from "expo-router"
import { FlatList, Pressable } from "react-native"

function formatDate(date: string) {
	return `${formatDistanceToNowStrict(date)} ago`
}

export default function Index() {
	const notes = useNotes()
	const searchText = useSearchText()
	const { refetch } = useNoteActions()

	const filteredNotes = notes.filter(
		(note) =>
			note.title?.toLowerCase().includes(searchText.toLowerCase()) ||
			note.body?.toLowerCase().includes(searchText.toLowerCase()),
	)

	if (notes.length === 0)
		return (
			<View className="flex-1 items-center justify-center gap-y-4">
				<Text className="animate-spin text-8xl">⓿</Text>
				<Text>Nothing yet</Text>
			</View>
		)

	return (
		<FlatList
			numColumns={2}
			data={filteredNotes}
			refreshing={false}
			onRefresh={refetch}
			keyExtractor={(note) => String(note.id)}
			contentInsetAdjustmentBehavior="automatic"
			renderItem={({ item: note }) => (
				<Link
					asChild
					href={{
						pathname: "/edit",
						params: { id: note.id },
					}}
				>
					<Pressable className="flex-1 gap-y-2 rounded border border-black/75 p-4 dark:border-white/75">
						<Text className="line-clamp-1 text-2xl font-medium">
							{note.title}
						</Text>
						<Text className="line-clamp-4 flex-1">{note.body}</Text>
						<Text className="line-clamp-1 text-sm text-black/75 dark:text-white/75">
							{note.updatedAt
								? `Edited: ${formatDate(note.updatedAt)}`
								: formatDate(note.createdAt)}
						</Text>
					</Pressable>
				</Link>
			)}
			contentContainerStyle={{ gap: 8, padding: 8 }}
			columnWrapperStyle={{ gap: 8 }}
		/>
	)
}
