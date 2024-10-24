import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon } from "@heroicons/react/24/solid";
import PDFUrl from "@/assets/testing-pdf.pdf";
import { Book } from "@/types/dataType";

type BookPreviewProps = {
    book: Book;
};

export default function BookPreview(props: BookPreviewProps) {
    const { book } = props;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outlineClient"
                    className="gap-2 text-sm group w-full max-w-[240px]"
                >
                    <EyeIcon className="w-5 text-client-primary-button group-hover:text-white" />
                    <span>Preview</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95%] md:max-w-[70%] max-h-none h-[80%] flex flex-col top-[10%] translate-y-0">
                <DialogHeader>
                    <DialogTitle>{book.title} Preview</DialogTitle>
                </DialogHeader>
                <div className="flex-1">
                    <iframe
                        src={book.previewUrl ?? ""}
                        className="w-full h-full"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
