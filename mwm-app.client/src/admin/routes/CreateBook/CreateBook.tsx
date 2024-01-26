import { Button } from "@/components/ui/button";
import FileDropzone from "@/components/ui/fileDropzone";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/lib/hooks";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../../../apiService/apiService";
import { getFileDownloadUrl } from "../../../utils/getFileDownloadUrl";
import AuthorDropdownMenu from "../../components/AuthorDropdownMenu";
import CategoryDropdownMenu from "../../components/CategoryDropdownMenu";
import { BookPayload, BookValidator } from "./types";

export default function CreateBook() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createBook, { isLoading }] = useCreateBookMutation();
    const [isUploadingFile, setIsUploadingFile] = useState(false);
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
            price: null,
            series: "",
            description: "",
            sku: null,
        },
    });

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
                    {/*<FileDropzone label="Book Preview" type="file" />*/}

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
