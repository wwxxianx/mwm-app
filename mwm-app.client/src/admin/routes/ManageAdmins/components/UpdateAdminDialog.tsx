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
import { useToast } from "@/components/ui/use-toast";
import { PencilIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form as RouterForm } from "react-router-dom";
import { Admin } from "../../../../types/dataType";
import { AdminPayload, AdminValidator } from "../types";
import {
    useRegisterAdminMutation,
    useUpdateAdminMutation,
} from "@/apiService/adminApi";

type UpdateAdminDialogProps = {
    admin?: Admin;
};

export default function UpdateAdminDialog(props: UpdateAdminDialogProps) {
    const { toast } = useToast();
    const [updateAdmin, { isLoading: isUpdatingAdmin }] =
        useUpdateAdminMutation();
    const [createAdmin, { isLoading: isCreatingAdmin }] =
        useRegisterAdminMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { admin } = props;
    const form = useForm({
        resolver: zodResolver(AdminValidator),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (admin) {
            form.setValue("email", admin.email);
            form.setValue("fullName", admin.fullName);
            form.setValue("password", admin.password);
        }
    }, [admin]);

    function onSubmit(data: AdminPayload) {
        if (!admin) {
            // Add new admin
            createAdmin(data)
                .unwrap()
                .then((_) => {
                    setIsDialogOpen(false);
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.data.message ?? "Something went wrong",
                        variant: "destructive",
                    });
                });
        } else {
            // Update admin
            const adminToUpdate = { ...data, id: admin.id };
            updateAdmin(adminToUpdate)
                .unwrap()
                .then((_) => {
                    setIsDialogOpen(false);
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.data.message ?? "Something went wrong",
                        variant: "destructive",
                    });
                });
        }
        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {admin ? (
                    <Button variant="ghost" size="sm">
                        <PencilIcon className="w-4" />
                    </Button>
                ) : (
                    <Button className="flex items-center gap-1 ml-auto">
                        <PlusSmallIcon className="w-5" />
                        <span>Invite new admin</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{admin ? "Edit" : "Create"} Admin</DialogTitle>
                    <DialogDescription>
                        Fill up the required credentials for admin.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <RouterForm
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
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            label="Email"
                                            placeholder="admin@gmail.com"
                                            error={Boolean(
                                                form.formState.errors.email
                                            )}
                                            errorMessage={
                                                form.formState.errors.email &&
                                                form.formState.errors.email
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            id="password"
                                            label="Password"
                                            placeholder="*********"
                                            error={Boolean(
                                                form.formState.errors.password
                                            )}
                                            errorMessage={
                                                form.formState.errors
                                                    .password &&
                                                form.formState.errors.password
                                                    .message
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            className="w-fit ml-auto"
                            isLoading={isCreatingAdmin || isUpdatingAdmin}
                            disabled={isCreatingAdmin || isUpdatingAdmin}
                        >
                            {admin ? "Save Changes" : "Create"}
                        </Button>
                    </RouterForm>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
