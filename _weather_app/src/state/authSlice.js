// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the auth slice
const initialState = {
    user: null, // Currently logged in user
    error: null, // Any error that occurred during login
    status: 'idle', // Status of the login process (idle, pending, complete, failed)
};

// Create the auth slice using createSlice
const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState, // Initial state
    reducers: {
        // Reducer functions to update the state
        // Set the status to 'pending' when login starts
        loginUser(state, action) {
            state.status = 'pending';
        },
        // Update user data and set status to 'complete' on successful login
        loginUserSuccess(state, action) {
            state.user = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        // Reset user data, set error message, and status to 'failed' on login failure
        loginUserFailure(state, action) {
            state.user = null;
            state.error = action.payload;
            state.status = 'failed';
        },
    },
});

// Export the reducer functions as actions
export const { 
    loginUser, 
    loginUserSuccess, 
    loginUserFailure 
} = authSlice.actions;

// Export the reducer function itself
export default authSlice.reducer;
