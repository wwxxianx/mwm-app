import {
    useGetReturnedUserOrdersQuery,
    useGetUserOrdersQuery,
} from "@/apiService/userOrderApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReturnedUserOrderTable from "./components/returned-user-order-table";
import UserOrderTable from "./components/user-order-table";

export default function UserPurchases() {
    const { data: returnedUserOrders } = useGetReturnedUserOrdersQuery();
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
                        returnedUserOrders={returnedUserOrders}
                    />
                </TabsContent>
                <TabsContent value="refund">
                    <ReturnedUserOrderTable />
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
