import { ReturnedUserOrder } from "@/apiService/types";
import { useGetReturnedUserOrdersQuery } from "@/apiService/userOrderApi";
import { ScrollText, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReturnedUserOrderTable() {
    const { data: returnedUserOrders } = useGetReturnedUserOrdersQuery();
    return (
        <div className="space-y-6 bg-turquoise-50">
            {returnedUserOrders?.length ? (
                returnedUserOrders.map((order) => {
                    return (
                        <ReturnedUserOrderTableItem
                            key={order.id}
                            returnedOrder={order}
                        />
                    );
                })
            ) : (
                <p>You don't have any order that's in return</p>
            )}
        </div>
    );
}

function ReturnedUserOrderTableItem(props: {
    returnedOrder: ReturnedUserOrder;
}) {
    const { returnedOrder } = props;
    return (
        <div className="border-[1px] border-black rounded-md">
            {/* Header */}
            <div className="px-4 text-sm flex justify-between border-b-[1px] border-black py-2">
                <Link to={"/user/purchases/1"}>
                    <div className="text-black/60 flex items-center gap-1">
                        <ScrollText strokeWidth={1.5} className="w-4" />
                        <p>{returnedOrder.id} (ID)</p>
                    </div>
                </Link>
                <div className="flex items-center gap-1">
                    <ShieldX strokeWidth={1.5} className="w-4" />
                    <p>Return / Refund</p>
                </div>
            </div>

            {/* Books */}
            <div className="px-4 pb-4">
                {returnedOrder?.returnedItems?.map((item) => {
                    return (
                        <div className="flex gap-2 mt-4">
                            <Link to={`/book/${item.book.id}`} target="_blank">
                                <img
                                    src={item.book.imageUrl}
                                    alt="Book's cover image"
                                    className="max-w-[50px] shadow-md cursor-pointer hover:scale-105 transition-all"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <Link
                                    to={`/book/${item.book.id}`}
                                    target="_blank"
                                    className="text-sm font-medium"
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
        </div>
    );
}