import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Order } from "../../../../types/dataType";
import { useDeleteUserOrderMutation } from "@/apiService/userOrderApi";
import { useToast } from "@/components/ui/use-toast";

type UpdateAdminDialogProps = {
    order?: Order;
};

export default function DeleteOrderDialog(props: UpdateAdminDialogProps) {
    const { order } = props;
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteOrder, { isLoading: isDeletingOrder }] =
        useDeleteUserOrderMutation();

    function onDeleteOrder() {
        if (order != null) {
            deleteOrder(order.id)
                .unwrap()
                .then((_) => {
                    setIsDialogOpen(false);
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.data.message ?? "Something went wrong",
                        variant: "destructive",
                    });
                });
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghostAlert"
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full items-center gap-2 text-rose-600 focus:text-rose-700 focus:bg-rose-100"
                >
                    <Trash2 className="w-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete this order?</DialogTitle>
                    <DialogDescription>
                        This order will be removed and can't be accessed
                        anymore.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="defaultAlert"
                        onClick={onDeleteOrder}
                        isLoading={isDeletingOrder}
                        disabled={isDeletingOrder}
                    >
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
