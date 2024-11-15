// import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
// import { setCredentials } from "../../Redux/Slice/AuthSlice.js";

// const baseQuery = fetchBaseQuery({
//     baseUrl: "http://localhost:4040/api",
//     credentials: "include",
//     prepareHeaders: (Headers, {getState}) =>{
//         const token =  getState().auth.token;
//         if (token) Headers.set("authorization", `Bearer ${token}`);
//         return Headers;
//     },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) =>{
//     let result = await baseQuery(args, api, extraOptions);

//     if(result?.error?.status === 401){
//         console.log("refresh token for sending request")
        
//         const refreshResult = await baseQuery("/api/refresh", api, extraOptions);
//         if (refreshResult?.data) {
//             const token = refreshResult.data.accessToken;
//             api.dispatch(setCredentials(token));
//             result = await baseQuery(args, api, extraOptions);
//         }else{
//             if (refreshResult?.error?.status === 401) {
//                 refreshResult.error.data.message = "your  loggin expired"
//             }
//             return refreshResult
//         }

//     }
//     return result
// };


// const apiInstance = createApi({
//     reducerPath: "apiInstance",
//     baseQuery: baseQueryWithReauth,
//     endpoints: () => ({}),
// })

// export default apiInstance




import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { clearUser } from "../../Redux/Slice/UserSlice/UserSlice";
// import { setCredentials } from "../../Redux/Slice/AuthSlice.js";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4040/api",
    credentials: "include",
    prepareHeaders: (Headers, {getState}) =>{
        const token = localStorage.getItem('userToken')
        if (token) {
            Headers.set("authorization", `Bearer ${token}`);
        }
        return Headers;
    },
});

export const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions);

    if(result.error && result?.error?.status === 401){
        console.log("refresh token for sending request")
        
        const refreshResult = await baseQuery("/user/refresh-token", api, extraOptions);
        if (refreshResult.data) {
            localStorage.setItem('userToken',refreshResult.data.accessToken)
            result = await baseQuery(args, api, extraOptions);
        }else{
        localStorage.removeItem('userToken');
        api.dispatch(clearUser()); 
        }

    }
    return result
};


// export const apiInstance = createApi({
//     reducerPath: "apiInstance",
//     baseQuery: baseQueryWithReauth,
//     endpoints: () => ({}),
// })

// export default apiInstance