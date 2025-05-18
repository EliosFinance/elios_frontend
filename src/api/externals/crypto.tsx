import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { CRYPTO_API_KEY, instance_coingecko } from '../const';

export const getBitcoin = async () => {
    try {
        const response = await instance_coingecko.get('bitcoin', {
            params: {
                x_cg_demo_api_key: CRYPTO_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des partenaires:', err.message);
        throw err;
    }
};

export const useGetBitcoin = (): UseQueryResult<any, AxiosError> => {
    return useQuery<any, AxiosError>({
        queryKey: ['getBitcoin'],
        queryFn: getBitcoin,
    });
};
