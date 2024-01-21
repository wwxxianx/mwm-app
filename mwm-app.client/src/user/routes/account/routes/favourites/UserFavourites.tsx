import BookCover from "@/components/ui/BookCover";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/fakeData";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default function UserFavourites() {
    return (
        <div className="pb-16 px-4 md:container md:px-0 bg-turquoise-50">
            <h5 className="text-lg font-medium">My Favourites</h5>
            <p className="text-black/60 text-sm">
                Manage your favourite books here
            </p>
            <div className="flex flex-col gap-8 mt-4 md:grid md:grid-cols-2">
                {books.map((book) => {
                    return (
                        <div className="flex gap-2 max-w-[480px] md:max-w-[none] lg:gap-6">
                            <BookCover
                                imageUrl={book.imageUrl}
                                className="min-w-[88px] h-[135px] lg:min-w-[116px] lg:min-h-[170px]"
                            />
                            <div className="flex flex-col">
                                <h3 className="font-medium line-clamp-2">
                                    {book.title}
                                </h3>
                                <h5 className="text-sm text-black/60 line-clamp-1">
                                    {book.author.fullName}
                                </h5>
                                <p className="my-3 text-xs font-medium px-2 py-1 bg-[#DCDCDC] text-[#3e3e3e] w-fit rounded-[2px] border-[1px] border-[#D6D6D6]">
                                    {book.category}
                                </p>
                                <p className="font-medium">RM {book.price}</p>
                                <p className="text-xs text-black/60">
                                    Published at 2023/07/14
                                </p>
                            </div>
                            {/* Actions */}
                            <div className="ml-auto flex flex-col gap-2">
                                <Button
                                    size={"sm"}
                                    variant={"ghostClient"}
                                    className="text-black/80"
                                >
                                    <ShoppingBagIcon className="w-5" />
                                </Button>
                                <Button
                                    size={"sm"}
                                    variant={"ghostAlert"}
                                    className="text-black/80"
                                >
                                    <TrashIcon className="w-5 text-rose-400" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
