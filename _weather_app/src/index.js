// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import { getUnitSystem, getWeather } from './state/weatherSlice';
// import todosReducer, {
//     todoAdded,
//     todoToggled,
//     todoDeleted,
//   } from '../features/todos/todosSlice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
	reducer: {
		weather: weatherReducer
	},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
    // middleware: (getDefaultMiddleWare) => {
    //    return getDefaultMiddleWare({ thunk: false }).prepend(listenerMiddleware);
    // }
});

listenerMiddleware.startListening({
    actionCreator: getUnitSystem,
    effect: async (action, listenerApi) => {
        const countryCode = action.payload;
        if ( countryCode == 'US' | countryCode == 'LR' | countryCode == 'MM' ) {
            listenerApi.dispatch(getUnitSystemSuccess('imperial')); // USA, Liberia, Myanmar
        } else {
            listenerApi.dispatch(getUnitSystemSuccess('metric'));   
        }
        console.log(`state.unit-system: ${listenerApi.getState().unitSystem}`)
    },
});

listenerMiddleware.startListening({
    actionCreator: getLocation,
    effect: async (listenerApi) => {
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

        

    },
});

listenerMiddleware.startListening({
    actionCreator: getLocationSuccess,
    effect: async (listenerApi) => {
        listenerApi.dispatch(getWeather());
    },
});

listenerMiddleware.startListening({
    actionCreator: getWeather,
    effect: async (listenerApi) => {
        const state = listenerApi.getState();
        await axios
            .get(url, {
                params: {
                    lat: state.location.latitude,
                    lon: state.location.longitude,
                    units: state.unitSystem,
                    // no ...
                    appid: `${process.env.OSM_API_KEY}`,
                },
            })
            .then((result) => {
                listenerApi.dispatch(getWeatherSuccess(result.data));
            })
            .catch((error) => {
                listenerApi.dispatch(getWeatherFailure(error));
            });
    },
});

// ___
// import * as cities from './cities.json'; // {"name": "testing"}
// console.log(data.name); // output 'testing'
listenerMiddleware.startListening({
    actionCreator: getInputSuccess,
    effect: (action, listenerApi) => {
        listenerApi.dispatch(getFilteredCitiesSuccess(cities.filter(city =>
            city.name.toLowerCase().includes(action.payload.toLowerCase())
        )));
    },
});

listenerMiddleware.startListening({
    actionCreator: getCitySuccess,
    effect: (action, listenerApi) => {
        // listenerApi.dispatch(getFilteredCities(cities.filter(city =>
        //     city.name.toLowerCase().includes(action.payload.toLowerCase())
        // )));
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);

// listenerMiddleware.startListening({
//     actionCreator: addTodo,
//     effect: async (action, listenerApi) => {
//         console.log(listenerApi.getOriginalState());
//         console.log(action);
//         await listenerApi.delay(5000);
//         console.log(listenerApi.getState());
//     },
// });


// Run whatever additional side-effect-y logic you want here
// console.log('Todo added: ', action.payload.text);

// Can cancel other running instances
// listenerApi.cancelActiveListeners();

// Run async logic
// const data = await fetchData();

// Pause until action dispatched or state changed
// if (await listenerApi.condition(matchSomeAction)) {

//     // Use the listener API methods to dispatch, get state,
//     // unsubscribe the listener, start child tasks, and more
//     listenerApi.dispatch(todoAdded('Buy pet food'));

//     // Spawn "child tasks" that can do more work and return results
//     const task = listenerApi.fork(async (forkApi) => {
//         // Can pause execution
//         await forkApi.delay(5);
//         // Complete the child by returning a value
//         return 42;
//     });

//     const result = await task.result;
//     // Unwrap the child result in the listener
//     if (result.status === 'ok') {
//         // Logs the `42` result value that was returned
//         console.log('Child succeeded: ', result.value);
//     }
// }