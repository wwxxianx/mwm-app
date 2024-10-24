import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchDialogProps = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchFieldPlaceholder: string;
    children: React.ReactNode;
    className?: string;
};

export default function SearchDialog(props: SearchDialogProps) {
    const { children, searchFieldPlaceholder, value, onChange, className } =
        props;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={cn(
                        "flex items-center border-b-[2px] border-black/60 opacity-60 gap-2 md:gap-4 pb-1 md:w-[360px]",
                        className
                    )}
                >
                    <MagnifyingGlassIcon className="w-4 md:w-5" />
                    <p className="text-sm md:text-base">
                        {searchFieldPlaceholder}
                    </p>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[92%] md:max-w-[600px] px-0 pt-0 rounded-lg top-[40%] md:top-[50%]">
                {/* Search Text Field */}
                <div className="flex items-center gap-2 border-b-[1px] border-border py-3 px-3">
                    <MagnifyingGlassIcon className="w-4 text-black/60" />
                    <input
                        placeholder={searchFieldPlaceholder}
                        className="bg-transparent text-xs w-full font-inter focus:outline-none"
                        onChange={onChange}
                    />
                </div>
                <div className="mt-0 px-3 max-h-[350px] md:max-h-[400px] lg:max-h-[550px] overflow-y-scroll">
                    <p className="text-xs text-group-label">Results:</p>
                    {children}
                    {/* {books.map((book) => {
                        return (
                            <Link
                                to={"/books"}
                                className="flex items-center gap-2 my-4 cursor-pointer hover:bg-slate-50"
                            >
                                <BookCover
                                    imageUrl={book.imageUrl}
                                    className="max-w-[40px] md:max-w-[60px] lg:max-w-[70px]"
                                />
                                <div className="font-playfair">
                                    <h3 className="text-sm font-normal">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-black/60">
                                        {book.author.fullName}
                                    </p>
                                </div>
                            </Link>
                        );
                    })} */}
                </div>
            </DialogContent>
        </Dialog>
    );
}
