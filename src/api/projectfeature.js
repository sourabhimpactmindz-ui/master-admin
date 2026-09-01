import { baseApi } from "./baseapi";


export const ProjectFeatureApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getProjectFeatures : builder.query({
            query : (projectId) => ({
                url : `/project/project-features/${projectId}`,
                method : "GET"
            }),
            providesTags : ["ProjectFeatures","Feature"]
        }),

        updateProjectFeatureStatus : builder.mutation({
            query : ({projectId , featureId , enabled}) => ({
                url : `/project/${projectId}/features/${featureId}`,
                method : "PATCH",
                body : {
                    enabled
                }
            }),
            invalidatesTags : ["ProjectFeatures","Feature"]
        })
    })
})

export const {useGetProjectFeaturesQuery, useUpdateProjectFeatureStatusMutation} = ProjectFeatureApi;