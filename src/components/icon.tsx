import { SymbolView, type AndroidSymbol, type SFSymbol } from "expo-symbols";

type IconName = "add" | "search" | "delete" | "save" | "note";

const symbolMap: Record<IconName, { ios: SFSymbol; android: AndroidSymbol; web: AndroidSymbol }> = {
  add: { ios: "plus.circle.fill", android: "add_circle", web: "add_circle" },
  search: { ios: "magnifyingglass", android: "search", web: "search" },
  delete: { ios: "trash.fill", android: "delete", web: "delete" },
  save: {
    ios: "checkmark.circle.fill",
    android: "check_circle",
    web: "check_circle",
  },
  note: { ios: "note.text", android: "description", web: "description" },
};

export function AppIcon({
  name,
  size = 24,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  return <SymbolView name={symbolMap[name]} size={size} tintColor={color} />;
}
