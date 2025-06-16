import { appOpen, getPinStatus } from '@/api/connexion/connexionCalls';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PinGuardProps {
    children: React.ReactNode;
}

const PinGuard: React.FC<PinGuardProps> = ({ children }) => {
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
    const { user, setLastUserLocation } = userStore();
    const location = useLocation();
    const hasCheckedRef = useRef(false);

    useEffect(() => {
        const checkPinStatus = async () => {
            if (!user?.token) {
                console.log('No token, redirecting to login');
                navigate(APP_ROUTES_ENUM.LOGIN);
                return;
            }

            try {
                // Vérifier si le token est expiré
                const { exp } = JSON.parse(atob(user.token.split('.')[1]));
                if (Date.now() >= exp * 1000) {
                    console.log('Token expired, redirecting to login');
                    userStore.getState().removeUser();
                    navigate(APP_ROUTES_ENUM.LOGIN);
                    return;
                }

                const deviceId = localStorage.getItem('deviceId');
                if (!deviceId) {
                    setLastUserLocation(location.pathname);

                    setTimeout(() => {
                        navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                    }, 100);
                    return;
                }

                const { requiresPin } = await appOpen(deviceId);
                const { isLocked, isSetup } = await getPinStatus();

                console.log('PIN Status:', { requiresPin, isLocked, isSetup });

                if (requiresPin && isLocked && isSetup) {
                    if (
                        location.pathname !== APP_ROUTES_ENUM.PIN_VERIFICATION &&
                        location.pathname !== APP_ROUTES_ENUM.LOGIN
                    ) {
                        setLastUserLocation(location.pathname);
                        userStore.getState().setLastUserLocation(location.pathname);
                    }

                    hasCheckedRef.current = true;

                    setTimeout(() => {
                        navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                    }, 150);

                    return;
                }

                hasCheckedRef.current = true;
                setIsChecking(false);
            } catch (error) {
                console.error('💥 Error checking PIN status:', error);
                if (
                    location.pathname !== APP_ROUTES_ENUM.PIN_VERIFICATION &&
                    location.pathname !== APP_ROUTES_ENUM.LOGIN
                ) {
                    setLastUserLocation(location.pathname);
                }

                if (error?.response?.status === 401) {
                    userStore.getState().removeUser();
                    navigate(APP_ROUTES_ENUM.LOGIN);
                } else {
                    setTimeout(() => {
                        navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                    }, 100);
                }
            }
        };

        checkPinStatus();
    }, [user?.token, location.pathname]);

    if (isChecking) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <div className='text-center'>
                    <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default PinGuard;
