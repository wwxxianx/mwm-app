import { UserAddress } from "@/types/dataType";
import AddressDialog from "./address-dialog";
import { OrderAddressPayload } from "../validation/validator";
import { useGetUserAddressesQuery } from "@/apiService/userProfileApi";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { MapPinIcon, UserIcon } from "lucide-react";
import { Input } from "@/user/components/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CheckoutAddressFormProps = {
    addressForm: UseFormReturn<OrderAddressPayload>;
    onFormSubmit: () => void;
};

export default function CheckoutAddressForm(props: CheckoutAddressFormProps) {
    const { onFormSubmit, addressForm } = props;
    const { data: userAddresses } = useGetUserAddressesQuery();
    const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
        null
    );

    function handleSelectedAddressChanged(address: UserAddress) {
        setSelectedAddress(address);
    }

    function onAddressFormSubmit(data: OrderAddressPayload) {
        onFormSubmit();
    }

    useEffect(() => {
        // Set default address
        let defaultAddress = userAddresses?.find(
            (address) => address.isDefault
        );
        if (defaultAddress) {
            setSelectedAddress(defaultAddress);
        }
    }, [userAddresses]);

    useEffect(() => {
        // Populate address data to form
        if (selectedAddress) {
            addressForm.setValue("addressUnit", selectedAddress.addressUnit);
            addressForm.setValue("postcode", selectedAddress.postcode);
            addressForm.setValue(
                "receiverEmail",
                selectedAddress.receiverEmail
            );
            addressForm.setValue("receiverName", selectedAddress.receiverName);
            addressForm.setValue(
                "receiverPhoneNumber",
                selectedAddress.receiverPhoneNumber
            );
            addressForm.setValue("stateRegion", selectedAddress.stateRegion);
            addressForm.setValue(
                "streetAddress",
                selectedAddress.streetAddress
            );
        }
    }, [selectedAddress]);

    return (
        <Card className="w-full bg-white shadow-lg mt-4">
            <CardContent className="py-6">
                {userAddresses?.length && (
                    <AddressDialog
                        userAddresses={userAddresses}
                        selectedAddressID={selectedAddress?.id}
                        onSelectedAdderssChanged={handleSelectedAddressChanged}
                    />
                )}
                <Form {...addressForm}>
                    <form
                        onSubmit={addressForm.handleSubmit(onAddressFormSubmit)}
                        className="grid grid-cols-2 gap-8 w-full"
                    >
                        <div className="col-span-2 flex justify-center items-center gap-2 translate-y-8 ">
                            <UserIcon className="w-6" />
                            <p className="font-cinzel font-medium">
                                Personal Info
                            </p>
                        </div>

                        <Input
                            label="Full Name :"
                            required
                            {...addressForm.register("receiverName")}
                            error={Boolean(
                                addressForm.formState.errors.receiverName
                            )}
                            errorMessage={
                                addressForm.formState.errors?.receiverName
                                    ?.message
                            }
                        />

                        <Input
                            label="Email (Optional) :"
                            {...addressForm.register("receiverEmail")}
                            error={Boolean(
                                addressForm.formState.errors.receiverEmail
                            )}
                            errorMessage={
                                addressForm.formState.errors?.receiverEmail
                                    ?.message
                            }
                        />
                        <Input
                            label="Phone Number :"
                            required
                            {...addressForm.register("receiverPhoneNumber")}
                            error={Boolean(
                                addressForm.formState.errors.receiverPhoneNumber
                            )}
                            errorMessage={
                                addressForm.formState.errors
                                    ?.receiverPhoneNumber?.message
                            }
                        />

                        <div className="col-span-2 flex justify-center items-center gap-2 translate-y-8">
                            <MapPinIcon className="w-6" />
                            <p className="font-cinzel font-medium">
                                Delivery Address
                            </p>
                        </div>
                        <Input
                            label="State / Region :"
                            required
                            {...addressForm.register("stateRegion")}
                            error={Boolean(
                                addressForm.formState.errors.stateRegion
                            )}
                            errorMessage={
                                addressForm.formState.errors?.stateRegion
                                    ?.message
                            }
                        />
                        <Input
                            label="Postcode / ZIP :"
                            required
                            {...addressForm.register("postcode")}
                            error={Boolean(
                                addressForm.formState.errors.postcode
                            )}
                            errorMessage={
                                addressForm.formState.errors?.postcode?.message
                            }
                        />
                        <Input
                            label="Street Address :"
                            required
                            {...addressForm.register("streetAddress")}
                            error={Boolean(
                                addressForm.formState.errors.streetAddress
                            )}
                            errorMessage={
                                addressForm.formState.errors?.streetAddress
                                    ?.message
                            }
                            className="col-span-2"
                        />
                        <Input
                            label="Apartment / Suit / Unit / etc. (Optional) :"
                            {...addressForm.register("addressUnit")}
                            error={Boolean(
                                addressForm.formState.errors.addressUnit
                            )}
                            errorMessage={
                                addressForm.formState.errors?.addressUnit
                                    ?.message
                            }
                        />
                        <Button
                            variant={"clientDefault"}
                            className="col-span-2 text-lg py-6 px-8 ml-auto"
                            type="submit"
                        >
                            Next
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
