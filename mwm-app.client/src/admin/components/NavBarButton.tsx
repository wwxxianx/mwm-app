import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.ElementType;
    label: string;
    active: boolean;
}

export const NavBarButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, ...props }, ref) => {
        const { Icon, label, active } = props;
        return (
            <Button
                ref={ref}
                className={cn(
                    "w-full bg-transparent justify-start gap-2 pl-3 hover:bg-blue-100 rounded-full shadow-none m-0",
                    {
                        "bg-blue-100": active,
                    }
                )}
                {...props}
            >
                {Icon && (
                    <Icon
                        className={cn("w-5 h-5 text-slate-500", {
                            "text-indigo-500": active,
                        })}
                    />
                )}
                <p
                    className={cn("text-sm font-medium text-slate-950", {
                        "text-indigo-500": active,
                    })}
                >
                    {label}
                </p>
            </Button>
        );
    }
);
