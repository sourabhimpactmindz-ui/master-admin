import { baseApi } from "./baseapi";


export const ProjectApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getProjects : builder.query({
            query : () => ({
                url : "/project/get",
                method : "GET"
            }),
            providesTags : ["Projects"]
        }),

        updateProject : builder.mutation({
            query : ({projectId , status}) => ({
                 url : `/project/${projectId}`,
                 method : "PATCH",
                 body : {
                    status
                 }
            }),
            invalidatesTags : ["Projects"]
           
        }),
        addProject : builder.mutation({
        query : (data) => ({
            url : "/project/create",
            method : "POST",
            body : data
        }),
        invalidatesTags : ["Projects"]
    }),

    deleteProject : builder.mutation({
        query : (projectId) => ({
            url : `/project/${projectId}`,
            method : "DELETE",
        }),
        invalidatesTags : ["Projects"]
    })

    }),
    
    
})

export const  {useGetProjectsQuery , useUpdateProjectMutation,useAddProjectMutation,useDeleteProjectMutation} = ProjectApi;