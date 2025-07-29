import { useAuth } from '@/context/AuthProvider';
import PinGuard from '@/guards/PinGuard';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LayoutNavBar from './LayoutNavBar';

const Layout = () => {
    const { auth, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user?.powens_token) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!auth || !user) {
        return <Navigate to={APP_ROUTES_ENUM.LOGIN} replace state={{ path: location.pathname }} />;
    }

    return (
        <PinGuard>
            <LayoutNavBar />
            <Outlet />
        </PinGuard>
    );
};

export default Layout;
