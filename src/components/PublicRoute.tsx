import {useAuth} from "@/context/AuthProvider.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const PublicRoute = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return auth ? (
        <Navigate to='/home' replace state={{ path: location.pathname }} />
    ) : (
        <Outlet />
    )
}

export default PublicRoute
