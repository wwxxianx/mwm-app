import { TabsContent } from "@/components/ui/tabs";
import { useLoaderData } from "react-router-dom";
import { api } from "../../../../apiService/apiService";
import { store } from "../../../../lib/reduxStore";
import { Category } from "../../../../types/dataType";
import { categoryDataTableColumns } from "../components/CategoryDataTableColumns";
import { DataTable } from "../components/DataTable";

async function loader() {
    const promise = store.dispatch(api.endpoints.getCategories.initiate({}));
    const res = await promise;
    return res.data;
}

export default function ManageCategories() {
    const categories = useLoaderData() as Category[];

    return (
        <TabsContent value="category">
            <DataTable
                data={categories}
                columns={categoryDataTableColumns}
                type="category"
            />
        </TabsContent>
    );
}

export { loader as categoriesLoader };
