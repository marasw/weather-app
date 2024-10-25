// weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    unitSystem: 'metric',
    location: null,
    weather: null,
    error: null, // Any error that occurred during login
    status: 'idle', // Status of the login process (idle, pending, complete, failed)
};

const weatherSlice = createSlice({
    name: 'weather', // Slice name
    initialState, // Initial state
    reducers: {
        getUnitSystem(state, action) { // getUnitSystem(countryCode)
            state.status = 'pending';
        },
        getUnitSystemSuccess(state, action) { // getUnitSystem(countryCode)
            state.unitSystem = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        // getUnitSystemFailure(state, action) { // getUnitSystem(countryCode)
        //     state.error = action.payload;
        //     state.unitSystem = null;
        //     state.status = 'failed';
        // },
        getLocation(state) { // getCurrentPosition
            state.status = 'pending';
        },
        getLocationSuccess(state, action) { // getCurrentPosition
            state.location = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        // getLocationFailure(state, action) { // getCurrentPosition
        //     state.error = action.payload;
        //     state.location = null;
        //     state.status = 'failed';
        // },
        getWeather(state) { // getWeather(latitude, longitude, units)
            state.status = 'pending';
        },
        getWeatherSuccess(state, action) { // getWeather(latitude, longitude, units)
            state.weather = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        getWeatherFailure(state, action) { // getWeather(latitude, longitude, units)
            state.error = action.payload;
            state.weather = null;
            state.status = 'failed';
        },
    },
});

export const { 
    getUnitSystem,
    getUnitSystemSuccess,
    getUnitSystemFailure,
    getLocation,
    getLocationSuccess,
    getLocationFailure,
    getWeather,
    getWeatherSuccess,
    getWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;

// // Reducer functions to update the state
// // Set the status to 'pending' when login starts
// loginUser(state, action) {
//     state.status = 'pending';
// },
// // Update user data and set status to 'complete' on successful login
// loginUserSuccess(state, action) {
//     state.user = action.payload;
//     state.error = null;
//     state.status = 'complete';
// },
// // Reset user data, set error message, and status to 'failed' on login failure
// loginUserFailure(state, action) {
//     state.user = null;
//     state.error = action.payload;
//     state.status = 'failed';
// },