import { TopBook, TopBookRequest } from "@/admin/routes/TopThreeBooks/types";
import { UserAuthPayload } from "@/user/routes/login/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    AuthorPayload,
    CategoryPayload,
} from "../admin/routes/ManageBooks/types";
import { Author, Book, Category, User } from "../types/dataType";
import {
    AdminResponse,
    AuthorWithBooks,
    BookAPIPayload,
    BookRequest,
    BookReview,
    CreateBookReviewPayload,
    PaginatedResponse,
    UpdateBookAPIPayload,
} from "./types";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:5173/api/",
        prepareHeaders: (headers, { getState }) => {
            //By default, if we have a token in the store, let's use that for authenticated requests
            const token = localStorage.getItem("userToken");
            if (token !== "undefined" && token) {
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
        updateBook: builder.mutation<Book, UpdateBookAPIPayload>({
            query: (book) => ({
                url: `Books/${book.id}`,
                method: "PUT",
                body: book,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedBook } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData("getBooks", {}, (draft) => {
                            return draft?.map((book) => {
                                if (book.id === updatedBook.id) {
                                    return updatedBook;
                                }
                                return book;
                            });
                        })
                    );
                } catch (err) {
                    console.log("update cahced books error: ", err);
                }
            },
        }),
        deleteBook: builder.mutation<void, string>({
            query: (bookID) => ({
                url: `Books/${bookID}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData("getBooks", {}, (draft) => {
                            return draft?.filter(
                                (book) => book.id !== requestBody
                            );
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
        getBookByAuthorID: builder.query<Book[], string>({
            query: (authorID) => ({
                url: `Books/Author?authorID=${authorID}`,
                method: "GET",
            }),
        }),
        getTrendingCategoryBooks: builder.query<Book[], void>({
            query: () => "Books/trendingCategoryBook",
        }),
        getFeaturedBooks: builder.query<Book[], void>({
            query: () => "Books/featuredBooks",
        }),
        getBookReviews: builder.query<BookReview[], string>({
            query: (bookID) => `BookReviews?bookID=${bookID}`,
        }),
        createBookReview: builder.mutation<BookReview, CreateBookReviewPayload>(
            {
                query: (body) => ({
                    url: "BookReviews",
                    method: "POST",
                    body: body,
                }),
                async onQueryStarted(
                    requestBody,
                    { dispatch, queryFulfilled }
                ) {
                    try {
                        const { data: newBookReview } = await queryFulfilled;
                        dispatch(
                            api.util.updateQueryData(
                                "getBookReviews",
                                requestBody.bookID,
                                (draft) => {
                                    return [newBookReview, ...draft];
                                }
                            )
                        );
                    } catch (err) {
                        console.log("update cahced categories error: ", err);
                    }
                },
            }
        ),
        getRelevantBooks: builder.query<
            Book[],
            { categoryID: string; limit: number }
        >({
            query: (request) =>
                `Books/relevant?categoryID=${request.categoryID}&limit=${request.limit}`,
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
        getTrendingCategories: builder.query<Category[], void>({
            query: () => "BookCategories/trending",
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
        getAuthorByID: builder.query<Author, string>({
            query: (authorID) => `Authors/${authorID}`,
        }),
        getAuthorsByName: builder.query<Author[], string>({
            query: (authorName) => `Authors?searchQuery=${authorName}`,
        }),
        getAuthorsWithBooks: builder.query<AuthorWithBooks[], void>({
            query: () => "Authors?include=book",
        }),
        getTrendingAuthors: builder.query<Author[], void>({
            query: () => `Authors/trending`,
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
                                    (author) => author.id !== requestBody
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

        getAllUsers: builder.query<User[], void>({
            query: () => "Users",
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
    useGetTrendingCategoriesQuery,
    useUpdateBookMutation,
    useGetTrendingCategoryBooksQuery,
    useGetFeaturedBooksQuery,
    useGetBookByAuthorIDQuery,
    useGetBookReviewsQuery,
    useCreateBookReviewMutation,
    useGetRelevantBooksQuery,
    useDeleteBookMutation,

    // Author
    useCreateAuthorMutation,
    useGetAuthorsQuery,
    useUpdateAuthorMutation,
    useDeleteAuthorMutation,
    useGetAuthorsWithBooksQuery,
    useGetAuthorsByNameQuery,
    useGetAuthorByIDQuery,
    useGetTrendingAuthorsQuery,

    // User
    useGetAllUsersQuery,
} = api;
