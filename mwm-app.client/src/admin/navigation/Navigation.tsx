import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    EllipsisVerticalIcon,
    PlusIcon,
    ArrowLeftOnRectangleIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { UserIcon, BookOpenIcon, TruckIcon } from "@heroicons/react/24/solid";
import { IconButton } from "../components/shared/IconButton";
import { NavBarButton } from "../components/navbar-button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/lib/hooks";
import { adminLogout } from "../redux/admin/adminSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserRoundCog } from "lucide-react";

export default function AdminNavBar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const manageNavItems = [
        {
            route: "manage-users",
            label: "Users",
            icon: UserIcon,
        },
        {
            route: "manage-books",
            label: "Books",
            icon: BookOpenIcon,
        },
        {
            route: "manage-orders",
            label: "Orders",
            icon: TruckIcon,
        },
        {
            route: "manage-admins",
            label: "Admins",
            icon: UserRoundCog,
        },
    ];
    const specialContentNavItems = [
        {
            route: "top-three-books",
            label: "Top Three Books",
        },
        {
            route: "editor-choice",
            label: "Editor Choice",
        },
    ];

    function handleLogout() {
        dispatch(adminLogout());
        navigate("/admin/login");
    }

    function handleRouteChanged(route: string) {
        navigate(`${route}`);
    }

    function navigateToBook() {
        navigate("create-book");
    }

    return (
        <div
            id="content-wrapper"
            className="flex pl-[12px] pr-[26px] py-[32px] w-full min-h-screen bg-indigo-50"
        >
            <div id="sidebar-menu" className="w-fit mr-2">
                {/* Avatar Row */}
                <div className="flex items-center gap-2 pl-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="text-slate-900">Book.com</p>
                        <p className="text-xs">Super Admin</p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <IconButton>
                                <EllipsisVerticalIcon className="w-full h-full" />
                            </IconButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <UserCircleIcon className="w-6 text-slate-700" />
                                My Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <ArrowLeftOnRectangleIcon className="w-6 text-slate-700" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Primary button */}
                <Button
                    className="bg-indigo-500 gap-1 shadow-admin-primary-button ml-3 my-4 hover:bg-indigo-600"
                    onClick={navigateToBook}
                >
                    <PlusIcon className="w-4 h-4" />
                    <p className="font-medium text-xs">Create Books</p>
                </Button>

                {/* Manage section */}
                <nav className="w-full">
                    <ul className="space-y-2">
                        <p className="text-sm text-slate-500 font-medium ml-3 mt-2 mb-2">
                            Manage
                        </p>
                        {manageNavItems.map((navItem) => {
                            const pathname = location.pathname;
                            const isActive =
                                navItem.route === "manage-books"
                                    ? pathname.includes(navItem.route) ||
                                      pathname.includes("edit-book")
                                    : navItem.route === "manage-orders"
                                    ? pathname.includes(navItem.route) ||
                                      pathname.includes("edit-order")
                                    : pathname.includes(navItem.route);
                            return (
                                <li>
                                    <NavBarButton
                                        Icon={navItem.icon}
                                        label={navItem.label}
                                        active={isActive}
                                        onClick={() => {
                                            handleRouteChanged(navItem.route);
                                        }}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Special Content section */}
                <nav className="w-full mt-8">
                    <ul className="space-y-2">
                        <p className="text-sm text-slate-500 font-medium ml-3 mt-2 mb-2">
                            Special Content
                        </p>
                        {specialContentNavItems.map((navItem) => {
                            const pathname = location.pathname;
                            const isActive = pathname.includes(navItem.route);
                            return (
                                <li>
                                    <NavBarButton
                                        Icon={navItem.icon}
                                        label={navItem.label}
                                        active={isActive}
                                        onClick={() => {
                                            handleRouteChanged(navItem.route);
                                        }}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            {/* Content */}
            <main className="bg-white w-full rounded-md px-8 py-6">
                <Outlet />
            </main>
        </div>
    );
}
