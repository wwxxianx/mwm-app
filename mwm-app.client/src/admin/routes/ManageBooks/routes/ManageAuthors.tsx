import { TabsContent } from "@/components/ui/tabs";
import { DataTable } from "../components/DataTable";
import { authorDataTableColumns } from "../components/AuthorDataTableColumns";
import { api, useGetAuthorsQuery } from "../../../../apiService/bookApi";
import { store } from "../../../../lib/reduxStore";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { Author } from "../../../../types/dataType";

async function loader() {
    const promise = store.dispatch(api.endpoints.getAuthors.initiate());
    const res = await promise;
    return res.data;
}

export default function ManageAuthors() {
    let { data: authors } = useGetAuthorsQuery();

    return (
        <TabsContent value="author">
            <DataTable
                data={authors ?? []}
                columns={authorDataTableColumns}
                type="author"
            />
        </TabsContent>
    );
}

export { loader as authorsLoader };
