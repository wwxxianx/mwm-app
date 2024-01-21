import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, X } from "lucide-react";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { authors } from "@/lib/fakeData";

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
};

type CategoryOption = {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
};

const categories: CategoryOption[] = [
    {
        label: "Fiction",
        value: "Fiction",
    },
    {
        label: "Non-fiction",
        value: "Non-fiction",
    },
    {
        label: "Education",
        value: "Education",
    },
    {
        label: "Design",
        value: "Design",
    },
];

function authorOptions() {
    return authors.map((author) => ({
        label: author.fullName,
        value: author.fullName,
    }));
}

export function BookDataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const navigate = useNavigate();

    function onNavigateCreateBook() {
        navigate("/admin/dashboard/create-book");
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search books by title..."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px] gap-0"
                    search
                />
                {table.getColumn("category") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title="Category"
                        options={categories}
                    />
                )}
                {table.getColumn("author") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("author")}
                        title="Author"
                        options={authorOptions()}
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
            <div className="flex flex-col">
                <DataTableViewOptions table={table} />
                <div className="flex items-center">
                    {(table.getIsSomeRowsSelected() ||
                        table.getIsAllRowsSelected()) && (
                        <Button
                            variant="defaultAlert"
                            className="ml-auto flex items-center gap-2 mr-2"
                        >
                            <Trash2 className="w-4 m-0 p-0" />
                            Delete
                        </Button>
                    )}
                    <Button
                        className="items-center gap-1"
                        onClick={onNavigateCreateBook}
                    >
                        <PlusIcon className="w-4" />
                        <span>Create Book</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
