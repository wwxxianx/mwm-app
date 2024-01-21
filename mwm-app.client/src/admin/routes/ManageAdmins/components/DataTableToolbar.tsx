import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "../../ManageBooks/components/DataTableViewOptions";
import { Input } from "@/components/ui/input";

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
};

export function AdminDataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search admin by email"
                    value={
                        (table
                            .getColumn("email")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[200px] lg:w-[250px] gap-0"
                    search
                />
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
