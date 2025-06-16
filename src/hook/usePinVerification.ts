import { appClose, appOpen } from '@/api/connexion/connexionCalls';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const usePinVerification = () => {
    const isProcessingRef = useRef(false);
    const deviceIdRef = useRef<string | null>(null);
    const { user, setLastUserLocation } = userStore();
    const location = useLocation();

    useEffect(() => {
        if (!user?.id) {
            console.log('[usePinVerification] User not logged in, skipping setup');
            return;
        }

        if (!deviceIdRef.current) {
            deviceIdRef.current = localStorage.getItem('deviceId');
            console.log('[usePinVerification] DeviceId loaded:', deviceIdRef.current);
        }

        const handleVisibilityChange = async () => {
            if (isProcessingRef.current) {
                console.log('⏳ [usePinVerification] Already processing, skipping');
                return;
            }
            if (location.pathname === APP_ROUTES_ENUM.PIN_VERIFICATION || location.pathname === APP_ROUTES_ENUM.LOGIN) {
                console.log('[usePinVerification] Already on PIN verification or login page, skipping check');
                return;
            }

            const currentUser = userStore.getState().user;
            const deviceId = deviceIdRef.current;

            if (!currentUser || !deviceId) {
                console.log(
                    '[usePinVerification] Skipping visibility change handling - no deviceId or user not logged in',
                );
                return;
            }

            if (document.visibilityState === 'hidden') {
                try {
                    isProcessingRef.current = true;
                    setLastUserLocation(location.pathname);
                    userStore.getState().setLastUserLocation(location.pathname);
                    await appClose();
                } catch (error) {
                    console.error('[usePinVerification] Error in appClose:', error);
                } finally {
                    isProcessingRef.current = false;
                }
            } else if (document.visibilityState === 'visible') {
                try {
                    isProcessingRef.current = true;
                    const { requiresPin } = await appOpen(deviceId);

                    if (requiresPin) {
                        const currentLastLocation = userStore.getState().lastUserLocation;
                        if (!currentLastLocation || currentLastLocation === APP_ROUTES_ENUM.PIN_VERIFICATION) {
                            console.log(
                                '💾 [usePinVerification] No valid lastUserLocation, saving current:',
                                location.pathname,
                            );
                            setLastUserLocation(location.pathname);
                            userStore.getState().setLastUserLocation(location.pathname);

                            setTimeout(() => {
                                const finalLocation = userStore.getState().lastUserLocation;
                                console.log(
                                    '💾 [usePinVerification] Final location saved before redirect:',
                                    finalLocation,
                                );
                                console.log(
                                    '📝 [usePinVerification] localStorage content:',
                                    localStorage.getItem('user-storage'),
                                );
                                window.location.href = APP_ROUTES_ENUM.PIN_VERIFICATION;
                            }, 150);
                        } else {
                            window.location.href = APP_ROUTES_ENUM.PIN_VERIFICATION;
                        }
                    }
                } catch (error) {
                    if (
                        location.pathname !== APP_ROUTES_ENUM.PIN_VERIFICATION &&
                        location.pathname !== APP_ROUTES_ENUM.LOGIN
                    ) {
                        console.log('❗ [usePinVerification] Error occurred, saving location:', location.pathname);
                        setLastUserLocation(location.pathname);
                        userStore.getState().setLastUserLocation(location.pathname);
                    }
                } finally {
                    isProcessingRef.current = false;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [location.pathname, user?.id]);

    const forceSetLocation = (path: string) => {
        console.log('[usePinVerification] Force setting location to:', path);
        setLastUserLocation(path);
        userStore.getState().setLastUserLocation(path);
    };

    return {
        forceSetLocation,
    };
};
