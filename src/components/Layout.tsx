import { useAuth } from '@/context/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LayoutNavBar from './LayoutNavBar';

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
