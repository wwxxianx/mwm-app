import BookCover from "@/components/ui/BookCover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cartItems } from "@/lib/fakeData";
import { TrashIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function Cart() {
    let isMobile = useMediaQuery("(max-width: 768px)");
    let empty = false;

    function RenderedContent() {
        const labelClassName =
            "ml-auto relative pb-1 before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-0 before:content-[' '] before:border-b-[1.5px] before:border-black before:w-[80%]";

        return isMobile ? (
            <div className="pt-6 md:pl-2 pr-4">
                {/* Fixed Footer Checkout for Mobile */}
                <div className="fixed z-[50] bottom-0 w-full flex items-center justify-end gap-2 bg-white px-3 py-3 border-y-[1.5px] border-black">
                    <p>3 items</p>
                    <p>RM 799</p>
                    <Button
                        variant="clientDefault"
                        className="drop-shadow-none ml-2 text-base rounded-none"
                        size="lg"
                    >
                        Checkout
                    </Button>
                </div>
                <div className="max-w-[450px] mx-auto">
                    <p className="ml-3 text-lg">
                        Your Shopping Cart (30 items)
                    </p>
                    {cartItems.map((cartItem) => {
                        return (
                            <div className="flex gap-1 items-start mt-6">
                                {/* Actions */}
                                <div className="flex flex-col items-start mt-2">
                                    <Checkbox className="w-5 h-5 ml-3 border-[1.5px] hover:bg-black/10" />
                                    <Button size="sm" variant="ghostAlert">
                                        <TrashIcon className="w-5" />
                                    </Button>
                                </div>
                                <BookCover
                                    imageUrl={cartItem.item.imageUrl}
                                    className="max-w-[58px]"
                                />
                                <div className="ml-1">
                                    <h3 className="text-sm">
                                        {cartItem.item.title}
                                    </h3>
                                    <h4 className="text-xs text-black/60">
                                        {cartItem.item.author.fullName}
                                    </h4>
                                    <p>RM {cartItem.item.price}</p>
                                </div>
                                {/* Quantity */}
                                <div className="flex items-center gap-1 my-1 ml-auto">
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
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : (
            <div className="container max-w-[1300px] pb-20 pt-10">
                <h5 className="font-medium text-xl mb-5">
                    Your Shopping Cart (30 items)
                </h5>
                <div className="relative container min-h-[730px] border-[1.5px] border-black pl-2">
                    {/* Content */}
                    <div className="grid grid-cols-7 font-medium py-5">
                        <div className="col-span-4 pl-14">
                            <p className="relative pb-1 before:absolute before:left-[5px] before:bottom-0 before:content-[' '] before:border-b-[1.5px] before:border-black before:w-[12%]">
                                Product Info
                            </p>
                        </div>
                        <p className={labelClassName}>Unit Price</p>
                        <p className={labelClassName}>Quantity</p>
                        <p className={labelClassName}>Subtotal</p>
                    </div>
                    <div className="space-y-8 pb-20">
                        {cartItems.map((cartItem) => {
                            return (
                                <div className="grid grid-cols-7">
                                    <div className="flex pl-2">
                                        {/* Actions */}
                                        <div className="flex flex-col items-start mt-2">
                                            <Checkbox className="w-5 h-5 ml-3 border-[1.5px] hover:bg-black/10" />
                                            <Button
                                                size="sm"
                                                variant="ghostAlert"
                                            >
                                                <TrashIcon className="w-5" />
                                            </Button>
                                        </div>

                                        <BookCover
                                            imageUrl={cartItem.item.imageUrl}
                                            className="max-w-[70px]"
                                        />
                                    </div>
                                    {/* Product Info */}
                                    <div className="col-span-3">
                                        <h3>{cartItem.item.title}</h3>
                                        <h5 className="text-black/60">
                                            {cartItem.item.author.fullName}
                                        </h5>
                                    </div>
                                    {/* Unit Price */}
                                    <p className="ml-auto">
                                        RM {cartItem.item.price}
                                    </p>
                                    {/* Quantity */}
                                    <div className="flex gap-1 ml-auto">
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
                                    {/* Subtotal */}
                                    <p className="ml-auto">RM 108</p>
                                </div>
                            );
                        })}
                    </div>
                    {/* Footer Action */}
                    <div className="absolute w-full bottom-0 left-0 flex items-center justify-end gap-2 px-3 py-3 border-t-[1.5px] border-black">
                        <p>3 items</p>
                        <p>RM 799</p>
                        <Button
                            variant="clientDefault"
                            className="drop-shadow-none ml-2 text-base rounded-none"
                            size="lg"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-turquoise-50">
            {empty ? <EmptyCart /> : <RenderedContent />}
        </div>
    );
}

function EmptyCart() {
    return <div></div>;
}
