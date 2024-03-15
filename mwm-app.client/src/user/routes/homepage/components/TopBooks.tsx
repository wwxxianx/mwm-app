import { cn } from "@/lib/utils";
import { textUnderline } from "@/utils/classUtilities";
import Medal3Url from "@/assets/medal-3.png";
import { useGetTopBooksQuery } from "@/apiService/bookApi";
import { Link } from "react-router-dom";

export default function TopBooks() {
    const { data: topBooks, isLoading } = useGetTopBooksQuery();

    return (
        <div className="bg-white pb-10 pt-4 mt-10 md:pt-12 md:pb-16 md:mt-20 lg:pt-16 lg:pb-24 lg:mt-24">
            <h4
                className={cn(
                    "font-cinzel text-xl md:text-2xl lg:text-3xl text-center pb-2 lg:pb-3",
                    textUnderline,
                    "before:w-[80px] mb-6 md:mb-16"
                )}
            >
                Top Books
            </h4>
            <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                {topBooks?.slice(0, 3).map((value, index) => {
                    return (
                        <Link
                            to={`book/${value.book.id}`}
                            className={cn(
                                { "w-full md:w-auto": index === 0 },
                                "h-auto flex justify-center hover:scale-110 transition-all"
                            )}
                        >
                            <div
                                className={cn(
                                    "relative px-4 pt-4 pb-2 space-y-1 w-min text-center flex flex-col h-full",
                                    {
                                        "bg-[#F9EFF0]": index === 0,
                                        "bg-[#EBEFFA] md:translate-y-[-20px] md:scale-105":
                                            index === 1,
                                        "bg-[#FBF4EA]": index === 2,
                                    }
                                )}
                            >
                                <img
                                    src={Medal3Url}
                                    className="mix-blend-multiply absolute max-w-[40px] top-0 left-0 translate-x-[-17px] translate-y-[-15px]"
                                />

                                <img
                                    src={value.book.imageUrl}
                                    className="max-w-[120px] md:max-w-[150px] lg:max-w-[200px]"
                                />
                                <p className="font-medium text-xs md:text-sm text-[#D2504E]">
                                    {value.book.category.category}
                                </p>
                                <h2 className="font-medium text-sm md:text-base line-clamp-2">
                                    {value.book.title}
                                </h2>
                                <h4 className="text-black/60 text-sm">
                                    by {value.book.author.fullName}
                                </h4>
                                <p
                                    className="text-black/60 text-xs md:text-sm mt-auto"
                                    style={{ marginTop: "auto" }}
                                >
                                    2,092 like this
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="container"></div>
        </div>
    );
}
