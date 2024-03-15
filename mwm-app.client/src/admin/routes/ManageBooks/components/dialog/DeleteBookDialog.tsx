import { useDeleteBookMutation } from "@/apiService/bookApi";
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
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@/types/dataType";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteBookDialogProps = {
    book: Book;
};

export default function DeleteBookDialog(props: DeleteBookDialogProps) {
    const { book } = props;
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteBook, { isLoading: isDeletingBook }] = useDeleteBookMutation();

    function onOpenDialog() {
        setIsDialogOpen(true);
    }

    function onCloseDialog() {
        setIsDialogOpen(false);
    }

    function onDelete() {
        deleteBook(book.id)
            .unwrap()
            .then((_) => {
                setIsDialogOpen(false);
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghostAlert"
                    className="w-full items-center gap-2 text-rose-600 focus:text-rose-700 focus:bg-rose-100"
                >
                    <Trash2 className="w-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle>
                        Are you sure want to delete {book?.title}?
                    </DialogTitle>
                    <DialogDescription>
                        By doing so, all the data related to {book?.title} will
                        also be deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="defaultAlert"
                        onClick={onDelete}
                        isLoading={isDeletingBook}
                        disabled={isDeletingBook}
                    >
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
