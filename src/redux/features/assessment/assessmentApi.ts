// redux/features/assessment/assessmentApi.ts
import { baseApi } from '@/redux/api/baseApi';
import type { StartAssessmentResponse, SubmitAssessmentResponse, SubmitAssessmentRequest } from '@/interfaces/assessment';

interface StartAssessmentRequest {
    studentId: string;
    step: number;
}

const assessmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        startAssessment: builder.mutation<StartAssessmentResponse, StartAssessmentRequest>({
            query: (data) => ({
                url: "/assessment/start-assessment",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['assessment']
        }),
        submitAssessment: builder.mutation<SubmitAssessmentResponse, SubmitAssessmentRequest>({
            query: (data) => ({
                url: "/assessment/submit-assessment",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['assessment']
        }),
        getAssessment: builder.query({
            query: (id) => `/assessment/${id}`
        }),
        getStudentAssessments: builder.query({
            query: () => "/assessment/results",
            providesTags: ['assessment']
        })
    })
});

export const {
    useStartAssessmentMutation,
    useSubmitAssessmentMutation,
    useGetAssessmentQuery,
    useGetStudentAssessmentsQuery
} = assessmentApi;