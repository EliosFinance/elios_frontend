import BlurOverlay from '@/components/BlurOverlay.tsx';
import { useAuth } from '@/context/AuthProvider.tsx';
import { Outlet } from 'react-router-dom';

const BankCheck = () => {
    const { user } = useAuth();

    return (
        <>
            {!user.powens_token && <BlurOverlay />}
            <Outlet />
        </>
    );
};

export default BankCheck;
