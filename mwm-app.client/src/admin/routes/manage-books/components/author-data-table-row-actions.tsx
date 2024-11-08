import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { AuthorSchema } from "../../../../types/dataType";
import DeleteAuthorDialog from "./dialog/delete-author-dialog";
import NewAuthorDialog from "./dialog/new-author-dialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function AuthorDataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const author = AuthorSchema.parse(row.original);

    return (
        <div className="flex items-center w-full ml-auto justify-self-end">
            <NewAuthorDialog author={author} />
            <DeleteAuthorDialog author={author} />
        </div>
    );
}
