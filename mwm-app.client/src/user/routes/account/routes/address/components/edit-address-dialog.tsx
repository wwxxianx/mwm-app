import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserAddress } from "@/types/dataType";
import { PencilIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserAddressPayload, UserAddressValidator } from "../validator";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useUpdateUserAddressMutation } from "@/apiService/userProfileApi";
import { useAppSelector } from "@/lib/hooks";
import { useToast } from "@/components/ui/use-toast";

type EditAddressDialogProps = {
    address: UserAddress;
};

export default function EditAddressDialog(props: EditAddressDialogProps) {
    const { address } = props;
    const user = useAppSelector((state) => state.user.user);
    const { toast } = useToast();
    const form = useForm<UserAddressPayload>({
        resolver: zodResolver(UserAddressValidator),
    });
    const [updateUserAddress, { isLoading: isUpdating }] =
        useUpdateUserAddressMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        form.setValue("receiverName", address.receiverName);
        form.setValue("addressUnit", address.addressUnit);
        form.setValue("postcode", address.postcode);
        form.setValue("receiverEmail", address.receiverEmail);
        form.setValue("receiverPhoneNumber", address.receiverPhoneNumber);
        form.setValue("stateRegion", address.stateRegion);
        form.setValue("streetAddress", address.streetAddress);
    }, [address]);

    function onSubmit(data: UserAddressPayload) {
        let userAddress = {
            ...data,
            userID: user ? user.id : 0,
            id: address.id,
        };
        updateUserAddress(userAddress)
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    size={"sm"}
                    variant={"ghostClient"}
                    className="items-center gap-1"
                >
                    <PencilIcon className="w-4" />
                    <span>Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <p>Edit Address</p>
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
                            isLoading={isUpdating}
                            disabled={isUpdating}
                        >
                            Confirm
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
