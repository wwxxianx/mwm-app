import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { books } from "@/lib/fakeData";
import Rating from "react-rating";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RatingFormSchema = z.object({
    title: z.string(),
    review: z.string(),
});

type RatingPayload = z.infer<typeof RatingFormSchema>;

export default function RateDialog() {
    const [selectedBookId, setSelectedBookId] = useState("");
    const form = useForm<RatingPayload>({
        resolver: zodResolver(RatingFormSchema),
    });

    function onSubmit(data: RatingPayload) {}

    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant={"clientDefault"}
                    className="items-center gap-2"
                >
                    <span>Rate</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Rating</DialogTitle>
                    <DialogDescription>
                        Select the book you would like to leave a review
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="max-h-[200px] overflow-y-scroll space-y-2">
                        {books.slice(0, 3).map((book) => {
                            return (
                                <div
                                    className={cn(
                                        "relative flex gap-2 opacity-40 hover:opacity-100 cursor-pointer border-[1.5px] border-transparent rounded-md p-2",
                                        {
                                            "opacity-100 border-black":
                                                book.id === selectedBookId,
                                        }
                                    )}
                                    onClick={(e) => setSelectedBookId(book.id)}
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
                    <Separator className="my-3" />
                    <p className="text-slate-600 text-sm font-normal mb-1">
                        Your Review
                    </p>
                    {/* @ts-ignore */}
                    <Rating
                        emptySymbol={
                            <OutlineStarIcon className="w-6 h-6 text-slate-500" />
                        }
                        fullSymbol={
                            <SolidStarIcon className="w-6 h-6 text-yellow-400" />
                        }
                        className="mb-3"
                    />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                label="Review Title"
                                                placeholder="Example: Fast delivery and good content!"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="review"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                label="Book Review"
                                                placeholder="Leave your review here"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-3">
                                <Button
                                    variant={"clientDefault"}
                                    className="w-full"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
