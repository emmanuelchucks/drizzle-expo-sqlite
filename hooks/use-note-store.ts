import { db } from "@/db/client"
import { notes, type SelectNote } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { create } from "zustand"

type SearchStore = {
	searchText: string
	actions: {
		onChangeSearchText: (text: string) => void
	}
}

const useSearchStore = create<SearchStore>((set) => ({
	searchText: "",
	actions: {
		onChangeSearchText: (text) => set({ searchText: text }),
	},
}))

export const useSearchText = () => useSearchStore((state) => state.searchText)
export const useSearchActions = () => useSearchStore((state) => state.actions)

type NoteStore = {
	notes: SelectNote[]
	actions: {
		refetch: () => void
	}
}

const useNoteStore = create<NoteStore>((set) => {
	const fetchStatement = db.select().from(notes).orderBy(desc(notes.id))
	try {
		return {
			notes: fetchStatement.all(),
			actions: {
				refetch: () => set({ notes: fetchStatement.all() }),
			},
		}
	} catch (error) {
		return {
			notes: [],
			actions: {
				refetch: () => set({ notes: fetchStatement.all() }),
			},
		}
	}
})

export const useNotes = () => useNoteStore((state) => state.notes)
export const useNoteActions = () => useNoteStore((state) => state.actions)

type EditNoteStore = {
	note: { title: string | undefined; body: string | undefined }
	actions: {
		onChangeTitle: (title: string) => void
		onChangeBody: (body: string) => void
		saveNote: (id: string | undefined) => void
		deleteNote: (id: string) => void
	}
}

const useEditNoteStore = create<EditNoteStore>((set, get) => ({
	note: { title: undefined, body: undefined },
	actions: {
		onChangeTitle: (title) =>
			set((state) => ({ note: { ...state.note, title } })),
		onChangeBody: (body) => set((state) => ({ note: { ...state.note, body } })),
		saveNote: (id) => {
			const { title, body } = get().note
			if (!title && !body) return
			db.insert(notes)
				.values({ id: Number(id), title, body })
				.onConflictDoUpdate({
					target: notes.id,
					set: { title, body, updatedAt: new Date().toISOString() },
				})
				.run()
			set({ note: { title: undefined, body: undefined } })
			useNoteStore.getState().actions.refetch()
		},
		deleteNote: (id) => {
			db.delete(notes)
				.where(eq(notes.id, Number(id)))
				.run()
			useNoteStore.getState().actions.refetch()
		},
	},
}))

export const useEditNote = () => useEditNoteStore((state) => state.note)
export const useEditNoteActions = () =>
	useEditNoteStore((state) => state.actions)
