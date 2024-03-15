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

import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { OrderSchema, OrderStatus } from "../../../../types/dataType";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useUpdateUserOrderMutation } from "@/apiService/userOrderApi";
import { useToast } from "@/components/ui/use-toast";
import DeleteOrderDialog from "./DeleteOrderDialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

const orderLabels: { value: OrderStatus; label: string }[] = [
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
    {
        value: "Cancelled",
        label: "Cancelled",
    },
    {
        value: "Refund",
        label: "Refund",
    },
];

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const order = OrderSchema.parse(row.original);
    const { toast } = useToast();
    const [updateOrder, { isLoading: isUpdatingOrder }] =
        useUpdateUserOrderMutation();

    function onUpdateOrderStatus(status: OrderStatus) {
        updateOrder({ ...order, orderID: order.id, status: status })
            .unwrap()
            .then((_) => {})
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

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
                    <EyeIcon className="w-4" strokeWidth={2.0} />
                    <span>View Details</span>
                </Link>
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
                                        "text-green-600":
                                            orderLabel.value === "Completed",
                                        "text-yellow-600":
                                            orderLabel.value === "Processing",
                                        "text-rose-600":
                                            orderLabel.value === "Cancelled",
                                        "text-blue-600":
                                            orderLabel.value === "Delivery",
                                        "text-purple-600":
                                            orderLabel.value === "Refund",
                                    })}
                                    onClick={() =>
                                        onUpdateOrderStatus(orderLabel.value)
                                    }
                                >
                                    {orderLabel.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DeleteOrderDialog order={order} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
