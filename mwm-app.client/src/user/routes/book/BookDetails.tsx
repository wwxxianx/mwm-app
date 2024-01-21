import { Book } from "@/types/dataType";
import BookCover from "@/components/ui/BookCover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/fakeData";
import { EyeIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { LibraryBig } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import BookPreview from "./components/BookPreview";

async function loader() {
    return books[1];
}

export default function BookDetails() {
    const bookData = useLoaderData() as Book;

    return (
        <div>
            <div className="md:border-y-[1px] border-client-primary-button md:my-4 md:grid grid-cols-2">
                <div className="md:border-r-[1px] border-client-primary-button pb-12">
                    <div className="flex justify-center">
                        <BookCover
                            imageUrl={bookData.imageUrl}
                            className="max-w-[146px] mt-12 shadow-lg"
                        />
                    </div>
                    <div className="relative flex flex-col items-center gap-2 mt-6 max-w-[240px] mx-auto">
                        <Button
                            variant="outlineClient"
                            className="gap-2 text-sm group w-full max-w-[240px]"
                        >
                            <ShoppingBagIcon className="w-5 text-client-primary-button group-hover:text-white" />
                            <span>Add to Cart</span>
                        </Button>
                        <BookPreview />
                        <Button
                            size="sm"
                            variant="outlineClient"
                            className="absolute top-0 right-0 translate-y-[-250px] aspect-square p-0 gap-2 text-sm group"
                        >
                            <HeartIcon className="w-5 text-client-primary-button group-hover:text-white" />
                        </Button>
                    </div>
                </div>

                <div className="min-w-[311px] mt-8 px-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-slate-200 text-xs">
                                        WI
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                    {bookData.author.fullName}
                                </p>
                            </div>
                        </div>
                        <h2 className="mt-1 md:mt-4 md:text-xl">
                            {bookData.title}
                        </h2>
                        <div className="flex items-center gap-1 text-sm md:text-base text-slate-600">
                            <LibraryBig className="w-4" />
                            <h3>History of Humankind</h3>
                        </div>
                        <p className="text-xs mt-3 tracking-wide text-slate-600 md:text-sm">
                            {bookData.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { loader as clientBookLoader };
