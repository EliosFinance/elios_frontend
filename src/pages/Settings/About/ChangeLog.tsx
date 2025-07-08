import PageLayout from '@/layout/PageLayout';
import ComingSoonPage from '@/pages/ComingSoonPage';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import SettingsPageHeader from '../SettingsPageHeader';

const ChangeLog = () => {
    return (
        <PageLayout title='Journal des modifications'>
            <SettingsPageHeader link={APP_ROUTES_ENUM.SETTINGS} />
            <ComingSoonPage />
        </PageLayout>
    );
};

export default ChangeLog;
