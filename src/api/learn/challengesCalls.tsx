import { AxiosError } from 'axios';
import { instance_back } from '../const';

export const getChallenges = async (partnerId: number) => {
    try {
        const response = await instance_back.get(`challenges/${partnerId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des défis:', err.message);
        throw err;
    }
};
