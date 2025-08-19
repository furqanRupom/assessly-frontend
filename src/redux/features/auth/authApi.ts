import { baseApi } from "../../api/baseApi";



/* create request for user login  */


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            }),
        }),
        emailVerify: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: data,
            }),
        }),
        resendVerifyCode: builder.mutation({
            query: (data) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body: data,
            }),
        }),
        ForgotPassword:builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `/auth/reset-password?token=${data.token}`,
                method: "POST",
                body: {
                    newPassword: data.newPassword,
                    userId: data.userId,
                },
            }),
        }),

    }),
});

export const { useLoginMutation,useRegisterMutation,useEmailVerifyMutation,useResendVerifyCodeMutation, useForgotPasswordMutation,useResetPasswordMutation } = authApi