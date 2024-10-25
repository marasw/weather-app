// citySearchSlice.js
import { createSlice } from '@reduxjs/toolkit';

//// citySearchSaga
// input
// city
// filteredCities

const initialState = {
    input: '',
    city: null,
    filteredCities: null,
    error: null,
    status: 'idle', // idle, pending, complete, failed
};

const citySearchSlice = createSlice({
    name: 'city_search',
    initialState,
    reducers: {
        getInputSuccess(state, action) {
            state.input = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        getCitySuccess(state, action) {
            state.city = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        getFilteredCitiesSuccess(state, action) {
            state.city = action.payload;
            state.error = null;
            state.status = 'complete';
        },
    },
});

export const { 
    getInputSuccess,
    getCitySuccess,
    getFilteredCitiesSuccess,
} = citySearchSlice.actions;

export default citySearchSlice.reducer;

// getWeather(state) {
//     state.status = 'pending';
// },
// getWeatherSuccess(state, action) {
//     state.weather = action.payload;
//     state.error = null;
//     state.status = 'complete';
// },
// getWeatherFailure(state, action) {
//     state.error = action.payload;
//     state.weather = null;
//     state.status = 'failed';
// },