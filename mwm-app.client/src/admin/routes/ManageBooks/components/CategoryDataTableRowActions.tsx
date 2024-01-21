import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { CategorySchema } from "../../../../types/dataType";
import DeleteCategoryDialog from "./dialog/DeleteCategoryDialog";
import NewCategoryDialog from "./dialog/NewCategoryDialog";
import EditCategoryDialog from "./dialog/EditCategoryDialog";

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
            <DeleteCategoryDialog
                category={category}
            />
        </div>
    );
}
