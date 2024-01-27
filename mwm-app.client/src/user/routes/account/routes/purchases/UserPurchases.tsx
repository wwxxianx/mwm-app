import { useGetUserOrdersQuery } from "@/apiService/userOrderApi";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order, OrderStatus } from "@/types/dataType";
import {
    Delete,
    Package,
    PackageCheck,
    ScrollText,
    ShieldX,
    Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CancelPurchaseDialog from "./components/CancelPurchaseDialog";
import EditPurchaseDialog from "./components/EditPurchaseDialog";
import RateDialog from "./components/RateDialog";
import RefundDialog from "./components/RefundDialog";

export default function UserPurchases() {
    const { data: userOrders } = useGetUserOrdersQuery();
    const [tabValue, setTabValue] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) {
            setTabValue("toShip");
            return;
        }
        // NOTE: Set default tab based on URL hash#
        const hash = location.hash.split("-");
        let tab;
        if (hash.length > 1) {
            tab =
                hash[0].substring(1) +
                hash[1].charAt(0).toUpperCase() +
                hash[1].substring(1);
        } else {
            tab = hash[0].substring(1);
        }
        setTabValue(tab);
    }, []);

    return (
        <div className="pb-20 px-4 bg-turquoise-50">
            <Tabs
                defaultValue={tabValue}
                value={tabValue}
                onValueChange={(value) => {
                    setTabValue(value);
                }}
                className="overflow-hidden max-w-[900px]"
            >
                <TabsList variant={"client"}>
                    <TabsTrigger value="toShip" variant={"client"}>
                        <Link to={"#to-ship"}>To Ship</Link>
                    </TabsTrigger>
                    <TabsTrigger value="toReceive" variant={"client"}>
                        <Link to={"#to-receive"}>To Receive</Link>
                    </TabsTrigger>
                    <TabsTrigger value="completed" variant={"client"}>
                        <Link to={"#completed"}>Completed</Link>
                    </TabsTrigger>
                    <TabsTrigger value="refund" variant={"client"}>
                        <Link to={"#refund"}>Return / Refund</Link>
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" variant={"client"}>
                        <Link to={"#cancelled"}>Cancelled</Link>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="toShip">
                    <UserOrderTable
                        orderStatus="Pending"
                        orders={userOrders?.filter(
                            (order) => order.status === "Pending"
                        )}
                    />
                </TabsContent>
                <TabsContent value="toReceive">
                    <UserOrderTable
                        orderStatus="Processing"
                        orders={userOrders?.filter(
                            (order) => order.status === "Processing"
                        )}
                    />
                </TabsContent>
                <TabsContent value="completed">
                    <UserOrderTable
                        orderStatus="Completed"
                        orders={userOrders?.filter(
                            (order) => order.status === "Completed"
                        )}
                    />
                </TabsContent>
                <TabsContent value="refund">
                    <UserOrderTable
                        orderStatus="Refund"
                        orders={userOrders?.filter(
                            (order) => order.status === "Refund"
                        )}
                    />
                </TabsContent>
                <TabsContent value="cancelled">
                    <UserOrderTable
                        orderStatus="Cancelled"
                        orders={userOrders?.filter(
                            (order) => order.status === "Cancelled"
                        )}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function UserOrderTable(props: { orderStatus: OrderStatus; orders?: Order[] }) {
    const { orderStatus, orders } = props;

    return (
        <div className="space-y-6 bg-turquoise-50">
            {orders?.length > 0 ? (
                orders?.map((order) => {
                    return <OrderItem order={order} />;
                })
            ) : (
                <p>You don't have any order that's in {orderStatus} state</p>
            )}
        </div>
    );
}

function OrderItem(props: { order: Order }) {
    const { order } = props;

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
                const booksForReview = order.items?.map((item) => item.book);
                return (
                    <div className="flex items-center gap-2">
                        <RefundDialog />
                        <RateDialog book={booksForReview} />
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
                            <img
                                src={item.book.imageUrl}
                                alt="Book's cover image"
                                className="max-w-[50px] shadow-md"
                            />
                            <div className="flex flex-col">
                                <h3 className="text-sm font-medium">
                                    {item.book.title}
                                </h3>
                                {/* <p className="text-sm text-black/60 ">
                                    by {item.book.author.fullName}
                                </p> */}
                                <p className="font-medium mt-auto">
                                    <span className="font-inter text-xs">
                                        x
                                    </span>
                                    2
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
            </div>
        </div>
    );
}
