import { Button } from '@/components/ui/button.tsx';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const CreateUsername: React.FC = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const { username, setUsername } = useRegisterUsersStore();
    const navigate = useNavigate();

    const handleNext = () => {
        if (!isValid) return;
        setUsername(username);
        navigate(APP_ROUTES_ENUM.CREATE_PASSWORD);
    };

    useEffect(() => {
        const validateUsername = () => {
            // TODO: request backend for unique username
            const conditions = [username.length >= 5, !/[^a-zA-Z0-9]/.test(username)];
            setIsValid(conditions.every((condition) => condition));
        };

        validateUsername();
    }, [username]);

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 bg-white pb-28'>
            <RegisterHeader title="Créez votre nom d'utilisateur" />

            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <input
                    type='text'
                    placeholder="Votre nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full max-w-sm px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <ul className='w-full max-w-sm mb-6 text-sm text-gray-600 space-y-2'>
                    {[
                        { text: 'Au moins 5 caractères', condition: username.length >= 5 },
                        {
                            text: 'Pas de charactères spéciaux',
                            condition: !/[^a-zA-Z0-9]/.test(username),
                        },
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

export default CreateUsername;
