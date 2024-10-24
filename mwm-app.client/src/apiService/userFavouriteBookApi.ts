import { api } from "./bookApi";
import { UserFavouriteBook, UserFavouriteRequest } from "./types";

export const userFavouriteBookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // User Favourite
        createUserFavourite: builder.mutation<
            UserFavouriteBook,
            UserFavouriteRequest
        >({
            query: (bookId) => ({
                url: "UserFavouriteBooks",
                method: "POST",
                body: bookId,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data: newFavourite } = await queryFulfilled;
                    dispatch(
                        userFavouriteBookApi.util.updateQueryData(
                            "getUserFavourites",
                            undefined,
                            (draft) => {
                                return [newFavourite, ...draft];
                            }
                        )
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        getUserFavourites: builder.query<UserFavouriteBook[], void>({
            query: () => ({
                url: `UserFavouriteBooks`,
                method: "GET",
            }),
        }),
        deleteUserFavourite: builder.mutation<void, string>({
            query: (bookId) => ({
                url: `UserFavouriteBooks/${bookId}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        userFavouriteBookApi.util.updateQueryData(
                            "getUserFavourites",
                            undefined,
                            (draft) => {
                                return draft.filter(
                                    (b) => b.book.id !== requestBody
                                );
                            }
                        )
                    );
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
    }),
});

export const {
    useCreateUserFavouriteMutation,
    useGetUserFavouritesQuery,
    useDeleteUserFavouriteMutation,
} = userFavouriteBookApi;
