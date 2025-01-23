import { useAuth } from '@/context/AuthProvider.tsx';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth ? <Navigate to={APP_ROUTES_ENUM.HOME} replace state={{ path: location.pathname }} /> : <Outlet />;
};

export default PublicRoute;
