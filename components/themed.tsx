import FontAwesome from "@expo/vector-icons/FontAwesome"
import { cssInterop } from "nativewind"
import {
	Text as DefaultText,
	TextInput as DefaultTextInput,
	View as DefaultView,
} from "react-native"

export function View({
	className,
	...rest
}: React.ComponentProps<typeof DefaultView>) {
	return <DefaultView className={className} {...rest} />
}

export function Text({
	className,
	...rest
}: React.ComponentProps<typeof DefaultText>) {
	return (
		<DefaultText
			className={`text-black dark:text-white ${className}`}
			{...rest}
		/>
	)
}

export function TextInput({
	className,
	...rest
}: React.ComponentProps<typeof DefaultTextInput>) {
	return (
		<DefaultTextInput
			className={`text-black dark:text-white dark:placeholder:text-white/25 ${className}`}
			{...rest}
		/>
	)
}

cssInterop(FontAwesome, { className: { target: "style" } })
export function Icon({
	className,
	...rest
}: React.ComponentProps<typeof FontAwesome>) {
	return <FontAwesome className={className} {...rest} />
}
