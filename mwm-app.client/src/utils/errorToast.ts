import { toast } from "@/components/ui/use-toast";

export default function displayErrorToast(err: any) {
    toast({
        variant: "destructive",
        title: err?.data?.errorTitle ?? "Something went wrong",
        description:
            err?.data?.errorMessage ??
            "Something went wrong, please try again later.",
    });
}
