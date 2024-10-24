import { Row } from "@tanstack/react-table";
import { AdminSchema } from "../../../../types/dataType";
import DeleteAdminDialog from "./delete-admin-dialog";
import UpdateAdminDialog from "./update-admin-dialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const admin = AdminSchema.parse(row.original);

    return (
        <div className="flex items-center">
            <UpdateAdminDialog admin={admin} />
            <DeleteAdminDialog admin={admin} />
        </div>
    );
}
