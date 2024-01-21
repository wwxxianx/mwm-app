import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

type FilePath = "book-cover" | "book-preview" | "author-profile" | "user-profile";

export function getFileDownloadUrl(filePath: FilePath, title: string, file: File): Promise<string> {
    const storage = getStorage();
    const imageRef = ref(storage, `${filePath}/${title}`);

    return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
            },
            (error) => {
                // Handle unsuccessful uploads
                reject(error);
            },
            async () => {
                // Handle successful uploads on complete
                try {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadUrl);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
}