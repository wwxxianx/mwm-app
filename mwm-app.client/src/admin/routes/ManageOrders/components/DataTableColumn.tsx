import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Order, OrderItem, OrderStatus } from "../../../../types/dataType";
import { DataTableColumnHeader } from "../../ManageBooks/components/DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatusChip from "./StatusChip";
import { format } from "date-fns";

type OrderStatusHeader = {
    value: OrderStatus;
    label: string;
    icon?: any;
};

export const statuses: OrderStatusHeader[] = [
    {
        value: "Pending",
        label: "Pending",
        icon: "",
    },
    {
        value: "Processing",
        label: "Processing",
        icon: "",
    },
    {
        value: "Delivery",
        label: "Delivery",
        icon: "",
    },
    {
        value: "Completed",
        label: "Completed",
        icon: "",
    },
    {
        value: "Cancelled",
        label: "Cancelled",
        icon: "",
    },
];

export const orderTableColumns: ColumnDef<Order>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "user",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => {
            const user = row.original?.user;

            if (!user) {
                return null;
            }

            return (
                <div className="flex space-x-2 items-center text-slate-700">
                    <Avatar>
                        <AvatarImage src={user.profileImageUrl} />{" "}
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="max-w-[500px] truncate font-medium">
                        {user.fullName}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{row.getValue("price")}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "items",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Items" />
        ),
        cell: ({ row }) => {
            const items: OrderItem[] = row.getValue("items");

            if (!items) {
                return null;
            }

            const numOfItems = items.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.quantity;
            }, 0);

            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{numOfItems}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            );

            if (!status) {
                return null;
            }

            return <StatusChip status={status.value} />;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
            const formattedDate = format(
                row.getValue("createdAt"),
                "MM/dd/yyyy"
            );
            return (
                <p>
                    <time dateTime={formattedDate}>{formattedDate}</time>
                </p>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: true,
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => {
            const formattedDate = format(
                row.getValue("updatedAt"),
                "MM/dd/yyyy"
            );
            return (
                <p>
                    <time dateTime={formattedDate}>{formattedDate}</time>
                </p>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
