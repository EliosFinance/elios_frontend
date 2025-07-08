import PageLayout from '@/layout/PageLayout';
import ComingSoonPage from '@/pages/ComingSoonPage';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import SettingsPageHeader from '../SettingsPageHeader';

const TermsOfUse = () => {
    return (
        <PageLayout title="Conditions d'utilisation">
            <SettingsPageHeader link={APP_ROUTES_ENUM.SETTINGS} />
            <ComingSoonPage />
        </PageLayout>
    );
};

export default TermsOfUse;
