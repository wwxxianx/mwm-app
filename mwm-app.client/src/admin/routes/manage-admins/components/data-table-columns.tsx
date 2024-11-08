import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Admin } from "../../../../types/dataType";
import { DataTableColumnHeader } from "../../manage-books/components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const adminTableColumns: ColumnDef<Admin>[] = [
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
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            // const user = row.original?.user;

            // if (!user) {
            //     return null;
            // }

            return (
                <div className="flex space-x-2 items-center text-slate-700">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("fullName")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{row.getValue("email")}</span>
                </div>
            );
        },
        // filterFn: (row, id, value) => {
        //     return value.includes(row.getValue(id));
        // },
        enableColumnFilter: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "password",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Password" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{row.getValue("password")}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
