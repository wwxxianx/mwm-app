import { Row } from "@tanstack/react-table";
import { UserSchema } from "../../../../types/dataType";
import DeleteUserDialog from "./delete-user-dialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function UserDataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const user = UserSchema.parse(row.original);

    return (
        <div className="flex items-center w-full ml-auto justify-self-end">
            <DeleteUserDialog user={user} />
        </div>
    );
}
