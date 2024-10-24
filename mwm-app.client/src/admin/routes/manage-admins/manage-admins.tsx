import { useGetAllAdminsQuery } from "@/apiService/adminApi";
import { DataTable } from "../manage-books/components/data-table";
import { adminTableColumns } from "./components/data-table-columns";
import UpdateAdminDialog from "./components/update-admin-dialog";

export default function ManageAdmins() {
    const { data: admins } = useGetAllAdminsQuery();

    return (
        <div>
            <div className="flex items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
                    <p className="text-muted-foreground">
                        All the users who have access to the admin panel
                    </p>
                </div>

                <UpdateAdminDialog />
            </div>
            <DataTable
                data={admins ?? []}
                columns={adminTableColumns}
                type="admin"
            />
        </div>
    );
}
