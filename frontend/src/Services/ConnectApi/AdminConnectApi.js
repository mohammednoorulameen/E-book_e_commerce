import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { setAdminCredentails } from "../../Redux/Slice/AuthSlice.js";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4040/api/admin",
    credentials: "include",
    prepareHeaders: (Headers, {getState}) =>{
        const adminToken =  getState().auth.adminToken;
        if (adminToken) {
            Headers.set("authorization", `Bearer ${adminToken}`);
        }
        return Headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions);

    if(result.error && result?.error?.status === 401){
        console.log("refresh token for sending request")
        
        const refreshResult = await baseQuery("/admin/refresh-token", api, extraOptions);
        if (refreshResult.data) {
            // const token = refreshResult.data.accessToken;
            api.dispatch(setAdminCredentails({...refreshResult.data}));
            result = await baseQuery(args, api, extraOptions);
        }else{
        //    api.dispatch(logOut())
        }

    }
    return result
};


export const AdminApiInstance = createApi({
    reducerPath: "AdminApiInstance",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})

export default AdminApiInstance