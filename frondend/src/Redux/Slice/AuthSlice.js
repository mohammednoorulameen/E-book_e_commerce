import { createSlice  } from "@reduxjs/toolkit";

const authSlice =createSlice({
    name:'auth',
    initialState:{
        token: null,
    },
    reducers: {
        setCredentails: (state, action)=> {
            const { accessToken } = action.payload;
            state.token = accessToken;
        }
    }
})

export const { setCredentails } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;