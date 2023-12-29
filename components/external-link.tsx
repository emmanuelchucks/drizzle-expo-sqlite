import { Href, Link } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import { Platform } from "react-native"

export function ExternalLink(
	props: Omit<React.ComponentProps<typeof Link>, "href"> & {
		href: string
	},
) {
	return (
		<Link
			target="_blank"
			{...props}
			href={props.href as Href<string>}
			onPress={(e) => {
				if (Platform.OS !== "web") {
					e.preventDefault()
					WebBrowser.openBrowserAsync(props.href as string)
				}
			}}
		/>
	)
}
