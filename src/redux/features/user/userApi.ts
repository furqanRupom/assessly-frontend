import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: "/user/profile",
                method: "PUT",
                body: data,
            }),
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/user/change-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
})
export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useChangePasswordMutation,
} = userApi;