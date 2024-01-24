import WhiteLogoImageUrl from "@/assets/logo-white.png";
import LogoImageUrl from "@/assets/logo.png";
import BookCover from "@/components/ui/BookCover";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { books } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { initUser } from "../../redux/userSlice";
import HomepageCart from "./components/HomepageCart";
import MobileNavigation from "./components/MobileNavigation";
import UserDropdownMenu from "./components/UserDropdownMenu";

const topCategories = [
    {
        category: "Fiction",
    },
    { category: "Business & Management" },
    { category: "Economics" },
    { category: "Non-fiction" },
    { category: "Poetry" },
    { category: "Self Improvement" },
    { category: "Science" },
];

export default function UserNavigation() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const token = useAppSelector((state) => state.user.token);

    useEffect(() => {
        // Check user from localStorage and stay user signed in
        dispatch(initUser());
    }, []);

    return (
        <div className="h-screen bg-turquoise-50 font-playfair flex flex-col">
            <div className="container relative flex items-center justify-center pt-6">
                <Link to={"/home"} className="md:hidden">
                    <img
                        src={LogoImageUrl}
                        alt="Logo image"
                        role="navigation"
                        className="w-[110px] md:w-[100px]"
                    />
                </Link>
                <NavigationMenu className="hidden md:flex justify-center md:justify-start min-w-full items-center px-4">
                    <NavigationMenuList>
                        <NavigationMenuItem className="mr-4">
                            <NavLink to={"/"}>
                                <img
                                    src={LogoImageUrl}
                                    alt="Logo image"
                                    role="navigation"
                                    className="w-[120px] md:w-[100px]"
                                />
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink
                                to={"/"}
                                className={({ isActive }) =>
                                    cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-transparent text-base hover:bg-transparent",
                                        {
                                            "font-bold": isActive,
                                        }
                                    )
                                }
                            >
                                <p>Home</p>
                            </NavLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-base font-normal hover:bg-transparent">
                                <NavLink
                                    to={"/books"}
                                    target="_blank"
                                    className={({ isActive }) =>
                                        cn({
                                            "font-medium": isActive,
                                        })
                                    }
                                >
                                    Books
                                </NavLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="p-0 bg-turquoise-50">
                                <div className="grid grid-cols-3 bg-turquoise-50 gap-0 w-[750px] max-h-[650px] ml-5 pb-6 pt-4">
                                    <div className="col-span-1">
                                        <p className="text-group-label uppercase font-inter font-medium pl-0">
                                            Top Categories
                                        </p>
                                        <div className="flex flex-col gap-4">
                                            {topCategories.map((category) => {
                                                return (
                                                    <Link
                                                        to={"/"}
                                                        className="inline-block font-inter font-normal text-sm text-black/60 hover:text-black"
                                                    >
                                                        {category.category}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-group-label uppercase font-inter font-medium pl-0">
                                            Featured Books
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {books.map((book) => {
                                                return (
                                                    <div className="flex items-center gap-2">
                                                        <BookCover
                                                            imageUrl={
                                                                book.imageUrl
                                                            }
                                                            className="max-w-[60px] rounded-sm"
                                                        />
                                                        <div className="space-y-1">
                                                            <h4 className="font-playfair text-xs max-w-[120px] truncate">
                                                                {book.title}
                                                            </h4>
                                                            <h5 className="font-playfair text-black/60 text-xs max-w-[120px] truncate">
                                                                {
                                                                    book.author
                                                                        .fullName
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-base font-normal hover:bg-transparent">
                                <NavLink
                                    to={"/authors"}
                                    target="_blank"
                                    className={({ isActive }) =>
                                        cn({
                                            "font-medium": isActive,
                                        })
                                    }
                                >
                                    Authors
                                </NavLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="p-0 bg-turquoise-50">
                                <div className="grid grid-cols-3 bg-turquoise-50 px-6 gap-0 w-[750px] max-h-[650px] ml-5 pb-6 mt-0">
                                    <div className="col-span-1">
                                        <p className="text-group-label uppercase font-inter font-medium pl-0">
                                            Top Categories
                                        </p>
                                        <div className="flex flex-col gap-4">
                                            {topCategories.map((category) => {
                                                return (
                                                    <Link
                                                        to={"/"}
                                                        className="inline-block font-inter font-normal text-sm text-black/60 hover:text-black"
                                                    >
                                                        {category.category}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-group-label uppercase font-inter font-medium pl-0">
                                            Featured Books
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {books.map((book) => {
                                                return (
                                                    <div className="flex items-center gap-2">
                                                        <BookCover
                                                            imageUrl={
                                                                book.imageUrl
                                                            }
                                                            className="max-w-[60px] rounded-sm"
                                                        />
                                                        <div className="space-y-1">
                                                            <h4 className="font-playfair text-xs max-w-[120px] truncate">
                                                                {book.title}
                                                            </h4>
                                                            <h5 className="font-playfair text-black/60 text-xs max-w-[120px] truncate">
                                                                {
                                                                    book.author
                                                                        .fullName
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <div className="hidden md:flex items-center ml-auto">
                        <HomepageCart />
                        {isLoggedIn ? (
                            <UserDropdownMenu />
                        ) : (
                            <Link to={"/login"}>Login</Link>
                        )}
                    </div>
                </NavigationMenu>
                <MobileNavigation />
            </div>

            <main>
                <Outlet />
            </main>

            {/* Footer Navigation */}
            <footer className="bg-[#262626] pb-2 pt-6 px-4 text-white mt-auto">
                <div className="md:flex gap-20">
                    <div>
                        <img
                            src={WhiteLogoImageUrl}
                            className="max-w-[102px] md:max-w-[140px]"
                        />
                        <p className="text-sm text-white/60 mt-2 mb-4">
                            Your best reading partner
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <p className="text-white/60 mb-1">Sitemap</p>
                            <ul className="text-sm md:text-base space-y-2">
                                <li>
                                    <Link to="/home">home</Link>
                                </li>
                                <li>
                                    <Link to="/books">books</Link>
                                </li>
                                <li>
                                    <Link to="/authors">authors</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-white/60 mb-1">Company</p>
                            <ul className="text-sm md:text-base space-y-2">
                                <li>
                                    <Link to="/about-us">about us</Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions">
                                        terms and conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">
                                        privacy policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-white/60 mt-20">
                    © 2023 Books Inc. All rights reserved
                </p>
            </footer>
        </div>
    );
}
