import { Button } from "@/components/ui/button";
import { addresses, books } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import {
    ClipboardDocumentCheckIcon,
    TruckIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeft, PackageCheck, ScrollText } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type TimelineItemProps = {
    Icon: React.ElementType;
    title: string;
    time: string;
    first?: boolean;
    isActive?: boolean;
};

function TimelineItem(props: TimelineItemProps) {
    const { Icon, title, time, first, isActive } = props;

    return (
        <div className={cn("flex md:gap-2", { "opacity-40": !isActive })}>
            {!first && <hr className="h-[3px] w-14 md:w-20 bg-[#494949] mt-5" />}
            <div className="flex flex-col items-center">
                <div className="rounded-full border-[1.5px] border-black p-2 w-max">
                    <Icon className="w-5 md:w-6" />
                </div>
                <p className="text-xs line-clamp-1 md:text-base">{title}</p>
                <p className="font-inter font-medium text-black/60 text-xs md:text-sm">
                    {time}
                </p>
            </div>
        </div>
    );
}

export default function PurchaseDetails() {
    const navigate = useNavigate();

    function navigateBack() {
        navigate(-1);
    }

    return (
        <div className="mb-20">
            <Button
                variant={"ghostClient"}
                onClick={navigateBack}
                className="mb-5 ml-2"
            >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
            </Button>

            <div className="flex items-center mb-5 ml-3">
                <TimelineItem
                    Icon={ClipboardDocumentCheckIcon}
                    title="Order Placed"
                    time="12/Dec/2023"
                    first
                    isActive
                />
                <TimelineItem
                    Icon={TruckIcon}
                    title="Shipped Out"
                    time="12/Dec/2023"
                    isActive
                />
                <TimelineItem
                    Icon={PackageCheck}
                    title="Received"
                    time="12/Dec/2023"
                />
            </div>

            <div className="border-[1px] border-black rounded-md pb-3 mx-3">
                {/* Header */}
                <div className="px-4 text-sm flex justify-between border-b-[1px] border-black py-2">
                    <Link to={"/user/purchases/1"}>
                        <div className="text-black/60 flex items-center gap-1">
                            <ScrollText
                                strokeWidth={1.5}
                                className="w-4 lg:w-5"
                            />
                            <p>TP092812982 (Order id)</p>
                        </div>
                    </Link>
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

                <div className="px-4">
                    <div className="text-black/60 flex items-center gap-1 my-3">
                        <UserIcon className="w-4 lg:w-5" strokeWidth={1.5} />
                        <p>Receiver and Address</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                        <p className="pr-2 border-r border-black/40">
                            {addresses[0].fullName}
                        </p>
                        <p>{addresses[0].phoneNumber}</p>
                    </div>
                    <div className="text-sm md:text-base text-black/60">
                        <p>{addresses[0].streetAddress}</p>
                        <p>
                            {addresses[0].postalCode} {addresses[0].state}
                        </p>
                        {addresses[0].unitAddress && (
                            <p>{addresses[0].unitAddress}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
