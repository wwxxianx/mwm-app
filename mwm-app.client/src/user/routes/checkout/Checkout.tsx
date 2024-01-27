import { CreateOrderPayload } from "@/apiService/types";
import { useCreateUserOrderMutation } from "@/apiService/userOrderApi";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Input } from "@/user/components/Input";
import {
    clearSelectedCartItems,
    updateSelectedCartItemsFromLocalStorage,
} from "@/user/redux/shoppingCartSlice";
import { textUnderline } from "@/utils/classUtilities";
import {
    HomeModernIcon,
    MapPinIcon,
    PhoneIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const OrderAddressValidator = z.object({
    receiverName: z
        .string()
        .min(1, { message: "Receiver name is required" })
        .max(30, { message: "Receiver name can't exceed 30 characters" }),
    receiverEmail: z.string().optional().nullable(),
    receiverPhoneNumber: z
        .string()
        .min(1, { message: "Receiver phone number is required" }),
    stateRegion: z.string().min(1, { message: "State region is required" }),
    postcode: z.string().min(1, { message: "Postcode is required" }),
    streetAddress: z.string().min(1, { message: "Street address is required" }),
    addressUnit: z.string().optional().nullable(),
});

export type OrderAddressPayload = z.infer<typeof OrderAddressValidator>;

export const PaymentValidator = z.object({
    holder: z.string().min(1, { message: "Card holder name is required" }),
    expiryDate: z.string().min(1, { message: "Card expiry date is required" }),
    cardNumber: z.string().min(1, { message: "Card number is required" }),
    cvc: z.string().min(1, { message: "Card CVC name is required" }),
});

export type PaymentPayload = z.infer<typeof PaymentValidator>;

export default function Checkout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const addressForm = useForm<OrderAddressPayload>({
        resolver: zodResolver(OrderAddressValidator),
    });
    const paymentForm = useForm<PaymentPayload>({
        resolver: zodResolver(PaymentValidator),
    });
    const selectedCheckoutItems = useAppSelector(
        (state) => state.shoppingCart.selectedCartItems
    );
    const [createOrder, { isLoading: isCreatingOrder }] =
        useCreateUserOrderMutation();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        // When page refresh, selectedCheckoutItems state gone
        // Try to load from localStorage
        dispatch(updateSelectedCartItemsFromLocalStorage());
    }, []);

    function handleBottomActionClick() {
        if (currentStep === 3) {
            return;
        }
        if (currentStep === 1) {
            addressForm.trigger();
        }
        setCurrentStep((prev) => prev + 1);
    }

    function handleStepClick(step: number) {
        setCurrentStep(step);
    }

    function onAddressFormSubmit(data: OrderAddressPayload) {
        handleBottomActionClick();
    }

    function onPaymentFormSubmit(data: PaymentPayload) {
        handleBottomActionClick();
    }

    function handleSubmitOrder() {
        let orderPayload: CreateOrderPayload;
        orderPayload = {
            items: selectedCheckoutItems.map((cartItem) => ({
                cartID: cartItem.id,
                bookID: cartItem.book.id,
                quantity: cartItem.quantity,
            })),
            price: selectedCheckoutItems.reduce(
                (accumulator, currentItem) =>
                    accumulator + currentItem.book.price,
                0
            ),
            receiverName: addressForm.getValues("receiverName"),
            receiverPhoneNumber: addressForm.getValues("receiverPhoneNumber"),
            receiverEmail: addressForm.getValues("receiverEmail"),
            stateRegion: addressForm.getValues("stateRegion"),
            postcode: addressForm.getValues("postcode"),
            streetAddress: addressForm.getValues("streetAddress"),
            addressUnit: addressForm.getValues("addressUnit"),
        };
        // console.log(JSON.stringify(orderPayload, null, 2));
        createOrder(orderPayload)
            .unwrap()
            .then((_) => {
                dispatch(clearSelectedCartItems());
                navigate("/user/purchases", { replace: true });
            });
    }

    return (
        <div className="container flex flex-col items-center max-w-[700px] pt-20 font-playfair">
            {/* Steps */}
            <div className="flex justify-center items-center gap-1 md:gap-6 pb-12">
                <div className="flex flex-col items-center gap-3">
                    <Button
                        variant={"clientDefault"}
                        className="relative text-2xl w-[50px] h-[50px] md:h-[60px] md:w-[60px] before:content-[' '] before:border-r-[1.5px] before:border-b-[1.5px] before:w-full before:h-full before:border-black before:absolute before:translate-x-[5px] before:translate-y-[5px]"
                        onClick={() => handleStepClick(1)}
                    >
                        1
                    </Button>
                    <p className="font-medium text-sm md:text-lg text-center max-h-[10px] md:max-h-none">
                        Billing Address
                    </p>
                </div>
                <hr className="bg-black h-[1.5px] w-[40px] md:w-[100px] mb-8" />
                <div className="flex flex-col items-center gap-3">
                    <Button
                        variant={"clientDefault"}
                        className={cn(
                            "relative text-2xl w-[50px] h-[50px] md:h-[60px] md:w-[60px] before:content-[' '] before:border-r-[1.5px] before:border-b-[1.5px] before:w-full before:h-full before:border-black before:absolute before:translate-x-[5px] before:translate-y-[5px]",
                            {
                                "bg-transparent shadow-none text-black opacity-40":
                                    currentStep < 2,
                            }
                        )}
                        onClick={() => handleStepClick(2)}
                    >
                        2
                    </Button>
                    <p
                        className={cn("font-medium text-sm md:text-lg", {
                            "opacity-40": currentStep < 2,
                        })}
                    >
                        Payment
                    </p>
                </div>
                <hr className="bg-black h-[1.5px] w-[40px] md:w-[100px] mb-8" />
                <div className="flex flex-col items-center gap-3">
                    <Button
                        variant={"clientDefault"}
                        className={cn(
                            "relative text-2xl w-[50px] h-[50px] md:h-[60px] md:w-[60px] before:content-[' '] before:border-r-[1.5px] before:border-b-[1.5px] before:w-full before:h-full before:border-black before:absolute before:translate-x-[5px] before:translate-y-[5px]",
                            {
                                "bg-transparent shadow-none text-black opacity-40":
                                    currentStep !== 3,
                            }
                        )}
                        onClick={() => handleStepClick(3)}
                    >
                        3
                    </Button>
                    <p
                        className={cn("font-medium text-sm md:text-lg", {
                            "opacity-40": currentStep !== 3,
                        })}
                    >
                        Confirm
                    </p>
                </div>
            </div>

            {currentStep === 1 ? (
                <Form {...addressForm}>
                    <form
                        onSubmit={addressForm.handleSubmit(onAddressFormSubmit)}
                        className="grid grid-cols-2 gap-8 w-full"
                    >
                        <div className="col-span-2 flex justify-center items-center gap-2 translate-y-8 md:mt-6">
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
                            {currentStep !== 3 ? "Next" : "Confirm"}
                        </Button>
                    </form>
                </Form>
            ) : currentStep === 2 ? (
                <Form {...paymentForm}>
                    <form
                        onSubmit={paymentForm.handleSubmit(onPaymentFormSubmit)}
                        className="grid grid-cols-2 gap-8 w-full"
                    >
                        <p className="col-span-2 translate-y-8 font-medium text-lg">
                            We accept Debit Card only
                        </p>

                        <Input
                            label="Card holder :"
                            required
                            {...paymentForm.register("holder")}
                            error={Boolean(paymentForm.formState.errors.holder)}
                            errorMessage={
                                paymentForm.formState.errors?.holder?.message
                            }
                        />

                        <Input
                            label="Expiry date :"
                            required
                            {...paymentForm.register("expiryDate")}
                            error={Boolean(
                                paymentForm.formState.errors.expiryDate
                            )}
                            errorMessage={
                                paymentForm.formState.errors?.expiryDate
                                    ?.message
                            }
                        />
                        <Input
                            label="Debit card number :"
                            required
                            {...paymentForm.register("cardNumber")}
                            error={Boolean(
                                paymentForm.formState.errors.cardNumber
                            )}
                            errorMessage={
                                paymentForm.formState.errors?.cardNumber
                                    ?.message
                            }
                        />
                        <Input
                            label="CVC :"
                            required
                            {...paymentForm.register("cvc")}
                            error={Boolean(paymentForm.formState.errors.cvc)}
                            errorMessage={
                                paymentForm.formState.errors?.cvc?.message
                            }
                        />

                        <div className="col-span-2 ml-auto flex items-center gap-2">
                            <Button
                                variant={"ghostClient"}
                                className="text-lg py-6 px-8"
                                type="button"
                                onClick={() => setCurrentStep(1)}
                            >
                                Back
                            </Button>
                            <Button
                                variant={"clientDefault"}
                                className="text-lg py-6 px-8"
                                type="submit"
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div className="flex flex-col items-center">
                    <p
                        className={cn(
                            `font-medium pb-1 text-center font-cinzel ${textUnderline}`,
                            "before:w-[70px]"
                        )}
                    >
                        Your Items
                    </p>
                    <div className="space-y-6">
                        {selectedCheckoutItems?.map((cartItem) => {
                            return (
                                <div className="flex items-center gap-4">
                                    <img
                                        src={cartItem.book.imageUrl}
                                        alt="Book cover image"
                                        className="max-w-[80px]"
                                    />
                                    <div>
                                        <p>{cartItem.book.title}</p>
                                        <p className="text-black/60">
                                            by{" "}
                                            {cartItem.book.author.receiverName}
                                        </p>
                                    </div>
                                    <p className="mx-8">
                                        x {cartItem.quantity}
                                    </p>
                                    <p>
                                        RM{" "}
                                        {cartItem.quantity *
                                            cartItem.book.price}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <p
                        className={cn(
                            `font-medium pb-1 mt-12 text-center font-cinzel ${textUnderline}`,
                            "before:w-[100px]"
                        )}
                    >
                        Billing Address
                    </p>
                    <div className="flex flex-col items-start mt-4">
                        <div className="flex justify-start items-center gap-2">
                            <UserIcon className="w-6" />
                            <p>
                                {addressForm.getValues("receiverName")} Ngu Wei
                                Xian{" "}
                                <span className="text-black/60">
                                    ({addressForm.getValues("receiverName")})
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <PhoneIcon className="w-6 mr-auto" />
                            <p>
                                {addressForm.getValues("receiverPhoneNumber")}
                            </p>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <HomeModernIcon className="w-6" />
                            <p>
                                {addressForm.getValues("stateRegion")}
                                {addressForm.getValues("postcode")}
                                {addressForm.getValues("streetAddress")}
                                {addressForm.getValues("addressUnit")}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant={"clientDefault"}
                        onClick={handleSubmitOrder}
                    >
                        Confirm
                    </Button>
                </div>
            )}
        </div>
    );
}
