import { TopBook, TopBookRequest } from "@/admin/routes/TopThreeBooks/types";
import { UserAuthPayload } from "@/user/routes/login/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    AuthorPayload,
    CategoryPayload,
} from "../admin/routes/ManageBooks/types";
import { Author, Book, Category } from "../types/dataType";
import {
    AdminResponse,
    BookAPIPayload,
    BookRequest,
    PaginatedResponse,
} from "./types";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:5173/api/",
        prepareHeaders: (headers, { getState }) => {
            //By default, if we have a token in the store, let's use that for authenticated requests
            const token = localStorage.getItem("userToken");
            if (token) {
                const parsedToken = JSON.parse(token);
                headers.set("authorization", `Bearer ${parsedToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Book
        createBook: builder.mutation<Book, BookAPIPayload>({
            query: (book) => ({
                url: "Books",
                method: "POST",
                body: book,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: newBook } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData("getBooks", {}, (draft) => {
                            return [newBook, ...draft];
                        })
                    );
                } catch (err) {
                    console.log("update cahced books error: ", err);
                }
            },
        }),
        getBooks: builder.query<PaginatedResponse<Book> | Book[], BookRequest>({
            query: (requestFilter) => {
                const { pageNumber, categoryIDs, searchQuery } = requestFilter;
                let baseUri = "Books";
                if (pageNumber) {
                    baseUri += `?pageNumber=${pageNumber}`;
                }
                if (categoryIDs?.length) {
                    const encodedCategoryIds = categoryIDs
                        .map((id) => encodeURIComponent(id))
                        .join("&categoryID=");
                    if (pageNumber) {
                        baseUri += `&categoryID=${encodedCategoryIds}`;
                    } else {
                        baseUri += `?categoryID=${encodedCategoryIds}`;
                    }
                }
                if (searchQuery) {
                    baseUri += `?searchQuery=${searchQuery}`;
                }
                console.log(baseUri);
                return {
                    url: baseUri,
                    method: "GET",
                };
            },
        }),
        getBookById: builder.query<Book, string>({
            query: (bookId) => ({
                url: `Books/${bookId}`,
                method: "GET",
            }),
        }),

        // Book Category
        createBookCategory: builder.mutation<Category, CategoryPayload>({
            query: (bookCategory) => ({
                url: "BookCategories",
                method: "POST",
                body: bookCategory,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedCategories } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getCategories",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedCategories);
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced categories error: ", err);
                }
            },
        }),
        getCategories: builder.query<Category[], void>({
            query: () => "BookCategories",
        }),
        deleteCategory: builder.mutation<any, string>({
            query: (id) => ({
                url: `BookCategories/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedCategories } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getCategories",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedCategories);
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced categories error: ", err);
                }
            },
        }),
        updateCategory: builder.mutation<any, Category>({
            query: (category) => ({
                url: `BookCategories/${category.id}`,
                method: "PUT",
                body: category,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedCategories } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getCategories",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedCategories);
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced categories error: ", err);
                }
            },
        }),

        // Top Books
        updateTopBooks: builder.mutation<any, TopBookRequest[]>({
            query: (topBooks) => ({
                url: "TopBooks",
                method: "POST",
                body: topBooks,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedTopBooks } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getTopBooks",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedTopBooks);
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced top books error: ", err);
                }
            },
        }),
        getTopBooks: builder.query<TopBook[], void>({
            query: () => "TopBooks",
        }),

        // Author
        createAuthor: builder.mutation<Author, AuthorPayload>({
            query: (author) => ({
                url: "Authors",
                method: "POST",
                body: author,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: newAuthor } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getAuthors",
                            void 0,
                            (draft) => {
                                return [newAuthor, ...draft];
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced authors error: ", err);
                }
            },
        }),
        getAuthors: builder.query<Author[], void>({
            query: () => "Authors",
        }),
        updateAuthor: builder.mutation<any, Author>({
            query: (author) => ({
                url: `Authors/${author.id}`,
                method: "PUT",
                body: author,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedAuthor } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getAuthors",
                            void 0,
                            (draft) => {
                                return draft?.map((author) => {
                                    if (author.id === updatedAuthor.id) {
                                        return updatedAuthor;
                                    }
                                    return author;
                                });
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced authors error: ", err);
                }
            },
        }),
        deleteAuthor: builder.mutation<any, string>({
            query: (id) => ({
                url: `Authors/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                const res = await queryFulfilled;
                if (res.meta?.response?.status === 204) {
                    // Delete success
                    dispatch(
                        api.util.updateQueryData(
                            "getAuthors",
                            undefined,
                            (draft) => {
                                return draft?.filter(
                                    (author) =>
                                        author.id !==
                                        requestBody
                                );
                            }
                        )
                    );
                }
            },
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
    // Admin
    useAdminLoginMutation,
    useAdminRegisterMutation,

    // Book
    useCreateBookMutation,
    useCreateBookCategoryMutation,
    useGetCategoriesQuery,
    useGetBooksQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useUpdateTopBooksMutation,
    useGetTopBooksQuery,
    useGetBookByIdQuery,

    // Author
    useCreateAuthorMutation,
    useGetAuthorsQuery,
    useUpdateAuthorMutation,
    useDeleteAuthorMutation,
} = api;
