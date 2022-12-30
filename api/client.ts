import { AirportData } from '../models/api';

const API_URL = 'https://api.api-ninjas.com/v1';
const API_KEY = 'YOUR-API-KEY';

const REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': API_KEY,
    Accept: 'application/json',
  },
};

export async function get(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      ...REQUEST_CONFIG,
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAirportsByName(name: string): Promise<AirportData[]> {
  try {
    const airports: AirportData[] = await get(`airports?name=${name}&`);
    return airports;
  } catch (error: any) {
    throw new Error(error);
  }
}
