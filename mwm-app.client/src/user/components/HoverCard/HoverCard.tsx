import { Book } from "@/types/dataType";
import BookCover from "@/components/ui/BookCover";
import { cn } from "@/lib/utils";
import "./HoverCard.scss";
import { Link } from "react-router-dom";

type HoverCardProps = {
    title: string;
    subTitle: string;
    bgImage: string;
    books: Book[];
    className?: string;
};

export default function HoverCard(props: HoverCardProps) {
    const { title, subTitle, bgImage, books, className } = props;

    return (
        <div
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
            }}
            className={cn("hover-card overflow-visible", className)}
        >
            <div className="content overflow-visible">
                <h2 className="title">{title}</h2>
                <p className="copy">{subTitle}</p>
                <p>Recommended:</p>
                <div className="flex items-center gap-4 overflow-visible">
                    {books?.map((book) => {
                        return (
                            <Link to={`/book/${book.id}`} target="_top">
                                <BookCover
                                    imageUrl={book.imageUrl}
                                    className="max-w-[90px] cursor-pointer hover:scale-105 transition-all"
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
