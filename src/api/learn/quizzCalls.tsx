import { userStore } from '@/store/UserStore';
import { QuizzType } from '@/temp/QuizzData';
import { ArticleCategoryType } from '@/types/BlogType';
import { AxiosError } from 'axios';
import { instance_back } from '../const';

export const getAllQuizz = async (): Promise<QuizzType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`quizz`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des quizz:', err.message);
        throw err;
    }
};
export const getSingleQuizz = async (quizzId: number): Promise<QuizzType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`quizz/${quizzId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du quizz n°${quizzId}:`, err.message);
        throw err;
    }
};
export const completeQuizz = async (quizzId: number, score: number): Promise<QuizzType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`quizz/${quizzId}/complete`, { score }, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du quizz n°${quizzId}:`, err.message);
        throw err;
    }
};
