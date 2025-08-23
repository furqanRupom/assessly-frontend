// services/questionsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Question } from '@/interfaces/assessment';

export const questionsApi = createApi({
    reducerPath: 'questionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/questions/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Question'],
    endpoints: (builder) => ({
        getQuestions: builder.query<Question[], string[]>({
            query: (questionIds) => ({
                url: 'batch',
                method: 'POST',
                body: { questionIds },
            }),
            providesTags: ['Question'],
        }),
    }),
});

export const { useGetQuestionsQuery } = questionsApi;