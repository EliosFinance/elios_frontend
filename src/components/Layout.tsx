import BlurOverlay from '@/components/BlurOverlay.tsx';
import { useAuth } from '@/context/AuthProvider.tsx';
import { Outlet } from 'react-router-dom';
import LayoutNavBar from './LayoutNavBar';

const Layout = () => {
    const { user } = useAuth();

    return (
        <>
            <LayoutNavBar />
            {!user.powens_token && <BlurOverlay />}
            <Outlet />
        </>
    );
};

export default Layout;
