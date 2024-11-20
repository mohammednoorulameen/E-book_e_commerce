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
     * google authentication
     */

    GoogleAuth: builder.mutation({
        query: (userToken)=>({
            url: "/user/google-login",
            method: "POST",
            body: userToken
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
    }),

    /**
     * Add to cart
     */

    AddCart: builder.mutation({
        query:(items)=>({
            url:"/user/add-cart",
            method: 'POST',
            body: items
        }),
        invalidatesTags:['getProductsDetails',"getCartItems"]
    }),

    /**
     * get cart items 
     */

    GetCartItems: builder.query({
        query:()=> '/user/get-cart-items',
        providesTags:["getCartItems"]
    }),

    /**
     * delete cart item 
     */

    DeleteCartItem: builder.mutation({
        query:(product_id)=>({
            url:"/user/delete-cart-product",
            method:"DELETE",
            body:product_id
        }),
        invalidatesTags:["getCartItems","getProductsDetails"]
    }),

    /**
     * place order
     */

    PlaceOrder: builder.mutation({
        query:(items)=>({
            url:"/user/place-order",
            method: "POST",
            body:items
        }),
        invalidatesTags:['getCartItems','getOders']
    }),

    /**
     * get order details
     */
    getOrderDetailes: builder.query({
        query:({page,limit})=> `/user/get-order-items?page=${page}$limit=${limit}`,
        providesTags:['getOders']
    }),

    /**
     * cancel order
     */

    CancelOrder: builder.mutation({
        query:({product_id,quantity,order_id})=>({
            url:"/user/cancel-order",
            method: 'PUT',
            body:{product_id,quantity,order_id}

        }),
        invalidatesTags:['getOders','getProductsDetails','getProducts']
    })


// ----------
    })
})
export const {
useRegisterMutation,
useVerifyOtpMutation,
useResendOtpMutation,
useLoginMutation,
useGoogleAuthMutation,
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
useAddCartMutation, 
useGetCartItemsQuery,
useDeleteCartItemMutation,
usePlaceOrderMutation,
useGetOrderDetailesQuery,
useCancelOrderMutation,

} = userApi