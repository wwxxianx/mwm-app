import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
    BookmarkIcon as OutlineBookmarkIcon,
    ClipboardDocumentListIcon as OutlineClipboardDocumentListIcon,
    UserCircleIcon as OutlineUserCircleIcon,
} from "@heroicons/react/24/outline";
import {
    BookmarkIcon as SolidBookmarkIcon,
    ClipboardDocumentListIcon as SolidClipboardDocumentListIcon,
    UserCircleIcon as SolidUserCircleIcon,
} from "@heroicons/react/24/solid";
import { ChevronDown, MapPinned, UnlockKeyhole } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export default function UserAccountNav() {
    const location = useLocation();

    function RenderedNavTrigger() {
        const pathname = location.pathname;
        if (pathname.includes("/user/account")) {
            if (pathname.includes("profile")) {
                return (
                    <Button
                        variant="ghostClient"
                        className="font-medium items-center gap-1 text-base pr-1"
                    >
                        <SolidClipboardDocumentListIcon className="w-6" />
                        <span>My Profile</span>
                        <ChevronDown className="w-4" />
                    </Button>
                );
            }
            if (pathname.includes("change-password")) {
                return (
                    <Button
                        variant="ghostClient"
                        className="font-medium items-center gap-1 text-base pr-1"
                    >
                        <UnlockKeyhole className="w-6" />
                        <span>Change Password</span>
                        <ChevronDown className="w-4" />
                    </Button>
                );
            }
            if (pathname.includes("address")) {
                return (
                    <Button
                        variant="ghostClient"
                        className="font-medium items-center gap-1 text-base pr-1"
                    >
                        <MapPinned className="w-6" />
                        <span>My Addresses</span>
                        <ChevronDown className="w-4" />
                    </Button>
                );
            }
        }
        if (pathname.includes("/user/purchases")) {
            return (
                <Button
                    variant="ghostClient"
                    className="font-medium items-center gap-1 text-base pr-1"
                >
                    <SolidClipboardDocumentListIcon className="w-6" />
                    <span>My Purchases</span>
                    <ChevronDown className="w-4" />
                </Button>
            );
        }
        if (pathname === "/user/favourites") {
            return (
                <Button
                    variant="ghostClient"
                    className="font-medium items-center gap-1 text-base pr-1"
                >
                    <SolidBookmarkIcon className="w-6" />
                    <span>My Favourites</span>
                    <ChevronDown className="w-4" />
                </Button>
            );
        }
    }

    return (
        <div className="lg:flex items-start gap-8 pt-12 md:container bg-turquoise-50">
            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <RenderedNavTrigger />
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[210px]">
                    <nav className="font-playfair mt-12">
                        <ul>
                            <li className="font-medium">
                                <div
                                    className={cn(
                                        "w-full flex hover:bg-slate-200 pl-2 py-3",
                                        {
                                            "bg-slate-100":
                                                location.pathname.includes(
                                                    "account"
                                                ),
                                        }
                                    )}
                                >
                                    {location.pathname.includes("account") ? (
                                        <SolidUserCircleIcon className="w-6" />
                                    ) : (
                                        <OutlineUserCircleIcon className="w-6" />
                                    )}
                                    <span>My Account</span>
                                </div>
                                <div className="pl-8 flex flex-col gap-2 text-sm">
                                    <SheetClose
                                        asChild
                                        className={cn(
                                            "text-black/60 hover:bg-slate-200",
                                            {
                                                "text-black":
                                                    location.pathname.includes(
                                                        "profile"
                                                    ),
                                            }
                                        )}
                                    >
                                        <Link to={"/user/account/profile"}>
                                            My Profile
                                        </Link>
                                    </SheetClose>
                                    <SheetClose
                                        asChild
                                        className={cn(
                                            "text-black/60 hover:bg-slate-200",
                                            {
                                                "text-black":
                                                    location.pathname.includes(
                                                        "change-password"
                                                    ),
                                            }
                                        )}
                                    >
                                        <Link
                                            to={"/user/account/change-password"}
                                        >
                                            Change Password
                                        </Link>
                                    </SheetClose>
                                    <SheetClose
                                        asChild
                                        className={cn(
                                            "text-black/60 hover:bg-slate-200",
                                            {
                                                "text-black":
                                                    location.pathname.includes(
                                                        "address"
                                                    ),
                                            }
                                        )}
                                    >
                                        <Link to={"/user/account/address"}>
                                            Addresses
                                        </Link>
                                    </SheetClose>
                                </div>
                            </li>{" "}
                            <li className="font-medium">
                                <SheetClose
                                    asChild
                                    className={cn(
                                        "w-full flex hover:bg-slate-200 pl-2 py-3",
                                        {
                                            "bg-slate-100":
                                                location.pathname ===
                                                "/user/favourites",
                                        }
                                    )}
                                >
                                    <Link to={"favourites"}>
                                        {location.pathname ===
                                        "/user/favourites" ? (
                                            <SolidBookmarkIcon className="w-6" />
                                        ) : (
                                            <OutlineBookmarkIcon className="w-6" />
                                        )}
                                        <span>My Favourites</span>
                                    </Link>
                                </SheetClose>
                            </li>
                            <li className="font-medium">
                                <SheetClose
                                    asChild
                                    className={cn(
                                        "w-full flex hover:bg-slate-200 pl-2 py-3",
                                        {
                                            "bg-slate-100":
                                                location.pathname.includes(
                                                    "/user/purchases"
                                                ),
                                        }
                                    )}
                                >
                                    <Link to={"purchases"}>
                                        {location.pathname.includes(
                                            "/user/purchases"
                                        ) ? (
                                            <SolidClipboardDocumentListIcon className="w-6" />
                                        ) : (
                                            <OutlineClipboardDocumentListIcon className="w-6" />
                                        )}
                                        <span>My Purchases</span>
                                    </Link>
                                </SheetClose>
                            </li>
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>
            <nav className="hidden lg:block font-playfair">
                <ul className="space-y-3">
                    <li className="font-medium">
                        <div>
                            <div
                                className={cn(
                                    "flex items-center gap-1 py-2 pl-2 text-black/60 hover:text-black",
                                    {
                                        "text-black":
                                            location.pathname.includes(
                                                "account"
                                            ),
                                    }
                                )}
                            >
                                {location.pathname.includes("account") ? (
                                    <SolidUserCircleIcon className="w-6" />
                                ) : (
                                    <OutlineUserCircleIcon className="w-6" />
                                )}
                                <span>My Account</span>
                            </div>
                            <div className="pl-9 flex flex-col gap-3 text-sm">
                                <NavLink
                                    to={"/user/account/profile"}
                                    className={({ isActive }) =>
                                        cn("text-black/60", {
                                            "text-black": isActive,
                                        })
                                    }
                                >
                                    My Profile
                                </NavLink>
                                <NavLink
                                    to={"/user/account/change-password"}
                                    className={({ isActive }) =>
                                        cn("text-black/60", {
                                            "text-black": isActive,
                                        })
                                    }
                                >
                                    Change Password
                                </NavLink>
                                <NavLink
                                    to={"/user/account/address"}
                                    className={({ isActive }) =>
                                        cn("text-black/60", {
                                            "text-black": isActive,
                                        })
                                    }
                                >
                                    Addresses
                                </NavLink>
                            </div>
                        </div>
                    </li>
                    <li className="font-medium">
                        <NavLink
                            to={"favourites"}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-1 py-2 pl-2 text-black/60 hover:text-black",
                                    { "text-black": isActive }
                                )
                            }
                        >
                            {location.pathname === "/user/favourites" ? (
                                <SolidBookmarkIcon className="w-6" />
                            ) : (
                                <OutlineBookmarkIcon className="w-6" />
                            )}
                            <span className="whitespace-nowrap">
                                My Favourites
                            </span>
                        </NavLink>
                    </li>
                    <li className="font-medium">
                        <NavLink
                            to={"purchases"}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-1 py-2 pl-2 text-black/60 hover:text-black",
                                    { "text-black": isActive }
                                )
                            }
                        >
                            {location.pathname.includes("/user/purchases") ? (
                                <SolidClipboardDocumentListIcon className="w-6" />
                            ) : (
                                <OutlineClipboardDocumentListIcon className="w-6" />
                            )}
                            <span className="whitespace-nowrap">
                                My Purchases
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="lg:flex-1 bg-turquoise-50">
                <Outlet />
            </div>
        </div>
    );
}
