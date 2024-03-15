import { useGetAuthorsWithBooksQuery } from "@/apiService/bookApi";
import FountainPenImageUrl from "@/assets/fountain-pen.png";
import BestLiteraryImageUrl from "@/assets/malmo-arab-film-award.png";
import PenAmericaImageUrl from "@/assets/pen-america-award.png";
import BookCover from "@/components/ui/BookCover";
import { buttonVariants } from "@/components/ui/button";
import { books } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import SearchDialog from "../books/components/SearchDialog";
import SearchAuthorDialog from "./components/SearchAuthorDialog";

export default function Authors() {
    const { data: authors } = useGetAuthorsWithBooksQuery();

    return (
        <div className="font-playfair bg-turquoise-50 pb-[300px]">
            <div className="bg-[#F1EFE9] mt-6">
                <div className="flex py-6 lg:py-16 justify-between px-4 max-w-[500px] lg:max-w-none lg:container lg:justify-center lg:gap-32 mx-auto">
                    <div className="flex gap-2 lg:items-center lg:gap-12 mr-6">
                        <img
                            src={FountainPenImageUrl}
                            alt="Fountain pen image"
                            className="mix-blend-multiply max-h-[170px] lg:max-h-[356px]"
                        />

                        <div>
                            <h5 className="text-base uppercase font-bold font-cinzel lg:text-4xl lg:mt-4">
                                Book Of the year
                            </h5>
                            <h3 className="font-medium text-black/87 mt-1 text-sm lg:text-3xl lg:mt-5">
                                The Kissing Bug
                            </h3>
                            <h4 className="text-black/87 text-sm lg:text-2xl lg:mb-7">
                                by Daisy Hernández
                            </h4>

                            {/* Award Images */}
                            <div className="flex items-center gap-2">
                                <img
                                    src={PenAmericaImageUrl}
                                    className="max-w-[45px] lg:max-w-[75px]"
                                />
                                <img
                                    src={BestLiteraryImageUrl}
                                    className="max-w-[65px] lg:max-w-[95px]"
                                />
                            </div>

                            <Link
                                to={"/books"}
                                className={cn(
                                    buttonVariants({
                                        variant: "clientDefault",
                                    }),
                                    "text-xs lg:text-xl lg:py-6 lg:font-normal lg:px-10 lg:mt-8"
                                )}
                            >
                                SHOP NOW
                            </Link>
                        </div>
                    </div>

                    <BookCover
                        imageUrl="https://i.ibb.co/bRZ4h8b/The-Kissing-Bug-cropped-967x1024.jpg"
                        className="w-[110px] lg:min-w-[300px] lg:h-[400px] object-cover shadow-lg"
                    />
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <h4 className="relative lg:text-5xl lg:font-normal lg:pb-4 lg:m-10 font-cinzel text-xl pb-1 font-medium before:absolute before:left-[50%] before:bottom-0 before:content-[' '] before:border-b-[1px] before:border-black before:w-[70%] before:translate-x-[-50%]">
                    all authors
                </h4>
            </div>

            <div className="px-4 lg:px-8 mt-6 container">
                <SearchAuthorDialog />
                <div className="grid grid-cols-2 tablet:grid-cols-3 tablet-lg:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8 lg:gap-12 mt-4">
                    {authors?.map((author) => {
                        return (
                            <div>
                                <Link to={`/author/${author.id}`} target="_top">
                                    <img
                                        src={author.imageUrl}
                                        alt={`${author.fullName} image`}
                                        className="w-full aspect-square object-cover transition-all grayscale-[40%] hover:grayscale-0 hover:-translate-y-1 hover:shadow-xl"
                                    />
                                </Link>
                                <h2 className="font-medium mt-4">
                                    {author.fullName}
                                </h2>
                                {/* <p className="text-xs text-slate-500 relative pb-[2px] mt-1 before:absolute before:left-0 before:bottom-0 before:content-[' '] before:border-b-[1px] before:border-slate-500 before:w-[40%]">
                                    Recommended
                                </p> */}
                                <p className="text-xs text-slate-500 pb-1 mt-2">
                                    Recommended
                                </p>
                                <div className="grid grid-cols-3 items-center gap-2 lg:gap-4 mt-1">
                                    {author?.books?.slice(0, 3).map((book) => {
                                        return (
                                            <Link to={`/book/${book.id}`}>
                                                <BookCover
                                                    imageUrl={book.imageUrl}
                                                    className="hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
