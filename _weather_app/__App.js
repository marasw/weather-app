import React, { useState } from 'react';
import axios from 'axios';
// import './App.css';

function App() {

    const [unitSystem, setUnitSystem] = useState('metric'); // metric, imperial, standard

    const [location, setLocation] = useState();

    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
    const url = 'https://api.openweathermap.org/data/2.5/weather';

    const currentPosition = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    // getUnitSystem(countryCode)
    // getCurrentPosition
    // getWeather(latitude, longitude, units)

    const getCurrentPosition = () => {
        currentPosition()
            .then((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            });
    }

    const getWeather = async (latitude, longitude, units) => {
        await axios
            .get(url, {
                params: {
                    // q: input,
                    lat: latitude,
                    lon: longitude,
                    units: units,
                    appid: `${process.env.REACT_APP_API_KEY}`,
                },
            })
            .then((result) => {
                // console.log('weather: ', result.data);
                setWeather({ data: result.data, loading: false, error: false });
                // {
                //     lat: latitude,
                //     lon: longitude,
                //     city: data.name,
                //     temperatureC: Math.round(data.main.temp),
                //     temperatureF: Math.round(data.main.temp * 1.8 + 32),
                //     icon: data.weather[0].icon,
                //     sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
                //     sunset: moment.unix(data.sys.sunset).format("hh:mm a"),
                // }
            })
            .catch((error) => {
                // console.log('error', error);
                setWeather({ ...weather, data: {}, error: true });
                // setInput('');
            });
    }

    const getUnitSystem = (countryCode) => {
        // USA, Liberia, Myanmar
        if ( countryCode == 'US' | countryCode == 'LR' | countryCode == 'MM' ) {
            setUnitSystem('imperial');
        }
    }

    const browserLocales = (languageCodeOnly = false) => {
        return navigator.languages.map((locale) =>
            languageCodeOnly ? locale.split("-")[0] : locale,
        );
    }

    // IP based ???
    useEffect(() => {
        getUnitSystem(browserLocales(true).toUpperCase());
        if (navigator.geolocation) {
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) { // console.log(result);
                if (result.state === "granted") {
                    getCurrentPosition();    
                } else if (result.state === "prompt") {
                    getCurrentPosition();
                } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                }
            });
        } else {
            // console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect( async (location) => {
        getWeather(location.latitude, location.longitude, unitSystem);
    }, [location]);
    
    return (
        <div className="App">
            <h1 className="..">Weather App</h1>

        </div>
    );
}
 
export default App;

{/* <div className="..">
    <input
        type="text"
        className=".."
        placeholder="Enter City Name.."
        name="query"
        value={input}
        onChange={(event) => setInput(event.target.value)} // onChange={handleChange} // 
        onKeyDown={handleKey}
    />
</div>
<ul className="..">
    {filteredCities.map((city, index) => (
        <li key={index} className=".." onClick={() => handleSelect(city)}>
            {city.name}
        </li>
    ))}
</ul> */}