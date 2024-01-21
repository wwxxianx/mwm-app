import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { initAdmin } from "../redux/admin/adminSlice";

export default function AdminRoot() {
    const adminIsLoggedIn = useAppSelector(state => state.admin.isLoggedIn);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // NOTE: Get Admin from localStorage and init state
        const admin = localStorage.getItem("adminProfile");
        const token = localStorage.getItem("adminToken");

        if (!admin) {
            navigate("/admin/login");
        } else {
            const parsedAdmin = JSON.parse(admin);
            dispatch(initAdmin({ admin: parsedAdmin, token }));
            if (location.pathname === "/admin") {
                navigate("/admin/dashboard/manage-users");
            }
        }
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
}
