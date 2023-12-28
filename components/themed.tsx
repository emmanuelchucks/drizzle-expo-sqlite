import { Text as DefaultText, View as DefaultView } from "react-native"

export function View(props: React.ComponentProps<typeof DefaultView>) {
	return <DefaultView {...props} />
}

export function Text(props: React.ComponentProps<typeof DefaultText>) {
	return <DefaultText {...props} />
}
