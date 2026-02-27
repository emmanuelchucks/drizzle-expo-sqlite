import "@/global.css";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable } from "react-native";
import { AppIcon } from "@/components/icon";
import { DatabaseProvider } from "@/db/provider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <StatusBar animated style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Notes",
            headerRight: () => (
              <Link href="/edit" asChild>
                <Pressable className="active:opacity-70">
                  <AppIcon name="add" size={26} />
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
  );
}
