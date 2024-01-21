import { useCallback, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./DataTablePagination";
import { BookDataTableToolbar } from "./BookDataTableToolbar";
import { OrderDataTableToolbar } from "../../ManageOrders/components/DataTableToolbar";
import { AdminDataTableToolbar } from "../../ManageAdmins/components/DataTableToolbar";
import { UserDataTableToolbar } from "../../ManageUsers/components/DataTableToolbar";
import { AuthorDataTableToolbar } from "./AuthorTableToolbar";
import { CategoryDataTableToolbar } from "./CategoryDataTableToolbar";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    type: "order" | "user" | "book" | "admin" | "author" | "category";
};

export function DataTable<TData, TValue>({
    columns,
    data,
    type,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    // NOTE: Prevent unnecessary re-render from state changed
    const DataTableToolbarContent = useCallback(() => {
        switch (type) {
            case "book":
                return <BookDataTableToolbar table={table} />;
            case "order":
                return <OrderDataTableToolbar table={table} />;
            case "admin":
                return <AdminDataTableToolbar table={table} />;
            case "user":
                return <UserDataTableToolbar table={table} />;
            case "author":
                return <AuthorDataTableToolbar table={table} />;
            case "category":
                return <CategoryDataTableToolbar table={table} />;
        }
    }, []);

    return (
        <div className="space-y-4">
            <DataTableToolbarContent />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers?.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns?.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
