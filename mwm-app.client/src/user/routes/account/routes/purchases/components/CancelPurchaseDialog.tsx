import { useUpdateUserOrderMutation } from "@/apiService/userOrderApi";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/types/dataType";
import { useState } from "react";

export default function CancelPurchaseDialog(props: { order: Order }) {
    const { order } = props;
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updateOrder, { isLoading: isUpdatingOrder }] =
        useUpdateUserOrderMutation();

    function onCancelOrder() {
        updateOrder({ ...order, orderID: order.id, status: "Cancelled" })
            .unwrap()
            .then((_) => {
                setIsDialogOpen(false);
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                });
            });
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger>
                <Button
                    variant={"outlineClient"}
                    onClick={() => setIsDialogOpen(true)}
                >
                    Cancel Order
                </Button>
            </DialogTrigger>
            <DialogContent onCloseDialog={() => setIsDialogOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Are you sure to cancel order?</DialogTitle>
                    <DialogDescription>
                        Please select your cancellation reason. Please take note
                        that your refund process will take 3-12 days.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={() => {}} className="space-y-6">
                    <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="default" id="r1" />
                            <Label htmlFor="r1">Change of mind</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">
                                Seller is not responsive to my inquiries
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label htmlFor="r3">Modify existing order</Label>
                        </div>
                    </RadioGroup>
                    <Button
                        variant={"clientDefault"}
                        type="button"
                        className="w-full"
                        onClick={onCancelOrder}
                    >
                        Confirm
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
