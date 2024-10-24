import BookDropdownMenu from "@/admin/components/book-dropdownmenu";
import {
    api,
    useGetTopBooksQuery,
    useUpdateTopBooksMutation,
} from "@/apiService/bookApi";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { store } from "@/lib/reduxStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    TopBookRequest,
    TopThreeBooksPayload,
    TopThreeBooksValidator,
} from "./types";

async function loader() {
    const promise = store.dispatch(api.endpoints.getTopBooks.initiate());
    const res = await promise;
    return res.data;
}

export default function TopThreeBooks() {
    const [updateTopBooks, { isLoading }] = useUpdateTopBooksMutation();
    const { data: topBooks } = useGetTopBooksQuery();
    const form = useForm<TopThreeBooksPayload>({
        resolver: zodResolver(TopThreeBooksValidator),
        defaultValues: {
            first: "",
            second: "",
            third: "",
        },
    });

    useEffect(() => {
        if (topBooks) {
            form.setValue(
                "first",
                topBooks.find((b) => b.ranking === 1)?.book?.id
            );
            form.setValue(
                "second",
                topBooks.find((b) => b.ranking === 2)?.book?.id
            );
            form.setValue(
                "third",
                topBooks.find((b) => b.ranking === 3)?.book?.id
            );
        }
    }, [topBooks]);

    function onSubmit(data: TopThreeBooksPayload) {
        const topBooks: TopBookRequest[] = [
            {
                bookId: data.first,
                ranking: 1,
            },
            {
                bookId: data.second,
                ranking: 2,
            },
            {
                bookId: data.third,
                ranking: 3,
            },
        ];
        updateTopBooks(topBooks)
            .unwrap()
            .then((res) => {
                // revalidate();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    Top Three Books!
                </h2>
                <p className="text-muted-foreground">
                    Please fill in all the top three books here
                </p>
            </div>

            {(form.formState.errors.first ||
                form.formState.errors.second ||
                form.formState.errors.third) && (
                <p className="text-rose-500 mt-4">
                    Please select three different books
                </p>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-10"
                >
                    <FormField
                        name="first"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <BookDropdownMenu
                                    label="Top 1"
                                    value={field.value}
                                    onValueChange={(value) => {
                                        form.setValue("first", value);
                                    }}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="second"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <BookDropdownMenu
                                    label="Top 2"
                                    value={field.value}
                                    onValueChange={(value) => {
                                        form.setValue("second", value);
                                    }}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="third"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <BookDropdownMenu
                                    label="Top 3"
                                    value={field.value}
                                    onValueChange={(value) => {
                                        form.setValue("third", value);
                                    }}
                                />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export { loader as topBooksLoader };
