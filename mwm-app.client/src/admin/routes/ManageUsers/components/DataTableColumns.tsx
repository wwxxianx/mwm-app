import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DataTableColumnHeader } from "../../ManageBooks/components/DataTableColumnHeader";
import { User } from "../../../../types/dataType";
import { format, parseISO } from "date-fns";

export const userTableColumns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="ID"
                className="w-fit ml-4"
            />
        ),
        cell: ({ row }) => (
            <div className="w-fit ml-4">{row.getValue("id")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const user = row.original;

            if (!user) {
                return null;
            }

            return (
                <div className="flex space-x-2 items-center text-slate-700">
                    <Avatar className="items-center justify-center bg-slate-200">
                        <AvatarImage src={user.profileImageUrl} />
                        <AvatarFallback>
                            {user.fullName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
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
    },
    {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{row.getValue("phoneNumber") ?? "-"}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{row.getValue("gender") ?? "-"}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "birthDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Birth" />
        ),
        cell: ({ row }) => {
            let birtDate = row.getValue("birthDate");
            if (birtDate) {
                const dateString = birtDate;
                const date = parseISO(dateString);

                birtDate = format(date, "yyyy-MM-dd");
            }
            return (
                <div className="flex w-[100px] items-center text-slate-700">
                    <span>{birtDate ?? "-"}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
];
