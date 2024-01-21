import { useEffect, useRef, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useGetAuthorsQuery } from "../../apiService/apiService";

type AuthorDropdownMenuProps = {
    value?: string;
    onValueChange: (value: string) => void;
    error?: boolean;
    errorMessage?: string;
};

export default function AuthorDropdownMenu(props: AuthorDropdownMenuProps) {
    const { error, errorMessage, value, onValueChange } = props;
    const { data: authors, isLoading } = useGetAuthorsQuery();
    const [openAuthorDropdown, setOpenAuthorDropdown] = useState(false);
    const [authorButtonWidth, setAuthorButtonWidth] = useState(0);
    const authorButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // NOTE: Set the width of dropdown menu to the same width as the trigger
        function onResize() {
            if (authorButtonRef.current) {
                setAuthorButtonWidth(authorButtonRef.current.offsetWidth);
            }
        }

        onResize();

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [authorButtonRef]);

    function onSelect(value: string) {
        console.log('value passed to onSelect', value);
        onValueChange(value);
        setOpenAuthorDropdown(false);
    }

    return (
        <div className="w-full">
            <Popover
                open={openAuthorDropdown}
                onOpenChange={setOpenAuthorDropdown}
            >
                <p className="text-slate-600 text-sm font-normal mb-2">
                    Author{" "}
                    <span className="text-red-400">
                        *
                    </span>
                </p>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between text-slate-600 normal-case"
                        ref={authorButtonRef}
                        error={error}
                        errorMessage={errorMessage}
                    >
                        {value?.length === 0 ? "Select author" : authors?.find(author => author.id === value)?.fullName }
                        <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0"
                    style={{
                        width: `${authorButtonWidth}px`,
                    }}
                >
                    <Command
                        filter={(value, search) => {
                            const filteredAuthor = authors?.filter(author => author.fullName.toLowerCase().includes(search.toLowerCase()));
                            return filteredAuthor?.filter(author => author.id === value).length;
                        }}
                    >
                        <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                        />
                        <CommandEmpty>
                            No framework found.
                        </CommandEmpty>
                        <CommandGroup>
                            {authors?.map((author) => (
                                <CommandItem
                                    key={
                                        author.id
                                    }
                                    value={
                                        author.id
                                    }
                                    onSelect={onSelect}
                                >
                                    {author.fullName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}