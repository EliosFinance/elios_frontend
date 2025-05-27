import { useAuth } from '@/context/AuthProvider.tsx';
import PinGuard from '@/guards/PinGuard';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth) {
        return <Navigate to={APP_ROUTES_ENUM.LOGIN} replace state={{ path: location.pathname }} />;
    }

    return (
        <PinGuard>
            <Outlet />
        </PinGuard>
    );
};

export default AuthRoute;
