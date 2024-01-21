import { cn } from "@/lib/utils";
import React from "react";

type AlertProps = {
    children: React.ReactNode;
    severity: "warning" | "info";
    className?: string;
};

const alertTitle = {
    warning: "Warning",
    info: "Info",
};

export default function Alert(props: AlertProps) {
    const { severity, children, className } = props;

    return (
        <div
            className={cn(
                "flex items-start gap-1 rounded-md border px-2 py-2",
                {
                    "bg-yellow-50 border-yellow-300 text-yellow-700":
                        severity === "warning",
                    "bg-blue-50 border-blue-300 text-blue-900":
                        severity === "info",
                },
                className
            )}
        >
            <p
                className={cn("text-xs md:text-sm font-medium", {
                    "text-yellow-600": severity === "warning",
                    "w-10 text-blue-600": severity === "info",
                })}
            >
                {alertTitle[severity]}:
            </p>
            <div className="text-xs md:text-sm text-left">{children}</div>
        </div>
    );
}
