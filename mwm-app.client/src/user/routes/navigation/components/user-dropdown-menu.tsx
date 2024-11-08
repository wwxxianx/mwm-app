import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { logout } from "../../../redux/userSlice";

export default function UserDropdownMenu() {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    function onLogout() {
        dispatch(logout());
        navigate("/");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        src={user?.profileImageUrl}
                        className="w-full h-full"
                    />
                    <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="bottom"
                align="end"
                className="font-playfair"
            >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to={"/user/account/profile"} target="_top">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to={"/user/favourites"} target="_top">
                        Favourites
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to={"/user/purchases"} target="_top">
                        Purchases
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-rose-500 items-center gap-1 hover:bg-rose-100 hover:text-rose-500 focus:bg-rose-100 focus:text-rose-500"
                    onClick={onLogout}
                >
                    <LogOut className="w-4" />
                    <span>Log Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
