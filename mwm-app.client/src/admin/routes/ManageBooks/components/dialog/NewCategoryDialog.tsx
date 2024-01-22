import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateBookCategoryMutation } from "../../../../../apiService/apiService";
import { CategoryPayload, CategoryValidator } from "../../types";

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

export default function NewCategoryDialog(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [createBookCategory] = useCreateBookCategoryMutation();
    const form = useForm({
        resolver: zodResolver(CategoryValidator),
        defaultValues: {
            category: "",
            isTrending: false,
        },
    });

    function onOpenDialog() {
        setIsDialogOpen(true);
    }

    function onCloseDialog() {
        setIsDialogOpen(false);
    }

    async function onSubmit(data: CategoryPayload) {
        await createBookCategory(data).unwrap();
        //const newAuthor = {
        //    ...data,
        //    id: "10",
        //};
        //// submit(newAdmin, { method: "put" });
        //authors.push(newAuthor);
        onCloseDialog();
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-1 ml-auto"
                    onClick={onOpenDialog}
                >
                    <PlusSmallIcon className="w-5" />
                    <span>New Category</span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px] w-fit"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle>New Category</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 flex flex-col"
                    >
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            id="category"
                                            label="Category"
                                            placeholder="Pedro Duarte"
                                            error={Boolean(
                                                form.formState.errors.category
                                            )}
                                            errorMessage={
                                                form.formState.errors
                                                    .category &&
                                                form.formState.errors.category
                                                    .message
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isTrending"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <p className="text-sm">Trending</p>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="w-fit ml-auto">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

// export { action as newAuthorAction };
