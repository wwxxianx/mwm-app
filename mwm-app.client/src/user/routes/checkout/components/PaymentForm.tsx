import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PaymentPayload, PaymentValidator } from "../validation/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/user/components/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PaymentFormProps = {
    onFormSubmit: () => void;
    onBackButtonClick: () => void;
};

export default function PaymentForm(props: PaymentFormProps) {
    const { onFormSubmit, onBackButtonClick } = props;
    const paymentForm = useForm<PaymentPayload>({
        resolver: zodResolver(PaymentValidator),
    });
    return (
        <Card className="w-full bg-white shadow-lg mt-4">
            <CardContent className="pb-6">
                <Form {...paymentForm}>
                    <form
                        onSubmit={paymentForm.handleSubmit(onFormSubmit)}
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
                                onClick={onBackButtonClick}
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
            </CardContent>
        </Card>
    );
}
