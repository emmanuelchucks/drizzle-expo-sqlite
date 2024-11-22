import { atom, useAtomValue, useSetAtom } from "jotai"

const searchTextAtom = atom("")

export function useSearchText() {
	return useAtomValue(searchTextAtom)
}

export function useSearchTextActions() {
	const setSearchText = useSetAtom(searchTextAtom)
	return { editSearchText: setSearchText }
}
