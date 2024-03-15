import { useCreateUserAdressMutation } from "@/apiService/userProfileApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { PlusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserAddressValidator = z.object({
    receiverName: z
        .string()
        .min(1, { message: "Name is required" })
        .max(1000, { message: "Name can't exceed 1000 characters" }),
    receiverPhoneNumber: z
        .string()
        .min(1, { message: "Phone number is required" })
        .max(1000, { message: "Phone number can't exceed 1000 characters" }),
    receiverEmail: z.string().optional().nullable(),
    stateRegion: z
        .string()
        .min(1, { message: "State is required" })
        .max(100, { message: "State exceed 100 characters" }),
    postcode: z
        .string()
        .min(1, { message: "Postcode is required" })
        .max(50, { message: "Postcode can't exceed 50 characters" }),
    streetAddress: z
        .string()
        .min(1, { message: "Street address is required" })
        .max(1000, { message: "Street address can't exceed 1000 characters" }),
    addressUnit: z.string().optional().nullable(),
});

export type UserAddressPayload = z.infer<typeof UserAddressValidator> & {
    userID: number;
};

export default function NewAddressDialog() {
    const { toast } = useToast();
    const user = useAppSelector((state) => state.user.user);
    const form = useForm<UserAddressPayload>({
        resolver: zodResolver(UserAddressValidator),
    });
    const [createUserAddress, { isLoading: isCreatingUserAddress }] =
        useCreateUserAdressMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onSubmit(data: UserAddressPayload) {
        let userAddress = { ...data, userID: user ? user.id : 0 };
        createUserAddress(userAddress)
            .unwrap()
            .then((_) => {
                setIsDialogOpen(false);
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger>
                <Button
                    variant={"ghostClient"}
                    onClick={() => setIsDialogOpen(true)}
                >
                    <PlusIcon className="w-4" />
                    <span>Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <p>New Address</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-2"
                    >
                        <Input
                            label="Receiver's Full Name"
                            placeholder="Ngu Wei Xian"
                            className="col-span-2"
                            {...form.register("receiverName")}
                            error={Boolean(form.formState.errors.receiverName)}
                            errorMessage={
                                form.formState.errors.receiverName?.message
                            }
                        />
                        <Input
                            label="Phone Number"
                            placeholder="+601123781298"
                            className="col-span-2"
                            {...form.register("receiverPhoneNumber")}
                            error={Boolean(
                                form.formState.errors.receiverPhoneNumber
                            )}
                            errorMessage={
                                form.formState.errors.receiverPhoneNumber
                                    ?.message
                            }
                        />
                        <Input
                            label="Receiver's Email"
                            placeholder="receiver@gmail.com"
                            className="col-span-2"
                            {...form.register("receiverEmail")}
                        />
                        <Input
                            label="State / Region"
                            placeholder="Kuala Lumpur"
                            {...form.register("stateRegion")}
                            error={Boolean(form.formState.errors.stateRegion)}
                            errorMessage={
                                form.formState.errors.stateRegion?.message
                            }
                        />
                        <Input
                            label="Postcode / ZIP"
                            placeholder="81200"
                            {...form.register("postcode")}
                            error={Boolean(form.formState.errors.postcode)}
                            errorMessage={
                                form.formState.errors.postcode?.message
                            }
                        />
                        <Input
                            label="Street Address"
                            placeholder="Jalan Teknologi, No 19"
                            className="col-span-2"
                            {...form.register("streetAddress")}
                            error={Boolean(form.formState.errors.streetAddress)}
                            errorMessage={
                                form.formState.errors.streetAddress?.message
                            }
                        />
                        <Input
                            label="Apartment / Suit / Unit (Optional)"
                            placeholder="Block D"
                            className="col-span-2"
                            {...form.register("addressUnit")}
                        />
                        <Button
                            type="submit"
                            variant={"clientDefault"}
                            className="col-span-2 rounded-md mt-2"
                            disabled={
                                Boolean(form.formState.errors.streetAddress) ||
                                Boolean(form.formState.errors.receiverName) ||
                                Boolean(form.formState.errors.postcode) ||
                                Boolean(
                                    form.formState.errors.receiverPhoneNumber
                                ) ||
                                Boolean(form.formState.errors.stateRegion) ||
                                isCreatingUserAddress
                            }
                        >
                            Confirm
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
