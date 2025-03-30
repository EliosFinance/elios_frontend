import mainLogo from '@/assets/images/corp/main_logo.png';
import abstract1 from '@/assets/images/shapes/abstract_shape_1.png';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type PinCodeScreenProps = {
    email: string;
    password: string;
};

const DrawerStep3: React.FC<PinCodeScreenProps> = ({ email, password }) => {
    const [pin, setPin] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errorCount, setErrorCount] = useState<number>(0);
    const navigate = useNavigate();
    const { authenticate } = useAuth();

    const handlePinInput = (digit: string) => {
        if (pin.length < 4) {
            setError(true);
            setPin((prev) => prev + digit);
        }
    };

    const handleDelete = () => {
        setError(false);
        setPin((prev) => prev.slice(0, -1));
    };

    const handleLoginUser = async () => {
        // TODO: add a verification in backend for pin code
        const canLogIn = await authenticate('login', email, password);

        if (canLogIn) {
            navigate(APP_ROUTES_ENUM.HOME);
        } else {
            setError(true);
            setErrorCount(errorCount + 1);
        }
    };

    return (
        <div className='relative flex flex-col items-center justify-center w-full h-screen px-6 bg-white'>
            <button className='absolute top-6 left-6' onClick={() => navigate(-1)}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-gray-800'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
            </button>

            <img src={mainLogo} alt='Elios Logo' className='mb-4 w-14 h-14' />

            <h1 className='mb-4 text-base font-bold text-center text-gray-800'>Entrez votre code PIN</h1>

            <div className='flex justify-center mb-6'>
                {[...Array(4)].map((_, idx) => (
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

            <div className='flex flex-col items-start justify-start mt-2 text-xs text-center text-gray-500 '>
                {/* TODO: FORGOT PIN CODE */}
                {error && errorCount > 2 && (
                    <span
                        className='text-blue-500 cursor-pointer'
                        onClick={() => {
                            console.log('TODO');
                        }}
                    >
                        Code PIN oublié ?
                    </span>
                )}
            </div>
            <Button
                onClick={handleLoginUser}
                className='w-56 px-3 py-2 text-sm text-center text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'
            >
                OK
            </Button>
        </div>
    );
};

export default DrawerStep3;
