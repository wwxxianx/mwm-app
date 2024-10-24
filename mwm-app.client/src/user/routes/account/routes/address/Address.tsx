import {
    useDeleteUserAddressMutation,
    useGetUserAddressesQuery,
    useUpdateDefaulUserAddressMutation,
} from "@/apiService/userProfileApi";
import { Button } from "@/components/ui/button";
import { MapIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditAddressDialog from "./components/edit-address-dialog";
import NewAddressDialog from "./components/new-address-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function AddressPage() {
    const { toast } = useToast();
    const { data: userAddresses } = useGetUserAddressesQuery();
    const [updateDefaultUserAddress, { isLoading: isUpdating }] =
        useUpdateDefaulUserAddressMutation();
    const [deleteUserAddress, { isLoading: isDeleting }] =
        useDeleteUserAddressMutation();

    function handleUpdateDefaultUserAddress(addressID: string) {
        updateDefaultUserAddress(addressID)
            .unwrap()
            .then((_) => {})
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

    function handleDeleteUserAddress(addressID: string) {
        deleteUserAddress(addressID)
            .unwrap()
            .then((_) => {})
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

    return (
        <div className="pb-16 px-4 md:container">
            <h5 className="md:text-lg font-medium">
                Manage your account addresses
            </h5>
            <NewAddressDialog />
            <div className="grid gap-6 md:grid-cols-2 mt-4">
                {userAddresses?.length ? (
                    userAddresses.map((address) => {
                        return (
                            <div className="border-[1.5px] border-[#3e3e3e] rounded-sm px-4 py-4 flex flex-col gap-1">
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
                                        {address.postcode} {address.stateRegion}
                                    </p>
                                    {address.addressUnit && (
                                        <p>{address.addressUnit}</p>
                                    )}
                                </div>
                                {/* Actions */}
                                <div className="ml-auto mt-auto">
                                    <EditAddressDialog address={address} />
                                    <Button
                                        size={"sm"}
                                        variant={"ghostAlert"}
                                        className="items-center gap-1"
                                        onClick={() =>
                                            handleDeleteUserAddress(address.id)
                                        }
                                        isLoading={isDeleting}
                                        disabled={isDeleting}
                                    >
                                        <TrashIcon className="w-4" />
                                        <span>Delete</span>
                                    </Button>
                                    {!address.isDefault && (
                                        <Button
                                            size={"sm"}
                                            variant={"ghostClient"}
                                            className="items-center gap-1"
                                            onClick={() =>
                                                handleUpdateDefaultUserAddress(
                                                    address.id
                                                )
                                            }
                                            disabled={isUpdating}
                                        >
                                            <MapIcon className="w-4" />
                                            <span>Set as Default</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>You don't have any delivery address yet...</p>
                )}
            </div>
        </div>
    );
}
