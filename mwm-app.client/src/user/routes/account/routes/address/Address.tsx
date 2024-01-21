import { Button } from "@/components/ui/button";
import { addresses } from "@/lib/fakeData";
import { MapIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditAddressDialog from "./components/EditAddressDialog";
import NewAddressDialog from "./components/NewAddressDialog";

export default function AddressPage() {
    return (
        <div className="pb-16 px-4 md:container">
            <h5 className="md:text-lg font-medium">
                Manage your account addresses
            </h5>
            <NewAddressDialog />
            <div className="grid gap-6 md:grid-cols-2 mt-4">
                {addresses.map((address) => {
                    return (
                        <div className="border-[1.5px] border-[#3e3e3e] rounded-sm px-2 py-2 flex flex-col gap-1">
                            {address.isDefault && (
                                <p className="w-fit text-[#3e3e3e] text-xs font-medium rounded-sm px-2 py-1 bg-[#dcdcdc]">
                                    Default
                                </p>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                                <p className="pr-2 border-r border-black/40">
                                    {address.fullName}
                                </p>
                                <p>{address.phoneNumber}</p>
                            </div>
                            <div className="text-sm text-black/60">
                                <p>{address.streetAddress}</p>
                                <p>
                                    {address.postalCode} {address.state}
                                </p>
                                {address.unitAddress && (
                                    <p>{address.unitAddress}</p>
                                )}
                            </div>
                            {/* Actions */}
                            <div className="ml-auto mt-auto">
                                <EditAddressDialog />
                                <Button
                                    size={"sm"}
                                    variant={"ghostAlert"}
                                    className="items-center gap-1"
                                >
                                    <TrashIcon className="w-4" />
                                    <span>Delete</span>
                                </Button>
                                {!address.isDefault && (
                                    <Button
                                        size={"sm"}
                                        variant={"ghostClient"}
                                        className="items-center gap-1"
                                    >
                                        <MapIcon className="w-4" />
                                        <span>Set as Default</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
