import * as importedCountries from './countries.json';

// { "name": "Algeria", "code": "DZ" },
export interface Country { 
    name: string, 
    code: string 
}

const parsed = JSON.parse(JSON.stringify(importedCountries));

export const countries: Country[] = Array.from(parsed['default']) as Country[];
