'use client';

import abstract1 from '@/assets/images/shapes/abstract_shape_1.png';
import { Button } from '@/components/ui/button';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const ConfirmPin: React.FC = () => {
    const [error, setError] = useState('');
    const { pin1: pinCode, pin2: confirmPin, setPin2: setConfirmPin } = useRegisterUsersStore();
    const navigate = useNavigate();

    const handlePinInput = (digit: string) => {
        if (!confirmPin || confirmPin.length < 4) {
            setError('');
            setConfirmPin(confirmPin + digit);
        }
    };

    const handleDelete = () => {
        setError('');
        setConfirmPin(confirmPin.slice(0, -1));
    };

    const handleNext = () => {
        if (confirmPin.length === 4) {
            if (confirmPin === pinCode) {
                navigate(APP_ROUTES_ENUM.TERMS);
            } else {
                setError('Les codes PIN ne correspondent pas. Veuillez réessayer.');
                setConfirmPin('');
            }
        } else {
            setError('Veuillez entrer un code PIN à 4 chiffres.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-between h-screen w-full bg-white px-4 pb-28 pt-6'>
            <RegisterHeader title='Confirmez votre code PIN' />

            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <div className='flex justify-center mb-6'>
                    {[...Array(4)].map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 mx-2 rounded-full ${
                                idx < confirmPin.length ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                <div className='relative mb-6'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <img src={abstract1} alt='Background' className='w-56 h-56' />
                    </div>
                    <div className='grid grid-cols-3 gap-4 relative z-10'>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
                            <Button
                                key={number}
                                className='w-14 h-14 bg-gray-200 text-gray-800 rounded-full text-xl font-bold hover:bg-gray-300 flex items-center justify-center'
                                onClick={() => handlePinInput(number.toString())}
                            >
                                {number}
                            </Button>
                        ))}
                        <div />
                        <Button
                            className='w-14 h-14 bg-gray-200 text-gray-800 rounded-full text-xl font-bold hover:bg-gray-300 flex items-center justify-center'
                            onClick={() => handlePinInput('0')}
                        >
                            0
                        </Button>
                        <Button
                            className='w-14 h-14 bg-red-200 text-red-600 rounded-full text-xl hover:bg-red-300 flex items-center justify-center'
                            onClick={handleDelete}
                        >
                            ⌫
                        </Button>
                    </div>
                </div>

                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
            </div>

            <Button
                onClick={handleNext}
                className={`w-full max-w-sm px-4 py-2 rounded-full text-center bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400`}
            >
                Suivant
            </Button>
        </div>
    );
};

export default ConfirmPin;
