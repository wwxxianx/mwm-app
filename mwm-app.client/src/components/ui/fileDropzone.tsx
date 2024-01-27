import { ExclamationTriangleIcon, FolderPlusIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { cn } from "../../lib/utils";

type FileDropzoneProps = {
    label?: string;
    type: "image" | "file";
    onDrop: (acceptedFiles: any[]) => void;
    previewFileUrl?: string;
    selectedFile?: FileState;
    error?: boolean;
    errorMessage?: string;
};

export type FileState = {
    preview?: string;
    name?: string;
    file?: File;
}

export default function FileDropzone(props: FileDropzoneProps) {
    const { label, type, selectedFile, previewFileUrl, error, errorMessage, onDrop } = props;
    const acceptedFileTypes: Accept =
        type === "image" ? { "image/*": [] } : { "text/plain": [".pdf"] };
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: acceptedFileTypes,
        //onDrop: (acceptedFiles) => {
        //    const firstFile = acceptedFiles[0];
        //    setSelectedFile({
        //        preview: URL.createObjectURL(firstFile),
        //        name: firstFile.name,
        //    });
        //},
        onDrop: onDrop,
    });

    function ImageIcon() {
        const imageIconStyle = "w-[90px] text-indigo-300";
        if (type === "image") {
            return <PhotoIcon className={imageIconStyle} />;
        } else {
            return <FolderPlusIcon className={imageIconStyle} />;
        }
    }

    const RenderedImage = useCallback(() => {
        if (selectedFile) {
            return (
                <div key={selectedFile.name} className="max-w-[180px]">
                    {type === "image" ? (
                        <img
                            src={selectedFile.preview}
                            // Revoke data uri after image is loaded
                            onLoad={() => {
                                URL.revokeObjectURL(selectedFile?.preview);
                            }}
                        />
                    ) : (
                        <p className="text-center text-sm text-slate-600">
                            {selectedFile?.name}
                        </p>
                    )}
                </div>
            );
        }

        if (previewFileUrl) {
            return (
                <div className="max-w-[180px]">
                    <img
                        src={previewFileUrl}
                    />
                </div>
            );
        }

        return <ImageIcon />;
    }, [selectedFile, previewFileUrl]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => URL.revokeObjectURL(selectedFile?.preview);
    }, []);

    return (
        <section>
            <p className="text-slate-600 text-sm font-normal mb-2">{label}</p>
            <div
                {...getRootProps({
                    className:
                        "dropzone",
                })}
                className={cn("dropzone flex flex-col items-center justify-center gap-1 px-2 py-8 bg-slate-50 rounded-md border-slate-200 border-[1px] cursor-pointer hover:opacity-80", {
                    "border-2 border-red-500": error,
                })}
            >
                <input {...getInputProps()} />
                <RenderedImage />
                <p className="text-slate-800 font-medium">
                    Drop or Select file
                </p>
                <p className="text-xs text-center text-slate-500">
                    Drop file here or click{" "}
                    <span className="text-indigo-500 underline">browse</span>{" "}
                    thorough your machine {type === "file" && "(only .pdf)"}
                </p>
                <div className="flex items-center text-red-500 text-sm gap-1">
                    {error && (
                        <ExclamationTriangleIcon className="w-4 text-red-500" />
                    )}
                    <p>{errorMessage}</p>
                </div>
            </div>
        </section>
    );
}
