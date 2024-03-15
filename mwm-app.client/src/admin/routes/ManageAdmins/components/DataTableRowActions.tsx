import { Row } from "@tanstack/react-table";
import { AdminSchema } from "../../../../types/dataType";
import DeleteAdminDialog from "./DeleteAdminDialog";
import UpdateAdminDialog from "./UpdateAdminDialog";

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
