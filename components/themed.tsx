import FontAwesome from "@expo/vector-icons/FontAwesome"
import { cssInterop } from "nativewind"
import { Text as DefaultText, View as DefaultView } from "react-native"

export function View(props: React.ComponentProps<typeof DefaultView>) {
	return <DefaultView {...props} />
}

export function Text(props: React.ComponentProps<typeof DefaultText>) {
	return <DefaultText className="text-black dark:text-white" {...props} />
}

cssInterop(FontAwesome, { className: { target: "style" } })
export function Icon(props: React.ComponentProps<typeof FontAwesome>) {
	return <FontAwesome className="text-black dark:text-white" {...props} />
}
