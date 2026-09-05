import { baseApi } from "./baseapi";

export const DashApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        dashboardOver : builder.query({
            query : () => ({
                url : "/admin/dashboard",
                method : "GET"
            }),
            providesTags : ["Dashboard" , "Client" , "Projects" , "Feature"]
        }),

        addClient : builder.mutation({
            query : (data) => ({
                url : "/client/register",
                method : "POST",
                body : data
            }),
            invalidatesTags : ["Client"]
        }),


        updateClient : builder.mutation({
            query : ({clientId , status}) => ({
                url : `/client/${clientId}`,
                method : "PATCH",
                body : {
                    status
                }
            }),
            invalidatesTags : ["Client","Projects"]
        }),

        deleteClient : builder.mutation({
            query : (clientId) => ({
                url : `/client/${clientId}`,
                method : "DELETE",

            }),
            invalidatesTags : ["Client"]
        }),

        gelClient : builder.query({
            query : ({page = 1 , limit = 6}) => ({
                url : "/client/all",
                method : "GET",
                params : {page , limit}
            }),
            providesTags : ["Client"]
        }),
        


        
    })
})

export const {useDashboardOverQuery , useAddClientMutation , useDeleteClientMutation , useUpdateClientMutation , useGelClientQuery} = DashApi;