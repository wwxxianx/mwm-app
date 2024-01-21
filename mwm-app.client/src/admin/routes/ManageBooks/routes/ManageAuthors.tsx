import { TabsContent } from "@/components/ui/tabs";
import { DataTable } from "../components/DataTable";
import { authorDataTableColumns } from "../components/AuthorDataTableColumns";
import { api } from "../../../../apiService/apiService";
import { store } from "../../../../lib/reduxStore";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { Author } from "../../../../types/dataType";

async function loader() {
    const promise = store.dispatch(api.endpoints.getAuthors.initiate({}));
    const res = await promise;
    return res.data;
}

export default function ManageAuthors() {
    const authors = useLoaderData() as Author[];

    useEffect(() => {
        console.log(authors)
    }, [authors]);

    return (
        <TabsContent value="author">
            <DataTable
                data={authors}
                columns={authorDataTableColumns}
                type="author"
            />
        </TabsContent>
    );
}

export { loader as authorsLoader };