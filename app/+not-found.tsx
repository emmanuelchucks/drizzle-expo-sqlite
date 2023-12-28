import { Text, View } from "@/components/themed"
import { Link, Stack } from "expo-router"

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 items-center justify-center">
				<Text>This screen doesn't exist.</Text>
				<Link href="/">
					<Text>Go to home screen!</Text>
				</Link>
			</View>
		</>
	)
}
