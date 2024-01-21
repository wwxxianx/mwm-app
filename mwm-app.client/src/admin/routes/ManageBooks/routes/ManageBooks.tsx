import { DataTable } from "../components/DataTable";
import { bookDataTableColumns } from "../components/BookDataTableColumns";
import { TabsContent } from "@/components/ui/tabs";
import { store } from "../../../../lib/reduxStore";
import { api } from "../../../../apiService/apiService";
import { useLoaderData } from "react-router-dom";
import { Book } from "../../../../types/dataType";
import { useEffect } from "react";
async function loader() {
    const promise = store.dispatch(api.endpoints.getBooks.initiate());
    const res = await promise;
    return res.data;
}
export default function ManageBooks() {
    const books = useLoaderData() as Book[];

    useEffect(() => {
        console.log('received books', books);
    }, [books]);

    return (
        <TabsContent value="book">
            <DataTable
                data={books}
                columns={bookDataTableColumns}
                type="book"
            />
        </TabsContent>
    );
}

export { loader as booksLoader };