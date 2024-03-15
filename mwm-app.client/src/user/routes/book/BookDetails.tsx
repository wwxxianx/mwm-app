import {
    api,
    useGetBookReviewsQuery,
    useGetRelevantBooksQuery,
} from "@/apiService/bookApi";
import {
    useCreateUserFavouriteMutation,
    useDeleteUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/userFavouriteBookApi";
import { useCreateUserCartItemMutation } from "@/apiService/userShoppingCartApi";
import BookCover from "@/components/ui/BookCover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { store } from "@/lib/reduxStore";
import { cn } from "@/lib/utils";
import { Book } from "@/types/dataType";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import {
    HeartIcon,
    ShoppingBagIcon,
    StarIcon as SolidStarIcon,
} from "@heroicons/react/24/solid";
import { LibraryBig } from "lucide-react";
import Rating from "react-rating";
import { Link, useLoaderData } from "react-router-dom";
import RateDialog from "../account/routes/purchases/components/RateDialog";
import BookPreview from "./components/BookPreview";
import BookDrawer from "@/user/components/BookDrawer";

async function loader({ params }) {
    const promise = store.dispatch(
        api.endpoints.getBookById.initiate(params.bookId)
    );
    const res = await promise;
    return res.data;
}

export default function BookDetails() {
    const bookData = useLoaderData() as Book;
    const { toast } = useToast();
    const user = useAppSelector((state) => state.user.user);
    const { data: relevantBooks } = useGetRelevantBooksQuery({
        categoryID: bookData.category.id,
        limit: 10,
    });
    const { data: favourites } = useGetUserFavouritesQuery();
    const { data: bookReviews } = useGetBookReviewsQuery(bookData.id);
    const [addToFavourite, { isLoading: isCreating }] =
        useCreateUserFavouriteMutation();
    const [deleteFavourite, { isLoading: isDeleting }] =
        useDeleteUserFavouriteMutation();
    const [addToCart, { isLoading: isAddingToCart }] =
        useCreateUserCartItemMutation();

    let isCurrentBookInFavourite = favourites?.filter(
        (f) => f.book.id === bookData.id
    ).length;
    let isAlreadyReviewed = bookReviews?.filter(
        (r) => r.user.id === user.id
    )?.length;

    async function onTriggerFavourite() {
        const data = { bookID: bookData.id };
        if (isCurrentBookInFavourite) {
            deleteFavourite(data)
                .unwrap()
                .then((_) => {})
                .catch((_) => {
                    toast({
                        variant: "destructive",
                        title: "Something went wrong",
                        description: "Please try again later.",
                    });
                });
        } else {
            addToFavourite(data)
                .unwrap()
                .then((_) => {})
                .catch((_) => {
                    toast({
                        variant: "destructive",
                        title: "Something went wrong",
                        description: "Please try again later.",
                    });
                });
        }
    }

    async function onAddToCart() {
        try {
            addToCart({ bookID: bookData.id })
                .unwrap()
                .then((_) => {
                    toast({
                        variant: "default",
                        title: "Book added to your cart!",
                        description: "You can view book in your cart now.",
                    });
                })
                .catch((err) => {
                    if (err.status === 409) {
                        toast({
                            variant: "destructive",
                            title: "Item already in your cart",
                        });
                    }
                });
        } catch (err) {
            toast({
                variant: "default",
                title: err?.data?.message ?? "Something went wrong",
                description: "You can update your cart item.",
            });
        }
    }

    return (
        <div className="pb-[300px]">
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

                <div className="min-w-[311px] lg:mt-8 px-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <Link
                                to={`/author/${bookData.author.id}`}
                                className="flex items-center gap-2"
                            >
                                <Avatar className="w-10 h-10">
                                    <AvatarImage
                                        src={bookData.author.imageUrl}
                                    />
                                    <AvatarFallback className="bg-slate-200 text-xs">
                                        {bookData.author.fullName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="">{bookData.author.fullName}</p>
                            </Link>
                        </div>
                        <h2 className="mt-1 md:mt-4 md:text-xl">
                            {bookData.title}
                        </h2>
                        <div className="flex items-center gap-1 text-sm md:text-base text-slate-600">
                            <LibraryBig className="w-4" />
                            <h3>History of Humankind</h3>
                        </div>
                        <p className="font-sans text-sm mt-3 text-slate-600 md:text-base">
                            {bookData.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Review */}
            <div className="px-6 md:pl-12 lg:px-20">
                <p className="font-medium md:text-lg mt-12 mb-2 md:mb-4">
                    Book Reviews by Readers
                </p>
                <div className="space-y-6 max-h-[500px] overflow-y-scroll no-scrollbar">
                    {!bookReviews?.length ? (
                        <p>There's no review for this book yet.</p>
                    ) : (
                        bookReviews?.map((review) => (
                            <div>
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={review.user.profileImageUrl}
                                        />
                                        <AvatarFallback>
                                            {review.user.fullName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-inter m-0 translate-y-[2px]">
                                            {review.user.fullName}
                                        </p>
                                        {/* @ts-ignore */}
                                        <Rating
                                            emptySymbol={
                                                <OutlineStarIcon className="w-4 h-4 text-slate-400" />
                                            }
                                            fullSymbol={
                                                <SolidStarIcon className="w-4 h-4 text-yellow-400" />
                                            }
                                            initialRating={4}
                                            readonly
                                            className="translate-y-[-2px]"
                                        />
                                    </div>
                                </div>
                                <p className="font-inter font-medium text-sm mt-2 pl-1">
                                    {review.reviewTitle}
                                </p>
                                <p className="font-inter text-sm mt-1 pl-1">
                                    {review.reviewDescription}
                                </p>
                                <p className="font-inter text-sm text-black/60 mt-1 pl-1">
                                    2022 Jun 17
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {!isAlreadyReviewed && (
                    <RateDialog
                        label="Leave a review"
                        className="mt-6"
                        book={bookData}
                    />
                )}
            </div>

            {/* Relevant Books */}
            <div className="pl-6 md:pl-12 lg:pl-20 mt-20">
                <p className="font-medium text-lg mt-6 mb-6">Relevant Books</p>
                <div className="flex gap-8 overflow-x-scroll">
                    {relevantBooks?.map((book) => {
                        return (
                            <BookDrawer
                                book={book}
                                bookCoverStyle="min-w-[120px] max-w-[120px]"
                                bookTitleStyle="max-w-[150px] line-clamp-2"
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { loader as clientBookLoader };
