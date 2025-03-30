import mainLogo from '@/assets/images/corp/main_logo.png';
import { Button } from '@/components/ui/button.tsx';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstTimerView: React.FC = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (localStorage.getItem('firstTimer') === 'false') {
            navigate(APP_ROUTES_ENUM.LOGIN);
        }
    }, []);

    const handleStart = () => {
        localStorage.setItem('firstTimer', 'false');
        navigate(APP_ROUTES_ENUM.LOGIN);
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen px-4 bg-white'>
            {/* Logo */}
            <img src={mainLogo} alt='Elios Logo' className='w-24 h-24 mb-6' />

            {/* Titre */}
            <h1 className='mb-4 text-2xl font-bold text-center text-gray-800'>ELIOS</h1>

            {/* Sous-titre */}
            <p className='mb-4 text-sm text-center text-gray-500'>
                Élevez votre expérience financière avec Elios : <br />
                Bienvenue dans le futur de l'ère bancaire.
            </p>

            {/* Séparateur */}
            <div className='flex items-center justify-center mb-6'>
                <span className='inline-block w-4 h-[2px] bg-gray-600 rounded-full mx-[2px]'></span>
                <span className='inline-block w-6 h-[2px] bg-black rounded-full mx-[2px]'></span>
                <span className='inline-block w-4 h-[2px] bg-gray-600 rounded-full mx-[2px]'></span>
            </div>

            {/* Bouton */}
            <Button
                color='primary'
                onClick={handleStart}
                className='w-full max-w-xs px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none'
            >
                C'EST PARTI
            </Button>
        </div>
    );
};

export default FirstTimerView;
