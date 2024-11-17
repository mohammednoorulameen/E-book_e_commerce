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

       /**
     * get user profile
     */

    getUserProfile: builder.query({
        query:() =>'/user/userProfile',
        providesTags:['getUserProfile']    
       }),


    /**
     * logout
     */

    logout: builder.mutation({
        query:()=>({
            url:'/user/logout',
            method: 'POST',
        })
    }),

    /**
     * edit user detailes 
     */

    EditUserInfo: builder.mutation({
        query:(info) =>({
            url:"/user/edit-userInfo",
            method: 'POST',
            body: info
        }),
        invalidatesTags:['getUserProfile']
    }),

    /**
     * change password
     */

    ChangePass : builder.mutation({
        query:(password) => ({
            url:"/user/change-password",
            method: 'POST',
            body: password
        })
    }),

    /**
     * add address
     */

    AddAddress : builder.mutation({
        query:(form)=>({
            url:"/user/add-address",
            method: 'POST',
            body: form
        }),
        invalidatesTags:['getAddresses']
    }),

    /**
     * get address 
     */

    GetAddresses: builder.query({
        query: ()=> '/user/user-address',
        providesTags:['getAddresses']
    }),

    /**
     * edit address
     */

    EditAddress: builder.mutation({
        query:(form)=>({
            url:"/user/Edit-address",
            method: 'PUT',
            body: form
        }),
        invalidatesTags:['getAddresses']
    }),

    /**
     * delete address
     */

    DeleteAddress: builder.mutation({
        query:(address_id)=>({
            url:"/user/delete-address",
            method: 'DELETE',
            body: address_id
        }),
        invalidatesTags:['getAddress']
    })


// ----------
    })
})
export const {
useRegisterMutation,
useVerifyOtpMutation,
useResendOtpMutation,
useLoginMutation,
useGetProductsQuery,
useGetProductsDetailsQuery,
useGetUserProfileQuery,
useLogoutMutation,
useEditUserInfoMutation,
useChangePassMutation,
useAddAddressMutation,
useGetAddressesQuery,
useEditAddressMutation,
useDeleteAddressMutation,


} = userApi