import { Button } from '@/components/ui/button.tsx';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const ConfirmPassword: React.FC = () => {
    const [error, setError] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const {
        password1: password,
        password2: confirmPassword,
        setPassword2: setConfirmPassword,
    } = useRegisterUsersStore();
    const navigate = useNavigate();

    const handleNext = () => {
        if (confirmPassword.length > 0 && confirmPassword !== password) {
            setError('Les mots de passe ne correspondent pas. Veuillez réessayer.');
        } else {
            setError('');
            navigate(APP_ROUTES_ENUM.CREATE_PIN);
        }
    };

    useEffect(() => {
        const validatePassword = () => {
            const conditions = [
                confirmPassword.length >= 8,
                /[0-9]/.test(confirmPassword),
                /[;_/!@#$%^&*(),.?":{}|<>]/.test(confirmPassword),
                /[A-Z]/.test(confirmPassword),
                /[a-z]/.test(confirmPassword),
                password === confirmPassword,
            ];
            setIsValid(conditions.every((condition) => condition));
        };

        validatePassword();
    }, [confirmPassword]);

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 bg-white pb-28'>
            <RegisterHeader title='Confirmez votre mot de passe Elios' />
            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <input
                    type='password'
                    placeholder='Confirmez votre mot de passe'
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError('');
                    }}
                    className='w-full max-w-sm px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                {/* Message d'erreur */}
                {error && <p className='mb-4 text-sm text-center text-red-500'>{error}</p>}

                {/* Critères de validation */}
                <ul className='w-full max-w-sm mb-6 text-sm text-gray-600 space-y-2'>
                    {[
                        { text: 'Au moins 8 caractères', condition: confirmPassword.length >= 8 },
                        { text: 'Au moins 1 nombre', condition: /[0-9]/.test(confirmPassword) },
                        {
                            text: 'Au moins 1 caractère spécial',
                            condition: /[;_/!@#$%^&*(),.?":{}|<>]/.test(confirmPassword),
                        },
                        { text: 'Au moins 1 lettre majuscule', condition: /[A-Z]/.test(confirmPassword) },
                        { text: 'Au moins 1 lettre minuscule', condition: /[a-z]/.test(confirmPassword) },
                        { text: 'Les deux mots de passe correspondent', condition: password === confirmPassword },
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

export default ConfirmPassword;
