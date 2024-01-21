import FictionUrl from "@/assets/fiction.jpg";
import HorrorUrl from "@/assets/horror.jpg";
import NovelUrl from "@/assets/novel.jpg";
import { books } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import HoverCard from "@/user/components/HoverCard/HoverCard";
import { textUnderline } from "@/utils/classUtilities";

export default function TopCategories() {
    const topCategories = [
        {
            category: "Fiction",
            subTitle:
                "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
            books: books.slice(0, 3),
            bgImage: FictionUrl,
        },
        {
            category: "Horror",
            subTitle:
                "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
            books: books.slice(0, 3),
            bgImage: HorrorUrl,
        },
        {
            category: "Novel",
            subTitle:
                "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
            books: books.slice(0, 3),
            bgImage: NovelUrl,
        },
        {
            category: "Fiction",
            subTitle:
                "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
            books: books.slice(0, 3),
            bgImage: FictionUrl,
        },
        {
            category: "Horror",
            subTitle:
                "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
            books: books.slice(0, 3),
            bgImage: HorrorUrl,
        },
        {
            category: "Novel",
            subTitle:
                "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
            books: books.slice(0, 3),
            bgImage: NovelUrl,
        },
    ];

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
