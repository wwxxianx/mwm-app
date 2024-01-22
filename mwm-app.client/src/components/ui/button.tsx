import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-indigo-500 text-primary-foreground shadow hover:bg-indigo-600",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                defaultAlert: "text-white bg-rose-500 hover:bg-rose-600",
                ghostAlert:
                    "text-rose-500 hover:bg-red-100 hover:text-rose-500",
                clientDefault:
                    "bg-darkBlue text-white shadow rounded-none font-playfair hover:bg-black",
                outlineClient:
                    "border-[1.5px] font-playfair outline-none rounded-none border-client-primary-button hover:bg-client-primary-button hover:text-white",
                ghostClient:
                    "hover:bg-black/10 hover:text-accent-foreground rounded-none",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    error?: boolean;
    errorMessage?: string;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            error,
            errorMessage,
            children,
            isLoading,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <>
                <Comp
                    className={cn(
                        buttonVariants({ variant, size, className }),
                        {
                            "border-rose-500": error,
                        }
                    )}
                    ref={ref}
                    {...props}
                >
                    {isLoading ? (
                        <svg
                            className={cn("animate-spin h-5 w-5 text-white", {
                                "text-black":
                                    variant === "outlineClient" ||
                                    variant === "clientDefault" ||
                                    variant === "ghostClient",
                            })}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        <>{children}</>
                    )}
                </Comp>
                {error && (
                    <div className="flex items-center text-red-500 text-sm gap-1 mt-2">
                        <ExclamationTriangleIcon className="w-4 text-red-500" />
                        <p>{errorMessage}</p>
                    </div>
                )}
            </>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
