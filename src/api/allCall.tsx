import axios, {Axios, AxiosError} from "axios";
import {
    useQuery, UseQueryResult
} from "react-query";
import {To} from 'react-router-dom'
import {userStore} from "../store/UserStore.ts";
import { useAuth } from "../context/AuthProvider.tsx";

const BACK_API_URL = import.meta.env.VITE_URL_BACK

const instance_back = axios.create({
    baseURL: BACK_API_URL
})

export const login_api = async (username: string, password: string): Promise<any> => {
    try {
        const response = await instance_back.post('auth/sign-in', {
            username,
            password
        })
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message)
    }
}

export const refresh_token_api = async (refreshToken: string) => {
    try {
        const response = await instance_back.post('auth/refresh_token',
            {
                refresh_token: refreshToken
            },
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            }
            );
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message);
        throw err;
    }
}

export const logout_api = async () => {
    try {
        const headers = userStore.getState().getAuth()
        const response = await instance_back.post('auth/invalidate-token', {}, { headers })
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message)
    }
}

export const get_powens_token = async () => {
    try {
        const headers = userStore.getState().getAuth()
        const response = await instance_back.get('powens', { headers })
        console.log(response)
        window.location.href = response.data
        return true
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message)
    }
}

const getTransactions = async () => {
    try {
        const headers = userStore.getState().getAuth()
        const response = await instance_back.get('powens/transactions', { headers })
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message)
    }
}

export const useGetTransactions = (): UseQueryResult<any, AxiosError> => {
    return useQuery<any, AxiosError>({
        queryKey: ['getTransactions'],
        queryFn: getTransactions
    })
}

const getConnection = async () => {
    try {
        const headers = userStore.getState().getAuth()
        const response = await instance_back.get('powens/connections', { headers })
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message)
    }
}

export const useGetConnection = (): UseQueryResult<any, AxiosError> => {
    return useQuery<any, AxiosError>({
        queryKey: ['getConnection'],
        queryFn: getConnection
    })
}


