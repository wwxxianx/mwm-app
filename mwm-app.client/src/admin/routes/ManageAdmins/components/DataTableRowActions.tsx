import { Row } from "@tanstack/react-table";
import { AdminSchema } from "../../../../types/dataType";
import UpdateAdminDialog from "./UpdateAdminDialog";
import { useState } from "react";
import DeleteAdminDialog from "./DeleteAdminDialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const admin = AdminSchema.parse(row.original);

    function handleOpenCreateDialog() {
        setIsCreateDialogOpen(true);
    }

    function handleCloseCreateDialog() {
        setIsCreateDialogOpen(false);
    }

    function handleOpenDeleteDialog() {
        setIsDeleteDialogOpen(true);
    }

    function handleCloseDeleteDialog() {
        setIsDeleteDialogOpen(false);
    }

    return (
        <div className="flex items-center">
            <UpdateAdminDialog
                isDialogOpen={isCreateDialogOpen}
                onOpenDialog={handleOpenCreateDialog}
                onCloseDialog={handleCloseCreateDialog}
                admin={admin}
            />
            <DeleteAdminDialog
                isDialogOpen={isDeleteDialogOpen}
                onOpenDialog={handleOpenDeleteDialog}
                onCloseDialog={handleCloseDeleteDialog}
            />
        </div>
    );
}
