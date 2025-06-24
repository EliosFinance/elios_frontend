import { checkUserCompletionStatus, getUser } from '@/api';
import { useAuth } from '@/context/AuthProvider';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RegistrationGuardProps {
    children: React.ReactNode;
}

const RegistrationGuard: React.FC<RegistrationGuardProps> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Routes exclues de la vérification
    const excludedRoutes = [
        APP_ROUTES_ENUM.LOGIN,
        APP_ROUTES_ENUM.REGISTER,
        APP_ROUTES_ENUM.VERIFY_EMAIL,
        APP_ROUTES_ENUM.CREATE_USERNAME,
        APP_ROUTES_ENUM.CREATE_PASSWORD,
        APP_ROUTES_ENUM.CONFIRM_PASSWORD,
        APP_ROUTES_ENUM.CREATE_PIN,
        APP_ROUTES_ENUM.CONFIRM_PIN,
        APP_ROUTES_ENUM.TERMS,
        APP_ROUTES_ENUM.PIN_VERIFICATION,
    ];

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            if (!user?.id) {
                navigate(APP_ROUTES_ENUM.LOGIN);
                return;
            }

            if (excludedRoutes.includes(location.pathname)) {
                return;
            }

            try {
                const status = await checkUserCompletionStatus(user.id.toString());
                const fullUser = await getUser();

                console.log('User completion status:', status);

                if (!status.emailVerified && status.provider !== 'google') {
                    navigate(APP_ROUTES_ENUM.VERIFY_EMAIL + `?email=${encodeURIComponent(fullUser.email || '')}`);
                } else if (!status.pinConfigured) {
                    navigate(APP_ROUTES_ENUM.CREATE_PIN);
                } else if (!status.termsAccepted) {
                    navigate(APP_ROUTES_ENUM.TERMS);
                } else {
                    // Inscription complète
                    navigate(null);
                }
            } catch (error) {
                console.error('Error checking registration status:', error);

                if (user?.username && user?.id) {
                    console.log('API error for existing user, allowing access');
                    navigate(null);
                } else {
                    navigate(APP_ROUTES_ENUM.LOGIN);
                }
            }
        };

        checkRegistrationStatus();
    }, [user?.id, location.pathname]);

    // if (isLoading) {
    //     return (
    //         <div className='flex items-center justify-center min-h-screen'>
    //             <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
    //         </div>
    //     );
    // }

    return <>{children}</>;
};

export default RegistrationGuard;
