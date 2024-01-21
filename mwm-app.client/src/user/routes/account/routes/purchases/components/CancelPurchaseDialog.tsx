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

export default function CancelPurchaseDialog() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"outlineClient"}>Cancel Order</Button>
            </DialogTrigger>
            <DialogContent>
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
                    <Button variant={"clientDefault"} type="submit" className="w-full">
                        Confirm
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
