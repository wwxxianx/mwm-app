import { Book } from "@/types/dataType";
import BookCover from "@/components/ui/BookCover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/fakeData";
import { EyeIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { LibraryBig } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import BookPreview from "./components/BookPreview";
import { store } from "@/lib/reduxStore";
import {
    api,
    useCreateUserFavouriteMutation,
    useGetUserFavouritesQuery,
} from "@/apiService/apiService";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";

async function loader({ params }) {
    const promise = store.dispatch(
        api.endpoints.getBookById.initiate(params.bookId)
    );
    const res = await promise;
    return res.data;
    return books[1];
}

export default function BookDetails() {
    const user = useAppSelector((state) => state.user.user);
    const { data: favourites } = useGetUserFavouritesQuery(user?.id);
    const [addToFavourite, { isLoading }] = useCreateUserFavouriteMutation();
    const bookData = useLoaderData() as Book;
    let isCurrentBookInFavourite = favourites?.books?.filter(
        (b) => b.id === bookData.id
    );

    async function onTriggerFavourite() {
        if (isCurrentBookInFavourite) {
        } else {
            const data = { bookId: bookData.id, userId: user?.id };
            await addToFavourite(data).unwrap();
        }
    }

    return (
        <div>
            <div className="md:border-y-[1px] border-client-primary-button md:my-4 md:grid grid-cols-2">
                <div className="md:border-r-[1px] border-client-primary-button pb-12">
                    <div className="flex flex-col gap-2 items-center max-w-[240px] mx-auto mt-10">
                        <Button
                            size="sm"
                            variant="outlineClient"
                            className={cn(
                                "aspect-square p-0 group m-0 w-fit ml-auto",
                                { "bg-black/85": isCurrentBookInFavourite }
                            )}
                            onClick={onTriggerFavourite}
                        >
                            <HeartIcon
                                className={cn(
                                    "w-5 text-client-primary-button group-hover:text-white",
                                    { "text-white": isCurrentBookInFavourite }
                                )}
                            />
                        </Button>
                        <BookCover
                            imageUrl={bookData.imageUrl}
                            className="max-w-[240px] shadow-lg"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-6 max-w-[240px] mx-auto">
                        <Button
                            variant="outlineClient"
                            className="gap-2 text-sm group w-full max-w-[240px]"
                        >
                            <ShoppingBagIcon className="w-5 text-client-primary-button group-hover:text-white" />
                            <span>Add to Cart</span>
                        </Button>
                        <BookPreview />
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
