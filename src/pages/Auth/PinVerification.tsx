import { logout_api } from '@/api/connexion/connexionCalls';
import { appOpen, getPinStatus, verifyPin } from '@/api/connexion/connexionCalls';
import mainLogo from '@/assets/images/corp/main_logo.png';
import abstract1 from '@/assets/images/shapes/abstract_shape_1.png';
import { Button } from '@/components/ui/button.tsx';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PinVerification: React.FC = () => {
    const [pin, setPin] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
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
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 bg-white pb-28'>
            <div className='relative w-full h-[20%] flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center mt-12'>
                    <img src={mainLogo} alt='Elios Logo' className='mb-4 w-14 h-14 rounded-4' />
                    <h2 className='text-3xl font-bold text-gray-800 mb-4 w-[20ch] text-center'>
                        Entrez votre code PIN
                    </h2>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <div className='flex justify-center mb-6'>
                    {[...Array(6)].map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 mx-2 rounded-full ${idx < pin.length ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>

                <div className='relative mb-6'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <img src={abstract1} alt='Background' className='w-56 h-56' />
                    </div>
                    <div className='relative z-10 grid grid-cols-3 gap-4'>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
                            <Button
                                key={number}
                                className='flex items-center justify-center text-xl font-bold text-gray-800 bg-gray-200 rounded-full w-14 h-14 hover:bg-gray-300'
                                onClick={() => handlePinInput(number.toString())}
                            >
                                {number}
                            </Button>
                        ))}
                        <div />
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
                            ⌫
                        </Button>
                    </div>
                </div>

                {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
            </div>
        </div>
    );
};

export default PinVerification;
