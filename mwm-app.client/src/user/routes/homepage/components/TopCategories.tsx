import { useGetTrendingCategoryBooksQuery } from "@/apiService/bookApi";
import EconomicsUrl from "@/assets/economics.jpg";
import FictionUrl from "@/assets/fiction.jpg";
import HistoryUrl from "@/assets/history.jpg";
import HorrorUrl from "@/assets/horror.jpg";
import NovelUrl from "@/assets/novel.jpg";
import TechnologyUrl from "@/assets/technology.jpg";
import { books } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import HoverCard from "@/user/components/HoverCard/HoverCard";
import { textUnderline } from "@/utils/classUtilities";
import { useMemo } from "react";

export default function TopCategories() {
    const { data: trendingCategoryBooks } = useGetTrendingCategoryBooksQuery();
    const topCategories = useMemo(() => {
        return [
            {
                category: "Fiction",
                subTitle:
                    "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
                books: trendingCategoryBooks?.filter(
                    (b) => b.category.category === "Fiction"
                ),
                bgImage: FictionUrl,
            },
            {
                category: "Horror",
                subTitle:
                    "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
                books: trendingCategoryBooks?.filter(
                    (b) => b.category.category === "Horror"
                ),
                bgImage: HorrorUrl,
            },
            {
                category: "Novel",
                subTitle:
                    "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
                books: trendingCategoryBooks?.filter(
                    (b) => b.category.category === "Novel"
                ),
                bgImage: NovelUrl,
            },
            {
                category: "Technology",
                subTitle:
                    "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
                books: trendingCategoryBooks?.filter(
                    (b) => b.category.category === "Technology"
                ),
                bgImage: TechnologyUrl,
            },
            {
                category: "History",
                subTitle:
                    "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
                books: trendingCategoryBooks?.filter(
                    (b) => b.category.category === "History"
                ),
                bgImage: HistoryUrl,
            },
            {
                category: "Economics",
                subTitle:
                    "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
                books: trendingCategoryBooks?.filter(
                    (b) => b.category.category === "Economics"
                ),
                bgImage: EconomicsUrl,
            },
        ];
    }, [trendingCategoryBooks]);

    return (
        <div className="container">
            <h4
                className={cn(
                    "font-cinzel text-xl md:text-2xl lg:text-3xl text-center mt-20 mb-10 pb-2 lg:pb-3",
                    textUnderline,
                    "before:w-[140px]"
                )}
            >
                Top Categories
            </h4>
            <div className="grid tablet:grid-cols-2 md:grid-cols-3 gap-4">
                {topCategories.map((category) => {
                    return (
                        <HoverCard
                            title={category.category}
                            subTitle={category.subTitle}
                            books={category.books}
                            bgImage={category.bgImage}
                        />
                    );
                })}
            </div>
        </div>
    );
}
