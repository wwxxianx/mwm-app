import { useGetBooksQuery, useGetCategoriesQuery } from "@/apiService/bookApi";
import { PaginatedResponse } from "@/apiService/types";
import {
    useCreateUserFavouriteMutation,
    useDeleteUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/userFavouriteBookApi";
import { useCreateUserCartItemMutation } from "@/apiService/userShoppingCartApi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Book, Category } from "@/types/dataType";
import BookDrawer from "@/user/components/BookDrawer";
import { updateSelectedCategories } from "@/user/redux/bookSlice";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import BooksSkeleton from "./components/BooksSkeleton";
import SearchBookDialog from "./components/SearchBookDialog";

export default function Books() {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const selectedCategories = useAppSelector(
        (state) => state.book.selectedCategories
    );
    const {
        data: books,
        isLoading: isLoadingBooks,
        isFetching: isFetchingBooks,
    } = useGetBooksQuery({
        pageNumber: currentPage,
        categoryIDs: selectedCategories,
    });
    const { data: categories } = useGetCategoriesQuery();

    function onCategoryCheck(category: Category) {
        dispatch(updateSelectedCategories({ categoryID: category.id }));
    }

    return (
        <div className="px-4 pt-6 md:flex gap-4 lg:gap-8 bg-turquoise-50 md:container">
            <div className="hidden md:block h-screen border-r-[1px] border-black/60 max-w-[210px] font-inter pr-2 md:max-w-none lg:min-w-[220px]">
                <p>Filter by Category</p>
                {categories?.map((category) => {
                    let isCategoryChecked = selectedCategories.includes(
                        category.id
                    );

                    return (
                        <div
                            className="flex items-center mt-4"
                            key={category.id}
                        >
                            <Checkbox
                                id={category.category}
                                className="rounded-none"
                                checked={isCategoryChecked}
                                onClick={() => onCategoryCheck(category)}
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
                <SearchBookDialog />
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
                    {isLoadingBooks ? (
                        <BooksSkeleton />
                    ) : (books as PaginatedResponse<Book>)?.data?.length ? (
                        (books as PaginatedResponse<Book>)?.data.map((book) => {
                            return <BookDrawer book={book} />;
                        })
                    ) : (
                        <p>Empty</p>
                    )}
                </div>

                <Pagination className="mt-20">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        prev > 1 ? prev - 1 : prev
                                    )
                                }
                            />
                        </PaginationItem>
                        {new Array(books?.totalPages)
                            .fill(1)
                            .map((value, index) => {
                                return (
                                    <PaginationItem className="cursor-pointer">
                                        <PaginationLink
                                            isActive={currentPage === index + 1}
                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        prev === books?.totalPages
                                            ? prev
                                            : prev + 1
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
