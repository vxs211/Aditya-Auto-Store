import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:bg-primary-hover",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline: "bg-primary-tint text-primary-hover hover:bg-primary-tint-hover",
        inverse: "bg-background text-link hover:bg-[#dfdcd9] hover:text-foreground",
        secondary: "bg-primary-tint text-primary-hover hover:bg-primary-tint-hover",
        ghost: "rounded-sm text-ink-soft hover:bg-wash",
        link: "text-link underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[38px] px-[15px] py-1.5",
        sm: "h-[30px] gap-1.5 px-2.5",
        lg: "h-11 px-5 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends useRender.ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

function Button({ className, render, size, variant, ...props }: ButtonProps) {
  return useRender({
    defaultTagName: "button",
    render,
    state: { slot: "button" },
    props: mergeProps<"button">(
      { className: cn(buttonVariants({ variant, size, className })) },
      props,
    ),
  });
}

export { Button };
