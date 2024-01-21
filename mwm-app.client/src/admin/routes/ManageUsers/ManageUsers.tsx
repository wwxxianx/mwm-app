import { users } from "@/lib/fakeData";
import { useLoaderData } from "react-router-dom";
import { DataTable } from "../ManageBooks/components/DataTable";
import { User } from "../../../types/dataType";
import { userTableColumns } from "./components/DataTableColumns";

export async function loader() {
    return users;
}

export default function ManageUsers() {
    const usersData = useLoaderData() as User[];

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
                data={usersData}
                columns={userTableColumns}
                type="user"
            />
        </div>
    );
}

export { loader as usersLoader };
