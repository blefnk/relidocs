import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "~/lib/utils";

const mainVariants = cva(
  "container my-12 flex max-w-screen-xl flex-col items-center space-y-8 p-4",
  {
    defaultVariants: {
      size: "md",
      variant: "default",
    },
    variants: {
      size: {
        lg: "text-lg",
        md: "text-base",
        sm: "text-sm",
      },
      variant: {
        centered: "text-center",
        default: "text-base leading-7",
        justified: "text-justify",
      },
    },
  },
);

type MainProps = ComponentPropsWithoutRef<"main"> & {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
  variant?: "centered" | "default" | "justified";
};

export function Main({
  children,
  className = "",
  size = "md",
  variant = "default",
  ...props
}: MainProps) {
  return (
    <main
      className={cn(
        mainVariants({
          size,
          variant,
        }),
        className,
        "space-y-4",
      )}
      {...props}
    >
      {children}
    </main>
  );
}
