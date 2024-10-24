import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { CategorySchema } from "../../../../types/dataType";
import DeleteCategoryDialog from "./dialog/delete-category-dialog";
import NewCategoryDialog from "./dialog/new-category-dialog";
import EditCategoryDialog from "./dialog/edit-category-dialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function CategoryDataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const category = CategorySchema.parse(row.original);

    return (
        <div className="flex items-center w-full ml-auto justify-self-end">
            <EditCategoryDialog category={category} />
            <DeleteCategoryDialog category={category} />
        </div>
    );
}
