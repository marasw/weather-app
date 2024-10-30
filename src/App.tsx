import { zip } from 'radash';
import { useAppSelector, useAppDispatch } from './hooks';;
import CitySearch from './components/CitySearch';
import { useEffect, useState } from 'react';
import { setLocation, setUnitSystem, Weather, WeatherDaily, defaultWeather } from './state/weatherSlice';
import { defaultCityName, defaultCountryCode } from './state/citySearchSlice';
import PredictionList, { WeatherDailyPrediction } from './components/PredictionList';
import Prediction from './components/Prediction';

function App() {
  const { weatherPrediction, location, unitSystem } = useAppSelector((state) => state.weather);
  const { city } = useAppSelector((state) => state.citySearch);
  const dispatch = useAppDispatch();
 
  const [temperatureUnit, setTemperatureUnit] = useState("°C");
  const [dateFormat, setDateFormat] = useState("DD.MM.YYYY");
  const [cityName, setCityName] = useState(defaultCityName);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [current, setCurrent] = useState<Weather>(defaultWeather);
  const [predictions, setPredictions] = useState<WeatherDailyPrediction[]>([]);

  const browserLocales = (languageCodeOnly = false) => {
    return navigator.languages.map((locale) =>
      languageCodeOnly ? locale.split("-")[0] : locale,
    )[0];
  }

  useEffect(() => {
    dispatch(setUnitSystem(browserLocales(true).toUpperCase()));
    const interval = setInterval(() => {
      dispatch(setLocation(location));
    }, 60*60*1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    switch(unitSystem) {
      case "imperial": 
        setTemperatureUnit("°F");
        setDateFormat("YYYY/MM/DD");
        return;
      default:
        setTemperatureUnit("°C");
        setDateFormat("DD.MM.YYYY");
        return;
  }
  }, [unitSystem]);

  useEffect(() => {
    if (city) {
      setCityName(city.name);
      setCountryCode(city.country);
    }
  }, [city]);

  useEffect(() => {
    setUnitSystem(countryCode);
  }, [countryCode]);

  useEffect(() => {
    if (weatherPrediction) {
      const cw: Weather = weatherPrediction.current;
      setCurrent(cw);
      
      const daily: WeatherDaily = weatherPrediction.daily as WeatherDaily;
      const zipped = zip(daily.time, daily.weather_code, daily.temperature_2m_min, daily.temperature_2m_max); // _.
      console.log(`zipped: ${JSON.stringify(zipped)}`);

      const zippedPredictions: WeatherDailyPrediction[] = zipped.map((predictionData) => {
        let data: WeatherDailyPrediction = { 
          date: predictionData[0], 
          code: predictionData[1],
          min: predictionData[2],
          max: predictionData[3],
        };
        return data;
      });

      setPredictions(zippedPredictions.slice(1, zippedPredictions.length));
    }  
  }, [weatherPrediction]);
  
  return (
    <div className="flex h-screen justify-center text-center bg-orange-400">
      <div className="flex flex-col space-y-4 mt-8">
        <CitySearch />
        <div className="flex h-full items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold underline">{cityName}</h1>
            <Prediction current={current} temperatureUnit={temperatureUnit} dateFormat={dateFormat} />
            <PredictionList predictions={predictions} temperatureUnit={temperatureUnit} dateFormat={dateFormat} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;

  //   "zipped":[
//    [
//       "2024-10-24",
//       3,
//       9.4,
//       16.2
//    ],
//    [
//       "2024-10-25",
//       61,
//       12.3,
//       17.3
//    ],
//    [
//       "2024-10-26",
//       61,
//       10.1,
//       14.8
//    ],
//    [
//       "2024-10-27",
//       3,
//       6.2,
//       14.9
//    ],
//    [
//       "2024-10-28",
//       3,
//       7.2,
//       15.8
//    ],
//    [
//       "2024-10-29",
//       3,
//       12.1,
//       17.1
//    ],
//    [
//       "2024-10-30",
//       45,
//       10.8,
//       17.1
//    ]
// ]

  // console.log(`countries : ${countries.map ((country => country.code + '...' + country.name))}`);
  // console.log(`weatherCodes : ${JSON.stringify(weatherCodes)}`);
  // console.log(`weatherCodes['67'] : ${weatherCodes['67']}`);

  // daily : {
  //   "time":["2024-10-24","2024-10-25","2024-10-26","2024-10-27","2024-10-28","2024-10-29","2024-10-30"],
  //   "weather_code":[2,80,61,3,3,3,45],
  //   "temperature_2m_max":[16.5,16.9,14.8,14.9,15.8,17.1,17.1],
  //   "temperature_2m_min":[9.4,12,9.4,6.2,7.2,12.1,10.8]
  // }

// const result = getCoords();
// console.log(`coords: ${ JSON.stringify(result) }`);
// 49.594875, 17.251740
// {latitude: 49.594875, longitude: 17.251740}
// dispatch(setLocation({}));

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(position: any) {

//   var coords = position.coords; // latitude longitude accuracy

//   console.log("Your current position is:");
//   console.log(`Latitude : ${coords.latitude}`);
//   console.log(`Longitude: ${coords.longitude}`);
//   console.log(`More or less ${coords.accuracy} meters.`);
// }
  
// function errors(error: GeolocationPositionError) {
//   console.warn(`ERROR(${error}): ${error.message}`);
// }


// if (navigator.geolocation) {
//   console.log("Geolocation IS (YES) supported by this browser.");
//   navigator.permissions
//   .query({ name: "geolocation" })
//   .then((result) => {
//     console.log(result.state);
//     if (result.state === "granted") {
//       console.log("geolocation granted");
//       // dispatch(getLocation());
//       navigator.geolocation.getCurrentPosition(success, errors, options); 
//     } else if (result.state === "prompt") {
//       console.log("geolocation prompt");
//       // dispatch(getLocation());
//       navigator.geolocation.getCurrentPosition(success, errors, options);
//     } else if (result.state === "denied") {
//       console.log("geolocation denied");
//       // IF denied THEN ..show instructions to enable location
//     }
//   });
// } else {
//     console.log("Geolocation IS NOT supported by this browser.");
// }

