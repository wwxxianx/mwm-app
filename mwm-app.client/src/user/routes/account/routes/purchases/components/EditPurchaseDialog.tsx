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
import { Input } from "@/components/ui/input";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function EditPurchaseDialog() {
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
                <form className="grid grid-cols-2 gap-2">
                    <Input
                        label="Receiver Name"
                        placeholder="Ngu Wei Xian"
                        className="col-span-2"
                    />
                    <Input
                        label="Phone Number"
                        placeholder="+601123781298"
                        className="col-span-2"
                    />
                    <Input label="State / Region" />
                    <Input label="Postcode / ZIP" />
                    <Input label="Street Address" className="col-span-2" />
                    <Input
                        label="Apartment / Suit / Unit (Optional)"
                        className="col-span-2"
                    />
                    <Button variant={"clientDefault"} className="col-span-2 rounded-md mt-2">
                        Confirm
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
