import BookCover from "@/components/ui/BookCover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cartItems } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import {
    ArrowTopRightOnSquareIcon,
    ShoppingBagIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import {
    ArrowUpRightIcon,
    MinusIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

type HomepageCartProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

export default function HomepageCart(props: HomepageCartProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="hidden md:block ml-auto w-fit h-fit"
                >
                    <ShoppingBagIcon className="w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full overflow-scroll">
                <div className="font-playfair">
                    {/* Header */}
                    <div>
                        <p className="text-xl">
                            My Cart{" "}
                            <span className="text-black/60">
                                (Recent Items)
                            </span>
                        </p>
                        <SheetClose asChild>
                            <Link
                                to={"/cart"}
                                className="flex items-center gap-1 hover:underline mt-2"
                            >
                                <p>Vieww all items in your cart</p>
                                <ArrowUpRightIcon className="w-4" />
                            </Link>
                        </SheetClose>
                    </div>

                    {cartItems.slice(0, 3).map((cartItem) => {
                        return (
                            <div className="flex gap-2 mt-8">
                                {/* Actions */}
                                <div className="flex flex-col gap-1 justify-start items-start mt-2">
                                    <Checkbox className="mx-3 hover:bg-black/10 w-5 h-5 border-[1.5px]" />
                                    <Button size="sm" variant="ghostClient">
                                        <TrashIcon className="w-5" />
                                    </Button>
                                </div>
                                <div className="flex gap-4">
                                    <BookCover
                                        imageUrl={cartItem.item.imageUrl}
                                        className="max-w-[80px]"
                                    />
                                    <div>
                                        <h4 className="line-clamp-2">
                                            {cartItem.item.title}
                                        </h4>
                                        <p className="line-clamp-1 text-sm text-black/60">
                                            {cartItem.item.author.fullName}
                                        </p>
                                        {/* Quantity */}
                                        <div className="flex items-center gap-1 my-1">
                                            <Button
                                                size="sm"
                                                variant="ghostClient"
                                                className="px-2 py-2"
                                            >
                                                <MinusIcon className="w-4" />
                                            </Button>
                                            <span className="text-lg mb-1">
                                                {cartItem.quantity}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="ghostClient"
                                                className="px-2 py-2"
                                            >
                                                <PlusIcon className="w-4" />
                                            </Button>
                                        </div>
                                        <p>RM129</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <SheetFooter className="md:flex-col md:gap-2 md:space-x-0 md:mt-auto pt-10">
                    <div className="font-playfair flex items-center justify-between">
                        <p>0 item selected</p>
                        <p className="font-medium text-lg">RM 499</p>
                    </div>
                    <SheetClose asChild>
                        <Link
                            to={"/login"}
                            className={cn(
                                buttonVariants({
                                    variant: "clientDefault",
                                }),
                                "h-[47px] text-base font-normal"
                            )}
                        >
                            Checkout
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to={"/login"}
                            className={cn(
                                buttonVariants({
                                    variant: "outlineClient",
                                }),
                                "h-[47px] text-base font-normal rounded-none gap-2"
                            )}
                        >
                            <span>View All Items</span>
                            <ArrowTopRightOnSquareIcon className="w-5" />
                        </Link>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
