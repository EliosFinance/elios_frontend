import { login_api } from '@/api';
import { Button } from '@/components/ui/button.tsx';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DrawerStep1Props {
    onNext: () => void;
    setDataForStep3: (email: string, password: string) => void;
}

const DrawerStep2: React.FC<DrawerStep1Props> = ({ onNext, setDataForStep3 }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errorCount, setErrorCount] = useState<number>(0);
    const navigate = useNavigate();

    const submit = async () => {
        setError(false);
        const response = await login_api(email, password);
        if (response) {
            onNext();
            setDataForStep3(email, password);
        } else {
            setError(true);
            setErrorCount(errorCount + 1);
        }
    };

    return (
        <div className='p-4 mb-10'>
            <div className='mb-6 text-center'>
                <h2 className='text-lg font-bold text-gray-800'>Se connecter</h2>
            </div>
            <div className='space-y-3'>
                <div className='space-y-3'>
                    <input
                        id='emailLogin'
                        type='email'
                        placeholder='Votre email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2 border-t-none border-r-none border-l-none border-b-solid border-b-[1.5px] ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 text-m placeholder:text-gray-500 placeholder:font-semibold`}
                    />
                    <input
                        id='password'
                        type='password'
                        placeholder='Votre mot de passe'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-2 border-t-none border-r-none border-l-none border-b-solid border-b-[1.5px] ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 text-m placeholder:text-gray-500 placeholder:font-semibold`}
                    />
                    {/* Message d'erreur */}
                    {error && <p className='mt-2 text-sm text-red-500'>E-mail ou mot de passe incorrect.</p>}
                </div>
            </div>
            <div className='flex flex-col items-start justify-start mt-2 text-xs text-center text-gray-500 '>
                {/* TODO: FORGOT PASSWORD */}
                <span
                    className='text-blue-500 cursor-pointer'
                    onClick={() => {
                        navigate(APP_ROUTES_ENUM.REGISTER);
                    }}
                >
                    Vous n'avez pas encore de compte ?
                </span>
                {error && errorCount > 2 && (
                    <span
                        className='mt-2 text-blue-500 cursor-pointer'
                        onClick={() => {
                            alert('TODO');
                        }}
                    >
                        Mot de passe oublié ?
                    </span>
                )}
            </div>
            <div className='mt-6'>
                <Button
                    className='w-full py-2 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600'
                    onClick={submit}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
};

export default DrawerStep2;
