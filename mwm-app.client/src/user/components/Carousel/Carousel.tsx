import { Book } from "@/types/dataType";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import "./Carousel.css";
import BookCover from "@/components/ui/BookCover";
import { TopBook } from "@/admin/routes/TopThreeBooks/types";

const MAX_VISIBILITY = 3;

type CarouselCardProps = {
    onClick: () => void;
    isActive: boolean;
    imageUrl: string;
};

export function CarouselCard({
    onClick,
    isActive,
    imageUrl,
}: CarouselCardProps) {
    return (
        <div className="card w-full h-full text-justify rounded-md cursor-pointer">
            <BookCover
                imageUrl={imageUrl}
                onClick={onClick}
                className={cn({ "shadow-lg": isActive })}
            />
        </div>
    );
}

type CarouselProps = {
    items?: TopBook[];
    children?: ReactNode;
    currentActive: number;
    onCarouselItemClick: (index: number) => void;
};

export function Carousel({
    items,
    currentActive,
    onCarouselItemClick,
}: CarouselProps) {
    return (
        <div className="carousel relative w-full h-full flex items-center justify-center">
            {items?.map((item, i) => {
                return (
                    <div
                        className="card-container absolute"
                        style={{
                            //@ts-ignore
                            "--offset": (currentActive - i) / 3,
                            "--direction": Math.sign(currentActive - i),
                            "--abs-offset": Math.abs(currentActive - i) / 3,
                            opacity:
                                Math.abs(currentActive - i) >= MAX_VISIBILITY
                                    ? "0"
                                    : "1",
                            display:
                                Math.abs(currentActive - i) > MAX_VISIBILITY
                                    ? "none"
                                    : "block",
                        }}
                    >
                        <CarouselCard
                            onClick={() => onCarouselItemClick(i)}
                            isActive={currentActive === i}
                            imageUrl={item.book.imageUrl}
                        />
                    </div>
                );
            })}
        </div>
    );
}
