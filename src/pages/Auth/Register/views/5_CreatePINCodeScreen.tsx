import { setupPin } from '@/api/connexion/connexionCalls';
import abstract1 from '@/assets/images/shapes/abstract_shape_1.png';
import { Button } from '@/components/ui/button';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const PinCodeScreen: React.FC = () => {
    const [error, setError] = useState('');
    const { pin1: pin, setPin1: setPin } = useRegisterUsersStore();
    const navigate = useNavigate();
    const user = userStore((state) => state.user);

    useEffect(() => {
        if (pin.length === 6) {
            handleNext();
        }
    }, [pin]);

    const handlePinInput = (digit: string) => {
        if (pin.length < 6) {
            setError('');
            setPin(pin + digit);
        }
    };

    const handleDelete = () => {
        setError('');
        setPin(pin.slice(0, -1));
    };

    const handleNext = async () => {
        try {
            if (!user?.token) {
                navigate(APP_ROUTES_ENUM.CONFIRM_PIN);
                return;
            }

            const success = await setupPin(pin);
            if (success) {
                navigate(APP_ROUTES_ENUM.CONFIRM_PIN);
            } else {
                throw new Error('Échec de la configuration du PIN');
            }
        } catch (err: any) {
            console.error('Erreur lors de la configuration du PIN:', err);
            setError(err.message || 'Impossible de configurer le PIN, réessayez.');
            setPin('');
        }
    };

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 bg-white pb-28'>
            <RegisterHeader title='Créez votre code PIN' />

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

export default PinCodeScreen;
