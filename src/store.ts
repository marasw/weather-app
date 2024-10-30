import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { db } from './data/cities';
import weatherReducer, { 
    setUnitSystem, 
    setUnitSystemSuccess, 
    setLocation,
    setLocationSuccess,
    setWeather,
    setWeatherSuccess,
    setWeatherFailure,
    Coord
} from './state/weatherSlice';
import citySearchReducer, { 
    setInputSuccess,
    setCitySuccess,
    setFilteredCitiesSuccess,
    defaultCoords,
} from './state/citySearchSlice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
	reducer: {
		weather: weatherReducer,
        citySearch: citySearchReducer
	},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

listenerMiddleware.startListening({
    actionCreator: setUnitSystem,
    effect: async (action, listenerApi) => {
        const countryCode = action.payload;
        if ( countryCode == 'US' || countryCode == 'LR' || countryCode == 'MM' ) {
            listenerApi.dispatch(setUnitSystemSuccess('imperial')); // USA, Liberia, Myanmar
        } else {
            listenerApi.dispatch(setUnitSystemSuccess('metric'));   // metric imperial
        }
        listenerApi.dispatch(setLocation({}));
    },
});

listenerMiddleware.startListening({
    actionCreator: setLocation,
    effect: async (_, listenerApi) => { 
      listenerApi.dispatch(setLocationSuccess(defaultCoords));
    },
});

listenerMiddleware.startListening({
    actionCreator: setLocationSuccess,
    effect: (_, listenerApi) => {
      listenerApi.dispatch(setWeather({}));
    },
});
  
listenerMiddleware.startListening({
    actionCreator: setWeather,
    effect: async (_ ,listenerApi) => {
        const state: RootState = listenerApi.getState() as RootState;
        const location: Coord = state.weather.location || defaultCoords;
        const current = 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m';
        const daily = 'weather_code,temperature_2m_max,temperature_2m_min';
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=${current}&daily=${daily}`;
        await axios
            .get(url)
            .then((result) => {
                listenerApi.dispatch(setWeatherSuccess(result.data));
            })
            .catch((error) => {
                listenerApi.dispatch(setWeatherFailure(error));
            });
    },
});

listenerMiddleware.startListening({
    actionCreator: setWeatherSuccess,
    effect: async (_ ,listenerApi) => {
        listenerApi.dispatch(setInputSuccess(""));
    },
});

listenerMiddleware.startListening({
    actionCreator: setInputSuccess,
    effect: (action, listenerApi) => {
        if (action.payload.length > 2) {
            const filtered = db.data.filter((city) => {
                const ucName = city.name.toLocaleUpperCase();
                return ucName.includes(action.payload.toLocaleUpperCase());
            });
            //console.log(JSON.stringify(filtered));
            listenerApi.dispatch(setFilteredCitiesSuccess(filtered));
        } else {
            listenerApi.dispatch(setFilteredCitiesSuccess([]));
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: setCitySuccess,
    effect: (action, listenerApi) => {
        listenerApi.dispatch(setLocationSuccess(action.payload.coord));
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

// 49.594875, 17.251740
// const coords: Coord = { lat: 49.594875, lon: 17.251740 };
// const getCoords = () => {
//     return new Promise((resolve, reject) => {
//         if (navigator.permissions) {
//             navigator.permissions.query({
//                 name: 'geolocation'
//             }).then((permission) => {
//                 switch (permission.state) {
//                     case 'granted':
//                         navigator.geolocation.getCurrentPosition((position) => {
//                             resolve(position.coords);
//                         }, (error) => {
//                             reject(error);
//                         }, { enableHighAccuracy: true });
//                     break;
//                     case 'prompt':
//                         navigator.geolocation.getCurrentPosition((position) => {
//                             resolve(position.coords);
//                         }, (error) => {
//                             reject(error);
//                         }, { enableHighAccuracy: true });
//                     break;
//                     case 'denied':
//                         // ...
//                     default:
//                     resolve(null);
//                     break;
//                 }
//             });
//         } else {
//             // reject(new DOMError('NotImplemented', 'Permission API is not supported'));
//         }
//     });
// }

// listenerMiddleware.startListening({
//     actionCreator: setFilteredCitiesSuccess,
//     effect: (action, listenerApi) => {
//         const state: RootState = listenerApi.getState() as RootState;
//         console.log(`FCSuccess: length: ${ state.citySearch.filteredCities.length } ${ JSON.stringify(action.payload) }`);
//     },
// });

// const currentPosition = () => {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// }
// currentPosition()
//     .then((position) => {
//         const { latitude, longitude } = position.coords;
//         listenerApi.dispatch(getLocationSuccess({ latitude, longitude }));
//     });

// const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min';

// https://open-meteo.com/
// WMO Weather interpretation codes (WW)
// 0	        Clear sky
// 1, 2, 3	    Mainly clear, partly cloudy, and overcast
// 45, 48	    Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	    Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	    Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	        Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	    Snow showers slight and heavy
// 95 *	        Thunderstorm: Slight or moderate
// 96, 99 *	    Thunderstorm with slight and heavy hail
// (*)          Thunderstorm forecast with hail is only available in Central Europe

// {
//     "latitude":52.52,
//     "longitude":13.419998,
//     "generationtime_ms":0.26094913482666016,
//     "utc_offset_seconds":0,
//     "timezone":"GMT",
//     "timezone_abbreviation":"GMT",
//     "elevation":38,
//     "current_units":{
//        "time":"iso8601",
//        "interval":"seconds",
//        "temperature_2m":"°C",
//        "relative_humidity_2m":"%",
//        "apparent_temperature":"°C",
//        "is_day":"",
//        "precipitation":"mm",
//        "rain":"mm",
//        "showers":"mm",
//        "snowfall":"cm",
//        "weather_code":"wmo code",
//        "cloud_cover":"%",
//        "pressure_msl":"hPa",
//        "surface_pressure":"hPa",
//        "wind_speed_10m":"km/h",
//        "wind_direction_10m":"°",
//        "wind_gusts_10m":"km/h"
//     },
//     "current":{
//        "time":"2024-10-22T21:15",
//        "interval":900,
//        "temperature_2m":9.4,
//        "relative_humidity_2m":88,
//        "apparent_temperature":7.8,
//        "is_day":0,
//        "precipitation":0,
//        "rain":0,
//        "showers":0,
//        "snowfall":0,
//        "weather_code":2,
//        "cloud_cover":65,
//        "pressure_msl":1031.9,
//        "surface_pressure":1027.2,
//        "wind_speed_10m":7.2,
//        "wind_direction_10m":267,
//        "wind_gusts_10m":14.8
//     },
//     "daily_units":{
//        "time":"iso8601",
//        "weather_code":"wmo code",
//        "temperature_2m_max":"°C",
//        "temperature_2m_min":"°C"
//     },
//     "daily":{
//        "time":[
//           "2024-10-22",
//           "2024-10-23",
//           "2024-10-24",
//           "2024-10-25",
//           "2024-10-26",
//           "2024-10-27",
//           "2024-10-28"
//        ],
//        "weather_code":[
//           3,
//           3,
//           45,
//           2,
//           3,
//           45,
//           3
//        ],
//        "temperature_2m_max":[
//           16.8,
//           14.5,
//           14.4,
//           17.2,
//           17.1,
//           15.4,
//           15.2
//        ],
//        "temperature_2m_min":[
//           8.9,
//           7.2,
//           5.9,
//           7.9,
//           8.8,
//           8.4,
//           11.2
//        ]
//     }
// }

// {
//     "coord": {"lon":17.2517, "lat":49.5949},
//     "weather": [
//         {
//             "id":800,
//             "main":"Clear",
//             "description":"clear sky",
//             "icon":"01n"
//         }
//     ],
//     "base":"stations",
//     "main": {
//         "temp":8.04,
//         "feels_like":8.04,
//         "temp_min":7.09,
//         "temp_max":11.04,
//         "pressure":1030,
//         "humidity":100,
//         "sea_level":1030,
//         "grnd_level":1001
//     },
//     "visibility":10000,
//     "wind": {
//             "speed":1.13,
//             "deg":130,
//             "gust":1.16
//     },
//     "clouds": {"all":1},
//     "dt":1729625268,
//     "sys":{
//             "type":2,
//             "id":2045734,
//             "country":"CZ",
//             "sunrise":1729574618,
//             "sunset":1729612014
//     },
//     "timezone":7200,
//     "id":3069011,
//     "name":"Olomouc",
//     "cod":200
// }

// middleware: (getDefaultMiddleWare) => {
//    return getDefaultMiddleWare({ thunk: false }).prepend(listenerMiddleware);
// }