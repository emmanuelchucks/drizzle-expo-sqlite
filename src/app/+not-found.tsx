import { Link, Stack } from "expo-router"
import { Text, View } from "react-native"

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Not found" }} />
			<View className="bg-background flex-1 items-center justify-center gap-3 p-4">
				<Text className="text-foreground">This screen does not exist.</Text>
				<Link href="/" asChild>
					<Text className="text-accent">Go to home screen</Text>
				</Link>
			</View>
		</>
	)
}
