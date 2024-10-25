import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    getInputSuccess,
    getCitySuccess,
    getFilteredCitiesSuccess, 
} from './citySearchState';
// import * as data from './example.json'; // {"name": "testing"}
// console.log(data.name); // output 'testing'

const CitySearch = () => {

    // const [input, setInput] = useState('');
    // const cities = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];
    // const [filteredCities, setFilteredCities] = useState([]);
    // const [city, setCity] = useState();
    // {
    //     "id": 833,
    //     "name": "Ḩeşār-e Sefīd",
    //     "state": "",
    //     "country": "IR",
    //     "coord": {
    //         "lon": 47.159401,
    //         "lat": 34.330502
    //     }
    // }

    const { input } = useSelector(state => state.input);
    const { filteredCities } = useSelector(state => state.filteredCities);

    const dispatch = useDispatch();

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            handleSelect(filteredCities[0]);
        }
    };

    const handleSelect = (value) => {
        dispatch(getCitySuccess(value));
        dispatch(getFilteredCitiesSuccess([]));
    };

    // useEffect((input) => {
    //     setFilteredCities(cities.filter(city =>
    //         city.name.toLowerCase().includes(input.toLowerCase())
    //     ));
    // }, [input]);

    // useEffect( (city) => {
    //     const latitude = city.coord.lat;
    //     const longitude = city.coord.lon;
    //     const country = city.country;
    //     // setMeasurementSystem(country);
    //     // setLocation({ latitude, longitude });
    // }, [city]);

    return (
        <>
            <div className="..">
                <input
                    type="text"
                    className=".."
                    placeholder="Enter City Name.."
                    name="query"
                    value={input}
                    onChange={(event) => dispatch(getInputSuccess(event.target.value))}
                    // onChange={(event) => setInput(getInputSuccess)} // onChange={handleChange} // 
                    onKeyDown={handleKey}
                />
            </div>
            <ul className="..">
                {filteredCities.map((city, index) => (
                    <li key={index} className=".." onClick={() => handleSelect(city)}>
                        {city.name}
                    </li>
                ))}
            </ul>
        </>
    );

}

