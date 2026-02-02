import { createSlice , PayloadAction } from "@reduxjs/toolkit"

interface AuthState {

    token: string | null
    user:{
        id:string
        name:string
    } | null
    loggedIN : boolean
}

const initialState: AuthState = {
    token: null,
    user: null,
    loggedIN: false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        loginSucess: (state, action: PayloadAction<any>)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loggedIN  = action.payload.loggedIN;
        },
        logout: (state) =>{
            state.token = null;
            state.user = null;
            state.loggedIN = false;
        },
    },

});

export const { loginSucess , logout } = authSlice.actions;
export default authSlice.reducer;