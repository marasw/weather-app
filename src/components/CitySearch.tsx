import { useAppSelector, useAppDispatch } from '../hooks';
import { 
    setInputSuccess,
    setCitySuccess,
    setFilteredCitiesSuccess,
    City, 
} from '../state/citySearchSlice';
// import { KeyboardEvent, useState } from 'react';

const CitySearch = () => {
    const filteredCities = useAppSelector((state) => state.citySearch.filteredCities);
    const dispatch = useAppDispatch();

    // const handleKey = (event: KeyboardEvent) => {
    //     if (event.key === 'Enter') {
    //         handleSelect(filteredCities[0]);
    //     }
    // };

    const handleSelect = (value: City) => {
        console.log(`handleSelect: ${ JSON.stringify(value) }`);
        dispatch(setCitySuccess(value));
        dispatch(setFilteredCitiesSuccess([]));
    };

    return (
        <div>
            <div className="relative justify-center">
                <input
                    id="input"
                    autoComplete="off"
                    // value={search.text}
                    placeholder="Enter City"
                    onChange={(event) => dispatch(setInputSuccess(event.target.value))}
                    type={"text"}
                />
                {filteredCities.length > 0 && (
                    <div
                        className={
                            filteredCities.length > 0 ? (
                                'absolute w-full mt-2 bg-white rounded-lg py-2 shadow-xl'
                            ) : (
                                'hidden'
                            )
                        }
                    >
                        {filteredCities.map((city: City) => ( // , index
                            <button 
                                onClick={() => handleSelect(city)} 
                                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                                {city.name} | {city.country} | {city.state}
                            </button>
                        ))}
                    </div>
                )}
                </div>
        </div>
    );
}

export default CitySearch;
