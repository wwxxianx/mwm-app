import { Author } from "@/types/dataType";
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
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteAuthorDialogProps = {
    author: Author | Author[];
};

export default function DeleteAuthorDialog(props: DeleteAuthorDialogProps) {
    const { author } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onOpenDialog() {
        setIsDialogOpen(true);
    }

    function onCloseDialog() {
        setIsDialogOpen(false);
    }

    function onDelete() {
        onCloseDialog();
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                {Array.isArray(author) ? (
                    <Button
                        variant="defaultAlert"
                        className="ml-auto flex items-center gap-2 mr-2"
                    >
                        <Trash2 className="w-4 m-0 p-0" />
                        Delete
                    </Button>
                ) : (
                    <Button
                        variant="ghostAlert"
                        size="sm"
                        onClick={onOpenDialog}
                    >
                        <Trash2 className="w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle>
                        {!Array.isArray(author)
                            ? `Are you sure want to delete ${author?.fullName}?`
                            : "Are you sure want to delete thse author?"}
                    </DialogTitle>
                    <DialogDescription>
                        {!Array.isArray(author)
                            ? `By doing so, all ${author?.fullName} books will no longer
                            have author.`
                            : "By doing so, all the books written by these authors will no longer have author."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="defaultAlert" onClick={onDelete}>
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
