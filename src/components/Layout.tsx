import { useAuth } from '@/context/AuthProvider.tsx';
import { Outlet } from 'react-router-dom';
import LayoutNavBar from './LayoutNavBar';

const Layout = () => {
    const { user } = useAuth();

    return (
        <>
            <LayoutNavBar />
            <Outlet />
        </>
    );
};

export default Layout;
