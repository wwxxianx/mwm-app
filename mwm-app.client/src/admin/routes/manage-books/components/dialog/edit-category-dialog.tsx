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
import { Category } from "@/types/dataType";
import { PencilIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCategoryMutation } from "../../../../../apiService/bookApi";
import { useToast } from "../../../../../components/ui/use-toast";
import { CategoryPayload, CategoryValidator } from "../../validator";

type EditCategoryDialogProps = {
    category: Category;
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

export default function EditCategoryDialog(props: EditCategoryDialogProps) {
    const { category } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
    const form = useForm({
        resolver: zodResolver(CategoryValidator),
        defaultValues: {
            category: "",
            isTrending: false,
        },
    });

    useEffect(() => {
        if (category) {
            form.setValue("category", category.category);
            form.setValue("isTrending", Boolean(category.isTrending));
        }
    }, []);

    function onOpenDialog() {
        setIsDialogOpen(true);
    }

    function onCloseDialog() {
        setIsDialogOpen(false);
    }

    async function onSubmit(data: CategoryPayload) {
        const categoryToUpdate = {
            ...data,
            id: category.id,
        };
        updateCategory(categoryToUpdate)
            .unwrap()
            .then((_) => {
                onCloseDialog();
            })
            .catch((err) =>
                toast({
                    variant: "destructive",
                    title: `Failed to update, please try again later.`,
                })
            );
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onOpenDialog}>
                    <PencilIcon className="w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px] w-fit"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
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
                        <Button
                            className="w-fit ml-auto"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

// export { action as newAuthorAction };
