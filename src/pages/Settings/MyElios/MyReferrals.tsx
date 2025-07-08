import PageLayout from '@/layout/PageLayout';
import ComingSoonPage from '@/pages/ComingSoonPage';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import SettingsPageHeader from '../SettingsPageHeader';

const MyReferrals = () => {
    return (
        <PageLayout title='Mes Parrainages'>
            <SettingsPageHeader link={APP_ROUTES_ENUM.SETTINGS} />
            <ComingSoonPage />
        </PageLayout>
    );
};

export default MyReferrals;
