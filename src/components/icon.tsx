import { SymbolView, type AndroidSymbol, type SFSymbol } from "expo-symbols";
import { styled } from "nativewind";

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

const StyledSymbolView = styled(SymbolView, {
  className: {
    target: "style",
    nativeStyleMapping: {
      color: "tintColor",
    },
  },
});

export function AppIcon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return <StyledSymbolView name={symbolMap[name]} size={size} className={className} />;
}
