import apiInstance from "../../ConnectApi/Api.js";

export const UserApi = apiInstance.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (form) => ({
                url:"/user/register",
                method:"POST",
                body: form
            })
        })
    })
})
export const {
useRegisterMutation
} = UserApi