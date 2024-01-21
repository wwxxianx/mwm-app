import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export default AdminNavBar() {
    return (
        <div>
            <div id="sidebar-menu">
                <div className="flex align-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>
            </div>
        </div>
    );
}