import { ReturnedOrderItem } from "@/apiService/types";
import { useCreateReturnedOrderMutation } from "@/apiService/userOrderApi";
import Alert from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Order } from "@/types/dataType";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

type RefundDialogProps = {
    order: Order;
};

export default function RefundDialog(props: RefundDialogProps) {
    const { order } = props;
    const [createReturnedUserOrder, { isLoading }] =
        useCreateReturnedOrderMutation();
    const [currentProgress, setCurrentProgress] = useState(1);
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedReturnItems, setSelectedReturnItems] = useState<
        ReturnedOrderItem[]
    >([]);

    function onSelectBook(bookId: string) {
        const bookExist = selectedReturnItems.some(
            (item) => item.bookID === bookId
        );
        if (bookExist) {
            setSelectedReturnItems((prev) =>
                prev.filter((item) => item.bookID !== bookId)
            );
        } else {
            setSelectedReturnItems((prev) => [
                ...prev,
                { bookID: bookId, quantity: 1 },
            ]);
        }
    }

    function onIncreaseItemQuantity(bookID: string) {
        setSelectedReturnItems((prev) =>
            prev.map((item) =>
                item.bookID === bookID
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function onDecreaseItemQuantity(bookID: string) {
        setSelectedReturnItems((prev) =>
            prev.map((item) =>
                item.bookID === bookID
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }

    function onSubmit() {
        console.log(selectedReturnItems);
        createReturnedUserOrder({
            orderID: order.id,
            items: selectedReturnItems,
        })
            .unwrap()
            .then((_) => {
                setIsDialogOpen(false);
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"outlineClient"}>Return / Refund</Button>
            </DialogTrigger>
            <DialogContent
                className={cn(
                    "max-w-[92%] md:max-w-[510px] flex items-center gap-10 transition-all duration-700 w-auto overflow-x-hidden",
                    {
                        "h-[240px]": currentProgress === 1,
                        "h-[500px]": currentProgress === 2,
                    }
                )}
            >
                {/* 1st Page */}
                <div
                    className={cn(
                        "min-w-[300px] md:min-w-[460px] transition-all duration-700",
                        {
                            "translate-x-[-120%] opacity-0":
                                currentProgress !== 1,
                            "translate-x-0 opacity-100": currentProgress === 1,
                        }
                    )}
                >
                    <DialogHeader>
                        <DialogTitle>Product Return and Refund</DialogTitle>
                        <DialogDescription>
                            You can raise a return/refund request when you
                            receive the product or you do not receive your
                            order.
                        </DialogDescription>
                        <Alert severity="info">
                            Please take note that refund process normally takes
                            3-12 working days
                        </Alert>
                    </DialogHeader>
                    <div className="mt-4">
                        <Button
                            variant={"clientDefault"}
                            className="flex ml-auto rounded-md"
                            onClick={() => setCurrentProgress(2)}
                        >
                            Next
                        </Button>
                    </div>
                </div>

                {/* 2nd Page */}
                <div
                    className={cn(
                        "min-w-[300px] md:min-w-[460px] h-full transition-all duration-700 flex flex-col",
                        {
                            "translate-x-[100%] opacity-0":
                                currentProgress !== 2,
                            "translate-x-[-108%] opacity-100":
                                currentProgress === 2,
                        }
                    )}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Select Books to Return / Refund
                        </DialogTitle>
                        <DialogDescription>
                            You can raise a return/refund request when you
                            receive the product or you do not receive your
                            order.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[350px] mt-4 overflow-y-scroll space-y-2 mb-2">
                        {order.items?.map((item) => {
                            const selectedItemQuantity =
                                selectedReturnItems.find(
                                    (returnItem) =>
                                        returnItem.bookID === item.book.id
                                )?.quantity ?? 1;
                            return (
                                <div
                                    className={cn(
                                        "relative flex gap-2 opacity-40 hover:opacity-100 cursor-pointer border-[1.5px] border-transparent rounded-md p-2",
                                        {
                                            "opacity-100 border-black":
                                                selectedReturnItems.some(
                                                    (returnItem) =>
                                                        returnItem.bookID ===
                                                        item.book.id
                                                ),
                                        }
                                    )}
                                    onClick={(_) => {
                                        onSelectBook(item.book.id);
                                    }}
                                >
                                    <img
                                        src={item.book.imageUrl}
                                        alt="Book cover image"
                                        className="max-w-[40px]"
                                    />

                                    <p className="font-medium text-sm line-clamp-3">
                                        {item.book.title}
                                    </p>
                                    {true && (
                                        <div className="flex gap-3 items-center ml-auto mr-3">
                                            <Button
                                                variant={"outline"}
                                                size={"icon"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDecreaseItemQuantity(
                                                        item.book.id
                                                    );
                                                }}
                                                disabled={
                                                    selectedItemQuantity <= 1
                                                }
                                            >
                                                <MinusIcon className="w-3" />
                                            </Button>
                                            <p>{selectedItemQuantity}</p>
                                            <Button
                                                variant={"outline"}
                                                size={"icon"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onIncreaseItemQuantity(
                                                        item.book.id
                                                    );
                                                }}
                                                disabled={
                                                    selectedItemQuantity >=
                                                    item.quantity
                                                }
                                            >
                                                <PlusIcon className="w-3" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex gap-2 justify-end mt-auto">
                        <Button
                            variant={"outlineClient"}
                            className="rounded-md"
                            onClick={() => setCurrentProgress(1)}
                        >
                            Back
                        </Button>
                        <Button
                            variant={"clientDefault"}
                            className="flex rounded-md"
                            disabled={selectedReturnItems?.length === 0}
                            onClick={onSubmit}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
