import BookCover from "@/components/ui/BookCover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/fakeData";
import { useAppSelector } from "@/lib/hooks";
import { store } from "@/lib/reduxStore";
import { cn } from "@/lib/utils";
import { Book } from "@/types/dataType";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { LibraryBig } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import BookPreview from "./components/BookPreview";
import { api } from "@/apiService/apiService";
import {
    useCreateUserFavouriteMutation,
    useDeleteUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/userFavouriteBookApi";
import {
    useCreateUserCartItemMutation,
    useGetUserCartItemsQuery,
} from "@/apiService/userShoppingCartApi";
import { useToast } from "@/components/ui/use-toast";

async function loader({ params }) {
    const promise = store.dispatch(
        api.endpoints.getBookById.initiate(params.bookId)
    );
    const res = await promise;
    return res.data;
    return books[1];
}

export default function BookDetails() {
    const { toast } = useToast();
    const user = useAppSelector((state) => state.user.user);
    const { data: favourites } = useGetUserFavouritesQuery();
    const [addToFavourite, { isLoading: isCreating }] =
        useCreateUserFavouriteMutation();
    const [deleteFavourite, { isLoading: isDeleting }] =
        useDeleteUserFavouriteMutation();
    const [addToCart, { isLoading: isAddingToCart }] =
        useCreateUserCartItemMutation();
    const bookData = useLoaderData() as Book;

    let isCurrentBookInFavourite = favourites?.filter(
        (f) => f.book.id === bookData.id
    ).length;

    async function onTriggerFavourite() {
        const data = { bookID: bookData.id };
        if (isCurrentBookInFavourite) {
            await deleteFavourite(data).unwrap();
        } else {
            await addToFavourite(data).unwrap();
        }
    }

    async function onAddToCart() {
        try {
            await addToCart({ bookID: bookData.id }).unwrap();
        } catch (err) {
            toast({
                variant: "default",
                title: err?.data?.message ?? "Something went wrong",
                description: "You can update your cart item.",
            });
        }
    }

    return (
        <div>
            <div className="md:border-y-[1px] border-client-primary-button md:my-4 md:grid grid-cols-2">
                <div className="md:border-r-[1px] border-client-primary-button pb-12">
                    <div className="flex flex-col gap-2 items-center max-w-[240px] mx-auto mt-10">
                        <Button
                            size="sm"
                            variant="outlineClient"
                            className={cn(
                                "aspect-square p-0 group m-0 w-fit ml-auto",
                                { "bg-black/85": isCurrentBookInFavourite }
                            )}
                            onClick={onTriggerFavourite}
                            isLoading={isCreating || isDeleting}
                            disabled={isCreating || isDeleting}
                        >
                            <HeartIcon
                                className={cn(
                                    "w-5 text-client-primary-button group-hover:text-white",
                                    { "text-white": isCurrentBookInFavourite }
                                )}
                            />
                        </Button>
                        <BookCover
                            imageUrl={bookData.imageUrl}
                            className="max-w-[240px] shadow-lg"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-6 max-w-[240px] mx-auto">
                        <Button
                            variant="outlineClient"
                            className={cn(
                                "gap-2 text-sm group w-full max-w-[240px]"
                            )}
                            onClick={onAddToCart}
                            isLoading={isAddingToCart}
                            disabled={isAddingToCart}
                        >
                            <ShoppingBagIcon className="w-5 text-client-primary-button group-hover:text-white" />
                            <span>Add to Cart</span>
                        </Button>
                        <BookPreview />
                    </div>
                </div>

                <div className="min-w-[311px] mt-8 px-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-slate-200 text-xs">
                                        WI
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                    {bookData.author.fullName}
                                </p>
                            </div>
                        </div>
                        <h2 className="mt-1 md:mt-4 md:text-xl">
                            {bookData.title}
                        </h2>
                        <div className="flex items-center gap-1 text-sm md:text-base text-slate-600">
                            <LibraryBig className="w-4" />
                            <h3>History of Humankind</h3>
                        </div>
                        <p className="text-xs mt-3 tracking-wide text-slate-600 md:text-sm">
                            {bookData.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { loader as clientBookLoader };
