import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button
                variant="ghost"
                className="hover:bg-indigo-100 rounded-full w-9 h-9 p-2"
                ref={ref}
                {...props}
            >
                {children}
            </Button>
        );
    }
);
