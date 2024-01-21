import * as React from "react";

import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: boolean;
    errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, errorMessage, error, required, ...props }, ref) => {
        return (
            <div className={cn("flex flex-col gap-2", className)}>
                <label className="text-slate-600 text-sm font-normal">
                    {label}{" "}
                    {required && <span className="text-red-400">*</span>}
                </label>
                <div className="relative">
                    <textarea
                        className={cn(
                            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            {
                                "border-rose-500": error,
                            },
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                <div className="flex items-center text-red-500 text-sm gap-1">
                    {error && (
                        <ExclamationTriangleIcon className="w-4 text-red-500" />
                    )}
                    <p>{errorMessage}</p>
                </div>
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
