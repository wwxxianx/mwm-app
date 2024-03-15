import {
    useGetAuthorByIDQuery,
    useGetBookByAuthorIDQuery,
} from "@/apiService/bookApi";
import BookDrawer from "@/user/components/BookDrawer";
import { useParams } from "react-router-dom";
import BooksSkeleton from "../books/components/BooksSkeleton";

export default function AuthorDetails() {
    const { authorID } = useParams();
    const { data: authorBooks, isLoading: isLoadingAuthorBooks } =
        useGetBookByAuthorIDQuery(authorID);
    const { data: author } = useGetAuthorByIDQuery(authorID);
    // const author = authors[1];

    return (
        <div className="bg-turquoise-50 pt-20 pb-[300px]">
            <div className="flex flex-col items-center text-center">
                <img
                    src={author?.imageUrl}
                    alt="Author image"
                    className="max-w-[300px]"
                />
                <h2 className="text-5xl my-12">{author?.fullName}</h2>
                <p className="text-xl max-w-[700px]">
                    Vitaly Dmitriyevich "Vitalik" Buterin is a Russian-Canadian
                    programmer and writer who is best known as one of the
                    co-founders of Ethereum. Buterin became involved with
                    cryptocurrency early in its inception, co-founding Bitcoin
                    Magazine in 2011.
                </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-8 mt-3 md:mt-10 px-28">
                {isLoadingAuthorBooks ? (
                    <BooksSkeleton />
                ) : authorBooks?.length ? (
                    authorBooks?.map((book) => {
                        return <BookDrawer book={book} />;
                    })
                ) : (
                    <p>Sorry, we couldn't get any book from this author yet.</p>
                )}
            </div>
        </div>
    );
}
