import { appClose, appOpen } from '@/api/connexion/connexionCalls';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Configuration
const CONFIG = {
    GRACE_PERIOD: 60000, // 1 minute avant de demander le PIN
    DEBOUNCE_DELAY: 100,
    SAVE_LOCATION_DELAY: 50,
    EXCLUDED_ROUTES: [APP_ROUTES_ENUM.PIN_VERIFICATION, APP_ROUTES_ENUM.LOGIN],
};

export const usePinVerification = () => {
    const isProcessingRef = useRef(false);
    const deviceIdRef = useRef<string | null>(null);
    const lastHiddenTimeRef = useRef<number>(0);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const graceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const { user, setLastUserLocation } = userStore();
    const location = useLocation();
    const navigate = useNavigate();

    const apiCacheRef = useRef<{
        timestamp: number;
        requiresPin: boolean;
    } | null>(null);

    const isExcludedRoute = useCallback((pathname: string) => {
        return CONFIG.EXCLUDED_ROUTES.includes(pathname);
    }, []);

    const saveUserLocation = useCallback(
        (path: string) => {
            if (!isExcludedRoute(path)) {
                console.log('[usePinVerification] Saving location:', path);
                setLastUserLocation(path);
                userStore.getState().setLastUserLocation(path);
            }
        },
        [setLastUserLocation, isExcludedRoute],
    );

    const navigateToPinVerification = useCallback(() => {
        console.log('[usePinVerification] Navigating to PIN verification');
        navigate(APP_ROUTES_ENUM.PIN_VERIFICATION, {
            replace: true,
            state: { fromSecurityCheck: true },
        });
    }, [navigate]);

    const handleAppClose = useCallback(async () => {
        if (!user?.id || isProcessingRef.current) return;

        try {
            isProcessingRef.current = true;
            lastHiddenTimeRef.current = Date.now();
            saveUserLocation(location.pathname);
            await appClose();
        } catch (error) {
            console.error('[usePinVerification] Error in appClose:', error);
        } finally {
            isProcessingRef.current = false;
        }
    }, [user?.id, location.pathname, saveUserLocation]);

    const checkPinRequirement = useCallback(
        async (deviceId: string): Promise<boolean> => {
            const now = Date.now();
            if (apiCacheRef.current && now - apiCacheRef.current.timestamp < 10000) {
                console.log('[usePinVerification] Using cached PIN requirement');
                return apiCacheRef.current.requiresPin;
            }

            try {
                const { requiresPin } = await appOpen(deviceId);

                apiCacheRef.current = {
                    timestamp: now,
                    requiresPin,
                };

                return requiresPin;
            } catch (error) {
                console.error('[usePinVerification] Error checking PIN requirement:', error);
                saveUserLocation(location.pathname);
                return false;
            }
        },
        [location.pathname, saveUserLocation],
    );

    const handleAppOpen = useCallback(async () => {
        if (!user?.id || !deviceIdRef.current || isProcessingRef.current) return;
        if (isExcludedRoute(location.pathname)) return;

        const timeSinceHidden = Date.now() - lastHiddenTimeRef.current;
        const deviceId = deviceIdRef.current;

        if (timeSinceHidden < CONFIG.GRACE_PERIOD && lastHiddenTimeRef.current > 0) {
            console.log(`[usePinVerification] Grace period active (${timeSinceHidden}ms < ${CONFIG.GRACE_PERIOD}ms)`);
            return;
        }

        try {
            isProcessingRef.current = true;
            const requiresPin = await checkPinRequirement(deviceId);

            if (requiresPin) {
                const currentLastLocation = userStore.getState().lastUserLocation;

                if (!currentLastLocation || isExcludedRoute(currentLastLocation)) {
                    saveUserLocation(location.pathname);

                    setTimeout(() => {
                        navigateToPinVerification();
                    }, CONFIG.SAVE_LOCATION_DELAY);
                } else {
                    navigateToPinVerification();
                }
            }
        } catch (error) {
            console.error('[usePinVerification] Error in handleAppOpen:', error);
        } finally {
            isProcessingRef.current = false;
        }
    }, [
        user?.id,
        location.pathname,
        checkPinRequirement,
        saveUserLocation,
        navigateToPinVerification,
        isExcludedRoute,
    ]);

    const debouncedVisibilityChange = useCallback(async () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(async () => {
            if (document.visibilityState === 'hidden') {
                await handleAppClose();
            } else if (document.visibilityState === 'visible') {
                await handleAppOpen();
            }
        }, CONFIG.DEBOUNCE_DELAY);
    }, [handleAppClose, handleAppOpen]);

    useEffect(() => {
        if (!user?.id) {
            console.log('[usePinVerification] User not logged in, skipping setup');
            return;
        }

        if (!deviceIdRef.current) {
            deviceIdRef.current = localStorage.getItem('deviceId');
            console.log('[usePinVerification] DeviceId loaded:', deviceIdRef.current);
        }

        document.addEventListener('visibilitychange', debouncedVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', debouncedVisibilityChange);

            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
                debounceTimerRef.current = null;
            }
            if (graceTimerRef.current) {
                clearTimeout(graceTimerRef.current);
                graceTimerRef.current = null;
            }
        };
    }, [user?.id, debouncedVisibilityChange]);

    // API publique simplifiée
    const forceSetLocation = useCallback(
        (path: string) => {
            console.log('[usePinVerification] Force setting location to:', path);
            saveUserLocation(path);
        },
        [saveUserLocation],
    );

    const clearGraceperiod = useCallback(() => {
        lastHiddenTimeRef.current = 0;
        console.log('[usePinVerification] Grace period cleared');
    }, []);

    return {
        forceSetLocation,
        clearGraceperiod, // Fonction pour forcer la demande du pin
    };
};
