import {
    ExclamationTriangleIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { ReactNode, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    endButton?: ReactNode;
    search?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            label,
            errorMessage,
            error,
            required,
            endButton,
            id,
            search,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);

        function togglePassword() {
            setShowPassword((prev) => !prev);
        }

        return (
            <div className={cn("flex flex-col gap-1", className)}>
                <label
                    htmlFor={id}
                    className="text-slate-600 text-sm font-normal"
                >
                    {label}{" "}
                    {required && <span className="text-red-400">*</span>}
                </label>
                <div
                    className={cn(
                        "relative flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        "focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        {
                            "border-rose-500": error,
                        },
                        className
                    )}
                >
                    {search && (
                        <MagnifyingGlassIcon className="w-4 mr-2 text-slate-500" />
                    )}
                    <input
                        type={
                            type === "password"
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : type
                        }
                        className="w-full focus:outline-none"
                        ref={ref}
                        {...props}
                    />
                    {type === "password" && (
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="w-4 cursor-pointer absolute top-3 right-4 text-slate-600 hover:text-slate-900"
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    )}
                    <div className="ml-auto flex items-center">{endButton}</div>
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
Input.displayName = "Input";

export { Input };
