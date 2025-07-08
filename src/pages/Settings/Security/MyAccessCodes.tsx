import PageLayout from '@/layout/PageLayout';
import ComingSoonPage from '@/pages/ComingSoonPage';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import SettingsPageHeader from '../SettingsPageHeader';

const MyAccessCodes = () => {
    return (
        <PageLayout title="Mes codes d'accès">
            <SettingsPageHeader link={APP_ROUTES_ENUM.SETTINGS} />
            <ComingSoonPage />
        </PageLayout>
    );
};

export default MyAccessCodes;
