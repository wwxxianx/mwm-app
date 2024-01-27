import {
    useCreateBookReviewMutation,
    useGetBookReviewsQuery,
} from "@/apiService/apiService";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Book } from "@/types/dataType";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import { z } from "zod";

const RatingFormSchema = z.object({
    reviewTitle: z.string().min(1, { message: "Please provide a title" }),
    reviewDescription: z
        .string()
        .min(1, { message: "Please provide your review" }),
    rating: z.number({
        required_error: "Please provide your rate",
    }),
});

type RatingPayload = z.infer<typeof RatingFormSchema>;

type RateDialogProps = {
    label?: string;
    className?: string;
    book: Book | Book[];
};

function BookForReview(props: {
    book: Book;
    onClick: () => void;
    isActive: boolean;
}) {
    const { book, onClick, isActive } = props;
    const user = useAppSelector((state) => state.user.user);
    const { data: bookReviews } = useGetBookReviewsQuery(book.id);
    let isAlreadyReviewed = bookReviews?.map(
        (review) => review.user.id === user?.id
    )?.length;

    if (isAlreadyReviewed) return null;
    return (
        <div
            className={cn(
                "relative flex gap-2 opacity-40 hover:opacity-100 cursor-pointer border-[1.5px] border-transparent rounded-md p-2",
                {
                    "opacity-100 border-black": isActive,
                }
            )}
            onClick={onClick}
        >
            <img
                src={book.imageUrl}
                alt="Book cover image"
                className="max-w-[40px]"
            />
            <div>
                <p className="font-medium text-sm line-clamp-3">{book.title}</p>
            </div>
        </div>
    );
}

export default function RateDialog(props: RateDialogProps) {
    const { label = "Rate", className, book } = props;
    const { toast } = useToast();
    const [createBookReview, { isLoading: isCreatingReview }] =
        useCreateBookReviewMutation();
    const [selectedBookId, setSelectedBookId] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const form = useForm<RatingPayload>({
        resolver: zodResolver(RatingFormSchema),
    });

    function onRateChange(value: number) {
        form.setValue("rating", value);
        form.clearErrors("rating");
    }

    function onSubmit(data: RatingPayload) {
        createBookReview({ ...data, bookID: selectedBookId })
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

    useEffect(() => {
        if (!Array.isArray(book)) {
            setSelectedBookId(book.id);
        }
    }, []);

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger>
                <Button
                    variant={"clientDefault"}
                    className={cn("items-center gap-2", className)}
                    onClick={() => setIsDialogOpen(true)}
                >
                    <span>{label}</span>
                </Button>
            </DialogTrigger>
            <DialogContent onCloseDialog={() => setIsDialogOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Book Rating</DialogTitle>
                    <DialogDescription>
                        {Array.isArray(book)
                            ? "Select the book you would like to leave a review"
                            : "Leave your review for this book"}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div
                        className={cn("max-h-[200px] space-y-2", {
                            "overflow-y-scroll": Array.isArray(book),
                        })}
                    >
                        {Array.isArray(book) ? (
                            book.map((book) => {
                                return (
                                    <BookForReview
                                        book={book}
                                        onClick={() =>
                                            setSelectedBookId(book.id)
                                        }
                                        isActive={book.id === selectedBookId}
                                    />
                                    // <div
                                    //     className={cn(
                                    //         "relative flex gap-2 opacity-40 hover:opacity-100 cursor-pointer border-[1.5px] border-transparent rounded-md p-2",
                                    //         {
                                    //             "opacity-100 border-black":
                                    //                 book.id === selectedBookId,
                                    //         }
                                    //     )}
                                    //     onClick={(e) =>
                                    //         setSelectedBookId(book.id)
                                    //     }
                                    // >
                                    //     <img
                                    //         src={book.imageUrl}
                                    //         alt="Book cover image"
                                    //         className="max-w-[40px]"
                                    //     />
                                    //     <div>
                                    //         <p className="font-medium text-sm line-clamp-3">
                                    //             {book.title}
                                    //         </p>
                                    //     </div>
                                    // </div>
                                );
                            })
                        ) : (
                            <div
                                className={cn(
                                    "relative flex gap-2 opacity-100 border-[1.5px] border-black rounded-md p-2"
                                )}
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
                        )}
                    </div>
                    <Separator className="my-3" />
                    <p className="text-slate-600 text-sm font-normal mb-1">
                        Your Review
                    </p>
                    {/* @ts-ignore */}
                    <div className="flex gap-2">
                        <Rating
                            emptySymbol={
                                <OutlineStarIcon
                                    className={cn("w-6 h-6 text-slate-500", {
                                        "text-rose-500":
                                            form.formState.errors.rate,
                                    })}
                                />
                            }
                            fullSymbol={
                                <SolidStarIcon className="w-6 h-6 text-yellow-400" />
                            }
                            className="mb-3"
                            onChange={onRateChange}
                            initialRating={form.getValues("rating")}
                        />
                        {form.formState.errors.rate && (
                            <p className="text-sm text-rose-500 translate-y-1">
                                Please provide rate
                            </p>
                        )}
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="reviewTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                label="Review Title"
                                                placeholder="Example: Fast delivery and good content!"
                                                {...field}
                                                error={Boolean(
                                                    form.formState.errors
                                                        .reviewTitle
                                                )}
                                                errorMessage={
                                                    form.formState.errors
                                                        .reviewTitle?.message
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reviewDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                label="Book Review"
                                                placeholder="Leave your review here"
                                                {...field}
                                                error={Boolean(
                                                    form.formState.errors
                                                        .reviewDescription
                                                )}
                                                errorMessage={
                                                    form.formState.errors
                                                        .reviewDescription
                                                        ?.message
                                                }
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
