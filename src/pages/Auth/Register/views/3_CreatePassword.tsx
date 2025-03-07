import { Button } from '@/components/ui/button.tsx';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const CreatePassword: React.FC = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const { password1: password, setPassword1: setPassword } = useRegisterUsersStore();
    const navigate = useNavigate();

    const handleNext = () => {
        if (!isValid) return;
        setPassword(password);
        navigate(APP_ROUTES_ENUM.CONFIRM_PASSWORD);
    };

    useEffect(() => {
        const validatePassword = () => {
            const conditions = [
                password.length >= 8,
                /[0-9]/.test(password),
                /[;_/!@#$%^&*(),.?":{}|<>]/.test(password),
                /[A-Z]/.test(password),
                /[a-z]/.test(password),
            ];
            setIsValid(conditions.every((condition) => condition));
        };

        validatePassword();
    }, [password]);

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 bg-white pb-28'>
            <RegisterHeader title='Créez votre mot de passe Elios' />

            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <h1 className='mb-4 text-xl font-bold text-gray-800'>Créez votre mot de passe Elios</h1>

                <input
                    type='password'
                    placeholder='Votre mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full max-w-sm px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <ul className='w-full max-w-sm mb-6 text-sm text-gray-600 space-y-2'>
                    {[
                        { text: 'Au moins 8 caractères', condition: password.length >= 8 },
                        { text: 'Au moins 1 nombre', condition: /[0-9]/.test(password) },
                        {
                            text: 'Au moins 1 caractère spécial',
                            condition: /[;_/!@#$%^&*(),.?":{}|<>]/.test(password),
                        },
                        { text: 'Au moins 1 lettre majuscule', condition: /[A-Z]/.test(password) },
                        { text: 'Au moins 1 lettre minuscule', condition: /[a-z]/.test(password) },
                    ].map(({ text, condition }, idx) => (
                        <li key={idx} className='flex items-center'>
                            <span className={`mr-2 ${condition ? 'text-green-500' : 'text-red-500'}`}>
                                {condition ? '✓' : '✗'}
                            </span>
                            {text}
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                onClick={handleNext}
                disabled={!isValid} // Désactive le bouton si les conditions ne sont pas remplies
                className={`w-full max-w-sm px-4 py-2 rounded-full text-center ${
                    isValid
                        ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                Suivant
            </Button>
        </div>
    );
};

export default CreatePassword;
