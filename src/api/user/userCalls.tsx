import { userStore } from '@/store/UserStore.ts';
import {
    BehaviorAnalysis,
    CacheStats,
    FeedbackData,
    PersonalizedContent,
    SimilarUser,
    TimingOptimization,
    UserInsights,
    UserPreferences,
} from '@/types/UserType';
import { AxiosError } from 'axios';
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
import { instance_back } from '../const';

// Query functions
export const getUser = async () => {
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

export const getSimilarUsers = async (limit: number = 5): Promise<SimilarUser[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`recommendations/similar-users?limit=${limit}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des utilisateurs similaires:', err.message);
        throw err;
    }
};

export const getBehaviorAnalysis = async (): Promise<BehaviorAnalysis> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('recommendations/behavior-analysis', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération de l'analyse comportementale:", err.message);
        throw err;
    }
};

export const getTimingOptimization = async (): Promise<TimingOptimization> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('recommendations/timing-optimization', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération de l'optimisation du timing:", err.message);
        throw err;
    }
};

export const getCacheStats = async (): Promise<CacheStats> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get('recommendations/cache/stats', { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des stats de cache:', err.message);
        throw err;
    }
};

export const submitFeedback = async (feedback: FeedbackData) => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post('recommendations/feedback', feedback, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de l'envoi du feedback:", err.message);
        throw err;
    }
};

export const clearUserCache = async () => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post('recommendations/cache/clear', {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors du vidage du cache:', err.message);
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

export const useGetSimilarUsers = (
    limit: number = 5,
    options?: { enabled?: boolean },
): UseQueryResult<SimilarUser[], AxiosError> => {
    return useQuery<SimilarUser[], AxiosError>({
        queryKey: ['similarUsers', limit],
        queryFn: () => getSimilarUsers(limit),
        staleTime: 1000 * 60 * 60 * 2, // 2 heures
        cacheTime: 1000 * 60 * 60 * 4, // 4 heures
        ...options,
    });
};

export const useGetBehaviorAnalysis = (options?: { enabled?: boolean }): UseQueryResult<
    BehaviorAnalysis,
    AxiosError
> => {
    return useQuery<BehaviorAnalysis, AxiosError>({
        queryKey: ['behaviorAnalysis'],
        queryFn: getBehaviorAnalysis,
        staleTime: 1000 * 60 * 60, // 1 heure
        cacheTime: 1000 * 60 * 60 * 6, // 6 heures
        ...options,
    });
};

export const useGetTimingOptimization = (options?: { enabled?: boolean }): UseQueryResult<
    TimingOptimization,
    AxiosError
> => {
    return useQuery<TimingOptimization, AxiosError>({
        queryKey: ['timingOptimization'],
        queryFn: getTimingOptimization,
        staleTime: 1000 * 60 * 60 * 12, // 12 heures
        cacheTime: 1000 * 60 * 60 * 24, // 24 heures
        ...options,
    });
};

export const useGetCacheStats = (options?: { enabled?: boolean }): UseQueryResult<CacheStats, AxiosError> => {
    return useQuery<CacheStats, AxiosError>({
        queryKey: ['cacheStats'],
        queryFn: getCacheStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchInterval: 1000 * 60 * 5, // Refresh toutes les 5 minutes
        ...options,
    });
};

export const useSubmitFeedback = (): UseMutationResult<any, AxiosError, FeedbackData> => {
    return useMutation<any, AxiosError, FeedbackData>({
        mutationFn: submitFeedback,
        onSuccess: () => {
            // Invalider les caches liés aux recommandations après feedback
            // Cette invalidation pourrait être gérée par React Query
            console.log('Feedback envoyé avec succès');
        },
        onError: (error) => {
            console.error("Erreur lors de l'envoi du feedback:", error);
        },
    });
};

export const useClearUserCache = (): UseMutationResult<any, AxiosError, void> => {
    return useMutation<any, AxiosError, void>({
        mutationFn: clearUserCache,
        onSuccess: () => {
            // Invalider tous les caches de recommandations après vidage
            console.log('Cache utilisateur vidé avec succès');
        },
        onError: (error) => {
            console.error('Erreur lors du vidage du cache:', error);
        },
    });
};

export const useRecommendationsDashboard = () => {
    const preferences = useGetUserPreferences();
    const personalizedContent = useGetPersonalizedContent();
    const insights = useGetUserInsights();
    const timingOptimization = useGetTimingOptimization();

    return {
        preferences,
        personalizedContent,
        insights,
        timingOptimization,
        isLoading:
            preferences.isLoading ||
            personalizedContent.isLoading ||
            insights.isLoading ||
            timingOptimization.isLoading,
        hasError: preferences.isError || personalizedContent.isError || insights.isError || timingOptimization.isError,
    };
};

export const useAdvancedAnalytics = () => {
    const behaviorAnalysis = useGetBehaviorAnalysis();
    const similarUsers = useGetSimilarUsers();
    const cacheStats = useGetCacheStats();

    return {
        behaviorAnalysis,
        similarUsers,
        cacheStats,
        isLoading: behaviorAnalysis.isLoading || similarUsers.isLoading || cacheStats.isLoading,
        hasError: behaviorAnalysis.isError || similarUsers.isError || cacheStats.isError,
    };
};

export const useSmartRecommendations = (algorithm: 'content' | 'collaborative' | 'hybrid' = 'hybrid') => {
    const recommendations = useGetPersonalizedContent(10, algorithm);
    const submitFeedbackMutation = useSubmitFeedback();

    const handleFeedback = (feedback: FeedbackData) => {
        submitFeedbackMutation.mutate(feedback, {
            onSuccess: () => {
                // Recharger les recommandations après feedback
                recommendations.refetch();
            },
        });
    };

    return {
        recommendations: recommendations.data,
        isLoading: recommendations.isLoading,
        isError: recommendations.isError,
        error: recommendations.error,
        submitFeedback: handleFeedback,
        isSubmittingFeedback: submitFeedbackMutation.isLoading,
        refetch: recommendations.refetch,
    };
};
