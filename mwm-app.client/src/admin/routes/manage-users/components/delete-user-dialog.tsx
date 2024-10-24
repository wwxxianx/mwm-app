import { useDeleteUserAccountMutation } from "@/apiService/userProfileApi";
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
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/dataType";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteUserDialogProps = {
    user: User;
};

export default function DeleteUserDialog(props: DeleteUserDialogProps) {
    const { user } = props;
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteUserAccount, { isLoading }] = useDeleteUserAccountMutation();

    function onDelete() {
        deleteUserAccount(user.id)
            .unwrap()
            .then((_) => {
                setIsDialogOpen(false);
            })
            .catch((err) => {
                // TODO: Handle error
            });
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
                    <DialogTitle>
                        Are you sure want to delete {user?.fullName}
                    </DialogTitle>
                    <DialogDescription>
                        By doing so, all {user?.fullName} data will also be
                        deleted.
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
