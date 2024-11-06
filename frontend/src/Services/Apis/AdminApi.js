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
        body: form,
      }),
    }),

    /*
    get query accesstoken
    */
    adminrefreshtoken: builder.query({
      query: () => ({
        url: "/refresh",
        transformResponse: (response) => response.access_token,
      }),
    }),

    /*
    get user list
    */
    getUserList: builder.query({
      query: () => "/adminuserslist",
      providesTags: ['getUsersLists'],
    }),

    /*
    block user
    */
    blockuser: builder.mutation({
      query: ({ id }) => ({
        url: "/adminblockuser",
        method: "POST",
        body: { id },
      }),
      invalidatesTags:['getUsersLists']
    }),

  }), 
});

export const {
  useAdminLoginMutation,
  useGetUserListQuery,
  useBlockuserMutation,
} = AdminApi;
