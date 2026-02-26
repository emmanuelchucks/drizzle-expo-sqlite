import { cn, tv } from "tailwind-variants";

export { cn };

export const noteCardStyles = tv({
  base: "bg-card flex-1 gap-2 rounded-2xl border border-zinc-300 p-4 active:opacity-70 dark:border-zinc-700",
});

export const buttonStyles = tv({
  base: "rounded-xl px-4 py-3",
  variants: {
    intent: {
      primary: "bg-accent",
      danger: "bg-danger",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});
