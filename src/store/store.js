import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseapi";
import authReducer from './Slicer/authSlice'

export const store = configureStore({
        reducer: {
            auth : authReducer,
            [baseApi.reducerPath]:
                baseApi.reducer,

        },

        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(
                baseApi.middleware
            ),
})

