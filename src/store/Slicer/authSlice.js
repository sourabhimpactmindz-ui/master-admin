import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        userAuth:(state , action) => {
            state.user = action.payload.user;
            
        },
        resetToken : (state , action) => {
            state.token = action.payload;
        }
    }

})

export const {userAuth } = authSlice.actions;
export default authSlice.reducer;