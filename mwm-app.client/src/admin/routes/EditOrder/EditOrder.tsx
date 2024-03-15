import {
    useUpdateUserOrderMutation,
    userOrderApi,
} from "@/apiService/userOrderApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { store } from "@/lib/reduxStore";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, Copy } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import { z } from "zod";
import { Order, OrderStatusEnum } from "../../../types/dataType";
import StatusChip from "../ManageOrders/components/StatusChip";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { OrderAddressValidator } from "@/user/routes/checkout/validation/validator";
import { useClipboard } from "@/hooks/useClipboard";

async function loader({ params }: LoaderFunctionArgs) {
    const { orderID } = params;
    const promise = store.dispatch(
        userOrderApi.endpoints.getUserOrderByID.initiate(orderID)
    );
    const res = await promise;
    return res.data;
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return orders[0];
}

const OrderStatusValidator = z.object({
    status: OrderStatusEnum,
});
export const EditOrderValidator =
    OrderAddressValidator.merge(OrderStatusValidator);
export type EditOrderPayload = z.infer<typeof EditOrderValidator>;

export default function EditOrder() {
    const clipboard = useClipboard();
    const order = useLoaderData() as Order;
    const { toast } = useToast;
    const navigate = useNavigate();
    const form = useForm<EditOrderPayload>({
        resolver: zodResolver(EditOrderValidator),
    });
    const [updateOrder, { isLoading: isUpdatingOrder }] =
        useUpdateUserOrderMutation();

    useEffect(() => {
        if (order) {
            form.setValue("receiverName", order.receiverName);
            form.setValue("receiverEmail", order.receiverEmail);
            form.setValue("receiverPhoneNumber", order.receiverPhoneNumber);
            form.setValue("stateRegion", order.stateRegion);
            form.setValue("status", order.status);
            form.setValue("streetAddress", order.streetAddress);
            form.setValue("postcode", order.postcode);
            form.setValue("addressUnit", order.addressUnit);
        }
    }, [order]);

    function onSubmit(data: EditOrderPayload) {
        const newOrder = { ...data, orderID: order.id };
        updateOrder(newOrder)
            .unwrap()
            .then((_) => {
                navigate(-1, { replace: true });
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

    function onCopyUserEmail(email: string) {
        clipboard.copy(email);
    }

    function onNavigateBack() {
        navigate(-1);
    }

    return (
        <div>
            <Button
                variant="ghost"
                className="gap-2 px-2 pr-4"
                onClick={onNavigateBack}
            >
                <ChevronLeftIcon className="w-5" />
                Back to Orders
            </Button>
            <h2 className="text-xl font-medium mb-4">
                Edit Order{" "}
                <span className="text-slate-500 font-normal">
                    (Order id: {order.id})
                </span>
            </h2>
            {order ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-[40px]">
                            {/* User Section */}
                            <div className="flex items-center gap-[56px]">
                                <div className="w-[316px] space-y-3">
                                    <h4 className="text-slate-500">User</h4>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={
                                                        order?.user
                                                            ?.profileImageUrl
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {order?.user?.fullName?.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm">
                                                <p>{order?.user?.fullName}</p>
                                                <p className="text-slate-400">
                                                    {order?.user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-slate-500">
                                            <a
                                                href={`mailto:${order?.user?.email}`}
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                    size: "sm",
                                                })}
                                            >
                                                <EnvelopeIcon className="w-5" />
                                            </a>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    onCopyUserEmail(
                                                        order?.user
                                                            ?.email as string
                                                    )
                                                }
                                            >
                                                <Copy className="w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-slate-500">
                                        Order Status
                                    </h4>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-[44px] min-w-[180px]">
                                                            <StatusChip
                                                                status={
                                                                    field.value
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup className="space-y-2">
                                                            <SelectItem value="Pending">
                                                                <StatusChip status="Pending" />
                                                            </SelectItem>
                                                            <SelectItem value="Processing">
                                                                <StatusChip status="Processing" />
                                                            </SelectItem>
                                                            <SelectItem value="Delivery">
                                                                <StatusChip status="Delivery" />
                                                            </SelectItem>
                                                            <SelectItem value="Completed">
                                                                <StatusChip status="Completed" />
                                                            </SelectItem>
                                                            <SelectItem value="Cancelled">
                                                                <StatusChip status="Cancelled" />
                                                            </SelectItem>
                                                            <SelectItem value="Refund">
                                                                <StatusChip status="Refund" />
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Address Section */}
                            <div>
                                <h4 className="text-slate-500 mb-[18px]">
                                    Receiver Infomation
                                </h4>
                                <div className="grid grid-cols-2 items-center gap-[20px] max-w-[800px]">
                                    <Input
                                        label="Full Name"
                                        defaultValue={order.receiverName}
                                        {...form.register("receiverName")}
                                        error={Boolean(
                                            form.formState.errors.receiverName
                                        )}
                                        errorMessage={
                                            form.formState.errors.receiverName
                                                ?.message
                                        }
                                    />
                                    <Input
                                        label="Email (Optional)"
                                        defaultValue={order.receiverEmail}
                                    />
                                    <Input
                                        label="Phone Number"
                                        defaultValue={order.receiverPhoneNumber}
                                        {...form.register(
                                            "receiverPhoneNumber"
                                        )}
                                        error={Boolean(
                                            form.formState.errors
                                                .receiverPhoneNumber
                                        )}
                                        errorMessage={
                                            form.formState.errors
                                                .receiverPhoneNumber?.message
                                        }
                                    />
                                    <br />
                                    <Input
                                        label="State / Region"
                                        defaultValue={order.stateRegion}
                                        {...form.register("stateRegion")}
                                        error={Boolean(
                                            form.formState.errors.stateRegion
                                        )}
                                        errorMessage={
                                            form.formState.errors.stateRegion
                                                ?.message
                                        }
                                    />
                                    <Input
                                        label="Street Address"
                                        defaultValue={order.streetAddress}
                                        {...form.register("streetAddress")}
                                        error={Boolean(
                                            form.formState.errors.streetAddress
                                        )}
                                        errorMessage={
                                            form.formState.errors.streetAddress
                                                ?.message
                                        }
                                    />
                                    <Input
                                        label="Postcode / ZIP"
                                        defaultValue={order.postcode}
                                        {...form.register("postcode")}
                                        error={Boolean(
                                            form.formState.errors.postcode
                                        )}
                                        errorMessage={
                                            form.formState.errors.postcode
                                                ?.message
                                        }
                                    />
                                    <Input
                                        label="Apartment / Suit / Unit / etc. (Optional)"
                                        defaultValue={order.addressUnit}
                                        {...form.register("addressUnit")}
                                    />
                                </div>
                            </div>

                            {/* Items Section */}
                            <div>
                                <h4 className="text-slate-500 mb-[18px]">
                                    Items
                                </h4>
                                <div className="flex items-center gap-[50px] flex-wrap">
                                    {order?.items?.map((item) => {
                                        const subTotal =
                                            Math.round(
                                                item.book.price *
                                                    item.quantity *
                                                    100
                                            ) / 100;
                                        return (
                                            <div className="flex items-center w-[320px] justify-between">
                                                <div className="flex items-center gap-[18px]">
                                                    <img
                                                        src={item.book.imageUrl}
                                                        alt="Book's cover image"
                                                        className="max-w-[55px] shadow-md"
                                                    />
                                                    <div>
                                                        <p className="max-w-[140px] truncate text-sm">
                                                            {item.book.title}
                                                            asdasdasdasdasdasdasdasdadsasd
                                                        </p>
                                                        <p className="text-slate-500">
                                                            <span>x </span>
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>
                                                        <span className="text-sm">
                                                            RM{" "}
                                                        </span>
                                                        {subTotal}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div>helo</div>
            )}
        </div>
    );
}

export { loader as orderLoader };
