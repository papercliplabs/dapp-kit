import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/ui/utils/cn"

const buttonVariants = cva(
  "dk-inline-flex dk-items-center dk-justify-center dk-gap-2 dk-whitespace-nowrap dk-rounded-md dk-text-sm dk-font-medium dk-ring-offset-background dk-transition-colors focus-visible:dk-outline-none focus-visible:dk-ring-2 focus-visible:dk-ring-ring focus-visible:dk-ring-offset-2 disabled:dk-pointer-events-none disabled:dk-opacity-50 [&_svg]:dk-pointer-events-none [&_svg]:dk-size-4 [&_svg]:dk-shrink-0",
  {
    variants: {
      variant: {
        default: "dk-bg-primary dk-text-primary-foreground hover:dk-bg-primary/90",
        destructive:
          "dk-bg-destructive dk-text-destructive-foreground hover:dk-bg-destructive/90",
        outline:
          "dk-border dk-border-input dk-bg-background hover:dk-bg-accent hover:dk-text-accent-foreground",
        secondary:
          "dk-bg-secondary dk-text-secondary-foreground hover:dk-bg-secondary/80",
        ghost: "hover:dk-bg-accent hover:dk-text-accent-foreground",
        link: "dk-text-primary dk-underline-offset-4 hover:dk-underline",
      },
      size: {
        default: "dk-h-10 dk-px-4 dk-py-2",
        sm: "dk-h-9 dk-rounded-md dk-px-3",
        lg: "dk-h-11 dk-rounded-md dk-px-8",
        icon: "dk-h-10 dk-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
