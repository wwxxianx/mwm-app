import { TabsContent } from "@/components/ui/tabs";
import { api, useGetBooksQuery } from "../../../../apiService/bookApi";
import { store } from "../../../../lib/reduxStore";
import { bookDataTableColumns } from "../components/book-data-table-columns";
import { DataTable } from "../components/data-table";
import { Book } from "@/types/dataType";

async function loader() {
    const promise = store.dispatch(api.endpoints.getBooks.initiate());
    const res = await promise;
    return res.data;
}

export default function ManageBooks() {
    const { data: books } = useGetBooksQuery({});

    return (
        <TabsContent value="book">
            <DataTable
                data={(books as Book[]) ?? []}
                columns={bookDataTableColumns}
                type="book"
            />
        </TabsContent>
    );
}

export { loader as booksLoader };
