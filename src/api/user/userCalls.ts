import { userStore } from '@/store/UserStore.ts';
import { NotificationType, userType } from '@/types/challengeType';
import { PersonalizedContent, UserInsights, UserPreferences } from '@/types/recommendationsType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

export const getUser = async (): Promise<userType | undefined> => {
    const headers = userStore.getState().getAuth();
    const id = userStore.getState().user?.id;
    if (!id) throw new Error('User ID is not available');
    const response = await instance_back.get(`users/${id}`, { headers });
    return response.data;
};

export const getUserPreferences = async (daysBack: number = 30): Promise<UserPreferences> => {
    const headers = userStore.getState().getAuth();
    const response = await instance_back.get(`recommendations/preferences?daysBack=${daysBack}`, { headers });
    return response.data;
};

export const getPersonalizedContent = async (
    limit: number = 10,
    algorithm: 'content' | 'collaborative' | 'hybrid' = 'hybrid',
): Promise<PersonalizedContent> => {
    const headers = userStore.getState().getAuth();
    const response = await instance_back.get(`recommendations/content?limit=${limit}&algorithm=${algorithm}`, {
        headers,
    });
    return response.data;
};

export const getUserInsights = async (): Promise<UserInsights> => {
    const headers = userStore.getState().getAuth();
    const response = await instance_back.get('recommendations/insights', { headers });
    return response.data;
};

export const getUserNotifications = async (): Promise<NotificationType> => {
    const headers = userStore.getState().getAuth();
    const response = await instance_back.get('users/notifications', { headers });
    return response.data;
};

export const updateUserNotifications = async (notif: NotificationType): Promise<NotificationType> => {
    const headers = userStore.getState().getAuth();
    const response = await instance_back.patch('users/notifications', notif, { headers });
    return response.data;
};

export const updateUserAvatar = async (avatarUrl: string): Promise<userType> => {
    const headers = userStore.getState().getAuth();
    const id = userStore.getState().user?.id;
    if (!id) throw new Error('User ID is not available');
    const response = await instance_back.patch(`users/${id}/avatar`, { avatarUrl }, { headers });
    return response.data;
};

export const removeUserAvatar = async (): Promise<userType> => {
    const headers = userStore.getState().getAuth();
    const id = userStore.getState().user?.id;
    if (!id) throw new Error('User ID is not available');
    const response = await instance_back.delete(`users/${id}/avatar`, { headers });
    return response.data;
};

export const useGetUser = (): UseQueryResult<userType | undefined, AxiosError> => {
    return useQuery<userType | undefined, AxiosError>({
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
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
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
        staleTime: 1000 * 60 * 15,
        cacheTime: 1000 * 60 * 30,
        ...options,
    });
};

export const useGetUserInsights = (options?: { enabled?: boolean }): UseQueryResult<UserInsights, AxiosError> => {
    return useQuery<UserInsights, AxiosError>({
        queryKey: ['userInsights'],
        queryFn: getUserInsights,
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 2,
        ...options,
    });
};

export const useGetUserNotifications = (): UseQueryResult<NotificationType, AxiosError> => {
    return useQuery<NotificationType, AxiosError>({
        queryKey: ['userNotifications'],
        queryFn: getUserNotifications,
    });
};
