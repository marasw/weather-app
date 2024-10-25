// citySearchSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coord } from './weatherSlice';

export interface City {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: Coord;
}

export interface CitySearchState {
    input: string;
    city: City | null;
    filteredCities: City[];
    
}

const initialState: CitySearchState= {
    input: '',
    city: null,
    filteredCities: [],
};

const citySearchSlice = createSlice({
    name: 'city_search',
    initialState,
    reducers: {
        setInputSuccess(state, action: PayloadAction<string>) {
            state.input = action.payload;
        },
        setCitySuccess(state, action: PayloadAction<City>) {
            state.city = action.payload;
        },
        setFilteredCitiesSuccess(state, action: PayloadAction<City[]>) {
            state.filteredCities = action.payload;
        },
    },
});

export const { 
    setInputSuccess,
    setCitySuccess,
    setFilteredCitiesSuccess,
} = citySearchSlice.actions;

export default citySearchSlice.reducer;
