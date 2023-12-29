import { db } from "@/db/client"
import migrations from "@/drizzle/migrations"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { useFonts } from "expo-font"
import { SplashScreen } from "expo-router"
import { useEffect } from "react"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function useLoadAssets() {
	const [hasLoadedFonts, loadingFontsError] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	const { success: hasRunMigrations, error: runningMigrationError } =
		useMigrations(db, migrations)

	useEffect(() => {
		if (loadingFontsError) throw loadingFontsError
		if (runningMigrationError) throw runningMigrationError
	}, [loadingFontsError, runningMigrationError])

	useEffect(() => {
		if (hasLoadedFonts && hasRunMigrations) {
			SplashScreen.hideAsync()
		}
	}, [hasLoadedFonts, hasRunMigrations])

	return { isLoaded: hasLoadedFonts && hasRunMigrations }
}
