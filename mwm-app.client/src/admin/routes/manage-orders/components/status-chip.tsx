import { cn } from "@/lib/utils";
import { OrderStatus } from "../../../../types/dataType";

type StatusChipProps = {
    status: OrderStatus;
};

export default function StatusChip(props: StatusChipProps) {
    const { status } = props;
    let statusStyle =
        status === "Pending"
            ? "bg-slate-100 text-slate-600 text-center"
            : status === "Delivery"
            ? "bg-blue-100 text-blue-600 text-center"
            : status === "Completed"
            ? "bg-green-100 text-green-600 text-center"
            : status === "Cancelled"
            ? "bg-rose-100 text-rose-600 text-center"
            : status === "Processing"
            ? "bg-amber-100 text-yellow-600 text-center"
            : status === "Refund"
            ? "bg-purple-100 text-purple-600 text-center"
            : "text-slate-700";

    return (
        <div className="flex items-center">
            <span className={cn("rounded-full text-xs py-1 w-20", statusStyle)}>
                {status}
            </span>
        </div>
    );
}
