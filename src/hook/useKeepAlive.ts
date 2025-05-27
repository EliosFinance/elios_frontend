import { appClose, appKeepAlive } from '@/api/connexion/connexionCalls';
import { userStore } from '@/store/UserStore';
import { useEffect } from 'react';

export const useKeepAlive = () => {
    useEffect(() => {
        const user = userStore.getState().user;
        if (!user?.token) return;

        const interval = setInterval(async () => {
            try {
                const currentUser = userStore.getState().user;
                if (!currentUser?.token) {
                    clearInterval(interval);
                    return;
                }
                await appKeepAlive();
            } catch (error) {
                console.error('Error in keep-alive:', error);
            }
        }, 30000); // Every 30 seconds

        const handleBeforeUnload = async () => {
            try {
                const currentUser = userStore.getState().user;
                if (currentUser?.token) {
                    await appClose();
                }
            } catch (error) {
                console.error('Error closing app:', error);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(interval);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};
