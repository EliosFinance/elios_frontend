import { userStore } from '@/store/UserStore';
import { ConnectionType, ConnectorType } from '@/types/connectionType';
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

const getTransactions = async (connections: ConnectionType[]) => {
    try {
        console.log('Fetching transactions for connections:', connections);
        if (connections.length === 0) {
            console.warn('No connections provided, returning empty transactions array');
            return [];
        }
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens/transactions', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const useGetTransactions = (connections: ConnectionType[]): UseQueryResult<TransactionType[], AxiosError> => {
    return useQuery<TransactionType[], AxiosError>({
        queryKey: ['getTransactions'],
        queryFn: () => getTransactions(connections),
    });
};

const getConnectors = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens/connectors', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const useGetConnectors = (): UseQueryResult<ConnectorType[], AxiosError> => {
    return useQuery<ConnectorType[], AxiosError>({
        queryKey: ['getConnectors'],
        queryFn: getConnectors,
    });
};

export const getSingleConnector = async (connector_uuid: string) => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens/connector', {
            params: { uuid: connector_uuid },
            headers,
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

const getConnections = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('powens/connections', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const useGetConnections = (): UseQueryResult<ConnectionType[], AxiosError> => {
    return useQuery<ConnectionType[], AxiosError>({
        queryKey: ['getConnections'],
        queryFn: getConnections,
    });
};

export const getWebViewUrl = async (connector_uuids: string): Promise<{ url: string }> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post('powens/add/connection', { connector_uuids }, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};

export const getWebViewRefreshUrl = async (connection_id?: string): Promise<{ url: string }> => {
    try {
        const headers = userStore.getState().getAuth();
        const payload: { [key: string]: string } = {};

        if (connection_id !== undefined) {
            payload.connection_id = connection_id;
        }
        const response = await instance_back.post('powens/refresh/connection', payload, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
    }
};
