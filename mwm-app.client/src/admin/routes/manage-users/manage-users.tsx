import { useGetAllUsersQuery } from "@/apiService/bookApi";
import { users } from "@/lib/fakeData";
import { DataTable } from "../manage-books/components/data-table";
import { userTableColumns } from "./components/data-table-columns";

export async function loader() {
    return users;
}

export default function ManageUsers() {
    const { data: users } = useGetAllUsersQuery();

    return (
        <div>
            <div className="flex items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        All the users who have resgistered to the Books site
                    </p>
                </div>
            </div>
            <DataTable
                data={users ?? []}
                columns={userTableColumns}
                type="user"
            />
        </div>
    );
}

export { loader as usersLoader };
