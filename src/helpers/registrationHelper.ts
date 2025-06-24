import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { UserCompletionStatus } from '@/types/UserType';

export const determineNextStep = (status: UserCompletionStatus, userEmail?: string) => {
    if (!status.emailVerified) {
        const emailParam = userEmail ? `?email=${encodeURIComponent(userEmail)}` : '';
        const providerParam = status.provider === 'google' ? '&provider=google' : '';
        return APP_ROUTES_ENUM.VERIFY_EMAIL + emailParam + providerParam;
    }

    if (!status.profileComplete) {
        return APP_ROUTES_ENUM.CREATE_USERNAME;
    }

    if (!status.pinConfigured) {
        return APP_ROUTES_ENUM.CREATE_PIN;
    }

    if (!status.termsAccepted) {
        return APP_ROUTES_ENUM.TERMS;
    }

    return 'complete';
};
