import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useGetBooksQuery } from "../../apiService/apiService";
import { cn } from "@/lib/utils";

type BookDropdownMenuProps = {
    label?: string;
    value?: string;
    onValueChange: (value: string) => void;
    error?: boolean;
    errorMessage?: string;
};

export default function BookDropdownMenu(props: BookDropdownMenuProps) {
    const { label, error, errorMessage, value, onValueChange } = props;
    const { data: books, isLoading } = useGetBooksQuery({});
    const [openDropdown, setOpenDropdown] = useState(false);
    const [triggerButtonWidth, setTriggerButtonWidth] = useState(0);
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    let selectedBook = books?.find((book) => book.id === value);

    useEffect(() => {
        // NOTE: Set the width of dropdown menu to the same width as the trigger
        function onResize() {
            if (triggerButtonRef.current) {
                setTriggerButtonWidth(triggerButtonRef.current.offsetWidth);
            }
        }

        onResize();

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [triggerButtonRef]);

    function onSelect(value: string) {
        onValueChange(value);
        setOpenDropdown(false);
    }

    return (
        <div className="w-full">
            <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
                <p className="text-slate-600 text-sm font-normal mb-2">
                    {label} <span className="text-red-400">*</span>
                </p>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between text-slate-600 normal-case h-fit"
                        ref={triggerButtonRef}
                        error={error}
                        errorMessage={errorMessage}
                    >
                        {value?.length === 0 ? (
                            "Select Book"
                        ) : (
                            <div className="flex gap-2">
                                <img
                                    src={selectedBook?.imageUrl}
                                    className="max-w-[50px] rounded-md"
                                />
                                <p>{selectedBook?.title}</p>
                            </div>
                        )}
                        <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0"
                    style={{
                        width: `${triggerButtonWidth}px`,
                    }}
                >
                    <Command
                        filter={(value, search) => {
                            const filteredBooks = books?.filter((book) =>
                                book.title
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            );
                            return filteredBooks?.filter(
                                (book) => book.id === value
                            ).length;
                        }}
                    >
                        <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup className="max-h-[380px] overflow-y-scroll">
                            {books?.map((book, index) => (
                                <CommandItem
                                    key={book.id}
                                    value={book.id}
                                    onSelect={onSelect}
                                    className={cn("mt-3", {
                                        "mt-0": index === 0,
                                    })}
                                >
                                    <div className="flex gap-2">
                                        <img
                                            src={book.imageUrl}
                                            alt="Book cover image"
                                            className="max-w-[50px]"
                                        />
                                        <div>
                                            <p className="line-clamp-2">
                                                {book.title}
                                            </p>
                                            <p className="text-slate-500">
                                                by {book.author.fullName}
                                            </p>
                                        </div>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
