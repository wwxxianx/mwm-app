import LogoUrl from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/user/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserRegisterPayload, UserRegisterValidator } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/apiService/userAuthApi";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { GoogleLoginButton } from "../login/login";

export default function SignUp() {
    const navigate = useNavigate();
    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const form = useForm({
        resolver: zodResolver(UserRegisterValidator),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: UserRegisterPayload) {
        try {
            const user = {
                email: data.email,
                password: data.password,
            };
            register(user)
                .unwrap()
                .then((_) => {
                    navigate("/");
                })
                .catch((err) => {});
        } catch (_) {
            //
        }
    }

    function onNavigateSignUp() {
        navigate("/login");
    }

    return (
        <div className="font-playfair w-screen h-screen bg-turquoise-50">
            <div className="pt-6 px-4 md:max-w-[400px] mx-auto md:pt-24">
                <Link to={"/home"}>
                    <img src={LogoUrl} alt="Logo image" className="w-[100px]" />
                </Link>
                <h3 className="text-xl font-medium my-5">
                    Create a new account
                </h3>
                {isError && (
                    <div className="flex gap-2 items-center">
                        <ExclamationCircleIcon className="w-6 text-rose-500" />
                        <p className="text-rose-700">
                            {error?.data?.errorMessage ?? "No error Message"}
                        </p>
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Input
                            required
                            label="Email"
                            {...form.register("email")}
                            error={Boolean(form.formState.errors.email)}
                            errorMessage={
                                form.formState.errors.email &&
                                form.formState.errors.email.message
                            }
                        />
                        <Input
                            required
                            type="password"
                            label="Password"
                            {...form.register("password")}
                            error={Boolean(form.formState.errors.password)}
                            errorMessage={
                                form.formState.errors.password &&
                                form.formState.errors.password.message
                            }
                        />
                        <Input
                            required
                            type="password"
                            label="Confirm Password"
                            {...form.register("confirmPassword")}
                            error={Boolean(
                                form.formState.errors.confirmPassword
                            )}
                            errorMessage={
                                form.formState.errors.confirmPassword &&
                                form.formState.errors.confirmPassword.message
                            }
                        />

                        <Button
                            type="submit"
                            variant="clientDefault"
                            className="w-full mt-16"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
                <div className="flex items-center gap-4 my-4">
                    <hr className="w-full bg-black/30 h-[1.5px]" />
                    <span>or</span>
                    <hr className="w-full bg-black/30 h-[1.5px]" />
                </div>
                <GoogleLoginButton />
                <div className="text-sm flex items-center">
                    <p>Already have an account?</p>
                    <Button
                        type="button"
                        variant="link"
                        className="ml-0 pl-1 text-sm"
                        onClick={onNavigateSignUp}
                    >
                        Sign in now!
                    </Button>
                </div>
            </div>
        </div>
    );
}
