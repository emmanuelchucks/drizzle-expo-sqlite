import "@/styles/global.css"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Link, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"
import { Pressable } from "react-native"

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = {
	initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
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
							<Link href="/modal" asChild>
								<Pressable>
									<FontAwesome name="plus-circle" size={25} />
								</Pressable>
							</Link>
						),
					}}
				/>
				<Stack.Screen
					name="modal"
					options={{ title: "New note", presentation: "modal" }}
				/>
			</Stack>
		</ThemeProvider>
	)
}
