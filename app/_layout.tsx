import { Icon } from "@/components/themed"
import { useLoadAssets } from "@/hooks/use-load-assets"
import "@/styles/global.css"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { Link, Stack } from "expo-router"
import { useColorScheme } from "nativewind"
import { Pressable } from "react-native"

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"

// Ensure that reloading on `/modal` keeps a back button present.
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

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						title: "Notes",
						headerLargeTitle: true,
						headerRight: () => (
							<Link href="/new" asChild>
								<Pressable className="active:opacity-50">
									<Icon name="plus-circle" size={26} />
								</Pressable>
							</Link>
						),
					}}
				/>
				<Stack.Screen
					name="new"
					options={{ title: "New note", presentation: "modal" }}
				/>
			</Stack>
		</ThemeProvider>
	)
}
