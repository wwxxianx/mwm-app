import { useDebouncedState } from "@/hooks/useDebounceState";
import SearchDialog from "./SearchDialog";
import { useGetBooksQuery } from "@/apiService/apiService";
import { Book } from "@/types/dataType";
import { Link } from "react-router-dom";
import BookCover from "@/components/ui/BookCover";

export default function SearchBookDialog() {
    const [searchQuery, setSearchQuery] = useDebouncedState("", 500);
    const { data: books, isLoading } = useGetBooksQuery({
        searchQuery: searchQuery,
    });

    return (
        <SearchDialog
            searchFieldPlaceholder="Type a book's title, author..."
            onChange={(e) => setSearchQuery(e.target.value)}
        >
            {(books as Book[])?.length ? (
                (books as Book[])?.map((book) => {
                    return (
                        <Link
                            to={`/book/${book.id}`}
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
                })
            ) : (
                <p>No result</p>
            )}
        </SearchDialog>
    );
}
