import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AdminNavBar from "./admin/navigation/Navigation";
import AdminRoot from "./admin/routes/AdminRoot";
import CreateBook from "./admin/routes/CreateBook/CreateBook";
import EditBook from "./admin/routes/EditBook/EditBook";
import EditOrder, { orderLoader } from "./admin/routes/EditOrder/EditOrder";
import EditorChoice from "./admin/routes/EditorChoice/EditorChoice";
import AdminLogin from "./admin/routes/Login/Login";
import ManageAdmins, {
    adminsLoader,
} from "./admin/routes/ManageAdmins/ManageAdmins";
import { updateAdminAction } from "./admin/routes/ManageAdmins/components/UpdateAdminDialog";
import ManageBooksNavRoot from "./admin/routes/ManageBooks/ManageBooksNavRoot";
import ManageAuthors from "./admin/routes/ManageBooks/routes/ManageAuthors";
import ManageBooks from "./admin/routes/ManageBooks/routes/ManageBooks";
import ManageCategories from "./admin/routes/ManageBooks/routes/ManageCategories";
import ManageOrders from "./admin/routes/ManageOrders/ManageOrders";
import ManageUsers, {
    usersLoader,
} from "./admin/routes/ManageUsers/ManageUsers";
import TopThreeBooks from "./admin/routes/TopThreeBooks/TopThreeBooks";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import { store } from "./lib/reduxStore";
import AboutUs from "./user/routes/aboutUs/AboutUs";
import UserAccountNav from "./user/routes/account/UserAccountNav";
import AddressPage from "./user/routes/account/routes/address/Address";
import ChangePasswordPage from "./user/routes/account/routes/changePassword/ChangePassword";
import UserFavourites from "./user/routes/account/routes/favourites/UserFavourites";
import UserProfile from "./user/routes/account/routes/profile/UserProfile";
import UserPurchases from "./user/routes/account/routes/purchases/UserPurchases";
import PurchaseDetails from "./user/routes/account/routes/purchases/components/PurchaseDetails";
import AuthorDetails from "./user/routes/author/AuthorDetails";
import Authors from "./user/routes/authors/Authors";
import BookDetails, { clientBookLoader } from "./user/routes/book/BookDetails";
import Books from "./user/routes/books/Books";
import Cart from "./user/routes/cart/Cart";
import Homepage from "./user/routes/homepage/Homepage";
import Login from "./user/routes/login/Login";
import UserNavigation from "./user/routes/navigation/UserNavigation";
import PrivacyPolicy from "./user/routes/privacyPolicy/PrivacyPolicy";
import SignUp from "./user/routes/signUp/SignUp";
import TermsAndConditions from "./user/routes/termsAndConditions/TermsAndConditions";
import { useAppSelector } from "./lib/hooks";
import Checkout from "./user/routes/checkout/Checkout";

const PrivateRoute = (Component) => {
    const PrivateRouteWrapper = (props) => {
        const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
        const token = localStorage.getItem("userToken");

        return token != null ? (
            <Component {...props} />
        ) : (
            <Navigate to="/" replace />
        );
    };

    return <PrivateRouteWrapper />;
};

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
        path: "checkout",
        element: <Checkout />,
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
                element: <AdminNavBar />,
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
                                // loader: authorsLoader,
                            },
                            {
                                path: "categories",
                                element: <ManageCategories />,
                                // loader: categoriesLoader,
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
                        loader: adminsLoader,
                        action: updateAdminAction,
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

// Your web app's Firebase configuration
const firebaseConfig = {
    // US region
    // apiKey: "AIzaSyD1-7Hit1bOsRAAYCzLfyEQ_96V4K0WcIY",
    // authDomain: "linkedin-clone-225b2.firebaseapp.com",
    // projectId: "linkedin-clone-225b2",
    // storageBucket: "linkedin-clone-225b2.appspot.com",
    // messagingSenderId: "72975579786",
    // appId: "1:72975579786:web:2c2f211b91280bb29fcb73",
    // Asia region
    apiKey: "AIzaSyDDIdeOH80IjjT8PcPcT2U5HO58dwop05k",
    authDomain: "bolt-sport.firebaseapp.com",
    projectId: "bolt-sport",
    storageBucket: "bolt-sport.appspot.com",
    messagingSenderId: "689176755278",
    appId: "1:689176755278:web:4bed012cd3a2cd9c2c171f",
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
