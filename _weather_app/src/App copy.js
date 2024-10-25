// App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addListener } from "@reduxjs/toolkit";
import { 
    getUnitSystem,
    getUnitSystemSuccess,
    getUnitSystemFailure,
    getLocation,
    getLocationSuccess,
    getLocationFailure,
    getWeather,
    getWeatherSuccess,
    getWeatherFailure, 
} from './weatherState';
import 'App.css';

const App = () => {
	const { weather } = useSelector(state => state.weather);
	const dispatch = useDispatch();

    const browserLocales = (languageCodeOnly = false) => {
        return navigator.languages.map((locale) =>
            languageCodeOnly ? locale.split("-")[0] : locale,
        );
    }

    // coYRg#W$jC3CQt HerrKlamm2
        // const dayCount = 5;
        // const appid = '17449d558bb71ff71409977dc65a987b';
        // const exclude = 'minutely,hourly,alerts';
        // https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
        // const url = 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=17449d558bb71ff71409977dc65a987b'
        // const url = `https//api.openweathermap.org/data/2.5/forecast/daily?lat=${location.latitude}&lon=${location.longitude}&cnt=${dayCount}&mode=json&appid=${appid}`;
        // const url = 'https://api.openweathermap.org/data/2.5/weather';

        // listenerApi.dispatch(getFilteredCitiesSuccess(cities.filter(city => 
        //     city.name.toLowerCase().includes(action.payload.toLowerCase())
        // )));

    // IP based ???
    useEffect(() => {
        dispatch(getUnitSystem(browserLocales(true).toUpperCase()));
        if (navigator.geolocation) {
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    dispatch(getLocation()); // getCurrentPosition();    
                } else if (result.state === "prompt") {
                    dispatch(getLocation()); // getCurrentPosition();
                } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                }
            });
        } else {
            // console.log("Geolocation is not supported by this browser.");
        }
    }, []);

	return (
		<div className="App">
			{/* <div>Count: { count }</div>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button> */}
		</div>
	);
}

export default App;

// useEffect(() => {
//     const unsubscribe = dispatch(addListener({
//       predicate: (action, currentState, prevState) => {
//         return currentState.some.field !== prevState.some.field; // 
//       },
//       effect: (action, listenerApi) => {
//         // some logic here that will run when `state.some.field` changes
//       }
//     }));

//     return unsubscribe;
// }, []);

// if (navigator.geolocation) {
//     navigator.permissions
//     .query({ name: "geolocation" })
//     .then(function (result) { // console.log(result);
//         if (result.state === "granted") {
//             // getCurrentPosition();    
//         } else if (result.state === "prompt") {
//             // getCurrentPosition();
//         } else if (result.state === "denied") {
//             //If denied then you have to show instructions to enable location
//         }
//     });
// } else {
//     // console.log("Geolocation is not supported by this browser.");
// }
