import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutNavBar from './LayoutNavBar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

const Layout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.powens_token) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <>
            <LayoutNavBar />
            <Outlet />
        </>
    );
};

export default Layout;