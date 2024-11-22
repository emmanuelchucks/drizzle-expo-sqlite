import { Icon } from "@/components/themed"
import { useLoadAssets } from "@/hooks/use-load-assets"
import { useSearchTextActions } from "@/hooks/use-search-text"
import "@/styles/global.css"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { Link, Stack } from "expo-router"
import { useColorScheme } from "nativewind"

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"

// Ensure that reloading on `/edit` keeps a back button present.
export const unstable_settings = {
	initialRouteName: "index",
}

export default function RootLayout() {
	const { isLoaded } = useLoadAssets()
	if (!isLoaded) return null
	return <RootLayoutNavigation />
}

function RootLayoutNavigation() {
	const { colorScheme } = useColorScheme()
	const { editSearchText } = useSearchTextActions()

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						title: "Notes",
						headerLargeTitle: true,
						headerSearchBarOptions: {
							placeholder: "Search notes",
							onChangeText: ({ nativeEvent }) =>
								editSearchText(nativeEvent.text),
						},
						headerRight: () => (
							<Link
								suppressHighlighting
								href="/edit"
								className="active:opacity-50"
							>
								<Icon
									name="plus-circle"
									className="text-3xl text-blue-600 dark:text-blue-400"
								/>
							</Link>
						),
					}}
				/>
				<Stack.Screen
					name="edit"
					options={{
						presentation: "modal",
					}}
				/>
			</Stack>
		</ThemeProvider>
	)
}
