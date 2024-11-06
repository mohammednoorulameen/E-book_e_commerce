import { configureStore } from "@reduxjs/toolkit";
import  apiInstance  from "../../Services/ConnectApi/Api.js"
import  AdminApiInstance  from "../../Services/ConnectApi/AdminConnectApi.js"
import  authReducer  from "../Slice/AuthSlice.js";
import userReducer  from "../Slice/UserSlice/UserSlice.js";


export const store = configureStore({
  reducer:{
    auth:authReducer,
    user:userReducer,
    [apiInstance.reducerPath] : apiInstance.reducer,
    [AdminApiInstance.reducerPath] : AdminApiInstance.reducer,
  },

  middleware: ( getDefaultMiddleware )=>
    getDefaultMiddleware().concat(apiInstance.middleware)
  .concat(AdminApiInstance.middleware)
})