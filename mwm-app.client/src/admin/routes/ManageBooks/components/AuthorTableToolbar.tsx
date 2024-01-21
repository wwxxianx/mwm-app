import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { DataTableViewOptions } from "../../ManageBooks/components/DataTableViewOptions";
import DeleteAuthorDialog from "./dialog/DeleteAuthorDialog";
import NewAuthorDialog from "./dialog/NewAuthorDialog";

type AuthorDataTableToolbarProps<TData> = {
    table: Table<TData>;
};

export function AuthorDataTableToolbar<TData>({
    table,
}: AuthorDataTableToolbarProps<TData>) {

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search author by fullName"
                    value={
                        (table
                            .getColumn("fullName")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("fullName")
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
                        <DeleteAuthorDialog />
                    )}
                    <NewAuthorDialog />
                </div>
            </div>
        </div>
    );
}
