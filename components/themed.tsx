import FontAwesome from "@expo/vector-icons/FontAwesome"
import clsx, { type ClassValue } from "clsx"
import { cssInterop } from "nativewind"
import {
	Text as DefaultText,
	TextInput as DefaultTextInput,
	View as DefaultView,
} from "react-native"
import { twMerge } from "tailwind-merge"

export function cx(...classes: ClassValue[]) {
	return twMerge(clsx(...classes))
}

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
			suppressHighlighting
			className={cx("text-black active:opacity-50 dark:text-white", className)}
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
			className={cx("text-black dark:text-white", className)}
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
