import { ConnectionType } from '@/types/connectionType.ts';
import { TransactionType } from '@/types/transactionType.ts';
import axios, { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { userStore } from '../store/UserStore.ts';

const BACK_API_URL = import.meta.env.VITE_URL_BACK;

const instance_back = axios.create({
    baseURL: BACK_API_URL,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login_api = async (username: string, password: string): Promise<any> => {
    try {
        const response = await instance_back.post('auth/sign-in', {
            username,
            password,
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const refresh_token_api = async (refreshToken: string) => {
    try {
        const response = await instance_back.post(
            'auth/refresh_token',
            {
                refresh_token: refreshToken,
            },
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
        throw err;
    }
};

export const logout_api = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post('auth/invalidate-token', {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const get_powens_token = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens', { headers });
        console.log(response);
        window.location.href = response.data;
        return true;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

const getTransactions = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens/transactions', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const useGetTransactions = (): UseQueryResult<TransactionType[], AxiosError> => {
    return useQuery<TransactionType[], AxiosError>({
        queryKey: ['getTransactions'],
        queryFn: getTransactions,
    });
};

const getConnection = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens/connections', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const useGetConnection = (): UseQueryResult<ConnectionType[], AxiosError> => {
    return useQuery<ConnectionType[], AxiosError>({
        queryKey: ['getConnection'],
        queryFn: getConnection,
    });
};

export const fetchPartners = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('enterprises', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des partenaires:', err.message);
        throw err;
    }
};

export const fetchChallenges = async (partnerId: number) => {
    try {
        const response = await instance_back.get(`challenges/${partnerId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des défis:', err.message);
        throw err;
    }
};
