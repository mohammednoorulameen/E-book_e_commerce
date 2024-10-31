import { configureStore } from "@reduxjs/toolkit";
import  apiInstance  from "../../Services/ConnectApi/Api.js"
import  authSlice  from "../Slice/AuthSlice.js";
import userSlice  from "../Slice/UserSlice/UserSlice.js";
export const store = configureStore({
  reducer:{
    auth:authSlice,
    user:userSlice,
    [apiInstance.reducerPath] : apiInstance.reducer,
  },

  middleware: ( getDefaultMiddleware )=>
    getDefaultMiddleware().concat(apiInstance.middleware)
})