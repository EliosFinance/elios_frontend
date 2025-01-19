import { userStore } from '@/store/UserStore';
import { ConnectionType } from '@/types/connectionType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

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
