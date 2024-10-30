// weatherSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Coord {
    lon: number;
    lat: number;
}

export interface WeatherDaily {
    time: [string]; // "iso8601",
    weather_code: [number]; // "wmo code",
    temperature_2m_max: [number]; // "°C",
    temperature_2m_min: [number]; // "°C"
}

export interface WeatherPrediction {
    latitude: number; // 49.6
    longitude: number; // 17.259998
    generationtime_ms: number; // 0.23305416107177734
    utc_offset_seconds: number; // 0
    timezone: string; //"GMT"
    timezone_abbreviation: string; // "GMT"
    elevation: number; // 226
    current_units: {
        time: string; // "iso8601",
        interval: string; // "seconds",
        temperature_2m: string; // °C",
        relative_humidity_2m: string; // "%",
        apparent_temperature: string; // "°C",
        is_day: string; // "",
        precipitation: string; // "mm",
        rain: string; // "mm",
        showers: string; // "mm",
        snowfall: string; // "cm",
        weather_code: string; // "wmo code",
        cloud_cover: string; // "%",
        pressure_msl: string; // "hPa",
        surface_pressure: string; // "hPa",
        wind_speed_10m: string; // "km/h",
        wind_direction_10m: string; // "°",
        wind_gusts_10m: string; // "km/h"
    };
    current: Weather; // Weather
    daily_units: {
        time: string; // "iso8601",
        weather_code: string; // "wmo code",
        temperature_2m_max: string; // "°C",
        temperature_2m_min: string; // "°C"
    };
    daily: WeatherDaily;
}

export interface Weather {
    time: string; // "iso8601",
    interval: number; // "seconds",
    temperature_2m: number; // °C",
    relative_humidity_2m: number; // "%",
    apparent_temperature: number; // "°C",
    is_day: number; // "",
    precipitation: number; // "mm",
    rain: number; // "mm",
    showers: number; // "mm",
    snowfall: number; // "cm",
    weather_code: number; // "wmo code",
    cloud_cover: number; // "%",
    pressure_msl: number; // "hPa",
    surface_pressure: number; // "hPa",
    wind_speed_10m: number; // "km/h",
    wind_direction_10m: number; // "°",
    wind_gusts_10m: number; // "km/h"
}

// export const defaultCoords: Coord = { "lon": -0.12574, "lat": 51.50853 };
export const defaultWeather: Weather  = {
    time: '',
    interval: -1,
    temperature_2m: -1,
    relative_humidity_2m: -1,
    apparent_temperature: -1,
    is_day: -1,
    precipitation: -1,
    rain: -1,
    showers: -1,
    snowfall: -1,
    weather_code: -1,
    cloud_cover: -1,
    pressure_msl: -1,
    surface_pressure: -1,
    wind_speed_10m: -1,
    wind_direction_10m: -1,
    wind_gusts_10m: -1,
}

export interface WeatherState {
    unitSystem: string;
    location?: Coord | null;
    weatherPrediction?: WeatherPrediction | null;
    error?: Error | null; // Any error that occurred during login
    unitSystemStatus: string // Status of the login process (idle, pending, complete, failed)
    locationStatus: string
    weatherStatus: string
    // id?: number | undefined;
};

const initialState: WeatherState = {
    unitSystem: 'metric',
    location: null,
    weatherPrediction: null,
    error: null, // Any error that occurred during login
    unitSystemStatus: 'idle', // Status of the login process (idle, pending, complete, failed)
    locationStatus: 'idle',
    weatherStatus: 'idle',
};

const weatherSlice = createSlice({
    name: 'weather', // Slice name
    initialState, // Initial state
    reducers: {
        setUnitSystem(state, _) {
            state.unitSystemStatus = 'pending';
        },
        setUnitSystemSuccess(state, action: PayloadAction<string>) {
            state.unitSystem = action.payload;
            state.error = null;
            state.unitSystemStatus = 'complete';
        },
        setLocation(state, _) {
            state.locationStatus = 'pending';
        },
        setLocationSuccess(state, action: PayloadAction<Coord>) {
            state.location = action.payload;
            state.error = null;
            state.locationStatus = 'complete';
        },
        setWeather(state, _) {
            state.weatherStatus = 'pending';
        },
        setWeatherSuccess(state, action: PayloadAction<WeatherPrediction>) {
            state.weatherPrediction = action.payload;
            state.error = null;
            state.weatherStatus = 'complete';
        },
        setWeatherFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.weatherPrediction = null;
            state.weatherStatus = 'failed';
        },
    },
});

export const { 
    setUnitSystem,
    setUnitSystemSuccess,
    setLocation,
    setLocationSuccess,
    setWeather,
    setWeatherSuccess,
    setWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;

// time: "iso8601",
// interval: "seconds",
// temperature_2m: "°C",
// relative_humidity_2m: "%",
// apparent_temperature: "°C",
// is_day: "",
// precipitation: "mm",
// rain: "mm",
// showers: "mm",
// snowfall: "cm",
// weather_code: "wmo code",
// cloud_cover: "%",
// pressure_msl: "hPa",
// surface_pressure: "hPa",
// wind_speed_10m: "km/h",
// wind_direction_10m: "°",
// wind_gusts_10m: "km/h"

export const imperialUnits = {
  temperature_2m: "°F", // From °C
  relative_humidity_2m: "%", // Remains the same
  apparent_temperature: "°F", // From °C
  is_day: "", // Remains the same
  precipitation: "inches", // From mm
  rain: "inches", // From mm
  showers: "inches", // From mm
  snowfall: "inches", // From cm
  weather_code: "wmo code", // Remains the same
  cloud_cover: "%", // Remains the same
  pressure_msl: "inHg", // From hPa
  surface_pressure: "inHg", // From hPa
  wind_speed_10m: "mph", // From km/h
  wind_direction_10m: "°", // Remains the same
  wind_gusts_10m: "mph" // From km/h
};

// export interface WeatherOLD {
//     lat: number
//     lon: number
//     city: string
//     temperatureC: number
//     temperatureF: number
//     icon: string
//     sunrise: string // moment.unix(data.sys.sunrise).format("hh:mm a")
//     sunset: string // moment.unix(data.sys.sunset).format("hh:mm a")
// }
