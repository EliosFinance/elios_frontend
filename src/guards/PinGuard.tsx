import { appOpen } from '@/api/connexion/connexionCalls';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PinGuardProps {
    children: React.ReactNode;
}

const PinGuard: React.FC<PinGuardProps> = ({ children }) => {
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
    const user = userStore((state) => state.user);

    useEffect(() => {
        const checkPinStatus = async () => {
            if (!user?.token) {
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
                    console.log('No deviceId found, redirecting to PIN verification');
                    navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                    return;
                }

                const { requiresPin } = await appOpen(deviceId);
                console.log('PIN required:', requiresPin);

                if (requiresPin) {
                    console.log('PIN required, redirecting to PIN verification');
                    navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                    return;
                }

                setIsChecking(false);
            } catch (error) {
                console.error('Error checking PIN status:', error);
                // Si l'erreur est une erreur 401 (token expiré), rediriger vers login
                if (error.response?.status === 401) {
                    userStore.getState().removeUser();
                    navigate(APP_ROUTES_ENUM.LOGIN);
                } else {
                    navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                }
            }
        };

        checkPinStatus();
    }, [user?.token]);

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
