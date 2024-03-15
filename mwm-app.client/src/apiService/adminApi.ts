import { AdminPayload } from "@/admin/routes/ManageAdmins/types";
import { Admin } from "@/types/dataType";
import { UserAuthPayload } from "@/user/routes/login/types";
import { api } from "./bookApi";
import { AdminResponse } from "./types";

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmins: builder.query<Admin[], void>({
            query: () => "Admins",
        }),
        adminLogin: builder.mutation<AdminResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Admins/login",
                method: "POST",
                body: credentials,
            }),
        }),
        registerAdmin: builder.mutation<Admin, AdminPayload>({
            query: (credentials) => ({
                url: "Admins/register",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: newAdmin } = await queryFulfilled;
                    dispatch(
                        adminApi.util.updateQueryData(
                            "getAllAdmins",
                            undefined,
                            (draft) => {
                                return [newAdmin, ...draft];
                            }
                        )
                    );
                } catch (err) {
                    console.log("Failed to update cached admins");
                }
            },
        }),
        updateAdmin: builder.mutation<void, Admin>({
            query: (admin) => ({
                url: `Admins/${admin.id}`,
                method: "PUT",
                body: admin,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        adminApi.util.updateQueryData(
                            "getAllAdmins",
                            undefined,
                            (draft) => {
                                return draft?.map((admin) => {
                                    if (admin.id == requestBody.id) {
                                        return requestBody;
                                    }
                                    return admin;
                                });
                            }
                        )
                    );
                } catch (err) {
                    console.log("Failed to update cached admins");
                }
            },
        }),
        deleteAdmin: builder.mutation<void, string>({
            query: (adminID) => ({
                url: `Admins/${adminID}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        adminApi.util.updateQueryData(
                            "getAllAdmins",
                            undefined,
                            (draft) => {
                                return draft?.filter(
                                    (admin) => admin.id !== requestBody
                                );
                            }
                        )
                    );
                } catch (err) {
                    console.log("Failed to update cached admins");
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useAdminLoginMutation,
    useRegisterAdminMutation,
    useGetAllAdminsQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
} = adminApi;
