import { CreateOrderPayload } from "@/apiService/types";
import { useCreateUserOrderMutation } from "@/apiService/userOrderApi";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import {
    clearSelectedCartItems,
    updateSelectedCartItemsFromLocalStorage,
} from "@/user/redux/shoppingCartSlice";
import { textUnderline } from "@/utils/classUtilities";
import { HomeModernIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CheckoutAddressForm from "./components/AddressForm";
import {
    OrderAddressPayload,
    OrderAddressValidator,
} from "./validation/validator";
import PaymentForm from "./components/PaymentForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Checkout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const addressForm = useForm<OrderAddressPayload>({
        resolver: zodResolver(OrderAddressValidator),
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

    function handleNextStepButtonClick() {
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

    function handleBackButtonClick() {
        setCurrentStep((prev) => prev - 1);
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
                navigate("/checkout-success", { replace: true });
            });
    }

    return (
        <div className="container flex flex-col items-center max-w-[700px] pt-10 pb-20 font-playfair">
            <Link
                to="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "self-start mb-4"
                )}
            >
                <div className="flex items-center gap-1">
                    <ChevronLeft />
                    <span>Back</span>
                </div>
            </Link>
            {/* Steps */}
            <div className="flex justify-center items-center gap-1 md:gap-6">
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
                <CheckoutAddressForm
                    addressForm={addressForm}
                    onFormSubmit={handleNextStepButtonClick}
                />
            ) : currentStep === 2 ? (
                <PaymentForm
                    onFormSubmit={handleNextStepButtonClick}
                    onBackButtonClick={handleBackButtonClick}
                />
            ) : (
                <Card className="w-full bg-white shadow-lg mt-4">
                    <CardContent className="py-6">
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
                                                    {
                                                        cartItem.book.author
                                                            .receiverName
                                                    }
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
                                        {addressForm.getValues("receiverName")}{" "}
                                        Ngu Wei Xian{" "}
                                        <span className="text-black/60">
                                            (
                                            {addressForm.getValues(
                                                "receiverName"
                                            )}
                                            )
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-start items-center gap-2">
                                    <PhoneIcon className="w-6 mr-auto" />
                                    <p>
                                        {addressForm.getValues(
                                            "receiverPhoneNumber"
                                        )}
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
                                isLoading={isCreatingOrder}
                                disabled={isCreatingOrder}
                            >
                                Confirm
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
