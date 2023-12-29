import { Text, View } from "@/components/themed"
import { StatusBar } from "expo-status-bar"
import { Platform } from "react-native"

export default function NewNote() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text>New note</Text>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	)
}
