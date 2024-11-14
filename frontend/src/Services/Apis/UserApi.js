import { baseQueryWithReauth } from "../ConnectApi/Api.js";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    /*
    user registration api
    */
        register: builder.mutation({
            query: (form) => ({
                url: "/user/register",
                method: "POST",
                body: form
            })
        }),

    /*
    user verify Otp
    */
        verifyOtp: builder.mutation({
            query: (otpData) =>({
                url: "/user/verifyOtp",
                method: "POST",
                body: otpData
            })
        }),

    /*
    user resend Otp 
    */

    resendOtp: builder.mutation({
        query: (userId) =>({
            url: "/user/resendOtp",
            method: "POST",
            body: userId
        })
    }),

    /*
    user login 
    */

    login: builder.mutation({
        query: (form)=> ({
            url: "/user/login",
            method: "POST",
            body: form
        })
    }),

    /**
     * get products
     * product pagination
     */

    getProducts: builder.query({
        query:({page,limit})=>`/user/list-Products?page=${page}$limit=${limit}`,
        providesTags:['getProducts']
      }),

      /**
     * get products detailes
     * 
     */

    getProductsDetails: builder.query({
        query:(product_id)=>`/user/Products-details?product_id=${product_id}`,
        providesTags:['getProductsDetails']
      }),






    })
})
export const {
useRegisterMutation,
useVerifyOtpMutation,
useResendOtpMutation,
useLoginMutation,
useGetProductsQuery,
useGetProductsDetailsQuery

} = userApi