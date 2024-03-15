import LogoUrl from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/user/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserAuthPayload, UserAuthValidator } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/apiService/userAuthApi";

export default function Login() {
    const navigate = useNavigate();
    const [login, { isLoading, isError }] = useLoginMutation();
    const form = useForm({
        resolver: zodResolver(UserAuthValidator),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: UserAuthPayload) {
        try {
            await login(data).unwrap();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
        console.log("formData", data);
    }

    function onNavigateSignUp() {
        navigate("/sign-up");
    }

    return (
        <div className="font-playfair w-screen h-screen bg-turquoise-50">
            <div className="pt-6 px-4 md:max-w-[400px] mx-auto md:pt-24">
                <Link to={"/home"}>
                    <img src={LogoUrl} alt="Logo image" className="w-[100px]" />
                </Link>
                <h3 className="text-xl font-medium my-5">
                    Sign in to your Books account
                </h3>
                {isError && (
                    <div className="text-red-500">
                        Invalid email or password. Please try again.
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
                            className="w-full"
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
                        <Button
                            type="submit"
                            variant="clientDefault"
                            className="w-full mt-16"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            <span>Login</span>
                        </Button>
                    </form>
                </Form>
                <div className="text-sm flex items-center">
                    <p>Don't have an account?</p>
                    <Button
                        type="button"
                        variant="link"
                        className="ml-0 pl-1 text-sm underline"
                        onClick={onNavigateSignUp}
                    >
                        Sign up now!
                    </Button>
                </div>
            </div>
        </div>
    );
}
