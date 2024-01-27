import { useUpdateUserOrderMutation } from "@/apiService/userOrderApi";
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
import { books } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function RefundDialog() {
    const [currentProgress, setCurrentProgress] = useState(1);
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updateOrder, { isLoading: isUpdatingOrder }] =
        useUpdateUserOrderMutation();


    function onBookClick(bookId: string) {
        if (selectedBookIds.includes(bookId)) {
            setSelectedBookIds((prev) => prev.filter((id) => id !== bookId));
        } else {
            setSelectedBookIds((prev) => [...prev, bookId]);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"outlineClient"}>Return / Refund</Button>
            </DialogTrigger>
            <DialogContent
                className={cn(
                    "flex items-center gap-10 transition-all duration-700 w-auto overflow-x-hidden",
                    {
                        "h-[240px]": currentProgress === 1,
                        "h-[500px]": currentProgress === 2,
                    }
                )}
            >
                {/* 1st Page */}
                <div
                    className={cn("min-w-[460px] transition-all duration-700", {
                        "translate-x-[-120%] opacity-0": currentProgress !== 1,
                        "translate-x-0 opacity-100": currentProgress === 1,
                    })}
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
                        "min-w-[460px] h-full transition-all duration-700 flex flex-col",
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
                    <div className="max-h-[350px] mt-4 overflow-y-scroll space-y-2">
                        {books.slice(0, 3).map((book) => {
                            return (
                                <div
                                    className={cn(
                                        "relative flex gap-2 opacity-40 hover:opacity-100 cursor-pointer border-[1.5px] border-transparent rounded-md p-2",
                                        {
                                            "opacity-100 border-black":
                                                selectedBookIds.includes(
                                                    book.id
                                                ),
                                        }
                                    )}
                                    onClick={(_) => onBookClick(book.id)}
                                >
                                    <img
                                        src={book.imageUrl}
                                        alt="Book cover image"
                                        className="max-w-[40px]"
                                    />
                                    <div>
                                        <p className="font-medium text-sm line-clamp-3">
                                            {book.title}
                                        </p>
                                        <p className="text-sm text-black/60">
                                            by {book.author.fullName}
                                        </p>
                                    </div>
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
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
