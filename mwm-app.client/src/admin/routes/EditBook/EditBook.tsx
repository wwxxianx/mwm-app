import AuthorDropdownMenu from "@/admin/components/AuthorDropdownMenu";
import CategoryDropdownMenu from "@/admin/components/CategoryDropdownMenu";
import {
    useGetBookByIdQuery,
    useUpdateBookMutation,
} from "@/apiService/bookApi";
import { Button } from "@/components/ui/button";
import FileDropzone from "@/components/ui/fileDropzone";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { books } from "@/lib/fakeData";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderFunctionArgs, useNavigate, useParams } from "react-router-dom";
import { BookPayload, BookValidator } from "../CreateBook/types";
import { getFileDownloadUrl } from "@/utils/getFileDownloadUrl";
import { useToast } from "@/components/ui/use-toast";

async function loader({ params }: LoaderFunctionArgs) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return books[0];
}

export default function EditBook() {
    const { bookID } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const { data: book } = useGetBookByIdQuery(bookID);
    const [updateBook, { isLoading: isUpdatingBook }] = useUpdateBookMutation();
    const [isUploadingImageFile, setIsUploadingImageFile] = useState(false);
    const [isUploadingPreviewFile, setIsUploadingPreviewFile] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState<any>(null);
    const [selectedPreviewFile, setSelectedPreviewFile] = useState<any>(null);
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
        if (book) {
            form.setValue("title", book.title);
            form.setValue("author", book.author.id);
            form.setValue("slug", book.slug);
            form.setValue("price", book.price);
            form.setValue("sku", book.sku);
            form.setValue("category", book.category.id);
            form.setValue("description", book.description);
            form.setValue("imageUrl", book.imageUrl);
            form.setValue("previewUrl", book.previewUrl ?? "");
        }
    }, [book]);

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

    async function onSubmit(data: BookPayload) {
        // Update cover image
        let imageUrl = book?.imageUrl;
        if (selectedImageFile?.file) {
            // Cover image changed
            setIsUploadingImageFile(true);
            const newImageUrl = await getFileDownloadUrl(
                "book-cover",
                data.title,
                selectedImageFile.file
            );
            if (!newImageUrl) {
                return toast({
                    variant: "destructive",
                    title: "Upload cover image failed, please try again later.",
                });
            }
            imageUrl = newImageUrl;
            setIsUploadingImageFile(false);
        }
        // Update preview file
        let previewUrl = book?.previewUrl;
        if (selectedPreviewFile?.file) {
            // Cover image changed
            setIsUploadingPreviewFile(true);
            const newPreviewUrl = await getFileDownloadUrl(
                "book-preview",
                data.title,
                selectedPreviewFile.file
            );
            if (!newPreviewUrl) {
                return toast({
                    variant: "destructive",
                    title: "Upload preview file failed, please try again later.",
                });
            }
            previewUrl = newPreviewUrl;
            setIsUploadingPreviewFile(false);
        }
        updateBook({
            ...data,
            id: book?.id,
            authorId: data.author,
            categoryId: data.category,
            imageUrl: imageUrl,
            previewUrl: previewUrl,
        })
            .unwrap()
            .then((_) => {
                navigate(-1);
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
            <h2 className="text-xl font-medium mb-4">Edit book</h2>
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
                        label="Image"
                        type="image"
                        previewFileUrl={book?.imageUrl}
                        onDrop={onImageFileChange}
                        selectedFile={selectedImageFile}
                    />

                    <FileDropzone label="Book Preview" type="file" />

                    <Button
                        className="w-[200px] ml-auto col-span-full"
                        type="submit"
                        isLoading={isUpdatingBook}
                        disabled={isUpdatingBook}
                    >
                        Save changes
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export { loader as bookLoader };
