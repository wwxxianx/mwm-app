import { useGetAllUsersOrdersQuery } from "@/apiService/userOrderApi";
import { DataTable } from "../manage-books/components/data-table";
import { orderTableColumns } from "./components/data-table-column";

export default function TaskPage() {
    const { data: allUsesOrders } = useGetAllUsersOrdersQuery();

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Manage customer orders here!
                    </h2>
                </div>
            </div>
            <DataTable
                data={allUsesOrders ?? []}
                columns={orderTableColumns}
                type="order"
            />
        </div>
    );
}
