import AdminApiInstance from "../ConnectApi/AdminConnectApi.js";


export const AdminApi = AdminApiInstance.injectEndpoints({
    endpoints: (builder) => ({

    /*
    admin login api
    */
   
    adminLogin: builder.mutation({
        query: (form) => ({
            url: "/adminlogin",
            method: "POST",
            body: form
        })
    }),

    /*
    get user list
    */

    getUserList: builder.query({
        query:()=> ({
            url: "/adminuserslist",
            method: "GET",
            
        }),
        providesTags:['getUserLists']
    })

    })
})

export const {
useAdminLoginMutation,
useGetUserListQuery,
} = AdminApiInstance