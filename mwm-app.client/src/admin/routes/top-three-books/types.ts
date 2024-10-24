import { Book } from "@/types/dataType";
import { z } from "zod";

export const TopThreeBooksValidator = z
    .object({
        first: z.string().min(1, { message: "This is required" }),
        second: z.string().min(1, { message: "This is required" }),
        third: z.string().min(1, { message: "This is required" }),
    })
    .refine(
        (data) => {
            const { first, second, third } = data;
            return first !== second && first !== third && second !== third;
        },
        {
            message: "Please select three different books",
            path: ["first", "second", "third"],
        }
    );

export type TopThreeBooksPayload = z.infer<typeof TopThreeBooksValidator>;

export type TopBookRequest = {
    bookId: string;
    ranking: number;
};

export type TopBook = {
    book: Book;
    ranking: number;
};
