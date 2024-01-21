import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
    ClipboardDocumentIcon,
    HomeIcon,
    ShoppingBagIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpRightIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { BookText, BookUser, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileNavigation() {
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
    function onToggleBookDropdown() {
        setIsBookDropdownOpen((prev) => !prev);
    }

    function onOpenBookDropdown() {
        setIsBookDropdownOpen(true);
    }

    function onCloseBookDropdown() {
        setIsBookDropdownOpen(false);
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-0 md:sr-only hover:bg-black/10"
                >
                    <Bars3Icon className="w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-turquoise-50">
                <div className="grid gap-4 py-4 font-playfair">
                    <nav>
                        <ul className="space-y-6">
                            <li>
                                <SheetClose asChild>
                                    <Link
                                        to={"/"}
                                        className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800"
                                    >
                                        <p>Home</p>
                                        <HomeIcon className="w-6" />
                                    </Link>
                                </SheetClose>
                            </li>
                            <li className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800">
                                <SheetClose asChild>
                                    <Link
                                        to={"/books"}
                                        className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800"
                                    >
                                        <p>Books</p>
                                        <BookText className="w-6" />
                                    </Link>
                                </SheetClose>
                            </li>
                            <li className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800">
                                <SheetClose asChild>
                                    <Link
                                        to={"/authors"}
                                        className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800"
                                    >
                                        <p>Authors</p>
                                        <BookUser className="w-6" />
                                    </Link>
                                </SheetClose>
                            </li>
                            <li className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800">
                                <SheetClose asChild>
                                    <Link
                                        to={"/cart"}
                                        className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800"
                                    >
                                        <p>My Cart</p>
                                        <ShoppingBagIcon className="w-6" />
                                    </Link>
                                </SheetClose>
                            </li>
                            <li className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800">
                                <SheetClose asChild>
                                    <Link
                                        to={"/user/account/profile"}
                                        className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800"
                                    >
                                        <p>My Account</p>
                                        <UserCircleIcon className="w-6" />
                                    </Link>
                                </SheetClose>
                            </li>
                            <li className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800">
                                <SheetClose asChild>
                                    <Link
                                        to={"/user/purchases"}
                                        className="flex items-center gap-2 text-slate-500 text-xl justify-end hover:text-slate-800"
                                    >
                                        <p>My Purchases</p>
                                        <ClipboardDocumentIcon className="w-6" />
                                    </Link>
                                </SheetClose>
                            </li>
                        </ul>
                    </nav>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Link
                            to={"/login"}
                            className="font-playfair bg-darkBlue w-full text-white py-2 flex justify-center text-base mt-4"
                        >
                            Login
                        </Link>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
