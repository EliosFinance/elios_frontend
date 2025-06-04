import { login_api } from '@/api';
import { generateDeviceId, getPinStatus } from '@/api/connexion/connexionCalls';
import { appOpen } from '@/api/connexion/connexionCalls';
import mainLogo from '@/assets/images/corp/main_logo.png';
import { Button } from '@/components/ui/button.tsx';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DrawerStep1Props {
    email: string;
    password: string;
}

const DrawerStep2: React.FC<DrawerStep1Props> = ({ email, password }) => {
    console.log('DrawerStep3: Component mounted with props:', { email, password });

    const [pin, setPin] = useState<string>('');
    const [errorCount, setErrorCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const navigate = useNavigate();
    const user = userStore((state) => state.user);

    console.log('DrawerStep3: Current user state:', user);

    useEffect(() => {
        console.log('DrawerStep3: useEffect triggered');
        // Vérifier si l'utilisateur est connecté
        if (!user?.token) {
            console.error('DrawerStep3: No token found');
            navigate(APP_ROUTES_ENUM.LOGIN);
            return;
        }

        console.log('DrawerStep3: Token found, extracting user ID');
        const userId = extractUserIdFromToken(user.token);
        console.log('DrawerStep3: Extracted userId:', userId);
        if (!userId) {
            console.error('DrawerStep3: Could not extract user ID from token');
            navigate(APP_ROUTES_ENUM.LOGIN);
            return;
        }

        console.log('DrawerStep3: User ID verified, checking pin length');
        if (pin.length === 6 && !isVerifying) {
            console.log('DrawerStep3: PIN length is 6, calling handleVerify');
            handleVerify();
        }
    }, [pin, user]);

    const extractUserIdFromToken = (token: string): string | undefined => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join(''),
            );
            const payload = JSON.parse(jsonPayload);
            console.log('DrawerStep3: Extracted payload from token:', payload);
            return payload.sub.toString();
        } catch (error) {
            console.error('DrawerStep3: Error extracting user ID from token:', error);
            return undefined;
        }
    };

    const handlePinInput = (digit: string) => {
        console.log('DrawerStep3: handlePinInput called with digit:', digit);
        if (pin.length < 6 && !isVerifying) {
            setPin((prev) => prev + digit);
            setError(null);
        }
    };

    const handleDelete = () => {
        console.log('DrawerStep3: handleDelete called');
        if (!isVerifying) {
            setPin((prev) => prev.slice(0, -1));
            setError(null);
        }
    };

    const handleVerify = async () => {
        if (isVerifying) return;

        console.log('DrawerStep3: handleVerify called with pin:', pin);
        const deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            console.error('DrawerStep3: No deviceId found');
            navigate(APP_ROUTES_ENUM.LOGIN);
            return;
        }

        setIsVerifying(true);
        try {
            console.log('DrawerStep3: Calling verifyPin with:', { pin, deviceId });
            await verifyPin(pin, deviceId);
            console.log('DrawerStep3: PIN verification successful, redirecting to home');
            navigate(APP_ROUTES_ENUM.HOME);
        } catch (err) {
            console.error('DrawerStep3: PIN verification error:', err);
            const nextCount = errorCount + 1;
            setErrorCount(nextCount);
            setPin('');
            setError(`Code PIN incorrect. ${3 - nextCount} tentatives restantes.`);

            if (nextCount >= 3) {
                console.log('DrawerStep3: Too many failed attempts, logging out');
                await logout_api();
                navigate(APP_ROUTES_ENUM.LOGIN);
            }
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className='p-4 mb-10'>
            <div className='mb-6 text-center'>
                <img src={mainLogo} alt='Elios Logo' className='w-16 h-16 mx-auto mb-4' />
                <h2 className='text-lg font-bold text-gray-800'>Entrez votre code PIN</h2>
            </div>

            {/* PIN Display */}
            <div className='flex justify-center gap-2 mb-6'>
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 ${
                            index < pin.length ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                        }`}
                    />
                ))}
            </div>

            {/* Error Message */}
            {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}

            {/* PIN Pad */}
            <div className='grid grid-cols-3 gap-4 w-full max-w-xs mx-auto'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Button
                        key={num}
                        onClick={() => handlePinInput(num.toString())}
                        className='w-full h-12 text-xl font-semibold'
                        disabled={isVerifying}
                    >
                        {num}
                    </Button>
                ))}
                <Button
                    onClick={() => handlePinInput('0')}
                    className='w-full h-12 text-xl font-semibold'
                    disabled={isVerifying}
                >
                    0
                </Button>
                <Button onClick={handleDelete} className='w-full h-12 text-xl font-semibold' disabled={isVerifying}>
                    ←
                </Button>
            </div>
        </div>
    );
};

export default DrawerStep2;
