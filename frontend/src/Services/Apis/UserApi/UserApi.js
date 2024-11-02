import apiInstance from "../../ConnectApi/Api.js";

export const UserApi = apiInstance.injectEndpoints({
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

    /*
    */





    })
})
export const {
useRegisterMutation,
useVerifyOtpMutation,
useResendOtpMutation,
useLoginMutation,

} = UserApi