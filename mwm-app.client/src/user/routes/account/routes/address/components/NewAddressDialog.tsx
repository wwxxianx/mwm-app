import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function NewAddressDialog() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"ghostClient"}>
                    <PlusIcon className="w-4" />
                    <span>Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <p>New Address</p>
                <form className="grid grid-cols-2 gap-2">
                    <Input
                        label="Full Name"
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
                    <Button
                        variant={"clientDefault"}
                        className="col-span-2 rounded-md mt-2"
                    >
                        Confirm
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
