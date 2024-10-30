import { debounce } from 'radash'; // throttle, 
import { useAppSelector, useAppDispatch } from '../hooks';
import { countries, Country } from '../data/countries';
import { 
    setInputSuccess,
    setCitySuccess,
    setFilteredCitiesSuccess,
    City, 
} from '../state/citySearchSlice';
// import { useEffect, useState } from 'react';
// import { KeyboardEvent, useState } from 'react';

const CitySearch = () => {
    const { filteredCities, input } = useAppSelector((state) => state.citySearch);
    const dispatch = useAppDispatch();

    // const [inputValue, setInputValue] = useState('');

    // const handleKey = (event: KeyboardEvent) => {
    //     if (event.key === 'Enter') {
    //         handleSelect(filteredCities[0]);
    //     }
    // };

    const onClick = (value: City) => {
        // console.log(`handleSelect: ${ JSON.stringify(value) }`);
        dispatch(setCitySuccess(value));
        dispatch(setFilteredCitiesSuccess([]));
    };

    const dispatchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputSuccess(event.target.value));
    }

    const getCountryName =  (countryCode: string): string => {
        // console.log('get-country: ' + countryCode);
        const cntrs: Country[] = countries.filter((country) => country.code == countryCode);
        // console.log('cntrs ' + JSON.stringify(cntrs));
        return (cntrs.length > 0) ? cntrs[0].name : '';
    }

    // useEffect(() => {
    //     if (input) {
    //       setInputValue('');
    //     }
    // }, [input]);
    
    return (
        <div>
            <div className="relative justify-center">
                <input
                    id="input"
                    autoComplete="off"
                    // value={inputValue}
                    placeholder="Enter City"
                    // onChange={throttle({ interval: 200 }, dispatchInput)}
                    onChange={debounce({ delay: 350 }, dispatchInput)}
                    type={"text"}
                />
                {filteredCities.length > 0 && (
                    // <div class="overflow-y-auto h-32 ..."></div>
                    <div
                        className={
                            filteredCities.length > 0 ? (
                                'absolute w-full overflow-y-auto h-64 mt-2 bg-white rounded-lg py-2 shadow-xl'
                            ) : (
                                'hidden'
                            )
                        }
                    >
                        {filteredCities.map((city: City, index: number) => (
                            <button 
                                key={index}
                                onClick={() => onClick(city)} 
                                className="block w-full px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white">
                                {city.name} ({getCountryName(city.country)}{city.state.length > 0 ? ', ' + city.state : ''})
                            </button>
                        ))}
                    </div>
                )}
                </div>
        </div>
    );
}

export default CitySearch;
