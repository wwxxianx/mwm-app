import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableViewOptions } from "../../manage-books/components/data-table-view-options";
import { DataTableFacetedFilter } from "../../manage-books/components/data-table-faceted-filter";
import { statuses } from "./data-table-column";
import { Input } from "@/components/ui/input";

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
};

export function OrderDataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search order by id"
                    value={
                        (table.getColumn("id")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("id")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[200px] lg:w-[250px] gap-0"
                    search
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
