import { Button } from "@/components/ui/button";
import { Input } from "@/user/components/Input";

export default function ChangePasswordPage() {
    return (
        <div className="pb-16 px-4 md:container">
            <h5 className="hidden lg:block text-lg font-medium">
                Manage your password
            </h5>
            <form className="max-w-lg">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm New Password" type="password" />
                <Button variant={"clientDefault"} className="mt-8">
                    Confirm
                </Button>
            </form>
        </div>
    );
}
