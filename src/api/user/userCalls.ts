import { userStore } from '@/store/UserStore.ts';
import { NotificationType, userType } from '@/types/challengeType';
import { PersonalizedContent, UserInsights, UserPreferences } from '@/types/recommendationsType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

// Query functions
export const getUser = async (): Promise<userType | undefined> => {
    try {
        const headers = userStore.getState().getAuth();

        const id = userStore.getState().user?.id;
        if (!id) {
            throw new Error('User ID is not available');
        }

        const response = await instance_back.get(`users/${id}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des partenaires:', err.message);
        throw err;
    }
};

export const getUserPreferences = async (daysBack: number = 30): Promise<UserPreferences> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`recommendations/preferences?daysBack=${daysBack}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des préférences:', err.message);
        throw err;
    }
};

export const getPersonalizedContent = async (
    limit: number = 10,
    algorithm: 'content' | 'collaborative' | 'hybrid' = 'hybrid',
): Promise<PersonalizedContent> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`recommendations/content?limit=${limit}&algorithm=${algorithm}`, {
            headers,
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération du contenu personnalisé:', err.message);
        throw err;
    }
};

export const getUserInsights = async (): Promise<UserInsights> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('recommendations/insights', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des insights:', err.message);
        throw err;
    }
};

export const getUserNotifications = async (): Promise<NotificationType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('users/notifications', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des notifications:', err.message);
        throw err;
    }
};

export const updateUserNotifications = async (notif: NotificationType): Promise<NotificationType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.patch('users/notifications', notif, {
            headers,
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la mise à jour des notifications:', err.message);
        throw err;
    }
};

export const useGetHeader = (): UseQueryResult<any, AxiosError> => {
    return useQuery<any, AxiosError>({
        queryKey: ['getUser'],
        queryFn: getUser,
    });
};

export const useGetUserPreferences = (
    daysBack: number = 30,
    options?: { enabled?: boolean },
): UseQueryResult<UserPreferences, AxiosError> => {
    return useQuery<UserPreferences, AxiosError>({
        queryKey: ['userPreferences', daysBack],
        queryFn: () => getUserPreferences(daysBack),
        staleTime: 1000 * 60 * 30, // 30 minutes
        cacheTime: 1000 * 60 * 60, // 1 heure
        ...options,
    });
};

export const useGetPersonalizedContent = (
    limit: number = 10,
    algorithm: 'content' | 'collaborative' | 'hybrid' = 'hybrid',
    options?: { enabled?: boolean },
): UseQueryResult<PersonalizedContent, AxiosError> => {
    return useQuery<PersonalizedContent, AxiosError>({
        queryKey: ['personalizedContent', limit, algorithm],
        queryFn: () => getPersonalizedContent(limit, algorithm),
        staleTime: 1000 * 60 * 15, // 15 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
        ...options,
    });
};

export const useGetUserInsights = (options?: { enabled?: boolean }): UseQueryResult<UserInsights, AxiosError> => {
    return useQuery<UserInsights, AxiosError>({
        queryKey: ['userInsights'],
        queryFn: getUserInsights,
        staleTime: 1000 * 60 * 60, // 1 heure
        cacheTime: 1000 * 60 * 60 * 2, // 2 heures
        ...options,
    });
};

export const useGetUserNotifications = (): UseQueryResult<NotificationType, AxiosError> => {
    return useQuery<NotificationType, AxiosError>({
        queryKey: ['userNotifications'],
        queryFn: getUserNotifications,
    });
};
