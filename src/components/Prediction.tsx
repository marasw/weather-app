import { useEffect, useState } from "react";
import { WeatherIcon } from "../data/weatherCodes";
import { Weather } from "../state/weatherSlice";
import moment from "moment";

interface PredictionParams {
    current: Weather;
    temperatureUnit: string;
    dateFormat: string;
}

const Prediction = ({ current, temperatureUnit, dateFormat }: PredictionParams) => {
    const [dateS, setDateS] = useState(''); 
    const [day, setDay] = useState('');
    const [temperature, setTemperature] = useState(-200)
    const [weatherCode, setWeatherCode] = useState(-1);
    
    useEffect(() => {
        setDateS(moment(current.time).format(dateFormat));
        setDay(moment(current.time).format('dddd'));
        setTemperature(current.temperature_2m);
        setWeatherCode(current.weather_code);
    }, [current]);

    return (
        <div className="flex justify-center mt-8">
            <div className="flex items-center">
                <WeatherIcon code={weatherCode} size={'16em'} />
                <div className="flex flex-col">
                    <div className="text-l italic">{day} | {dateS}</div>
                    <div className="text-5xl font-bold">{temperature} {temperatureUnit}</div>
                </div>
            </div>
        </div>
    );
}

export default Prediction;