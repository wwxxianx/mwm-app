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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteAdminMutation } from "@/apiService/adminApi";

type UpdateAdminDialogProps = {
    admin?: Admin;
};

export default function DeleteAdminDialog(props: UpdateAdminDialogProps) {
    const { admin } = props;
    const { toast } = useToast();
    const [deleteAdmin, { isLoading: isDeletingAdmin }] =
        useDeleteAdminMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onDelete() {
        if (admin != null) {
            deleteAdmin(admin.id)
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
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghostAlert" size="sm">
                    <Trash2 className="w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete ?</DialogTitle>
                    <DialogDescription>
                        This admin account will be removed and can't be used
                        anymore.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="defaultAlert"
                        isLoading={isDeletingAdmin}
                        onClick={onDelete}
                        disabled={isDeletingAdmin}
                    >
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
