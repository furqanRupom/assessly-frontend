// services/assessmentApi.ts
import type { AssessmentData, AssessmentResults, StartAssessmentResponse, StudentAssessment, SubmitAssessmentRequest } from '@/interfaces/assessment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const assessmentApi = createApi({
    reducerPath: 'assessmentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/assessments/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Assessment'],
    endpoints: (builder) => ({
        startAssessment: builder.mutation<StartAssessmentResponse, number>({
            query: (step) => ({
                url: 'start',
                method: 'POST',
                body: { step },
            }),
            invalidatesTags: ['Assessment'],
        }),
        submitAssessment: builder.mutation<AssessmentResults, SubmitAssessmentRequest>({
            query: (body) => ({
                url: 'submit',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Assessment'],
        }),
        getAssessment: builder.query<AssessmentData, string>({
            query: (id) => `${id}`,
            providesTags: ['Assessment'],
        }),
        getStudentAssessments: builder.query<StudentAssessment[], void>({
            query: () => 'student-results',
            providesTags: ['Assessment'],
        }),
    }),
});

export const {
    useStartAssessmentMutation,
    useSubmitAssessmentMutation,
    useGetAssessmentQuery,
    useGetStudentAssessmentsQuery
} = assessmentApi;