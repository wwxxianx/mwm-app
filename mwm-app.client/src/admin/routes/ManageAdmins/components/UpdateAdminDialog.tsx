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
import { admins } from "@/lib/fakeData";
import { PencilIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form as RouterForm, useNavigate } from "react-router-dom";
import { Admin } from "../../../../types/dataType";
import { AdminPayload, AdminValidator } from "../types";

type UpdateAdminDialogProps = {
    admin?: Admin;
    isDialogOpen: boolean;
    onOpenDialog: () => void;
    onCloseDialog: () => void;
};

export async function action({ request, params }) {
    const formData = await request.formData();
    const newAdmin = Object.fromEntries(formData);
    if (
        !newAdmin ||
        !newAdmin?.email ||
        !newAdmin?.fullName ||
        !newAdmin?.password
    ) {
        // Error handling
        return null;
    }
    if (request.method === "PUT") {
        // Add new admin
        admins.push(newAdmin as Admin);
        console.log("action finished");
        return null;
    } else if (request.method === "POST") {
        // Update existing admin
    }
}

export default function UpdateAdminDialog(props: UpdateAdminDialogProps) {
    const navigate = useNavigate();
    const { onCloseDialog, onOpenDialog, isDialogOpen, admin } = props;
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
    }, []);

    function onSubmit(data: AdminPayload) {
        if (!admin) {
            // Add new admin
            const newAdmin = {
                ...data,
                id: "10",
            };
            // submit(newAdmin, { method: "put" });
            admins.push(newAdmin);
            navigate(0, { state: { revalidate: true } });
        } else {
            // Update existing admin
            const newAdmin = {
                ...data,
                id: admin.id,
            };
            // submit(newAdmin, { method: "post" });
        }
        onCloseDialog();
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                {admin ? (
                    <Button variant="ghost" size="sm" onClick={onOpenDialog}>
                        <PencilIcon className="w-4" />
                    </Button>
                ) : (
                    <Button
                        className="flex items-center gap-1 ml-auto"
                        onClick={onOpenDialog}
                    >
                        <PlusSmallIcon className="w-5" />
                        <span>Invite new admin</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseDialog={onCloseDialog}
            >
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

                        <Button className="w-fit ml-auto">
                            {admin ? "Save Changes" : "Create"}
                        </Button>
                    </RouterForm>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export { action as updateAdminAction };
