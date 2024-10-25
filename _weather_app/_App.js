import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';
// import './App.css';

function App() {

    const [data, setData] = useState({})
    // const [location, setLocation] = useState('')
    // const date = new Date("2012-05-24");
    // const formattedDate = new Intl.DateTimeFormat(navigator.language).format(date);
    // const count = 26254.39;
    // const formattedCount = new Intl.NumberFormat(navigator.languages).format(count);
    // const lang = navigator.language; // || navigator.userLanguage;

    const [input, setInput] = useState('');

    const [location, setLocation] = useState();

    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    // const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    // api.openweathermap.org/data/2.5/weather?lat=OUR_LATITUDE&lon=OUR_LONGITUDE&appid=OUR_API_KEY&units=metric
    // api.openweathermap.org/data/2.5/weather?lat=OUR_LATITUDE&lon=OUR_LONGITUDE&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric    
    // const api_url = $`//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    
    // const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

    const toDate = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const WeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };

    // function success(position) {
    //     // position.coords.latitude
    //     // position.coords.longitude
    //     const { latitude, longitude } = position.coords;
    //     // const coords = position.coords;
    //     // console.log(`Latitude : ${coords.latitude}`);
    //     // console.log(`Longitude: ${coords.longitude}`);
    //     // console.log(`Accuracy: ${coords.accuracy} m`);
    //     // setLocation({ coords.latitude, coords.longitude });
    //     setLocation({ latitude, longitude });
    // }

    // function errors(err) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    function success(pos) {
        var crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        getLocationInfo(crd.latitude, crd.longitude);
    }    

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function getLocationInfo(latitude, longitude) {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status.code === 200) {
                    console.log("results:", data.results);
                    setLocation(data.results[0].formatted);
                } else {
                    console.log("Reverse geolocation request failed.");
                }
            })
            .catch((error) => console.error(error));
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         if (data.status.code === 200) {
        //             console.log("results:", data.results);
        //         } else {
        //             console.log("Reverse geolocation request failed.");
        //         }
        //     })
        //     .catch((error) => console.error(error));

        // axios.get(url).then((response) => {
        //     setData(response.data)
        //     console.log(response.data)
        // })
        // setLocation('')


    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
            await axios
                .get(url, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setInput('');
                    console.log('error', error);
                });
        }
    };

    const [userLocation, setUserLocation] = useState(null);
    const getUserLocation = () => { /*insert code here*/ };
    if (navigator.geolocation) {
        // what to do if supported
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // what to do once we have the position
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            (error) => {
                // display an error if we cant get the users position
                console.error('Error getting user location:', error);
            }
        );
    }
    else {
        // display an error if not supported
        console.error('Geolocation is not supported by this browser.');
    }
    
    // ollama run qwen2.5:1.5b

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    // console.log(result);
                    if (result.state === "granted") {
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success, errors, options);

                        navigator.geolocation.getCurrentPosition((position) => {
                            api += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
                            // this.fetchWeather(api);
                        });

                    } else if (result.state === "prompt") {
                        //If prompt then the user will be asked to give permission
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
    }, []);
    
    return (
        <div className="App">
            <h1 className="app-name">
                GeeksforGeeks Weather App
            </h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={search}
                />
            </div>
            {weather.loading && (
                <>
                    <br />
                    <br />
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px' }}>City not found</span>
                    </span>
                </>
            )}
            {weather && weather.data && weather.data.main && (
                <div>
                    <div className="city-name">
                        <h2>
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDate()}</span>
                    </div>
                    <div className="icon-temp">
                        <img
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt={weather.data.weather[0].description}
                        />
                        {Math.round(weather.data.main.temp)}
                        <sup className="deg">°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default App;

    
