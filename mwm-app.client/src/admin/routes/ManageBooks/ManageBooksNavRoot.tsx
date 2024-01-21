import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookUser } from "lucide-react";
import { useEffect, useState } from "react";
import { TagIcon } from "@heroicons/react/24/outline";

type ManageBooksTab = "book" | "author" | "category";

export default function ManageBooksNavRoot() {
    const [tabValue, setTabValue] = useState<ManageBooksTab>("book");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        switch (pathname) {
            case "/admin/dashboard/manage-books":
            case "/admin/dashboard/manage-books/books":
                navigate("books");
                setTabValue("book");
                break;
            case "/admin/dashboard/manage-books/authors":
                navigate("authors");
                setTabValue("author");
                break;
            case "/admin/dashboard/manage-books/categories":
                navigate("categories");
                setTabValue("category");
                break;
        }
    }, [location.pathname]);

    function onNavigateTab(tab: ManageBooksTab) {
        switch (tab) {
            case "author":
                navigate("authors");
                break;
            case "book":
                navigate("books");
                break;
            case "category":
                navigate("categories");
        }
        setTabValue(tab);
    }

    return (
        <div className="h-full space-y-3">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Manage your books content here!
                    </h2>
                    <p className="text-muted-foreground">
                        Here's all the books available in Books now!
                    </p>
                </div>
            </div>
            <Tabs className="h-fit" value={tabValue}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                        value="book"
                        onClick={() => onNavigateTab("book")}
                        className="gap-2"
                    >
                        <BookOpen className="w-5" />
                        Book
                    </TabsTrigger>
                    <TabsTrigger
                        value="author"
                        onClick={() => onNavigateTab("author")}
                        className="gap-2 text-base"
                    >
                        <BookUser className="w-5" />
                        Author
                    </TabsTrigger>
                    <TabsTrigger
                        value="category"
                        onClick={() => onNavigateTab("category")}
                        className="gap-2 text-base"
                    >
                        <TagIcon className="w-5" />
                        Category
                    </TabsTrigger>
                </TabsList>
                <Outlet />
            </Tabs>
        </div>
    );
}
