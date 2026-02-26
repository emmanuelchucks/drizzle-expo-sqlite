import "@/global.css"

import { AppIcon } from "@/components/icon"
import { DatabaseProvider } from "@/db/provider"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { Link, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, Pressable, useColorScheme } from "react-native"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
	initialRouteName: "index",
}

export default function RootLayout() {
	const colorScheme = useColorScheme()

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<DatabaseProvider>
				<StatusBar
					key={colorScheme}
					animated
					style={colorScheme === "dark" ? "light" : "dark"}
				/>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							title: "Notes",
							headerRight: () => (
								<Link href="/edit" asChild>
									<Pressable className="active:opacity-70">
										<AppIcon name="add" size={26} color="#3B82F6" />
									</Pressable>
								</Link>
							),
						}}
					/>
					<Stack.Screen
						name="edit"
						options={{
							title: "Edit note",
							presentation: Platform.OS === "ios" ? "modal" : "card",
						}}
					/>
				</Stack>
			</DatabaseProvider>
		</ThemeProvider>
	)
}
