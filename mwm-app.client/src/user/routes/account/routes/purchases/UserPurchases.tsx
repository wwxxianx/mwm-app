import { OrderStatus } from "@/types/dataType";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { books } from "@/lib/fakeData";
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
        <div className="pb-20 px-4">
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
                    <ToShipTab />
                </TabsContent>
                <TabsContent value="toReceive">
                    <ToReceiveTab />
                </TabsContent>
                <TabsContent value="completed">
                    <CompletedTab />
                </TabsContent>
                <TabsContent value="refund">
                    <RefundTab />
                </TabsContent>
                <TabsContent value="cancelled">
                    <CancelledTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function UserOrderTable(props: { orderStatus: OrderStatus }) {
    const { orderStatus } = props;

    function RenderedHeaderStatus() {
        switch (orderStatus) {
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
        switch (orderStatus) {
            case "Pending":
            case "Processing":
                return (
                    <div className="flex items-center gap-2">
                        <CancelPurchaseDialog />
                        <EditPurchaseDialog />
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
                return (
                    <div className="flex items-center gap-2">
                        <RefundDialog />
                        <RateDialog />
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
                        <p>TP092812982 (Order id)</p>
                    </div>
                </Link>
                <div className="flex items-center gap-1">
                    <RenderedHeaderStatus />
                </div>
            </div>

            {/* Books */}
            <div className="px-4 pb-4 border-b-[1px] border-black">
                {books.slice(0, 2).map((book) => {
                    return (
                        <div className="flex gap-2 mt-4">
                            <img
                                src={book.imageUrl}
                                alt="Book's cover image"
                                className="max-w-[50px] shadow-md"
                            />
                            <div className="flex flex-col">
                                <h3 className="text-sm font-medium">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-black/60 ">
                                    by {book.author.fullName}
                                </p>
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

function ToShipTab() {
    return <UserOrderTable orderStatus="Pending" />;
}
function ToReceiveTab() {
    return <UserOrderTable orderStatus="Delivery" />;
}
function CompletedTab() {
    return <UserOrderTable orderStatus="Completed" />;
}
function RefundTab() {
    return <UserOrderTable orderStatus="Refund" />;
}
function CancelledTab() {
    return <UserOrderTable orderStatus="Cancelled" />;
}
