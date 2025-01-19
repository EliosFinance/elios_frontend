import { userStore } from '@/store/UserStore.ts';
import { AxiosError } from 'axios';
import { instance_back } from './const.tsx';

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
