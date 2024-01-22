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
import { Category } from "@/types/dataType";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteCategoryMutation } from "../../../../../apiService/apiService";
import { useToast } from "../../../../../components/ui/use-toast";

type DeleteCategoryDialogProps = {
    category: Category | Category[];
};

export default function DeleteCategoryDialog(props: DeleteCategoryDialogProps) {
    const { category } = props;
    const { toast } = useToast();
    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onOpenDialog() {
        setIsDialogOpen(true);
    }

    function onCloseDialog() {
        setIsDialogOpen(false);
    }

    async function onDelete() {
        if (Array.isArray(category)) {
            // Chunk delete
        } else {
            deleteCategory(category.id)
                .unwrap()
                .then((_) => {
                    onCloseDialog();
                })
                .catch((err) =>
                    toast({
                        variant: "destructive",
                        title: `Failed to delete, please try again later.`,
                    })
                );
        }
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                {category ? (
                    <Button
                        variant="ghostAlert"
                        size="sm"
                        onClick={onOpenDialog}
                    >
                        <Trash2 className="w-4" />
                    </Button>
                ) : (
                    <Button
                        variant="defaultAlert"
                        className="ml-auto flex items-center gap-2 mr-2"
                        onClick={onOpenDialog}
                    >
                        <Trash2 className="w-4 m-0 p-0" />
                        Delete
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px] md:max-w-none w-fit"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle className="max-w-[90%]">
                        {Array.isArray(category)
                            ? "Are you sure want to delete thse categories?"
                            : `Are you sure want to delete ${category?.category} category?`}
                    </DialogTitle>
                    <DialogDescription>
                        {Array.isArray(category)
                            ? "By doing so, all the books with these categories will also be deleted."
                            : `By doing so, all ${category?.category} books will also be deleted.`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="defaultAlert"
                        onClick={onDelete}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
