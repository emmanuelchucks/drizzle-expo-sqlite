import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useFonts } from "expo-font"
import { SplashScreen } from "expo-router"
import { useEffect } from "react"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function useLoadAssets() {
	const [isLoaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (isLoaded) {
			SplashScreen.hideAsync()
		}
	}, [isLoaded])

	return { isLoaded }
}
