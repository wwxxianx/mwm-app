import { DataTable } from "../components/DataTable";
import { bookDataTableColumns } from "../components/BookDataTableColumns";
import { TabsContent } from "@/components/ui/tabs";
import { store } from "../../../../lib/reduxStore";
import { api } from "../../../../apiService/apiService";
import { useLoaderData } from "react-router-dom";
import { Book } from "../../../../types/dataType";
import { useEffect } from "react";
import { useRevalidate } from "@/hooks/useRevalide";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { triggerShouldRevalidateManageBooks } from "@/admin/redux/routing/routingSlice";

async function loader() {
    const promise = store.dispatch(api.endpoints.getBooks.initiate());
    const res = await promise;
    return res.data;
}

export default function ManageBooks() {
    const books = useLoaderData() as Book[];
    const dispatch = useAppDispatch();
    const revalidate = useRevalidate();
    const shouldRevalidate = useAppSelector(
        (state) => state.routing.shouldRevalidateManageBooks
    );

    useEffect(() => {
        if (shouldRevalidate) {
            revalidate();
            dispatch(triggerShouldRevalidateManageBooks(false));
        }
    }, [revalidate, shouldRevalidate]);

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
