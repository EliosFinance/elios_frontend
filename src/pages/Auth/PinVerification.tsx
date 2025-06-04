import { logout_api } from '@/api/connexion/connexionCalls';
import { appOpen, getPinStatus, verifyPin } from '@/api/connexion/connexionCalls';
import mainLogo from '@/assets/images/corp/main_logo.png';
import abstract1 from '@/assets/images/shapes/abstract_shape_1.png';
import { Button } from '@/components/ui/button.tsx';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { FingerPrintIcon } from '@heroicons/react/24/outline';
import { DeleteIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from './Register/components/RegisterHeader';

const PinVerification: React.FC = () => {
    const [pin, setPin] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    // TODO: add remaining attempts logic
    const [remainingAttempts, setRemainingAttempts] = useState<number>(3);
    const [isInitializing, setIsInitializing] = useState(true);
    const navigate = useNavigate();
    const user = userStore((state) => state.user);

    useEffect(() => {
        const initializePin = async () => {
            if (!user?.token) {
                navigate(APP_ROUTES_ENUM.LOGIN);
                return;
            }

            try {
                const deviceId = localStorage.getItem('deviceId');
                if (!deviceId) {
                    setError('Erreur de configuration');
                    return;
                }

                const response = await appOpen(deviceId);
                if (!response.requiresPin) {
                    localStorage.setItem('pinVerified', 'true');
                    navigate(APP_ROUTES_ENUM.HOME);
                } else {
                    const pinStatus = await getPinStatus();
                    if (pinStatus.isLocked) {
                        await logout_api();
                        localStorage.removeItem('pinVerified');
                        localStorage.removeItem('deviceId');
                        navigate(APP_ROUTES_ENUM.LOGIN);
                        return;
                    }
                    setIsInitializing(false);
                }
            } catch (error) {
                setError('Erreur de vérification');
                setIsInitializing(false);
            }
        };

        initializePin();
    }, [user?.token]);

    const handlePinInput = (digit: string) => {
        if (pin.length < 6) {
            setPin((prev) => prev + digit);
            setError(null);
        }
    };

    const handleDelete = () => {
        setPin((prev) => prev.slice(0, -1));
        setError(null);
    };

    const handleVerify = async () => {
        if (isInitializing) return;

        setError(null);
        try {
            const deviceId = localStorage.getItem('deviceId');
            if (!deviceId) {
                setError('Erreur de configuration');
                return;
            }

            if (!user?.token) {
                navigate(APP_ROUTES_ENUM.LOGIN);
                return;
            }

            await verifyPin(pin, deviceId);
            localStorage.setItem('pinVerified', 'true');
            navigate(APP_ROUTES_ENUM.HOME);
        } catch (error: any) {
            if (error.response?.data?.message?.includes('PIN is locked')) {
                setError('PIN verrouillé. Veuillez vous reconnecter.');
                await logout_api();
                localStorage.removeItem('pinVerified');
                localStorage.removeItem('deviceId');
                navigate(APP_ROUTES_ENUM.LOGIN);
                return;
            }

            const errorMessage = error.response?.data?.message || '';
            const attemptsMatch = errorMessage.match(/(\d+) attempts remaining/);
            if (attemptsMatch) {
                const attempts = parseInt(attemptsMatch[1]);
                setRemainingAttempts(attempts);
                setPin('');
                setError(`Code PIN incorrect. ${attempts} tentatives restantes.`);

                if (attempts <= 0) {
                    await logout_api();
                    localStorage.removeItem('pinVerified');
                    localStorage.removeItem('deviceId');
                    navigate(APP_ROUTES_ENUM.LOGIN);
                }
            } else {
                setPin('');
                setError('Code PIN incorrect. Veuillez réessayer.');
            }
        }
    };

    useEffect(() => {
        if (pin.length === 6 && !isInitializing) {
            handleVerify();
        }
    }, [pin, isInitializing]);

    if (isInitializing) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <div className='text-center'>
                    <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-[spin_1s_linear_infinite]'></div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-start w-full h-screen px-4 pt-6 pb-8'>
            <RegisterHeader title='Entrez votre code PIN' disableGoBack />

            <div className='w-full h-full flex flex-col items-center justify-start gap-8 pt-16'>
                <div className='flex justify-center mb-6'>
                    {[...Array(6)].map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 mx-2 rounded-full ${idx < pin.length ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>

                <div className='relative z-10 grid grid-cols-3 gap-5'>
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
                        <Button
                            key={number}
                            className='flex items-center justify-center text-xl font-bold text-gray-800 bg-gray-200 rounded-full w-14 h-14 hover:bg-gray-300'
                            onClick={() => handlePinInput(number.toString())}
                        >
                            {number}
                        </Button>
                    ))}
                    <Button
                        className='flex items-center justify-center text-xl text-white bg-transparent rounded-full w-14 h-14'
                        // onClick={handleDelete}
                        // TODO: Implement fingerprint authentication
                        disabled
                    >
                        <FingerPrintIcon className='w-7 h-7' />
                    </Button>
                    <Button
                        className='flex items-center justify-center text-xl font-bold text-gray-800 bg-gray-200 rounded-full w-14 h-14 hover:bg-gray-300'
                        onClick={() => handlePinInput('0')}
                    >
                        0
                    </Button>
                    <Button
                        className='flex items-center justify-center text-xl text-red-600 bg-red-200 rounded-full w-14 h-14 hover:bg-red-300'
                        onClick={handleDelete}
                    >
                        <DeleteIcon className='w-7 h-7' />
                    </Button>
                </div>

                {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
            </div>
        </div>
    );
};

export default PinVerification;
