import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/dataType";
import {
    Delete,
    Package,
    PackageCheck,
    ScrollText,
    ShieldX,
    Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import CancelPurchaseDialog from "./cancel-purchase-dialog";
import RateDialog from "./rate-dialog";
import RefundDialog from "./refund-dialog";
import EditPurchaseDialog from "./edit-purchase-dialog";
import { ReturnedUserOrder } from "@/apiService/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useGetBookReviewsQuery } from "@/apiService/bookApi";
import { useAppSelector } from "@/lib/hooks";

export default function UserOrderTable(props: {
    orderStatus: OrderStatus;
    orders?: Order[];
    returnedUserOrders?: ReturnedUserOrder[];
}) {
    const { orderStatus, orders, returnedUserOrders } = props;

    return (
        <div className="space-y-6 bg-turquoise-50">
            {orders?.length > 0 ? (
                orders?.map((order) => {
                    const returnedOrderItems = returnedUserOrders?.filter(
                        (returnedOrder) => returnedOrder.order.id === order.id
                    );
                    return (
                        <OrderItem
                            order={order}
                            returnedOrderItems={returnedOrderItems}
                        />
                    );
                })
            ) : (
                <p>You don't have any order that's in {orderStatus} state</p>
            )}
        </div>
    );
}

function OrderItem(props: {
    order: Order;
    returnedOrderItems: ReturnedUserOrder[] | undefined;
}) {
    const user = useAppSelector((state) => state.user.user);
    const { order, returnedOrderItems } = props;

    function RenderedHeaderStatus() {
        switch (order.status) {
            case "Pending":
            case "Processing":
                return (
                    <>
                        <Truck strokeWidth={1.5} className="w-4" />
                        <p>To Ship</p>
                    </>
                );
            case "Delivery":
                return (
                    <>
                        <Package strokeWidth={1.5} className="w-4" />
                        <p>To Receive</p>
                    </>
                );
            case "Cancelled":
                return (
                    <>
                        <Delete strokeWidth={1.5} className="w-4" />
                        <p>Cancelled</p>
                    </>
                );
            case "Completed":
                return (
                    <>
                        <PackageCheck strokeWidth={1.5} className="w-4" />
                        <p>Completed</p>
                    </>
                );
            case "Refund":
                return (
                    <>
                        <ShieldX strokeWidth={1.5} className="w-4" />
                        <p>Return / Refund</p>
                    </>
                );
        }
    }

    function RenderedActions() {
        switch (order.status) {
            case "Pending":
            case "Processing":
                return (
                    <div className="flex items-center gap-2">
                        <CancelPurchaseDialog order={order} />
                        <EditPurchaseDialog order={order} />
                    </div>
                );
            case "Delivery":
                return (
                    <Button
                        variant={"clientDefault"}
                        className="items-center gap-2"
                    >
                        <span>Confirm Receive</span>
                    </Button>
                );
            case "Completed":
                const booksToReview = order.items
                    ?.map((item) => item.book)
                    ?.filter((book) => {
                        const { data: bookReviews } = useGetBookReviewsQuery(
                            book.id
                        );
                        let isAlreadyReviewed = bookReviews?.map(
                            (review) => review.user.id === user?.id
                        )?.length;
                        return !isAlreadyReviewed;
                    });
                return (
                    <div className="flex items-center gap-2">
                        <RefundDialog order={order} />
                        <RateDialog books={booksToReview} />
                    </div>
                );
            case "Refund":
            case "Cancelled":
                return <></>;
        }
    }

    return (
        <div className="border-[1px] border-black rounded-md">
            {/* Header */}
            <div className="px-4 text-sm flex justify-between border-b-[1px] border-black py-2">
                <Link to={"/user/purchases/1"}>
                    <div className="text-black/60 flex items-center gap-1">
                        <ScrollText strokeWidth={1.5} className="w-4" />
                        <p>{order.id} (Order id)</p>
                    </div>
                </Link>
                <div className="flex items-center gap-1">
                    <RenderedHeaderStatus />
                </div>
            </div>

            {/* Books */}
            <div className="px-4 pb-4 border-b-[1px] border-black">
                {order.items?.map((item) => {
                    return (
                        <div className="flex gap-2 mt-4">
                            <Link to={`/book/${item.book.id}`} target="_blank">
                                <img
                                    src={item.book.imageUrl}
                                    alt="Book's cover image"
                                    className="max-w-[50px] shadow-md cursor-pointer hover:scale-105 hover:shadow-md transition-all"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <Link
                                    to={`/book/${item.book.id}`}
                                    className="text-sm font-medium cursor-pointer hover:underline"
                                >
                                    {item.book.title}
                                </Link>
                                {/* <p className="text-sm text-black/60 ">
                                    by {item.book.author.fullName}
                                </p> */}
                                <p className="font-medium mt-auto">
                                    <span className="font-inter text-xs">
                                        x
                                    </span>
                                    {item.quantity}
                                </p>
                            </div>
                            <p className="font-medium self-end ml-auto">
                                RM 89
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end py-4 px-4 gap-2">
                <div>
                    <p className="text-black/60 text-sm">Total:</p>
                    <p className="font-medium">RM 799</p>
                </div>
                <RenderedActions />
                {returnedOrderItems?.length > 0 && (
                    <div className="self-start space-y-2">
                        <div className="flex gap-1 items-center text-slate-600">
                            <ExclamationCircleIcon className="w-5" />
                            <p className="text-sm ">
                                Return / Refund items for this order:
                            </p>
                        </div>
                        {returnedOrderItems?.map((item) => {
                            return (
                                <div className="text-black/60 flex items-center gap-1 border-[1.5px] px-2 py-1 border-slate-300 rounded-md ">
                                    <ScrollText
                                        strokeWidth={1.5}
                                        className="w-4"
                                    />
                                    <p className="text-sm">{item.id}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
