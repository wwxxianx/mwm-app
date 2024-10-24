import { initializeApp } from "firebase/app";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AdminNavBar from "./admin/navigation/navigation";
import AdminRoot from "./admin/routes/admin-root";
import CreateBook from "./admin/routes/create-book/create-book";
import EditBook from "./admin/routes/edit-book/edit-book";
import EditOrder, { orderLoader } from "./admin/routes/edit-order/edit-order";
import EditorChoice from "./admin/routes/editor-choice/editor-choice";
import AdminLogin from "./admin/routes/login/login";
import ManageAdmins from "./admin/routes/manage-admins/manage-admins";
import ManageBooksNavRoot from "./admin/routes/manage-books/manage-books-nav-root";
import ManageAuthors from "./admin/routes/manage-books/routes/manage-authors";
import ManageBooks from "./admin/routes/manage-books/routes/manage-books";
import ManageCategories from "./admin/routes/manage-books/routes/manage-categories";
import ManageOrders from "./admin/routes/manage-orders/manage-orders";
import ManageUsers, {
    usersLoader,
} from "./admin/routes/manage-users/manage-users";
import TopThreeBooks from "./admin/routes/top-three-books/top-three-books";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SoonerToaster } from "./components/ui/sonner";
import "./index.css";
import { store } from "./lib/reduxStore";
import AboutUs from "./user/routes/about-us/about-us";
import UserAccountNav from "./user/routes/account/user-account-nav";
import AddressPage from "./user/routes/account/routes/address/address";
import ChangePasswordPage from "./user/routes/account/routes/change-password/change-password";
import UserFavourites from "./user/routes/account/routes/favourites/user-favourites";
import UserProfile from "./user/routes/account/routes/profile/user-profile";
import UserPurchases from "./user/routes/account/routes/purchases/user-purchases";
import PurchaseDetails from "./user/routes/account/routes/purchases/components/purchase-details";
import AuthorDetails from "./user/routes/author/author-details";
import Authors from "./user/routes/authors/authors";
import BookDetails, { clientBookLoader } from "./user/routes/book/book-details";
import Books from "./user/routes/books/books";
import Cart from "./user/routes/cart/cart";
import Homepage from "./user/routes/homepage/homepage";
import Login from "./user/routes/login/login";
import UserNavigation from "./user/routes/navigation/user-navigation";
import PrivacyPolicy from "./user/routes/privacy-policy/privacy-policy";
import SignUp from "./user/routes/sign-up/sign-up";
import TermsAndConditions from "./user/routes/terms-and-conditions/terms-and-conditions";
import { useAppSelector } from "./lib/hooks";
import Checkout from "./user/routes/checkout/checkout";
import CheckoutSuccess from "./user/routes/checkout-success/checkoutt-success";
import { useToast } from "./components/ui/use-toast";
import {
    AuthenticateWithRedirectCallback,
    ClerkProvider,
    useUser,
} from "@clerk/clerk-react";

const PrivateRouteComponent = () => {
    const { toast } = useToast();
    useEffect(() => {
        toast({
            title: "Please login to your account first",
            variant: "destructive",
        });
    }, []);

    return <Navigate to="/" replace />;
};

const PrivateRoute = (Component) => {
    const PrivateRouteWrapper = (props) => {
        const token = localStorage.getItem("userToken");

        return token != null ? (
            <Component {...props} />
        ) : (
            <PrivateRouteComponent />
        );
    };

    return <PrivateRouteWrapper />;
};

const PrivateAdminRoute = (Component) => {
    const PrivateRouteWrapper = (props) => {
        const token = localStorage.getItem("adminToken");

        return token != null ? (
            <Component {...props} />
        ) : (
            <PrivateAdminRouteComponent />
        );
    };

    return <PrivateRouteWrapper />;
};

const PrivateAdminRouteComponent = () => {
    const { toast } = useToast();
    useEffect(() => {
        toast({
            title: "Please login to your account first",
            variant: "destructive",
        });
    }, []);

    return <Navigate to="/admin/login" replace />;
};

function SSOCallback() {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            console.log("Authenticated user:", user);
        } else {
            console.log("Nothing");
        }
    }, [user]);
    return <AuthenticateWithRedirectCallback />;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserNavigation />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "books",
                element: <Books />,
            },
            {
                path: "authors",
                element: <Authors />,
            },
            {
                path: "author/:authorID",
                element: <AuthorDetails />,
            },
            {
                path: "book/:bookId",
                element: <BookDetails />,
                loader: clientBookLoader,
            },
            {
                path: "cart",
                element: PrivateRoute(Cart),
            },
            {
                path: "user",
                element: PrivateRoute(UserAccountNav),
                children: [
                    {
                        path: "account",
                        children: [
                            {
                                path: "profile",
                                element: <UserProfile />,
                            },
                            {
                                path: "change-password",
                                element: <ChangePasswordPage />,
                            },
                            {
                                path: "address",
                                element: <AddressPage />,
                            },
                        ],
                    },
                    {
                        path: "favourites",
                        element: <UserFavourites />,
                    },
                    {
                        path: "purchases",
                        element: <UserPurchases />,
                    },
                    {
                        path: "purchases/:id",
                        element: <PurchaseDetails />,
                    },
                ],
            },
            {
                path: "about-us",
                element: <AboutUs />,
            },
            {
                path: "terms-and-conditions",
                element: <TermsAndConditions />,
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />,
            },
        ],
    },
    {
        path: "sso-callback",
        element: <SSOCallback />,
    },
    {
        path: "checkout",
        element: PrivateRoute(Checkout),
    },
    {
        path: "checkout-success",
        element: <CheckoutSuccess />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "sign-up",
        element: <SignUp />,
    },
    {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                path: "dashboard",
                element: PrivateAdminRoute(AdminNavBar),
                children: [
                    {
                        path: "manage-users",
                        element: <ManageUsers />,
                        loader: usersLoader,
                    },
                    {
                        path: "top-three-books",
                        element: <TopThreeBooks />,
                        // loader: topBooksLoader,
                    },
                    {
                        path: "editor-choice",
                        element: <EditorChoice />,
                        loader: usersLoader,
                    },
                    {
                        path: "manage-books",
                        element: <ManageBooksNavRoot />,
                        children: [
                            {
                                path: "books",
                                element: <ManageBooks />,
                                // loader: booksLoader,
                            },
                            {
                                path: "authors",
                                element: <ManageAuthors />,
                            },
                            {
                                path: "categories",
                                element: <ManageCategories />,
                            },
                        ],
                    },
                    {
                        path: "manage-orders",
                        element: <ManageOrders />,
                    },
                    {
                        path: "edit-order/:orderID",
                        element: <EditOrder />,
                        loader: orderLoader,
                    },
                    {
                        path: "create-book",
                        element: <CreateBook />,
                    },
                    {
                        path: "edit-book/:bookID",
                        element: <EditBook />,
                        // loader: bookLoader,
                    },
                    {
                        path: "manage-admins",
                        element: <ManageAdmins />,
                    },
                ],
            },
            {
                path: "login",
                element: <AdminLogin />,
            },
        ],
    },
]);
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
    // US region
    apiKey: "AIzaSyD1-7Hit1bOsRAAYCzLfyEQ_96V4K0WcIY",
    authDomain: "linkedin-clone-225b2.firebaseapp.com",
    projectId: "linkedin-clone-225b2",
    storageBucket: "linkedin-clone-225b2.appspot.com",
    messagingSenderId: "72975579786",
    appId: "1:72975579786:web:2c2f211b91280bb29fcb73",
    // Asia region
    // apiKey: "AIzaSyDDIdeOH80IjjT8PcPcT2U5HO58dwop05k",
    // authDomain: "bolt-sport.firebaseapp.com",
    // projectId: "bolt-sport",
    // storageBucket: "bolt-sport.appspot.com",
    // messagingSenderId: "689176755278",
    // appId: "1:689176755278:web:4bed012cd3a2cd9c2c171f",
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={CLERK_KEY}>
            <Provider store={store}>
                <Toaster />
                <SoonerToaster />
                <RouterProvider router={router} />
            </Provider>
        </ClerkProvider>
    </React.StrictMode>
);
