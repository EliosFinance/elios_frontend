import { userStore } from '@/store/UserStore';
import { challengeType } from '@/types/challengeType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

export const getChallenges = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`challenges`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des défis:', err.message);
        throw err;
    }
};

export const getPartnerChallenges = async (partnerId: number) => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`challenges/${partnerId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des défis:', err.message);
        throw err;
    }
};

export const progressChallenge = async (challengeId: number) => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`challenges/${challengeId}/progress`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la mise à jour du défi:', err.message);
        throw err;
    }
};

export const useGetChallenges = (): UseQueryResult<challengeType[], AxiosError> => {
    return useQuery<challengeType[], AxiosError>({
        queryKey: ['getChallenges'],
        queryFn: getChallenges,
    });
};
