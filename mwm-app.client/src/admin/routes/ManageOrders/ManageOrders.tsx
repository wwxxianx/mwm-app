import { orders } from "@/lib/fakeData";
import { orderTableColumns } from "./components/DataTableColumn";
import { DataTable } from "../ManageBooks/components/DataTable";

export default function TaskPage() {
    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Manage customer orders here!
                    </h2>
                </div>
            </div>
            <DataTable data={orders} columns={orderTableColumns} type="order" />
        </div>
    );
}
