import { checkUserCompletionStatus } from '@/api';
import { useAuth } from '@/context/AuthProvider';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RegistrationGuardProps {
    children: React.ReactNode;
}

const RegistrationGuard: React.FC<RegistrationGuardProps> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

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
            // Si pas d'utilisateur connecté, rediriger vers login
            if (!user?.id) {
                setRedirectTo(APP_ROUTES_ENUM.LOGIN);
                setIsLoading(false);
                return;
            }

            // Si sur une route exclue, ne pas vérifier
            if (excludedRoutes.includes(location.pathname)) {
                setIsLoading(false);
                return;
            }

            try {
                const status = await checkUserCompletionStatus(user.id.toString());

                // Déterminer la prochaine étape nécessaire
                if (!status.emailVerified && status.provider !== 'google') {
                    setRedirectTo(APP_ROUTES_ENUM.VERIFY_EMAIL + `?email=${encodeURIComponent(user.username)}`);
                } else if (!status.profileComplete) {
                    setRedirectTo(APP_ROUTES_ENUM.CREATE_USERNAME);
                } else if (!status.pinConfigured) {
                    setRedirectTo(APP_ROUTES_ENUM.CREATE_PIN);
                } else if (!status.termsAccepted) {
                    setRedirectTo(APP_ROUTES_ENUM.TERMS);
                } else {
                    // Inscription complète
                    setRedirectTo(null);
                }
            } catch (error) {
                console.error('Error checking registration status:', error);
                // En cas d'erreur, permettre l'accès mais logger
                setRedirectTo(null);
            }

            setIsLoading(false);
        };

        checkRegistrationStatus();
    }, [user?.id, location.pathname]);

    // Affichage du loader pendant la vérification
    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
            </div>
        );
    }

    // Redirection si nécessaire
    if (redirectTo) {
        return <Navigate to={redirectTo} replace />;
    }

    // Affichage du contenu si tout est OK
    return <>{children}</>;
};

export default RegistrationGuard;
