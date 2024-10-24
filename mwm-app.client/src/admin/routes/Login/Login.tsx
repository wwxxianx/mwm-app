import logoImgUrl from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hooks";
import { AdminAuthPayload, AdminAuthValidator } from "./validator";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "@/apiService/adminApi";

export default function AdminLogin() {
    const [login] = useAdminLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(AdminAuthValidator) });

    async function onSubmit(data: AdminAuthPayload) {
        try {
            await login(data).unwrap();
            navigate("/admin/dashboard/manage-users");
        } catch (_) {
            //
        }
    }

    return (
        <main className="flex flex-col items-center bg-slate-50 h-screen w-screen">
            <div className="flex flex-col">
                <img
                    src={logoImgUrl}
                    alt="logo image"
                    className="h-6 w-fit mt-10 mb-5 self-center"
                />

                <div className="bg-white shadow-md rounded-md px-4 py-7 w-[370px]">
                    <h4 className="text-xl font-medium text-slate-900 mb-5">
                        Sign in to your account
                    </h4>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            className="w-full"
                            {...register("email")}
                            error={Boolean(errors.email)}
                            errorMessage={
                                errors.email && (errors.email.message as string)
                            }
                        />
                        {errors.email && <p>{}</p>}
                        <Input
                            type="password"
                            label="Password"
                            placeholder="********"
                            className="w-full"
                            {...register("password")}
                            error={Boolean(errors.password)}
                            errorMessage={
                                errors.password &&
                                (errors.password.message as string)
                            }
                        />
                        <Button className="w-full">Login</Button>
                    </form>
                </div>

                <div className="flex items-center gap-1 bg-slate-300 px-2 py-1 mt-8 rounded-sm mr-auto w-fit">
                    <LockClosedIcon className="text-slate-500 w-4" />
                    <p className="text-sm text-slate-600">Security Tip</p>
                </div>
                <p className="max-w-sm text-sm text-slate-700 font-light mt-1">
                    Don't have an account? As for security concerns, you have to
                    ask Super Admin to create an account for you.
                </p>
            </div>
        </main>
    );
}
