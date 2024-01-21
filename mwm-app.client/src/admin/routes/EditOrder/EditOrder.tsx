import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import FileDropzone from "@/components/ui/fileDropzone";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { authors, books, categories, orders } from "@/lib/fakeData";
import { ArrowPathIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { BookPayload, BookValidator } from "../CreateBook/types";
import {
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import { ChevronLeftIcon, Copy } from "lucide-react";
import { Order } from "../../../types/dataType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StatusChip from "../ManageOrders/components/StatusChip";

async function loader({ params }: LoaderFunctionArgs) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return orders[0];
}

export default function EditOrder() {
    const order = useLoaderData() as Order;
    const navigate = useNavigate();
    const [openAuthorDropdown, setOpenAuthorDropdown] = useState(false);
    const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
    const [authorButtonWidth, setAuthorButtonWidth] = useState(0);
    const authorButtonRef = useRef<HTMLButtonElement>(null);
    const form = useForm({
        resolver: zodResolver(BookValidator),
        defaultValues: {
            title: "",
            slug: "",
            imageUrl: "",
            previewUrl: "",
            category: "",
            author: "",
            price: null,
            series: "",
            description: "",
            sku: null,
        },
    });

    // useEffect(() => {
    //     form.setValue("title", book.title);
    //     form.setValue("author", book.author);
    //     form.setValue("slug", book.slug);
    //     form.setValue("price", book.price);
    //     form.setValue("sku", book.sku);
    //     form.setValue("category", book.category);
    //     form.setValue("description", book.description);
    //     form.setValue("imageUrl", book.imageUrl);
    //     form.setValue("previewUrl", book.previewUrl);
    // }, []);

    useEffect(() => {
        // NOTE: Set the width of dropdown menu to the same width as the trigger
        function onResize() {
            if (authorButtonRef.current) {
                setAuthorButtonWidth(authorButtonRef.current.offsetWidth);
            }
        }

        onResize();

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [authorButtonRef]);

    function onSubmit(data: BookPayload) {
        console.log(data);
    }

    function onGenerateSlug() {
        // Generate slug based on book title
        // If no book title, show snakcbar
        const bookTitle = form.getValues("title");
        if (!bookTitle) {
        } else {
            const slug = bookTitle.split(" ").join("-").toLowerCase();
            form.setValue("slug", slug);
            form.clearErrors("slug");
        }
    }

    function onNavigateBack() {
        navigate(-1);
    }

    return (
        <div>
            <Button
                variant="ghost"
                className="gap-2 px-2 pr-4"
                onClick={onNavigateBack}
            >
                <ChevronLeftIcon className="w-5" />
                Back to Orders
            </Button>
            <h2 className="text-xl font-medium mb-4">
                Edit Order{" "}
                <span className="text-slate-500 font-normal">
                    (Order id: {order.id})
                </span>
            </h2>

            <div className="space-y-[40px]">
                {/* User Section */}
                <div className="flex items-center gap-[56px]">
                    <div className="w-[316px] space-y-3">
                        <h4 className="text-slate-500">User</h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        src={order.user.profileImageUrl}
                                    />
                                    <AvatarFallback>
                                        {order.user.fullName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p>{order.user.fullName}</p>
                                    <p className="text-slate-400">
                                        {order.user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center text-slate-500">
                                <Button variant="ghost" size="sm">
                                    <EnvelopeIcon className="w-5" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Copy className="w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-slate-500">Order Status</h4>
                        <Select>
                            <SelectTrigger className="h-[44px] min-w-[180px]">
                                <StatusChip status="Processing" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="space-y-2">
                                    <SelectItem value="apple">
                                        <StatusChip status="Pending" />
                                    </SelectItem>
                                    <SelectItem value="banana">
                                        <StatusChip status="Processing" />
                                    </SelectItem>
                                    <SelectItem value="blueberry">
                                        <StatusChip status="Completed" />
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        <StatusChip status="Cancelled" />
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Address Section */}
                <div>
                    <h4 className="text-slate-500 mb-[18px]">Order Status</h4>
                    <div className="flex items-center gap-[56px]">
                        <div className="w-[316px] space-y-2">
                            <Input
                                label="State / Region"
                                defaultValue="Johor"
                            />
                            <Input
                                label="Street Address"
                                defaultValue="Johor"
                            />
                        </div>
                        <div className="w-[316px] space-y-2">
                            <Input
                                label="Postcode / ZIP"
                                defaultValue="Johor"
                            />
                            <Input
                                label="Apartment / Suit / Unit / etc. (Optional)"
                                defaultValue="Johor"
                            />
                        </div>
                    </div>
                </div>

                {/* Items Section */}
                <div>
                    <h4 className="text-slate-500 mb-[18px]">Items</h4>
                    <div className="flex items-center gap-[50px] flex-wrap">
                        {order.items?.map((item) => {
                            const subTotal =
                                Math.round(
                                    item.book.price * item.quantity * 100
                                ) / 100;
                            return (
                                <div className="flex items-center w-[320px] justify-between">
                                    <div className="flex items-center gap-[18px]">
                                        <img
                                            src={item.book.imageUrl}
                                            alt="Book's cover image"
                                            className="max-w-[55px] shadow-md"
                                        />
                                        <div>
                                            <p className="max-w-[140px] truncate text-sm">
                                                {item.book.title}
                                                asdasdasdasdasdasdasdasdadsasd
                                            </p>
                                            <p className="text-slate-500">
                                                <span>x </span>
                                                {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="text-sm">RM </span>
                                            {subTotal}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Button>Save Changes</Button>
            </div>
        </div>
    );
}

export { loader as orderLoader };
