import {
    useCreateUserFavouriteMutation,
    useDeleteUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/userFavouriteBookApi";
import { useCreateUserCartItemMutation } from "@/apiService/userShoppingCartApi";
import BookCover from "@/components/ui/BookCover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Book } from "@/types/dataType";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type BookDrawerProps = {
    book: Book;
    bookCoverStyle?: string;
    bookTitleStyle?: string;
};

export default function BookDrawer(props: BookDrawerProps) {
    const { book, bookCoverStyle, bookTitleStyle } = props;
    const { toast } = useToast();
    const { data: favourites } = useGetUserFavouritesQuery();
    const [addToFavourite, { isLoading: isCreating }] =
        useCreateUserFavouriteMutation();
    const [deleteFavourite, { isLoading: isDeleting }] =
        useDeleteUserFavouriteMutation();
    const [addToCart, { isLoading: isAddingToCart }] =
        useCreateUserCartItemMutation();

    let isCurrentBookInFavourite = favourites?.filter(
        (f) => f.book.id === book.id
    )?.length;

    async function onTriggerFavourite(bookID: string) {
        const data = { bookID: bookID };
        const isCurrentBookInFavourite = favourites?.filter(
            (f) => f.book.id === bookID
        ).length;
        if (isCurrentBookInFavourite) {
            await deleteFavourite(data).unwrap();
        } else {
            await addToFavourite(data).unwrap();
        }
    }

    async function onAddToCart(bookID: string) {
        try {
            addToCart({ bookID: bookID })
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
                title: "Something went wrong",
                description: "You can update your cart item.",
            });
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div tabIndex={0}>
                    <BookCover
                        imageUrl={book.imageUrl}
                        className={cn(
                            "shadow-sm mx-auto cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all",
                            bookCoverStyle
                        )}
                    />
                    <h2
                        className={cn(
                            "font-medium text-sm mt-2 text-center",
                            bookTitleStyle
                        )}
                    >
                        {book.title}
                    </h2>
                    <h3 className="font-medium text-sm text-black/60 text-center">
                        {book.author.fullName}
                    </h3>
                </div>
            </DrawerTrigger>
            <DrawerContent className="focus:outline-none">
                <div className="w-full font-playfair">
                    <div className="pt-4 pb-6 px-2 flex flex-col md:flex-row justify-start md:gap-3 md:px-4 lg:px-9">
                        <Button
                            size="sm"
                            variant="outlineClient"
                            className={cn("rounded-full w-8 h-8 p-1 ml-auto", {
                                "bg-black/85": isCurrentBookInFavourite,
                            })}
                            onClick={() => onTriggerFavourite(book.id)}
                            isLoading={isCreating || isDeleting}
                            disabled={isCreating || isDeleting}
                        >
                            <HeartIcon
                                className={cn(
                                    "w-5 text-client-primary-button group-hover:text-white",
                                    {
                                        "text-white": isCurrentBookInFavourite,
                                    }
                                )}
                            />
                        </Button>
                        <BookCover
                            imageUrl={book.imageUrl}
                            className="max-w-[110px] md:max-w-[160px] lg:max-w-[260px] mx-auto shadow-lg mb-2 cursor-pointer"
                        />
                        <div className="flex-1 flex flex-col md:ml-3">
                            <h2 className="font-medium md:text-lg lg:text-xl">
                                {book.title}
                            </h2>
                            <h4 className="text-black/60 md:text-lg lg:text-xl">
                                {book.author.fullName}
                            </h4>
                            <p className="text-sm md:text-base my-4 leading-6 lg:max-w-[950px]">
                                {book.description}
                            </p>
                            <p className="text-xl font-medium lg:mt-auto">
                                <span>RM </span>
                                {book.price}
                            </p>
                            <div className="flex gap-2 mt-3 lg:max-w-[494px] md:mb-2">
                                <Button
                                    variant="clientDefault"
                                    className="flex-1 text-lg h-fit py-3"
                                    onClick={() => onAddToCart(book.id)}
                                    isLoading={isAddingToCart}
                                    disabled={isAddingToCart}
                                >
                                    Add to cart
                                </Button>
                                <Link
                                    to={`/book/${book.id}`}
                                    className={cn(
                                        buttonVariants({
                                            variant: "outlineClient",
                                        }),
                                        "rounded-none flex-1 gap-2 items-center text-lg h-fit py-3"
                                    )}
                                    target="_top"
                                >
                                    <span>See in details</span>
                                    <ArrowTopRightOnSquareIcon className="w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
