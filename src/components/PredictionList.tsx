import moment from 'moment';
import { WeatherIcon } from '../data/weatherCodes';
import { TiArrowDown, TiArrowUp } from "react-icons/ti";

export interface WeatherDailyPrediction {
    date: string, 
    code: number,
     min: number,
    max: number,
}

interface PredictionListParams {
    predictions: WeatherDailyPrediction[];
    temperatureUnit: string;
    dateFormat: string;
}

const PredictionList = ({ predictions, temperatureUnit, dateFormat }: PredictionListParams) => {
    // const { weatherPrediction, unitSystem } = useAppSelector((state) => state.weather);
    // const dispatch = useAppDispatch();

    // const [temperatureUnit, setTemperatureUnit] = useState("°C");
    // const [dateFormat, setDateFormat] = useState("DD.MM.YYYY");

    // useEffect(() => {
    //     switch(unitSystem) {
    //         case "imperial": 
    //             setTemperatureUnit("°F");
    //             setDateFormat("YYYY/MM/DD");
    //             return;
    //         default:
    //             setTemperatureUnit("°C");
    //             setDateFormat("DD.MM.YYYY");
    //             return;
    //    }
    // }, [unitSystem]);

    // useEffect(() => {
    //     if (weatherPrediction) {
    //       // const current: Weather = weatherPrediction.current;
    
    //       const daily: WeatherDaily = weatherPrediction.daily as WeatherDaily;
    //       const zipped = zip(daily.time, daily.weather_code, daily.temperature_2m_min, daily.temperature_2m_max); // _.
    //       console.log(`zipped: ${JSON.stringify(zipped)}`);
    
    //       const zippedPredictions: WeatherDailyPrediction[] = zipped.map((predictionData) => {
    //         let data: WeatherDailyPrediction = { 
    //           date: predictionData[0], 
    //           code: predictionData[1],
    //           min: predictionData[2],
    //           max: predictionData[3],
    //         };
    //         return data;
    //       });
    
    //       setPredictions(zippedPredictions.slice(1, zippedPredictions.length));
    //     }  
    //   }, [weatherPrediction]);
    return (
        <>
        {predictions.length > 0 && (
            <ul className="mt-8">
                {predictions.map((prediction: WeatherDailyPrediction , index: number) => (
                    <li className="grid grid-cols-3 my-4" key={index}>
                        <div className="text-l font-bold italic content-center text-left">{moment(prediction.date).format('dddd')}, {moment(prediction.date).format(dateFormat)}</div>
                        <div className="flex justify-center"><WeatherIcon code={prediction.code} size={'3em'} /> </div>
                        <div className="flex justify-between items-center text-l text-right font-bold"><TiArrowDown size={24} /> {prediction.min} {temperatureUnit} <TiArrowUp size={24} /> {prediction.max} {temperatureUnit}</div>
                    </li>
                ))}
            </ul>
        )}
        </>
    );
}

export default PredictionList;