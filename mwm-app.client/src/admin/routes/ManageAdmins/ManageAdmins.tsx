import { useEffect, useState } from "react";
import UpdateAdminDialog from "./components/UpdateAdminDialog";
import { DataTable } from "../ManageBooks/components/DataTable";
import { admins } from "@/lib/fakeData";
import { adminTableColumns } from "./components/DataTableColumns";
import { useLoaderData } from "react-router-dom";
import { Admin } from "../../../types/dataType";

export async function loader() {
    return admins;
}

export default function ManageAdmins() {
    const adminsData = useLoaderData() as Admin[];
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    useEffect(() => {
        console.log("render");
    }, []);

    function handleCloseCreateDialog() {
        setIsCreateDialogOpen(false);
    }

    function handleOpenCreateDialog() {
        setIsCreateDialogOpen(true);
    }

    return (
        <div>
            <div className="flex items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
                    <p className="text-muted-foreground">
                        All the users who have access to the admin panel
                    </p>
                </div>

                <UpdateAdminDialog
                    isDialogOpen={isCreateDialogOpen}
                    onOpenDialog={handleOpenCreateDialog}
                    onCloseDialog={handleCloseCreateDialog}
                />
            </div>
            <DataTable
                data={adminsData}
                columns={adminTableColumns}
                type="admin"
            />
        </div>
    );
}

export { loader as adminsLoader };
