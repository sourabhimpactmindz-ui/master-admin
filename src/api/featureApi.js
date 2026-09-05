import { baseApi } from "./baseapi";

export const getFeatures = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getFeature : builder.query({
            query : ({page = 1 , limit = 6}) => ({
                url : "/feature/features",
                method : "GET",
                params : {page , limit}
            }),
            providesTags : ["Feature","ProjectFeatures"]
        }),

            featureStatus : builder.mutation({
                query : ({featureId , status}) => ({
                    url : `/feature/${featureId}`,
                    method : "PATCH",
                    body : {
                        status
                    }
                }),
                invalidatesTags : ["Feature"]
            }),

            FeatureDelete : builder.mutation({
                query : (featureId) => ({
                    url : `/feature/${featureId}`,
                    method : "DELETE",
            
                }),
                invalidatesTags : ["Feature"]
            }),

            FeatureUpdate : builder.mutation({
                query : ({featureId , data}) => ({
                    url : `/feature/${featureId}`,
                    method : "PATCH",
                    body : data
                }),
                invalidatesTags : ["Feature"]
            }),

            FeatureAdd : builder.mutation({
                query : (data) => ({
                    url : "/feature/create",
                    method : "POST",
                    body : data
                }),
                invalidatesTags : ["Feature"]
            })

        })
    })

export const {useGetFeatureQuery , useFeatureStatusMutation , useFeatureDeleteMutation , useFeatureUpdateMutation , useFeatureAddMutation} = getFeatures;