import { userStore } from '@/store/UserStore';
import { ConnectionType } from '@/types/connectionType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

export type LoginType = {
    access_token: string;
    refresh_token: string;
    username: string;
    powens_token: string;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login_api = async (username: string, password: string): Promise<LoginType | null> => {
    try {
        const response = await instance_back.post('auth/sign-in', {
            usernameOrEmail: username,
            password,
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const login_google = async (token: string) => {
    try {
        const response = await instance_back.post('auth/google', {
            token
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError
        console.error(err.message)
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register_api = async (username: string, email: string, password: string): Promise<LoginType | null> => {
    try {
        const response = await instance_back.post('auth/sign-up', {
            username,
            email,
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
            'auth/refresh-token',
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
