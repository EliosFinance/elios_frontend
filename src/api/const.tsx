import axios from 'axios';

export const BACK_API_URL = import.meta.env.VITE_URL_BACK;
export const CRYPTO_API_KEY = import.meta.env.VITE_CRYPTO_API_KEY;

export const instance_back = axios.create({
    baseURL: BACK_API_URL,
});

export const instance_coingecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins',
    headers: {
        accept: 'application/json',
    },
});
