import { Text, View } from "@/components/themed"
import { getAllNotes } from "@/db/queries"
import { useSearchText } from "@/hooks/use-search-text"
import { formatDistanceToNowStrict } from "date-fns"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { Link } from "expo-router"
import { FlatList, Pressable } from "react-native"

function formatDate(date: string) {
	return `${formatDistanceToNowStrict(date)} ago`
}

export default function Index() {
	const notesQuery = useLiveQuery(getAllNotes())
	const searchText = useSearchText()

	const filteredNotes = notesQuery.data.filter(
		(note) =>
			note.title?.toLowerCase().includes(searchText.toLowerCase()) ||
			note.body?.toLowerCase().includes(searchText.toLowerCase()),
	)

	if (notesQuery.data.length === 0)
		return (
			<View className="flex-1 items-center justify-center">
				<Text className="animate-spin p-4 text-8xl">⓿</Text>
				<Text>Nothing yet</Text>
			</View>
		)

	return (
		<FlatList
			numColumns={2}
			data={filteredNotes}
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
					<Pressable className="pointer-events-box-only flex-1 gap-y-2 rounded border border-black/75 p-4 active:opacity-50 dark:border-white/75">
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
			contentContainerClassName="gap-2 p-2"
			columnWrapperClassName="gap-2"
		/>
	)
}
