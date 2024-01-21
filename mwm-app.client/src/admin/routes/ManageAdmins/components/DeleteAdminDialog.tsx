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
import { Admin } from "../../../../types/dataType";

type UpdateAdminDialogProps = {
    admin?: Admin;
    isDialogOpen: boolean;
    onOpenDialog: () => void;
    onCloseDialog: () => void;
};

export default function DeleteAdminDialog(props: UpdateAdminDialogProps) {
    const { onCloseDialog, onOpenDialog, isDialogOpen } = props;

    function onDelete() {
        onCloseDialog();
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghostAlert" size="sm" onClick={onOpenDialog}>
                    <Trash2 className="w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseDialog={onCloseDialog}
            >
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete ?</DialogTitle>
                    <DialogDescription>
                        This admin account will be removed and can't be used
                        anymore.
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
