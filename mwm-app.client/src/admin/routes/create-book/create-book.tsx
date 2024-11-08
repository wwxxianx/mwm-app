import { Button } from "@/components/ui/button";
import FileDropzone from "@/components/ui/fileDropzone";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../../../apiService/bookApi";
import { getFileDownloadUrl } from "../../../utils/getFileDownloadUrl";
import AuthorDropdownMenu from "../../components/author-dropdown-menu";
import CategoryDropdownMenu from "../../components/category-dropdown-menu";
import { BookPayload, BookValidator } from "./types";

export default function CreateBook() {
    const form = useForm<BookPayload>({
        resolver: zodResolver(BookValidator),
        defaultValues: {
            title: "",
            slug: "",
            imageUrl: "",
            previewUrl: "",
            category: "",
            author: "",
            price: undefined,
            description: "",
            sku: undefined,
        },
    });
    const { toast } = useToast();
    const navigate = useNavigate();
    const [createBook, { isLoading, isError, error }] = useCreateBookMutation();
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState<any>(null);
    const [selectedPreviewFile, setSelectedPreviewFile] = useState<any>(null);

    function onImageFileChange(acceptedFiles: any[]) {
        const firstFile = acceptedFiles[0];
        setSelectedImageFile({
            preview: URL.createObjectURL(firstFile),
            name: firstFile.name,
            file: firstFile,
        });
        form.setValue("imageUrl", firstFile.name);
        form.clearErrors("imageUrl");
    }

    function onPreviewFileChange(acceptedFiles: any[]) {
        const firstFile = acceptedFiles[0];
        setSelectedPreviewFile({
            preview: URL.createObjectURL(firstFile),
            name: firstFile.name,
            file: firstFile,
        });
        form.setValue("previewUrl", firstFile.name);
        form.clearErrors("previewUrl");
    }

    async function onSubmit(data: BookPayload) {
        setIsUploadingFile(true);
        const imageUrl = await getFileDownloadUrl(
            "book-cover",
            data.title,
            selectedImageFile.file
        );
        const previewUrl = selectedPreviewFile
            ? await getFileDownloadUrl(
                  "book-preview",
                  data.title,
                  selectedPreviewFile.file
              )
            : undefined;
        const book = {
            ...data,
            authorId: data.author,
            categoryId: data.category,
            imageUrl: imageUrl,
            previewUrl: previewUrl,
        };
        setIsUploadingFile(false);
        createBook(book)
            .unwrap()
            .then((_) => {
                // dispatch(triggerShouldRevalidateManageBooks(true));
                navigate(-1);
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title:
                        err?.data?.errorMessage ||
                        "Something went wrong, please try again later.",
                });
            });
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

    return (
        <div>
            <h2 className="text-xl font-medium mb-4">Create a new book</h2>
            {isError && (
                <div className="flex gap-2 items-center">
                    <ExclamationCircleIcon className="text-rose-500 w-6" />
                    <p className="font-medium text-rose-700">
                        {error?.data?.errorMessage ??
                            "Something went wrong, please try again later"}
                    </p>
                </div>
            )}
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
                                <AuthorDropdownMenu
                                    value={field.value}
                                    error={Boolean(
                                        form.formState.errors.author
                                    )}
                                    errorMessage={
                                        form.formState.errors.author &&
                                        form.formState.errors.author.message
                                    }
                                    onValueChange={(value) => {
                                        form.setValue("author", value);
                                        form.clearErrors("author");
                                    }}
                                />
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
                                <CategoryDropdownMenu
                                    value={field.value}
                                    error={Boolean(
                                        form.formState.errors.category
                                    )}
                                    errorMessage={
                                        form.formState.errors.category &&
                                        form.formState.errors.category.message
                                    }
                                    onValueChange={(value) => {
                                        form.setValue("category", value);
                                        form.clearErrors("category");
                                    }}
                                />
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

                    <FileDropzone
                        label="Book Cover Image"
                        type="image"
                        required
                        onDrop={onImageFileChange}
                        selectedFile={selectedImageFile}
                        error={Boolean(form.formState.errors.imageUrl)}
                        errorMessage={
                            form.formState.errors.imageUrl &&
                            form.formState.errors.imageUrl.message
                        }
                    />

                    <FileDropzone
                        label="Book Preview File"
                        type="file"
                        onDrop={onPreviewFileChange}
                        selectedFile={selectedPreviewFile}
                    />

                    <Button
                        className="w-[200px] ml-auto col-span-full"
                        type="submit"
                        isLoading={isLoading || isUploadingFile}
                        disabled={isLoading || isUploadingFile}
                    >
                        Create
                    </Button>
                </form>
            </Form>
        </div>
    );
}
