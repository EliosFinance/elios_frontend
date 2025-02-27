import { login_api, logout_api, refresh_token_api, register_api } from '@/api';
import { userStore } from '@/store/UserStore.ts';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User;
    authenticate: (
        action: 'login' | 'register',
        username: string,
        password: string,
        email?: string,
    ) => Promise<boolean>;
    signOut: () => Promise<void>;
    auth: boolean;
    powensToken: string | null;
}

interface User {
    username?: string;
    token?: string;
    refresh_token?: string;
    powens_token?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const user = userStore((state) => state.user);
    const updateUser = userStore((state) => state.updateUser);
    const removeUser = userStore((state) => state.removeUser);

    const authenticate = async (action: 'login' | 'register', username: string, password: string, email?: string) => {
        try {
            let data: {
                access_token: any;
                refresh_token: any;
                powens_token: any;
                username?: string;
            } | null = null;

            if (action === 'login') {
                data = await login_api(username, password);
            } else {
                if (!email) throw new Error('Email is required for registration');
                const registered = await register_api(username, email, password);
                if (registered) {
                    data = await login_api(username, password);
                }
            }

            if (data && data.access_token) {
                updateUser({
                    username: data.username,
                    token: data.access_token,
                    refresh_token: data.refresh_token,
                    powens_token: data.powens_token,
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Authentication failed:', error);
            return false;
        }
    };

    const signOut = async () => {
        await logout_api();
        removeUser();
    };

    const refreshToken = async () => {
        try {
            if (user && user.refresh_token) {
                const data = await refresh_token_api(user.refresh_token);
                if (data && data.access_token) {
                    updateUser({
                        ...user,
                        token: data.access_token,
                        refresh_token: data.refresh_token,
                    });
                } else {
                    await signOut();
                }
            }
        } catch (error) {
            console.error('Token refresh failed', error);
            await signOut();
        }
    };

    useEffect(() => {
        const checkTokenExpiration = async () => {
            const token = user?.token;
            if (token) {
                const { exp } = JSON.parse(atob(token.split('.')[1]));
                if (Date.now() >= exp * 1000) {
                    await refreshToken();
                }
            }
        };
        setLoading(false);
        const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <AuthContext.Provider
            value={{ user, authenticate, signOut, auth: !!user, powensToken: user?.powens_token || null }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
