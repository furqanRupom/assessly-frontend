import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
            providesTags:['user']
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: "/user/profile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags:['user']
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/user/change-password",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['user']
        }),
    }),
})
export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useChangePasswordMutation,
} = userApi;