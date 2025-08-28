// redux/features/assessment/questionApi.ts
import type {  Question } from '@/interfaces/assessment';
import { baseApi } from '@/redux/api/baseApi';
import type { IQueryParams } from '@/interfaces/admin.interface';
import type { IResponse } from '@/interfaces/interface';

const questionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: (args: IQueryParams[]) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: IQueryParams) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: "/question",
                    method: "GET",
                    params
                }
            },
            transformResponse: (response: IResponse<Question[]>) => {
                return {
                    meta: response.meta,
                    data: response.data
                }
            },
            providesTags: ['question']
        }),
        getQuestionsByAssessment: builder.query({
            query: (assessmentId: string) => ({
                url: `/assessment/questions/${assessmentId}`,
                method: "GET",
            }),
        })
    })
});

export const { useGetQuestionsQuery,useGetQuestionsByAssessmentQuery } = questionsApi;