import {
    useDeleteUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/userFavouriteBookApi";
import { useCreateUserCartItemMutation } from "@/apiService/userShoppingCartApi";
import BookCover from "@/components/ui/BookCover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function UserFavourites() {
    const { toast } = useToast();
    const { data: favouriteBooks } = useGetUserFavouritesQuery();
    const [deleteFavourite, { isLoading: isDeletingFavourite }] =
        useDeleteUserFavouriteMutation();
    const [addToCart, { isLoading: isAddingToCart }] =
        useCreateUserCartItemMutation();

    async function onDeleteFavourite(bookID: string) {
        await deleteFavourite({ bookID: bookID }).unwrap();
    }

    async function onAddToCart(bookID: string) {
        try {
            await addToCart({ bookID: bookID }).unwrap();
        } catch (err) {
            toast({
                variant: "default",
                title: err?.data?.message ?? "Something went wrong",
                description: "You can update your cart item.",
            });
        }
    }

    return (
        <div className="pb-16 px-4 md:container md:px-0 bg-turquoise-50">
            <h5 className="text-lg font-medium">My Favourites</h5>
            <p className="text-black/60 text-sm">
                Manage your favourite books here
            </p>
            <div className="flex flex-col gap-8 mt-4 md:grid md:grid-cols-2">
                {favouriteBooks?.length ? (
                    favouriteBooks?.map((favourite) => {
                        return (
                            <div className="flex gap-2 max-w-[480px] md:max-w-[none] lg:gap-6">
                                <Link
                                    to={`/books/${favourite.book.id}`}
                                    target="_blank"
                                >
                                    <BookCover
                                        imageUrl={favourite.book.imageUrl}
                                        className="min-w-[88px] h-[135px] lg:min-w-[116px] lg:min-h-[170px]"
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <Link
                                        to={`/books/${favourite.book.id}`}
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        <h3 className="font-medium line-clamp-2">
                                            {favourite.book.title}
                                        </h3>
                                    </Link>
                                    <h5 className="text-sm text-black/60 line-clamp-1">
                                        {favourite.book.author?.fullName}
                                    </h5>
                                    <p className="my-3 text-xs font-medium px-2 py-1 bg-[#DCDCDC] text-[#3e3e3e] w-fit rounded-[2px] border-[1px] border-[#D6D6D6]">
                                        {favourite.book.category?.category}
                                    </p>
                                    <p className="font-medium">
                                        RM {favourite.book.price}
                                    </p>
                                    <p className="text-xs text-black/60">
                                        Published at 2023/07/14
                                    </p>
                                </div>
                                {/* Actions */}
                                <div className="ml-auto flex flex-col gap-2">
                                    <Button
                                        size={"sm"}
                                        variant={"ghostClient"}
                                        className="text-black/80"
                                        onClick={() => {
                                            onAddToCart(favourite.book.id);
                                        }}
                                        isLoading={isAddingToCart}
                                        disabled={isAddingToCart}
                                    >
                                        <ShoppingBagIcon className="w-5" />
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        variant={"ghostAlert"}
                                        className="text-black/80"
                                        onClick={() =>
                                            onDeleteFavourite(favourite.book.id)
                                        }
                                        isLoading={isDeletingFavourite}
                                        disabled={isDeletingFavourite}
                                        loadingIconColor="text-rose-400"
                                    >
                                        <TrashIcon className="w-5 text-rose-400" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>You don't have favourite book</div>
                )}
            </div>
        </div>
    );
}
