import {
    EditOrderPayload,
    EditOrderValidator,
} from "@/admin/routes/EditOrder/EditOrder";
import Alert from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Order } from "@/types/dataType";
import { PencilIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type EditPurchaseDialogProps = {
    order: Order;
};

export default function EditPurchaseDialog(props: EditPurchaseDialogProps) {
    const { order } = props;

    const form = useForm<EditOrderPayload>({
        resolver: zodResolver(EditOrderValidator),
    });

    useEffect(() => {
        if (order) {
            form.setValue("receiverName", order.receiverName);
            form.setValue("receiverEmail", order.receiverEmail);
            form.setValue("receiverPhoneNumber", order.receiverPhoneNumber);
            form.setValue("stateRegion", order.stateRegion);
            form.setValue("status", order.status);
            form.setValue("streetAddress", order.streetAddress);
            form.setValue("postcode", order.postcode);
            form.setValue("addressUnit", order.addressUnit);
        }
    }, [order]);

    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant={"clientDefault"}
                    className="items-center gap-2"
                >
                    <PencilIcon className="w-4" />
                    <span>Edit Order</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Edit your order here</DialogTitle>
                    <DialogDescription>
                        Edit your receiver information / address below
                    </DialogDescription>
                    <div className="space-y-3">
                        <Alert severity="warning">
                            You can only edit receiver information & address for
                            your order.
                        </Alert>
                        <Alert severity="info">
                            If you want to edit your order items, you can cancel
                            your current order and place a new order, and your
                            refund will be handled accordingly.
                        </Alert>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onsubmit)}
                        className="grid grid-cols-2 gap-2"
                    >
                        <Input
                            label="Receiver Name"
                            placeholder="Ngu Wei Xian"
                            {...form.register("receiverName")}
                            error={Boolean(form.formState.errors.receiverName)}
                            errorMessage={
                                form.formState.errors.receiverName?.message
                            }
                        />
                        <Input
                            label="Phone Number"
                            placeholder="+601123781298"
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
                            label="Receiver Email (Optional)"
                            placeholder="Ngu Wei Xian"
                            className="col-span-2"
                            {...form.register("receiverEmail")}
                        />
                        <Input
                            label="State / Region"
                            {...form.register("stateRegion")}
                            error={Boolean(form.formState.errors.stateRegion)}
                            errorMessage={
                                form.formState.errors.stateRegion?.message
                            }
                        />
                        <Input
                            label="Postcode / ZIP"
                            {...form.register("postcode")}
                            error={Boolean(form.formState.errors.postcode)}
                            errorMessage={
                                form.formState.errors.postcode?.message
                            }
                        />
                        <Input
                            label="Street Address"
                            className="col-span-2"
                            {...form.register("streetAddress")}
                            error={Boolean(form.formState.errors.streetAddress)}
                            errorMessage={
                                form.formState.errors.streetAddress?.message
                            }
                        />
                        <Input
                            label="Apartment / Suit / Unit (Optional)"
                            className="col-span-2"
                            {...form.register("addressUnit")}
                        />
                        <Button
                            variant={"clientDefault"}
                            className="col-span-2 rounded-md mt-2"
                        >
                            Confirm
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
