import { appClose, appOpen } from '@/api/connexion/connexionCalls';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useRef } from 'react';

export const usePinVerification = () => {
    const isProcessingRef = useRef(false);
    const pinVerifiedRef = useRef(false);
    const deviceIdRef = useRef<string | null>(null);

    useEffect(() => {
        const user = userStore.getState().user;
        if (!user?.id) {
            console.log('usePinVerification: User not logged in, skipping setup');
            return;
        }

        // Ne pas réinitialiser le deviceId s'il existe déjà
        if (!deviceIdRef.current) {
            deviceIdRef.current = localStorage.getItem('deviceId');
        }

        const handleVisibilityChange = async () => {
            if (isProcessingRef.current) return;

            // Ne pas vérifier si nous sommes déjà sur la page de vérification du PIN
            if (window.location.pathname === APP_ROUTES_ENUM.PIN_VERIFICATION) {
                console.log('Already on PIN verification page, skipping check');
                return;
            }

            const user = userStore.getState().user;
            const deviceId = deviceIdRef.current;

            if (!user || !deviceId) {
                console.log('Skipping visibility change handling - no deviceId or user not logged in');
                return;
            }

            if (document.visibilityState === 'hidden') {
                try {
                    isProcessingRef.current = true;
                    console.log('Calling appClose with deviceId:', deviceId);
                    await appClose();
                    // Ne pas supprimer le deviceId en cas d'erreur
                    // On le garde pour la prochaine ouverture
                } catch (error) {
                    console.error('Error in appClose:', error);
                    // En cas d'erreur, on ne fait rien
                    // Le deviceId reste dans le localStorage
                    // La prochaine ouverture vérifiera si l'app était fermée
                } finally {
                    isProcessingRef.current = false;
                }
            } else if (document.visibilityState === 'visible') {
                try {
                    isProcessingRef.current = true;
                    console.log('Checking if PIN is required after app return...');
                    const { requiresPin } = await appOpen(deviceId);
                    console.log('PIN required after app return:', requiresPin);

                    if (requiresPin) {
                        console.log('PIN required after app return, redirecting to PIN verification');
                        window.location.href = APP_ROUTES_ENUM.PIN_VERIFICATION;
                    }
                } catch (error) {
                    console.error('Error checking PIN status after app return:', error);
                } finally {
                    isProcessingRef.current = false;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
};
