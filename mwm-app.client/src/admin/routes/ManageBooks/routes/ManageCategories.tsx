import { TabsContent } from "@/components/ui/tabs";
import { api, useGetCategoriesQuery } from "../../../../apiService/bookApi";
import { store } from "../../../../lib/reduxStore";
import { categoryDataTableColumns } from "../components/CategoryDataTableColumns";
import { DataTable } from "../components/DataTable";

async function loader() {
    const promise = store.dispatch(api.endpoints.getCategories.initiate({}));
    const res = await promise;
    return res.data;
}

export default function ManageCategories() {
    const { data: categories } = useGetCategoriesQuery();

    return (
        <TabsContent value="category">
            <DataTable
                data={categories ?? []}
                columns={categoryDataTableColumns}
                type="category"
            />
        </TabsContent>
    );
}

export { loader as categoriesLoader };
