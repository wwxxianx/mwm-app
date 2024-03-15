import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8">
            <p className="font-medium text-lg">Your order has been placed!😆</p>
            <Link
                to={"/user/purchases"}
                className={buttonVariants({ variant: "clientDefault" })}
            >
                Check my order
            </Link>
        </div>
    );
}
