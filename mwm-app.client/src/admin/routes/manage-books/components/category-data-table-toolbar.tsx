import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import DeleteCategoryDialog from "./dialog/delete-category-dialog";
import NewCategoryDialog from "./dialog/new-category-dialog";

type CategoryDataTable<TData> = {
    table: Table<TData>;
};

export function CategoryDataTableToolbar<TData>({
    table,
}: CategoryDataTable<TData>) {
    function getSelectedCategories(): TData[] {
        const selectedRows = table.getSelectedRowModel().rows;
        return selectedRows?.map((row) => row.original);
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search category..."
                    value={
                        (table
                            .getColumn("category")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("category")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[200px] lg:w-[250px] gap-0"
                    search
                />
            </div>
            <div className="flex flex-col">
                <DataTableViewOptions table={table} />
                <div className="flex items-center">
                    {(table.getIsSomeRowsSelected() ||
                        table.getIsAllRowsSelected()) && (
                        <DeleteCategoryDialog
                            category={getSelectedCategories()}
                        />
                    )}
                    <NewCategoryDialog />
                </div>
            </div>
        </div>
    );
}
