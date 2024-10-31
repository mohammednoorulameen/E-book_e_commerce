import {  createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        userProfile:{
            username:null,
            email:null,
            phone:null
        }
    },

    reducers:{
        setUser:(state,action)=>{
            const {username,email,phone}=action.payload;
            state.userProfile.username = username,
            state.userProfile.email = email,
            state.userProfile.phone = phone
        },
        clearUser:(state)=>{
            state.userProfile=null
        }
    }
})

export const{setUser,clearUser}=userSlice.actions
export default userSlice.reducer