import { useGetBooksQuery, useGetCategoriesQuery } from "@/apiService/bookApi";
import { PaginatedResponse } from "@/apiService/types";
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
import { cn } from "@/lib/utils";
import { Book, Category } from "@/types/dataType";
import BookDrawer from "@/user/components/BookDrawer";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";
import BooksSkeleton from "./components/books-skeleton";
import SearchBookDialog from "./components/search-book-dialog";

export default function Books() {
    const [searchParams, setSearchParams] = useSearchParams();
    var selectedCategories = searchParams.getAll("category");
    var currentPage = parseInt(searchParams.get("page") ?? "1", 10) || 1;
    // const [currentPage, setCurrentPage] = useState(1);
    const { data: books, isLoading: isLoadingBooks } = useGetBooksQuery({
        pageNumber: currentPage,
        categoryIDs: selectedCategories,
    });
    const { data: categories } = useGetCategoriesQuery();

    function onCategoryCheck(category: Category) {
        const categoryExisted = selectedCategories.includes(category.id);
        if (categoryExisted) {
            setSearchParams({
                category: selectedCategories.filter(
                    (categoryID) => categoryID !== category.id
                ),
            });
        } else {
            setSearchParams({
                category: [...selectedCategories, category.id],
            });
        }
    }

    function onPageItemClick(page: number) {
        setSearchParams({
            category: selectedCategories,
            page: page.toString(),
        });
    }

    function goToPreviousPage() {
        const newPage = currentPage > 1 ? currentPage - 1 : currentPage;
        setSearchParams({
            category: selectedCategories,
            page: newPage.toString(),
        });
    }

    function goToNextPage() {
        const newPage =
            currentPage >= (books as PaginatedResponse<Book>).totalPages
                ? currentPage
                : currentPage + 1;
        setSearchParams({
            category: selectedCategories,
            page: newPage.toString(),
        });
    }

    return (
        <div className="px-4 pt-6 pb-20 md:flex gap-4 lg:gap-8 bg-turquoise-50 md:container">
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
                            {selectedCategories?.length > 0 ? (
                                <Button
                                    variant="ghostClient"
                                    className="flex text-base font-normal gap-1 items-center"
                                >
                                    <span>
                                        {
                                            categories?.find(
                                                (c) =>
                                                    c.id ===
                                                    selectedCategories[0]
                                            )?.category
                                        }
                                    </span>
                                    <ChevronDownIcon className="w-4" />
                                </Button>
                            ) : (
                                <Button
                                    variant="ghostClient"
                                    className="flex text-base font-normal gap-1 items-center"
                                >
                                    <span>Select categories</span>
                                    <ChevronDownIcon className="w-4" />
                                </Button>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="w-56 bg-turquoise-50"
                    >
                        {categories?.map((category) => {
                            let isCategoryChecked = selectedCategories.includes(
                                category.id
                            );
                            return (
                                <DropdownMenuCheckboxItem
                                    key={category.id}
                                    checked={isCategoryChecked}
                                    onCheckedChange={() =>
                                        onCategoryCheck(category)
                                    }
                                >
                                    {category.category}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
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
                                onClick={goToPreviousPage}
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
                                                onPageItemClick(index + 1)
                                            }
                                            className={cn(
                                                "text-lg text-black/40",
                                                {
                                                    "text-black":
                                                        currentPage ===
                                                        index + 1,
                                                }
                                            )}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                        <PaginationItem>
                            <PaginationNext href="#" onClick={goToNextPage} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
