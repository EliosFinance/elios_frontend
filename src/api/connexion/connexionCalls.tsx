import { userStore } from '@/store/UserStore';
import { UserCompletionStatus } from '@/types/UserType';
import { ConnectionType } from '@/types/connectionType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

export type LoginType = {
    id: string;
    username: string;
    access_token: string;
    refresh_token: string;
    powens_token: string;
};

const getAuthHeaders = () => {
    const token = userStore.getState().user?.token;
    if (!token) throw new Error('Aucun token disponible');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const generateDeviceId = async (): Promise<string> => {
    try {
        const response = await instance_back.post('auth/pin/generate-device', {}, getAuthHeaders());
        return response.data.deviceId;
    } catch (error) {
        console.error('[generateDeviceId] Erreur:', error);
        throw new Error('Impossible de générer le deviceId');
    }
};

const updateUser = async (data: LoginType) => {
    try {
        userStore.getState().updateUser({
            id: data.id,
            username: data.username,
            token: data.access_token,
            refresh_token: data.refresh_token,
            powens_token: data.powens_token,
        });

        const deviceId = await generateDeviceId();
        localStorage.setItem('deviceId', deviceId);
    } catch (error) {
        console.error('[updateUser] Erreur:', error);
        throw error;
    }
};

export const register_api = async (username: string, email: string, password: string) => {
    try {
        const response = await instance_back.post('auth/sign-up', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('[register_api] Erreur:', error);
        throw error;
    }
};

export const login_api = async (usernameOrEmail: string, password: string) => {
    try {
        const response = await instance_back.post<LoginType>('auth/sign-in', {
            usernameOrEmail,
            password,
        });
        await updateUser(response.data);
        return response.data;
    } catch (error) {
        console.error('[login_api] Erreur:', error);
        throw error;
    }
};

export const getConnection = async (): Promise<ConnectionType[]> => {
    try {
        const response = await instance_back.get('powens/connections', getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('[getConnection] Erreur:', (error as AxiosError).message);
        return [];
    }
};

export const useGetConnection = (): UseQueryResult<ConnectionType[], AxiosError> => {
    return useQuery(['getConnection'], getConnection);
};

// PIN related functions
export const getPinStatus = async (): Promise<{ isSetup: boolean; isLocked: boolean }> => {
    try {
        const response = await instance_back.get('auth/pin/status', getAuthHeaders());
        return {
            isSetup: response.data.isSetup ?? false,
            isLocked: response.data.isLocked ?? false,
        };
    } catch (error) {
        console.error('[getPinStatus] Erreur:', error);
        return {
            isSetup: false,
            isLocked: false,
        };
    }
};

export const setupPin = async (pin: string): Promise<boolean> => {
    try {
        await instance_back.post('auth/pin/setup', { pin }, getAuthHeaders());
        return true;
    } catch (error) {
        console.error('[setupPin] Erreur:', error);
        return false;
    }
};

export const verifyPin = async (pin: string, deviceId?: string): Promise<void> => {
    const payload = deviceId ? { pin, deviceId } : { pin };
    await instance_back.post('auth/pin/verify', payload, getAuthHeaders());
};

// App state functions
export const appKeepAlive = async (): Promise<void> => {
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) throw new Error('Aucun deviceId trouvé');
    await instance_back.post('auth/app/keep-alive', { deviceId }, getAuthHeaders());
};

export const appClose = async (): Promise<void> => {
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) throw new Error('Aucun deviceId trouvé');
    await instance_back.post('auth/app/close', { deviceId }, getAuthHeaders());
};

export const appOpen = async (deviceId?: string): Promise<{ requiresPin: boolean }> => {
    const currentDeviceId = deviceId || localStorage.getItem('deviceId');
    if (!currentDeviceId) throw new Error('Aucun deviceId trouvé');
    const response = await instance_back.post<{ requiresPin: boolean }>(
        'auth/app/open',
        { deviceId: currentDeviceId },
        getAuthHeaders(),
    );
    return response.data;
};

export const login_google = async (token: string): Promise<LoginType | null> => {
    try {
        const response = await instance_back.post<LoginType>('auth/google', { token });
        await updateUser(response.data);
        return response.data;
    } catch (error) {
        console.error('[login_google] Erreur:', error);
        return null;
    }
};

export const refresh_token_api = async (refreshToken: string) => {
    try {
        const response = await instance_back.post(
            'auth/refresh-token',
            { refresh_token: refreshToken },
            { headers: { Authorization: `Bearer ${refreshToken}` } },
        );
        return response.data;
    } catch (error) {
        console.error('[refresh_token_api] Erreur:', error);
        throw error;
    }
};

export const logout_api = async (): Promise<void> => {
    try {
        await instance_back.post('auth/invalidate-token', {}, getAuthHeaders());
        userStore.getState().removeUser();
        localStorage.removeItem('deviceId');
    } catch (error) {
        console.error('[logout_api] Erreur:', error);
        throw error;
    }
};

export const checkUserCompletionStatus = async (userId: string): Promise<UserCompletionStatus> => {
    try {
        const response = await instance_back.get(`/auth/registration/status/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error checking user completion status:', error);
        throw error;
    }
};

export const markEmailAsVerified = async (email: string) => {
    try {
        const response = await instance_back.post(
            '/auth/registration/verify-email-google',
            { email },
            getAuthHeaders(),
        );
        return response.data;
    } catch (error) {
        console.error('Error marking email as verified:', error);
        throw error;
    }
};

export const acceptTermsAndConditions = async (userId: string) => {
    try {
        const response = await instance_back.post('/auth/registration/accept-terms', { userId }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error accepting terms:', error);
        throw error;
    }
};

export const updateUserProfile = async (profileData: any) => {
    try {
        const response = await instance_back.put('/auth/registration/profile', profileData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const markPinConfigured = async () => {
    try {
        const response = await instance_back.post('/auth/registration/mark-pin-configured', {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error marking PIN as configured:', error);
        throw error;
    }
};

export const requestResetPassword = async (email: string) => {
    try {
        const response = await instance_back.post('/auth/request-reset-password', { email });
        return response.data;
    } catch (error) {
        console.error('[requestResetPassword] Erreur:', error);
        throw error;
    }
};

export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await instance_back.post('/auth/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('[resetPassword] Erreur:', error);
        throw error;
    }
};

export const validateResetToken = async (token: string) => {
    try {
        const response = await instance_back.post('/auth/validate-reset-token', { token });
        return response.data;
    } catch (error) {
        console.error('[validateResetToken] Erreur:', error);
        throw error;
    }
};
