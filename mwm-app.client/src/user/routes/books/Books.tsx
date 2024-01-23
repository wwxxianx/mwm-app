import {
    useGetBooksQuery,
    useGetCategoriesQuery,
} from "@/apiService/apiService";
import BookCover from "@/components/ui/BookCover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    ArrowTopRightOnSquareIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SearchDialog from "./components/SearchDialog";
import {
    useCreateUserFavouriteMutation,
    useDeleteUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/userFavouriteBookApi";
import { useCreateUserCartItemMutation } from "@/apiService/userShoppingCartApi";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function Books() {
    const { toast } = useToast();
    const { data: books } = useGetBooksQuery();
    const { data: categories } = useGetCategoriesQuery();
    const { data: favourites } = useGetUserFavouritesQuery();
    const [addToFavourite, { isLoading: isCreating }] =
        useCreateUserFavouriteMutation();
    const [deleteFavourite, { isLoading: isDeleting }] =
        useDeleteUserFavouriteMutation();
    const [addToCart, { isLoading: isAddingToCart }] =
        useCreateUserCartItemMutation();

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
        <div className="px-4 pt-6 md:flex gap-4 lg:gap-8 bg-turquoise-50 md:container">
            <div className="hidden md:block h-screen border-r-[1px] border-black/60 max-w-[210px] font-inter pr-2 md:max-w-none lg:min-w-[220px]">
                <p>Filter by Category</p>
                {categories?.map((category) => {
                    return (
                        <div
                            className="flex items-center mt-4"
                            key={category.id}
                        >
                            <Checkbox
                                id={category.category}
                                className="rounded-none"
                            />
                            <label
                                htmlFor={category.category}
                                className="text-sm md:text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ml-2"
                            >
                                {category.category}
                            </label>
                            {category.isTrending && (
                                <FireIcon className="w-4 ml-1 text-black/70" />
                            )}
                        </div>
                    );
                })}
            </div>
            <div>
                <SearchDialog searchFieldPlaceholder="Type a book's title, author...">
                    {books?.map((book) => {
                        return (
                            <Link
                                to={"/books"}
                                className="flex items-center gap-2 my-4 cursor-pointer hover:bg-slate-50"
                            >
                                <BookCover
                                    imageUrl={book.imageUrl}
                                    className="max-w-[40px] md:max-w-[60px] lg:max-w-[70px] "
                                />
                                <div className="font-playfair">
                                    <h3 className="text-sm font-normal">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-black/60">
                                        {book.author.fullName}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </SearchDialog>
                {/* Categories Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center md:hidden">
                            <p>Category:</p>
                            <Button
                                variant="ghostClient"
                                className="flex text-base font-normal gap-1 items-center"
                            >
                                <span>Fiction</span>
                                <ChevronDownIcon className="w-4" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="w-56 bg-turquoise-50"
                    >
                        <DropdownMenuCheckboxItem
                            checked={true}
                            onCheckedChange={() => {}}
                        >
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={true}
                            onCheckedChange={() => {}}
                        >
                            Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={true}
                            onCheckedChange={() => {}}
                        >
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Books */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-8 mt-3 md:mt-5">
                    {books?.map((book) => {
                        let isCurrentBookInFavourite = favourites?.filter(
                            (f) => f.book.id === book.id
                        )?.length;
                        return (
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <div tabIndex={0}>
                                        <BookCover
                                            imageUrl={book.imageUrl}
                                            className="shadow-sm mx-auto cursor-pointer"
                                        />
                                        <h2 className="font-medium text-sm mt-2 text-center">
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
                                                className={cn(
                                                    "rounded-full w-8 h-8 p-1 ml-auto",
                                                    {
                                                        "bg-black/85":
                                                            isCurrentBookInFavourite,
                                                    }
                                                )}
                                                onClick={() =>
                                                    onTriggerFavourite(book.id)
                                                }
                                                isLoading={
                                                    isCreating || isDeleting
                                                }
                                                disabled={
                                                    isCreating || isDeleting
                                                }
                                            >
                                                <HeartIcon
                                                    className={cn(
                                                        "w-5 text-client-primary-button group-hover:text-white",
                                                        {
                                                            "text-white":
                                                                isCurrentBookInFavourite,
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
                                                        onClick={() =>
                                                            onAddToCart(book.id)
                                                        }
                                                        isLoading={
                                                            isAddingToCart
                                                        }
                                                        disabled={
                                                            isAddingToCart
                                                        }
                                                    >
                                                        Add to cart
                                                    </Button>
                                                    <Button
                                                        variant="outlineClient"
                                                        className="rounded-none flex-1 gap-2 items-center text-lg h-fit py-3"
                                                    >
                                                        <span>
                                                            See in details
                                                        </span>
                                                        <ArrowTopRightOnSquareIcon className="w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        );
                    })}
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
