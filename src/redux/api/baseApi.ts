import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", token);
        }

        return headers;
    },
});


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    tagTypes: ['user', 'auth', 'supervisor','admin','question','assessment'],
    endpoints: () => ({}),
});
