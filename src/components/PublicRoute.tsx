import { useAuth } from '@/context/AuthProvider.tsx';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // Ne pas rediriger si nous sommes sur la page de vérification du PIN
    if (location.pathname === APP_ROUTES_ENUM.PIN_VERIFICATION) {
        return <Outlet />;
    }

    return auth ? <Navigate to={APP_ROUTES_ENUM.HOME} replace state={{ path: location.pathname }} /> : <Outlet />;
};

export default PublicRoute;
