import { Row } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { OrderSchema } from "../../../../types/dataType";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

const orderLabels = [
    {
        value: "Pending",
        label: "Pending",
    },
    {
        value: "Processing",
        label: "Processing",
    },
    {
        value: "Delivery",
        label: "Delivery",
    },
    {
        value: "Completed",
        label: "Completed",
    },
];

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const order = OrderSchema.parse(row.original);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <EllipsisHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <Link
                    to={`/admin/dashboard/edit-order/${order.id}`}
                    className={cn(
                        "relative flex gap-2 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                >
                    <Pencil className="w-4" />
                    <span>Edit</span>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Change Status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={order.status}>
                            {orderLabels.map((orderLabel) => (
                                <DropdownMenuRadioItem
                                    key={orderLabel.value}
                                    value={orderLabel.value}
                                    className={cn("cursor-pointer", {
                                        "text-blue-600":
                                            orderLabel.value === "Completed",
                                        "text-yellow-600":
                                            orderLabel.value === "Processing",
                                        "text-rose-600":
                                            orderLabel.value === "Cancelled",
                                    })}
                                >
                                    {orderLabel.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="items-center gap-2 text-rose-600 focus:text-rose-700 focus:bg-rose-100">
                    <Trash2 className="w-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
