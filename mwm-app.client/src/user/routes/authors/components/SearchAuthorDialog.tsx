import { useGetAuthorsByNameQuery } from "@/apiService/bookApi";
import SearchDialog from "../../books/components/SearchDialog";
import { useDebouncedState } from "@/hooks/useDebounceState";
import { Link } from "react-router-dom";

export default function SearchAuthorDialog() {
    const [searchQuery, setSearchQuery] = useDebouncedState("", 500);
    const { data: authors, isLoading } = useGetAuthorsByNameQuery(searchQuery);

    return (
        <SearchDialog
            searchFieldPlaceholder="Type an author's name"
            onChange={(e) => setSearchQuery(e.target.value)}
        >
            {authors?.length ? (
                authors?.map((author) => {
                    return (
                        <Link
                            to={`/author/${author.id}`}
                            className="flex items-center gap-2 my-4 cursor-pointer hover:bg-slate-50"
                        >
                            <img
                                src={author.imageUrl}
                                alt="Author image"
                                className="max-w-[40px] md:max-w-[60px] lg:max-w-[70px] "
                            />
                            <div className="font-playfair">
                                <h3 className="text-sm font-normal">
                                    {author.fullName}
                                </h3>
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
