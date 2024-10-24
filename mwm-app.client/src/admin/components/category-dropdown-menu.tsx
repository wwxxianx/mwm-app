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
import { useGetCategoriesQuery } from "../../apiService/bookApi";

type CategoryDropdownMenuProps = {
    value?: string;
    onValueChange: (value: string) => void;
    error?: boolean;
    errorMessage?: string;
};

export default function CategoryDropdownMenu(props: CategoryDropdownMenuProps) {
    const { error, errorMessage, value, onValueChange } = props;
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [triggerButtonWidth, setTriggerButtonWidth] = useState(0);
    const triggerButtonRef = useRef<HTMLButtonElement>(null);

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
                    Category <span className="text-red-400">*</span>
                </p>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between text-slate-600 normal-case"
                        ref={triggerButtonRef}
                        error={error}
                        errorMessage={errorMessage}
                    >
                        {value?.length === 0
                            ? "Select category"
                            : categories?.find(
                                  (category) => category.id === value
                              )?.category}
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
                            const filteredCategories = categories?.filter(
                                (category) =>
                                    category.category
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                            );
                            return filteredCategories?.filter(
                                (category) => category.id === value
                            ).length;
                        }}
                    >
                        <CommandInput
                            placeholder="Search book category..."
                            className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {categories?.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.id}
                                    onSelect={onSelect}
                                >
                                    {category.category}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
