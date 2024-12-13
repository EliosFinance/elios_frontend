import axios from 'axios';

export const BACK_API_URL = import.meta.env.VITE_URL_BACK;

export const instance_back = axios.create({
    baseURL: BACK_API_URL,
});
