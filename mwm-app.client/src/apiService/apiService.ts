import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/reduxStore";
import { AdminResponse, BookAPIPayload, UserResponse } from "./types";
import { UserAuthPayload } from "@/user/routes/login/types";
import { Author, Book, Category } from "../types/dataType";
import { BookPayload } from "../admin/routes/CreateBook/types";
import { AuthorPayload, CategoryPayload } from "../admin/routes/ManageBooks/types";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:5173/api/",
        prepareHeaders: (headers, { getState }) => {
            //By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // User
        login: builder.mutation<UserResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Users/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation<UserResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Users/register",
                method: "POST",
                body: credentials,
            }),
        }),

        // Book
        createBook: builder.mutation<Book, BookAPIPayload>({
            query: (book) => ({
                url: "Books",
                method: "POST",
                body: book
            }),
        }),
        createBookCategory: builder.mutation<Category, CategoryPayload>({
            query: (bookCategory) => ({
                url: "BookCategories",
                method: "POST",
                body: bookCategory,
            }),
        }),
        getBooks: builder.query<Book[], void>({
            query: () => "Books",
        }),
        getCategories: builder.query<Category[], void>({
            query: () => "BookCategories"
        }),
        deleteBook: builder.mutation<any, string>({
            query: (id) => ({
                url: `BookCategories/${id}`,
                method: "DELETE",
            })
        }),
        updateCategory: builder.mutation<any, Category>({
            query: (category) => ({
                url: `BookCategories/${category.id}`,
                method: "PUT",
                body: category,
            })
        }),

        // Author
        createAuthor: builder.mutation<Author, AuthorPayload>({
            query: (author) => ({
                url: "Authors",
                method: "POST",
                body: author,
            }),
        }),
        getAuthors: builder.query<Author[], void>({
            query: () => "Authors"
        }),
        updateAuthor: builder.mutation<any, Author>({
            query: (author) => ({
                url: `Authors/${author.id}`,
                method: "PUT",
                body: author,
            })
        }),


        // Admin
        adminLogin: builder.mutation<AdminResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Admins/login",
                method: "POST",
                body: credentials,
            }),
        }),
        adminRegister: builder.mutation<AdminResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Admins/register",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const {
    // User
    useLoginMutation,
    useRegisterMutation,

    // Admin
    useAdminLoginMutation,
    useAdminRegisterMutation,

    // Book
    useCreateBookMutation,
    useCreateBookCategoryMutation,
    useGetCategoriesQuery,
    useGetBooksQuery,
    useDeleteBookMutation,
    useUpdateCategoryMutation,

    // Author
    useCreateAuthorMutation,
    useGetAuthorsQuery,
    useUpdateAuthorMutation,
} = api;
