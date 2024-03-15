import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { UserAddress } from "@/types/dataType";
import { useState } from "react";

type AddressDialogProps = {
    userAddresses: UserAddress[];
    selectedAddressID?: string;
    onSelectedAdderssChanged: (userAddress: UserAddress) => void;
};

export default function AddressDialog(props: AddressDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { userAddresses, selectedAddressID, onSelectedAdderssChanged } =
        props;
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    className="self-start"
                    variant={"outlineClient"}
                    onClick={() => setIsDialogOpen(true)}
                >
                    Use another address
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>Select your delivery address</DialogHeader>
                <div className="space-y-4">
                    {userAddresses.map((address) => {
                        return (
                            <>
                                <div
                                    className={cn(
                                        "border-[1.5px] rounded-sm px-4 py-4 flex flex-col gap-1 cursor-pointer hover:border-[#3e3e3e]",
                                        {
                                            "border-[#3e3e3e]":
                                                address.id ===
                                                selectedAddressID,
                                            "border-[#3e3e3e]/20":
                                                address.id !==
                                                selectedAddressID,
                                        }
                                    )}
                                    onClick={() => {
                                        onSelectedAdderssChanged(address);
                                        setIsDialogOpen(false);
                                    }}
                                >
                                    {address.isDefault && (
                                        <p className="w-fit text-[#3e3e3e] text-xs font-medium rounded-sm px-2 py-1 bg-[#dcdcdc]">
                                            Default
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 text-sm">
                                        <p className="pr-2 border-r border-black/40">
                                            {address.receiverName}
                                        </p>
                                        <p>{address.receiverPhoneNumber}</p>
                                    </div>
                                    <div className="text-sm text-black/60">
                                        <p>{address.streetAddress}</p>
                                        <p>
                                            {address.postcode}{" "}
                                            {address.stateRegion}
                                        </p>
                                        {address.addressUnit && (
                                            <p>{address.addressUnit}</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
