import { userStore } from '@/store/UserStore';
import { TransactionType } from '@/types/transactionType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

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
