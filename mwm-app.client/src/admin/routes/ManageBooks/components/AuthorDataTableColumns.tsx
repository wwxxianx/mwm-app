import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Author } from "../../../../types/dataType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthorDataTableRowActions } from "./AuthorDataTableRowActions";

export const authorDataTableColumns: ColumnDef<Author>[] = [
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
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value);
                }}
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
        cell: ({ row }) => <div className="w-fit line-clamp-2">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={row.original?.imageUrl} />
                        <AvatarFallback>
                            {(row.getValue("fullName") as string)?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="max-w-[200px] truncate font-medium">
                        {row.getValue("fullName")}
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <AuthorDataTableRowActions row={row} />,
    },
];
