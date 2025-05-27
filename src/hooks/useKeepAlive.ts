import { appClose, appKeepAlive } from '@/api/connexion/connexionCalls';
import { useEffect } from 'react';

const KEEP_ALIVE_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useKeepAlive = () => {
    useEffect(() => {
        let keepAliveInterval: NodeJS.Timeout;

        const startKeepAlive = () => {
            keepAliveInterval = setInterval(async () => {
                try {
                    await appKeepAlive();
                } catch (error) {
                    console.error('Erreur keep-alive:', error);
                }
            }, KEEP_ALIVE_INTERVAL);
        };

        const handleAppClose = async () => {
            try {
                await appClose();
            } catch (error) {
                console.error('Erreur fermeture app:', error);
            }
        };

        startKeepAlive();
        window.addEventListener('beforeunload', handleAppClose);

        return () => {
            clearInterval(keepAliveInterval);
            window.removeEventListener('beforeunload', handleAppClose);
            handleAppClose();
        };
    }, []);
};
