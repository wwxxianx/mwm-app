import { TopBook, TopBookRequest } from "@/admin/routes/TopThreeBooks/types";
import { UserAuthPayload } from "@/user/routes/login/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    AuthorPayload,
    CategoryPayload,
} from "../admin/routes/ManageBooks/types";
import { RootState } from "../lib/reduxStore";
import { Author, Book, Category } from "../types/dataType";
import {
    AdminResponse,
    BookAPIPayload,
    UserFavouriteRequest,
    UserFavouriteResponse,
    UserResponse,
} from "./types";

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

        // User Favourite
        createUserFavourite: builder.mutation<UserFavouriteResponse,UserFavouriteRequest>({
            query: (favourite) => ({
                url: "Favourites",
                method: "POST",
                body: favourite,
            }),
        }),
        getUserFavourites: builder.query<UserFavouriteResponse, string | undefined>({
            query: (userId) => ({
                url: `Favourites/${userId}`,
                method: "GET",
            }),
        }),

        // Book
        createBook: builder.mutation<Book, BookAPIPayload>({
            query: (book) => ({
                url: "Books",
                method: "POST",
                body: book,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedBooks } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getBooks",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedBooks);
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced books error: ", err);
                }
            },
        }),
        getBooks: builder.query<Book[], void>({
            query: () => "Books",
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
                    const { data: updatedAuthors } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getAuthors",
                            void 0,
                            (draft) => {
                                console.log("draft:", draft);
                                Object.assign(draft, updatedAuthors);
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
                    const { data: updatedAuthors } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getAuthors",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedAuthors);
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
                try {
                    const { data: updatedAuthors } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData(
                            "getAuthors",
                            void 0,
                            (draft) => {
                                Object.assign(draft, updatedAuthors);
                            }
                        )
                    );
                } catch (err) {
                    console.log("update cahced authors error: ", err);
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
    // User
    useLoginMutation,
    useRegisterMutation,
    useGetUserFavouritesQuery,
    useCreateUserFavouriteMutation,

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
