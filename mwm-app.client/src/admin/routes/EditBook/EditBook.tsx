import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import FileDropzone from "@/components/ui/fileDropzone";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { authors, books, categories } from "@/lib/fakeData";
import { ArrowPathIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { BookPayload, BookValidator } from "../CreateBook/types";
import {
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { Book } from "../../../types/dataType";

async function loader({ params }: LoaderFunctionArgs) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return books[0];
}

export default function EditBook() {
    const book = useLoaderData() as Book;
    const navigate = useNavigate();
    const [openAuthorDropdown, setOpenAuthorDropdown] = useState(false);
    const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
    const [authorButtonWidth, setAuthorButtonWidth] = useState(0);
    const authorButtonRef = useRef<HTMLButtonElement>(null);
    const form = useForm({
        resolver: zodResolver(BookValidator),
        defaultValues: {
            title: "",
            slug: "",
            imageUrl: "",
            previewUrl: "",
            category: "",
            author: "",
            price: 0,
            series: "",
            description: "",
            sku: 0,
        },
    });

    useEffect(() => {
        form.setValue("title", book.title);
        form.setValue("author", book.author.fullName);
        form.setValue("slug", book.slug);
        form.setValue("price", book.price);
        form.setValue("sku", book.sku);
        form.setValue("category", book.category);
        form.setValue("description", book.description);
        form.setValue("imageUrl", book.imageUrl);
        form.setValue("previewUrl", book.previewUrl ?? "");
    }, []);

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

    function onSubmit(data: BookPayload) {
        console.log(data);
    }

    function onGenerateSlug() {
        // Generate slug based on book title
        // If no book title, show snakcbar
        const bookTitle = form.getValues("title");
        if (!bookTitle) {
        } else {
            const slug = bookTitle.split(" ").join("-").toLowerCase();
            form.setValue("slug", slug);
            form.clearErrors("slug");
        }
    }

    function onNavigateBack() {
        navigate(-1);
    }

    return (
        <div>
            <Button
                variant="ghost"
                className="gap-2 px-2 pr-4 mb-4"
                onClick={onNavigateBack}
            >
                <ChevronLeftIcon className="w-5" />
                Back to Books
            </Button>
            <h2 className="text-xl font-medium mb-4">Create a new book</h2>
            <h4 className="text-lg mb-2">Book info</h4>
            <Form {...form}>
                <form
                    className="grid grid-cols-2 gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Input
                        label="Book Title"
                        required
                        {...form.register("title")}
                        error={Boolean(form.formState.errors.title)}
                        errorMessage={
                            form.formState.errors.title &&
                            form.formState.errors.title.message
                        }
                    />

                    {/* Author Dropdown */}
                    <FormField
                        name="author"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
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
                                                error={Boolean(
                                                    form.formState.errors.author
                                                )}
                                                errorMessage={
                                                    form.formState.errors
                                                        .author &&
                                                    form.formState.errors.author
                                                        .message
                                                }
                                            >
                                                {field.value?.length === 0
                                                    ? "Select author..."
                                                    : field.value}
                                                <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="p-0"
                                            style={{
                                                width: `${authorButtonWidth}px`,
                                            }}
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search framework..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>
                                                    No framework found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {authors.map((author) => (
                                                        <CommandItem
                                                            key={
                                                                author.fullName
                                                            }
                                                            value={
                                                                author.fullName
                                                            }
                                                            onSelect={(
                                                                currentAuthor
                                                            ) => {
                                                                form.setValue(
                                                                    "author",
                                                                    author.fullName
                                                                );
                                                                form.clearErrors(
                                                                    "author"
                                                                );
                                                                setOpenAuthorDropdown(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {author.fullName}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Input
                        label="Slug"
                        placeholder="book-title"
                        required
                        endButton={
                            <Button
                                type="button"
                                className="whitespace-nowrap rounded-sm px-0 py-0 text-xs ring-offset-background transition-all bg-transparent h-fit w-fit font-medium text-slate-400 m-0 shadow-none hover:bg-transparent hover:text-slate-700"
                                onClick={onGenerateSlug}
                            >
                                <ArrowPathIcon className="w-3" />
                                <span>generate</span>
                            </Button>
                        }
                        {...form.register("slug")}
                        error={Boolean(form.formState.errors.slug)}
                        errorMessage={
                            form.formState.errors.slug &&
                            form.formState.errors.slug.message
                        }
                    />
                    <Input
                        type="number"
                        label="Price"
                        placeholder="99.99"
                        required
                        error={Boolean(form.formState.errors.price)}
                        errorMessage={
                            form.formState.errors.price &&
                            form.formState.errors.price.message
                        }
                        {...form.register("price", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="99"
                        label="Product SKU"
                        required
                        error={Boolean(form.formState.errors.sku)}
                        errorMessage={
                            form.formState.errors.sku &&
                            form.formState.errors.sku.message
                        }
                        {...form.register("sku", { valueAsNumber: true })}
                    />

                    {/* Category Dropdown */}
                    <FormField
                        name="category"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="w-full">
                                    <Popover
                                        open={openCategoryDropdown}
                                        onOpenChange={setOpenCategoryDropdown}
                                    >
                                        <p className="text-slate-600 text-sm font-normal mb-2">
                                            Book Category{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </p>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className="w-full justify-between text-slate-600"
                                                ref={authorButtonRef}
                                                error={Boolean(
                                                    form.formState.errors
                                                        .category
                                                )}
                                                errorMessage={
                                                    form.formState.errors
                                                        .category &&
                                                    form.formState.errors
                                                        .category.message
                                                }
                                            >
                                                {field.value?.length === 0
                                                    ? "Select category..."
                                                    : field.value}
                                                <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="p-0"
                                            style={{
                                                width: `${authorButtonWidth}px`,
                                            }}
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search framework..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>
                                                    No framework found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {categories.map(
                                                        (category) => (
                                                            <CommandItem
                                                                {...field}
                                                                key={
                                                                    category.value
                                                                }
                                                                value={
                                                                    category.value
                                                                }
                                                                onSelect={(
                                                                    currentCategory
                                                                ) => {
                                                                    form.setValue(
                                                                        "category",
                                                                        category.value
                                                                    );
                                                                    form.clearErrors(
                                                                        "category"
                                                                    );
                                                                    setOpenCategoryDropdown(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {category.label}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Textarea
                        label="Book Description"
                        className="col-span-full"
                        required
                        {...form.register("description")}
                        error={Boolean(form.formState.errors.description)}
                        errorMessage={
                            form.formState.errors.description &&
                            form.formState.errors.description.message
                        }
                    />

                    <FileDropzone label="Image" type="image" />
                    <FileDropzone label="Book Preview" type="file" />

                    <Button
                        className="w-[200px] ml-auto col-span-full"
                        type="submit"
                    >
                        Create
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export { loader as bookLoader };
