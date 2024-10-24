import { Row } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookSchema } from "../../../../types/dataType";
import DeleteBookDialog from "./dialog/delete-book-dialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function BookDataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const book = BookSchema.parse(row.original);
    const navigate = useNavigate();

    function handleEditNavigate() {
        navigate(`/admin/dashboard/edit-book/${book.id}`);
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
                <DropdownMenuItem
                    className="items-center gap-2"
                    onClick={handleEditNavigate}
                >
                    <Pencil className="w-4" />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DeleteBookDialog book={book} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
