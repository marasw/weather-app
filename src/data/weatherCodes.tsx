import { 
    TiWeatherSunny,
    TiWeatherPartlySunny,
    TiWeatherCloudy,
    TiWeatherShower,
    TiWeatherDownpour,
    TiWeatherSnow,
    TiWeatherStormy
} from "react-icons/ti";
import { 
    BsCloudFog,
    BsCloudDrizzle
} from "react-icons/bs";

interface IconParams {
    code: number;
    size: string;
};

export const WeatherIcon = ({ code, size }: IconParams) => {
    console.log('size: ' + size);
    switch(code) {
        case 0: 
            return <TiWeatherSunny size={size}/>;
        case 1: 
            return <TiWeatherSunny size={size}/>;
        case 2: 
            return <TiWeatherPartlySunny size={size}/>;
        case 3: 
            return <TiWeatherCloudy size={size}/>;
        case 45: 
            return <BsCloudFog size={size}/>;
        case 48: 
            return <BsCloudFog size={size}/>;
        case 51: 
            return <BsCloudDrizzle size={size}/>;
        case 53: 
            return <BsCloudDrizzle size={size}/>;
        case 55: 
            return <TiWeatherShower size={size}/>;
        case 56: 
            return <BsCloudDrizzle size={size}/>;
        case 57: 
            return <TiWeatherShower size={size}/>;
        case 61: 
            return <TiWeatherShower size={size}/>;
        case 63: 
            return <TiWeatherDownpour size={size}/>;
        case 65: 
            return <TiWeatherDownpour size={size}/>;
        case 66: 
            return <TiWeatherShower size={size}/>;
        case 67: 
            return <TiWeatherDownpour size={size}/>;
        case 71: 
            return <TiWeatherSnow size={size}/>;
        case 73: 
            return <TiWeatherSnow size={size}/>;
        case 75: 
            return <TiWeatherSnow size={size}/>;
        case 77: 
            return <TiWeatherSnow size={size}/>;
        case 80: 
            return <TiWeatherShower size={size}/>;
        case 81: 
            return <TiWeatherDownpour size={size}/>;
        case 82: 
            return <TiWeatherDownpour size={size}/>;
        case 85: 
            return <TiWeatherSnow size={size}/>;
        case 86: 
            return <TiWeatherSnow size={size}/>;
        case 95: 
            return <TiWeatherStormy size={size}/>;
        case 96: 
            return <TiWeatherStormy size={size}/>;
        case 99: 
            return <TiWeatherStormy size={size}/>;
        default:
            return <TiWeatherSunny size={size}/>;
    }
}

export const weatherCodes = {
    0: 'Clear sky', // TiWeatherSunny
    1: 'Mainly clear', // TiWeatherSunny
    2: 'Partly cloudy', // TiWeatherPartlySunny
    3: 'Overcast', // TiWeatherCloudy
    45: 'Fog', // TbCloudFog
    48: 'Depositing rime fog', // BsCloudFog
    51: 'Drizzle: Light', // BsCloudDrizzle
    53: 'Drizzle: Moderate', // BsCloudDrizzle
    55: 'Drizzle: Dense intensity', // TiWeatherShower
    56: 'Freezing Drizzle: Light', // + BsCloudDrizzle
    57: 'Freezing Drizzle: Dense intensity', // TiWeatherSnow + TiWeatherShower
    61: 'Rain: Slight', // TiWeatherShower
    63: 'Rain: Moderate', // TiWeatherDownpour
    65: 'Rain: Heavy intensity', // TiWeatherDownpour
    66: 'Freezing Rain: Light', // TiWeatherShower
    67: 'Freezing Rain: Heavy intensity', // TiWeatherSnow + TiWeatherDownpour
    71: 'Snow fall: Slight', // TiWeatherSnow
    73: 'Snow fall: Moderate', // TiWeatherSnow
    75: 'Snow fall: Heavy intensity', // !TiWeatherSnow
    77: 'Snow grains', // TiWeatherSnow
    80: 'Rain showers: Slight', // TiWeatherShower
    81: 'Rain showers: Moderate', // TiWeatherDownpour
    82: 'Rain showers: Violent', // ! TiWeatherDownpour
    85:	'Snow showers: Slight', // TiWeatherSnow
    86:	'Snow showers: Heavy intensity', // ! TiWeatherSnow
    95:	'Thunderstorm: Slight or moderate', // TiWeatherStormy
    96:	'Thunderstorm with slight hail', // ! TiWeatherStormy
    99:	'Thunderstorm with heavy hail' // !! TiWeatherStormy
}

// WMO Weather interpretation codes (WW)
// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
// (*) Thunderstorm forecast with hail is only available in Central Europe
