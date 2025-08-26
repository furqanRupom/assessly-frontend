import { baseApi } from "@/redux/api/baseApi";

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCompetencyBreakdown: builder.query({
            query: () => ({
                url: "/student/competency-breakdown",
                method: "GET"
            })
        }),
        getAssessmentStats: builder.query({
            query: () => ({
                url: "/student/assessment-stats",
                method: "GET"
            })
        }),
        getScoreProgress: builder.query({
            query: () => ({
                url: "/student/score-progress",
                method: "GET"
            })
        }),
        getAssessmentHistory: builder.query({
            query: () => ({
                url: "/student/assessment-history",
                method: "GET"
            })
        }),
        getCompetencyPerformance: builder.query({
            query: () => ({
                url: "/student/competency-performance",
                method: "GET"
            })
        }),
        getStudyRecommendations: builder.query({
            query: () => ({
                url: "/student/study-recommendations",
                method: "GET"
            })
        }),
        getDailyActivity: builder.query({
            query: () => ({
                url: "/student/daily-activity",
                method: "GET"
            })
        }),
        getAssessmentResults:builder.query({
           query:() =>  ({
                url:"/assessment/student/results",
                method:"GET"
           })
        })
    })
})

export const { useGetCompetencyBreakdownQuery, useGetAssessmentStatsQuery, useGetScoreProgressQuery, useGetAssessmentHistoryQuery, useGetCompetencyPerformanceQuery, useGetStudyRecommendationsQuery, useGetDailyActivityQuery,useGetAssessmentResultsQuery } = studentApi