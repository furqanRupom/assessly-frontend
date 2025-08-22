import type { IQueryParams } from "../../../interfaces/admin.interface";
import type { IResponse } from "../../../interfaces/interface";
import { baseApi } from "../../api/baseApi";
import type { IUser } from "../auth/authSlice";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmins: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: IQueryParams) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: "/admin/admins",
                    method: "GET",
                    params
                }
            },
            transformResponse: (response: IResponse<IUser[]>) => {
                console.log(response)
                return {
                    meta: response.data,
                    data: response.data
                }
            }
        }),
        getAllSupervisors: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: IQueryParams) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: "/admin/supervisors",
                    method: "GET",
                    params
                }
            },
            transformResponse: (response: IResponse<IUser[]>) => {
                return {
                    meta: response.data,
                    data: response.data
                }
            }
        }),
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: IQueryParams) => {
                        params.append(item?.name, item.value as string);
                    });
                }
                return {
                    url: "/admin/students",
                    method: "GET",
                    params
                }
            },
            transformResponse: (response: IResponse<IUser[]>) => {
                return {
                    meta: response.meta,
                    data: response.data
                }
            }
        }),
        getDailyUserRegistrations: builder.query({
            query: (days = 30) => {
                const params = new URLSearchParams();
                if (days) {
                    params.append('days', days.toString());
                }
                return {
                    url: "/admin/user-registrations/daily",
                    method: "GET",
                    params
                }
            },
            transformResponse: (response: IResponse<any>) => {
                return response.data;
            }
        }),

        getUserRegistrationStats: builder.query({
            query: () => {
                return {
                    url: "/admin/user-registrations/stats",
                    method: "GET"
                }
            },
            transformResponse: (response: IResponse<any>) => {
                return response.data;
            }
        }),
        getUsersCount: builder.query({
            query: () => {
                return {
                    url: "/admin/users-count", 
                    method: "GET"
                }
            },
            transformResponse: (response: IResponse<any>) => {
                return response.data;
            }
        }),
        deleteUser:builder.mutation({
          query:(id:string)=> ({
            url:`/admin/delete-user/${id}`,
            method:"DELETE"
          })
        }),
        updateUser:builder.mutation({
            query:({data,id}) => ({
                url:`/admin/update-user/${id}`,
                method:"PUT",
                body:data
            })
        })
    })
})
export const { useGetAllAdminsQuery, useGetAllStudentsQuery, useGetAllSupervisorsQuery, useGetDailyUserRegistrationsQuery, useGetUserRegistrationStatsQuery,useGetUsersCountQuery,useDeleteUserMutation,useUpdateUserMutation } = adminApi