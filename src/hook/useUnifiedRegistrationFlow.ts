import { appOpen, checkUserCompletionStatus, generateDeviceId } from '@/api';
import { useAuth } from '@/context/AuthProvider';
import { determineNextStep } from '@/helpers/registrationHelper';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useNavigate } from 'react-router-dom';

export const useUnifiedRegistrationFlow = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const continueRegistration = async () => {
        if (!user?.id) {
            navigate(APP_ROUTES_ENUM.LOGIN);
            return;
        }

        try {
            const status = await checkUserCompletionStatus(user.id.toString());
            const nextStep = determineNextStep(status, user.username);

            if (nextStep === 'complete') {
                // Inscription complète, vérifier si PIN requis
                const deviceId = await generateDeviceId();
                localStorage.setItem('deviceId', deviceId);

                const { requiresPin } = await appOpen(deviceId);
                if (requiresPin) {
                    navigate(APP_ROUTES_ENUM.PIN_VERIFICATION);
                    return;
                }
                navigate(APP_ROUTES_ENUM.HOME);
            } else {
                navigate(nextStep);
            }
        } catch (error) {
            console.error('Error in registration flow:', error);
            navigate(APP_ROUTES_ENUM.LOGIN);
        }
    };

    const checkIsRegistrationComplete = async (): Promise<boolean> => {
        if (!user?.id) return false;

        try {
            const status = await checkUserCompletionStatus(user.id.toString());
            return status.emailVerified && status.pinConfigured && status.termsAccepted && status.profileComplete;
        } catch (error) {
            console.error('Error checking registration status:', error);
            return false;
        }
    };

    return {
        continueRegistration,
        checkIsRegistrationComplete,
    };
};
