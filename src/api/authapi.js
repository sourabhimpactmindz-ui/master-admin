import { baseApi } from "./baseapi";

export const AuthApi = baseApi.injectEndpoints({
  endpoints : (builder) => ({
        loginAdmin : builder.mutation({
            query : (credentials) => ({
                url : "/master/login",
                method : "POST",
                body : credentials,
            }),
})
})
})


export const {useLoginAdminMutation} = AuthApi;