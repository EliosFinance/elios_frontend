import { instance_back } from '@/api/const';
import { useEffect, useState } from 'react';

export const usePinVerification = () => {
    const [requiresPin, setRequiresPin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkPinStatus = async () => {
            try {
                const deviceId = localStorage.getItem('deviceId');
                if (!deviceId) {
                    setIsLoading(false);
                    return;
                }

                const response = await instance_back.post('auth/app/open', { deviceId });
                setRequiresPin(response.data.requiresPin);
            } catch (error) {
                console.error('Erreur vérification PIN:', error);
                setRequiresPin(true);
            } finally {
                setIsLoading(false);
            }
        };

        checkPinStatus();
    }, []);

    const verifyPin = async (pin: string) => {
        try {
            await instance_back.post('auth/pin/verify', { pin });
            setRequiresPin(false);
            return true;
        } catch (error) {
            console.error('Erreur vérification PIN:', error);
            return false;
        }
    };

    return {
        requiresPin,
        isLoading,
        verifyPin,
    };
};
