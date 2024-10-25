import { City } from '../state/citySearchSlice';
import * as importedCities from './city.list.json';
import { LowSync, MemorySync } from 'lowdb';

const parsed = JSON.parse(JSON.stringify(importedCities));
export const cities: City[] = Array.from(parsed['default']) as City[];

const adapter = new MemorySync<City[]>();
export const db = new LowSync<City[]>(adapter, cities);
