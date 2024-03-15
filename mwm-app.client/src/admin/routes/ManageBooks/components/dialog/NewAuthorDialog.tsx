import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Author } from "@/types/dataType";
import { PencilIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    useCreateAuthorMutation,
    useUpdateAuthorMutation,
} from "../../../../../apiService/bookApi";
import FileDropzone, {
    FileState,
} from "../../../../../components/ui/fileDropzone";
import { useToast } from "../../../../../components/ui/use-toast";
import { useRevalidate } from "../../../../../hooks/useRevalide";
import { getFileDownloadUrl } from "../../../../../utils/getFileDownloadUrl";
import { AuthorPayload, AuthorValidator } from "../../types";

type NewAuthorDialogProps = {
    author?: Author;
};

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const newAdmin = Object.fromEntries(formData);
//     if (
//         !newAdmin ||
//         !newAdmin?.email ||
//         !newAdmin?.fullName ||
//         !newAdmin?.password
//     ) {
//         // Error handling
//         return null;
//     }
//     if (request.method === "PUT") {
//         // Add new admin
//         admins.push(newAdmin as Admin);
//         console.log("action finished");
//         return null;
//     } else if (request.method === "POST") {
//         // Update existing admin
//     }
// }

export default function NewAuthorDialog(props: NewAuthorDialogProps) {
    const { author } = props;
    const { toast } = useToast();
    const revalidate = useRevalidate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [createAuthor, { isLoading: isCreatingAuthor }] =
        useCreateAuthorMutation();
    const [updateAuthor, { isLoading: isUpdatingAuthor }] =
        useUpdateAuthorMutation();
    const [selectedImageFile, setSelectedImageFile] = useState<FileState>();
    const form = useForm({
        resolver: zodResolver(AuthorValidator),
        defaultValues: {
            fullName: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (author) {
            form.setValue("fullName", author.fullName);
            form.setValue("imageUrl", author.imageUrl);
        }
    }, []);

    function onOpenDialog() {
        setIsDialogOpen(true);
    }

    function onCloseDialog() {
        setIsDialogOpen(false);
    }

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

    async function onSubmit(data: AuthorPayload) {
        if (author) {
            // Update author
            let profileImageUrl = author.imageUrl;
            if (selectedImageFile?.file) {
                // Profile image changed
                setIsUploadingFile(true);
                const newProfileUrl = await getFileDownloadUrl(
                    "author-profile",
                    data.fullName,
                    selectedImageFile.file
                );
                if (!newProfileUrl) {
                    return toast({
                        variant: "destructive",
                        title: "Upload author profile image failed, please try again later.",
                    });
                }
                profileImageUrl = newProfileUrl;
                setIsUploadingFile(false);
            }
            updateAuthor({ ...data, imageUrl: profileImageUrl, id: author.id })
                .unwrap()
                .then((_) => {
                    //revalidate();
                    onCloseDialog();
                })
                .catch((err) => {
                    toast({
                        variant: "destructive",
                        title: "Update author failed, please try again later.",
                    });
                });
        } else {
            // Create new author
            setIsUploadingFile(true);
            const authorProfileUrl = await getFileDownloadUrl(
                "author-profile",
                data.fullName,
                selectedImageFile!.file!
            );
            if (!authorProfileUrl) {
                return toast({
                    variant: "destructive",
                    title: "Upload author profile image failed, please try again later.",
                });
            }
            createAuthor({ ...data, imageUrl: authorProfileUrl })
                .unwrap()
                .then((_) => {
                    setIsUploadingFile(false);
                    //revalidate();
                    onCloseDialog();
                })
                .catch((err) => {
                    toast({
                        variant: "destructive",
                        title: "Upload author failed, please try again later.",
                    });
                });
        }
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                {author ? (
                    <Button variant="ghost" size="sm" onClick={onOpenDialog}>
                        <PencilIcon className="w-4" />
                    </Button>
                ) : (
                    <Button
                        className="flex items-center gap-1 ml-auto"
                        onClick={onOpenDialog}
                    >
                        <PlusSmallIcon className="w-5" />
                        <span>Create Author</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle>{author ? "Edit" : "New"} Author</DialogTitle>
                    <DialogDescription>
                        Fill up the required author information.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 flex flex-col"
                    >
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            id="full-name"
                                            label="Full Name"
                                            placeholder="Pedro Duarte"
                                            error={Boolean(
                                                form.formState.errors.fullName
                                            )}
                                            errorMessage={
                                                form.formState.errors
                                                    .fullName &&
                                                form.formState.errors.fullName
                                                    .message
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FileDropzone
                            type={"image"}
                            label="Author Profile Image"
                            previewFileUrl={author?.imageUrl}
                            selectedFile={selectedImageFile}
                            error={Boolean(form.formState.errors.imageUrl)}
                            errorMessage={
                                form.formState.errors.imageUrl?.message
                            }
                            onDrop={onImageFileChange}
                        />
                        <Button
                            className="w-fit ml-auto"
                            isLoading={
                                isCreatingAuthor ||
                                isUpdatingAuthor ||
                                isUploadingFile
                            }
                            disabled={
                                isCreatingAuthor ||
                                isUpdatingAuthor ||
                                isUploadingFile
                            }
                        >
                            {author ? "Save Changes" : "Create"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

// export { action as newAuthorAction };
