import { HTMLAttributes } from "react";
import BookCoverOverlayUrl from "@/assets/book-cover-overlay.png";
import { cn } from "@/lib/utils";

type BookCoverProps = HTMLAttributes<HTMLDivElement> & {
    imageUrl: string;
    className?: string;
};

export default function BookCover(props: BookCoverProps) {
    const { imageUrl, className, onClick } = props;

    return (
        <div className={cn("relative", className)} onClick={onClick}>
            <img
                src={BookCoverOverlayUrl}
                alt="Book cover overlay"
                className={cn(
                    "absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-sm"
                )}
            />
            <img
                src={imageUrl}
                alt="Book cover image"
                className="w-full h-full z-10 rounded-sm object-cover"
            />
        </div>
    );
}
