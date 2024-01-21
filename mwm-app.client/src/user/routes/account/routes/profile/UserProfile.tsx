import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { users } from "@/lib/fakeData";
import { Input } from "@/user/components/Input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserProfile() {
    const [date, setDate] = useState<Date>();
    const form = useForm();

    return (
        <div className="pb-16 px-4 md:container">
            <h5 className="text-lg font-medium">My Profile</h5>
            <p className="text-black/60 text-sm">
                Manage and protect your account profile here
            </p>
            <div className="md:flex gap-10">
                {/* User Profile Image */}
                <div className="space-y-1 md:space-y-3 flex flex-col items-center my-4">
                    <Avatar className="w-[70px] h-[70px] md:w-[100px] md:h-[100px]">
                        <AvatarImage src={users[0].profileImageUrl} />
                    </Avatar>
                    <Button variant="outlineClient">Select Image</Button>
                    <div className="text-xs text-black/60">
                        <p>File size: maximum 1MB</p>
                        <p>File type: .jpg, .png, .jpeg</p>
                    </div>
                </div>

                {/* User Account Details */}
                <Form {...form}>
                    <form className="grid grid-cols-2 gap-4 md:gap-8 flex-1 md:max-w-[800px]">
                        <Input
                            value="Emily Koh"
                            label="Full Name:"
                            className="col-span-2 md:col-span-1"
                        />
                        <Input
                            value="emily002@gmail.com"
                            label="Email:"
                            className="col-span-2 md:col-span-1"
                        />
                        <Input
                            value="emily002@gmail.com"
                            label="Phone Number:"
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="shadow-none border-none px-0 flex flex-col justify-start">
                                    <p className="inline-block text-black/60 pointer-events-none text-sm mt-2">
                                        Date of Birth:
                                    </p>
                                    <div className="flex items-center border-b-[1px] border-black pb-1">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                            <span className="text-sm">
                                                {format(date, "PPP")}
                                            </span>
                                        ) : (
                                            <span className="text-sm">
                                                Pick a date
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-2 col-span-2">
                                    <FormLabel className="text-sm text-black/60">
                                        Gender:
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-x-3"
                                        >
                                            <FormItem className="flex items-center space-y-0 gap-1">
                                                <FormControl>
                                                    <RadioGroupItem value="all" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Male
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-y-0 gap-1">
                                                <FormControl>
                                                    <RadioGroupItem value="mentions" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Female
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-y-0 gap-1">
                                                <FormControl>
                                                    <RadioGroupItem value="none" />
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
                        >
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
