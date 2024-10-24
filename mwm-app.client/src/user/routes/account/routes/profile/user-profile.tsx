import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from "@/apiService/userProfileApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Input } from "@/user/components/Input";
import { getFileDownloadUrl } from "@/utils/getFileDownloadUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserProfilePayload, UserProfileValidator } from "./validator";

export default function UserProfile() {
    const user = useAppSelector((state) => state.user.user);
    const { toast } = useToast();
    const { data: userProfile } = useGetUserProfileQuery(user ? user.id : 0);
    const [selectedImageFile, setSelectedImageFile] = useState<any>(null);
    const [updateProfile, { isLoading: isUpdatingProfile }] =
        useUpdateUserProfileMutation();

    const form = useForm<UserProfilePayload>({
        resolver: zodResolver(UserProfileValidator),
    });

    function handleImageFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedImageFile({ file: file });

            // Read the selected file and generate a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImageFile((prev) => ({
                    ...prev,
                    previewUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    async function onSubmit(data: UserProfilePayload) {
        let userProfile = { ...data, userID: user?.id };
        if (selectedImageFile?.file) {
            const profielImageUrl = await getFileDownloadUrl(
                "user-profile",
                data.fullName,
                selectedImageFile.file
            );
            userProfile = { ...userProfile, profileImageUrl: profielImageUrl };
        }
        if (data.birthDate) {
            let birhDateISO = formatISO(data.birthDate, "basic");
            userProfile = { ...userProfile, birthDate: birhDateISO };
        }

        updateProfile(userProfile)
            .unwrap()
            .then((_) => {
                toast({
                    variant: "default",
                    title: "Profile updated successfully!",
                });
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong, please try again later.",
                });
            });
    }

    useEffect(() => {
        if (userProfile) {
            if (userProfile.birthDate) {
                form.setValue("birthDate", new Date(userProfile.birthDate));
            }
            form.setValue("fullName", userProfile.fullName);
            form.setValue("email", userProfile.email);
            form.setValue("phoneNumber", userProfile.phoneNumber);
            form.setValue("gender", userProfile.gender);
            form.setValue("profileImageUrl", userProfile.profileImageUrl);
        }
    }, [userProfile]);

    return (
        <div className="pb-16 px-4 md:container">
            <h5 className="text-lg font-medium">My Profile</h5>
            <p className="text-black/60 text-sm">
                Manage and protect your account profile here
            </p>
            <div className="md:flex gap-10">
                {/* User Profile Image */}
                <div className="space-y-1 md:space-y-3 flex flex-col items-center my-4">
                    <Avatar className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] items-center justify-center bg-slate-200">
                        <AvatarImage
                            src={
                                selectedImageFile?.previewUrl
                                    ? selectedImageFile.previewUrl
                                    : userProfile?.profileImageUrl
                                    ? userProfile?.profileImageUrl
                                    : undefined
                            }
                        />
                        <AvatarFallback>
                            {userProfile?.fullName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <label
                        htmlFor="fileInput"
                        className={cn(
                            buttonVariants({ variant: "outlineClient" })
                        )}
                    >
                        Select Image
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleImageFileChange}
                        className="hidden"
                    />
                    <div className="text-xs text-black/60">
                        <p>File size: maximum 1MB</p>
                        <p>File type: .jpg, .png, .jpeg</p>
                    </div>
                </div>

                {/* User Account Details */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4 md:gap-8 flex-1 md:max-w-[800px]"
                    >
                        <Input
                            label="Full Name:"
                            defaultValue={form.getValues("fullName")}
                            className="col-span-2 md:col-span-1"
                            {...form.register("fullName")}
                            error={Boolean(form.formState.errors.fullName)}
                            errorMessage={
                                form.formState.errors.fullName?.message
                            }
                        />
                        <Input
                            label="Email:"
                            className="col-span-2 md:col-span-1"
                            defaultValue={form.getValues("email")}
                            {...form.register("email")}
                            error={Boolean(form.formState.errors.email)}
                            errorMessage={form.formState.errors.email?.message}
                        />
                        <Input
                            label="Phone Number:"
                            defaultValue={form.getValues("phoneNumber") ?? ""}
                            placeholder="6011293812"
                            {...form.register("phoneNumber")}
                            error={Boolean(form.formState.errors.phoneNumber)}
                            errorMessage={
                                form.formState.errors.phoneNumber?.message
                            }
                        />

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="shadow-none border-none px-0 flex flex-col justify-start">
                                            <p className="inline-block text-black/60 pointer-events-none text-sm mt-2">
                                                Date of Birth:
                                            </p>
                                            <div className="flex items-center border-b-[1px] border-black pb-1">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-2 col-span-2">
                                    <FormLabel className="text-sm text-black/60">
                                        Gender:
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultChecked={field.value}
                                            defaultValue={field.value}
                                            className="flex space-x-3"
                                        >
                                            <FormItem className="flex items-center space-y-0 gap-1">
                                                <FormControl>
                                                    <RadioGroupItem value="Male" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Male
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-y-0 gap-1">
                                                <FormControl>
                                                    <RadioGroupItem value="Female" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Female
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-y-0 gap-1">
                                                <FormControl>
                                                    <RadioGroupItem value="Others" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Others
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant={"clientDefault"}
                            className="ml-auto col-span-2 mt-5"
                            isLoading={isUpdatingProfile}
                            disabled={isUpdatingProfile}
                        >
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
