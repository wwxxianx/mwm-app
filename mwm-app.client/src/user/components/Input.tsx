import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ReactNode, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
            <div className={className}>
                <div
                    className={cn(
                        "relative mt-5 border-b-[1px] border-black bg-transparent flex",
                        {
                            "border-rose-500": error,
                        },
                        className
                    )}
                >
                    <input
                        className="px-0 py-1 peer focus:outline-none bg-transparent flex-1"
                        required={required}
                        type={
                            type === "password"
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : type
                        }
                        ref={ref}
                        {...props}
                    />
                    <span
                        className={cn(
                            "inline-block text-black/60 pointer-events-none absolute top-1 left-0 peer-focus:text-sm transition-all peer-focus:translate-y-[-18px]  peer-valid:translate-y-[-18px] peer-valid:text-sm",
                            {
                                "text-rose-500": error,
                            }
                        )}
                    >
                        {label}
                    </span>
                    {type === "password" && (
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="w-4 cursor-pointer text-slate-600 hover:text-slate-900"
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    )}
                </div>
                <div className="flex items-center text-rose-500 text-sm gap-1">
                    {error && (
                        <ExclamationTriangleIcon className="w-4 text-rose-500" />
                    )}
                    <p className="text-xs">{errorMessage}</p>
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
