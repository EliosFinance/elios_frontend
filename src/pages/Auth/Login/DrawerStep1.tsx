import { appOpen, generateDeviceId, getPinStatus, login_api } from '@/api';
import { Button } from '@/components/ui/button.tsx';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DrawerStep1Props {
    onNext: () => void;
    setDataForStep2: (email: string, password: string) => void;
}

const DrawerStep1: React.FC<DrawerStep1Props> = ({ onNext }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errorCount, setErrorCount] = useState<number>(0);
    const navigate = useNavigate();
    const updateUser = userStore((state) => state.updateUser);

    const extractUserIdFromToken = (token: string): string | undefined => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join(''),
            );
            const payload = JSON.parse(jsonPayload);
            return payload.sub.toString();
        } catch (error) {
            console.error('Error extracting user ID from token:', error);
            return undefined;
        }
    };

    const submit = async () => {
        setError(false);
        try {
            // 1. L'utilisateur se connecte normalement
            const response = await login_api(email, password);
            console.log('Login response:', response);

            if (!response) {
                setError(true);
                setErrorCount((prev) => prev + 1);
                return;
            }

            // Extraire l'ID de l'utilisateur du token
            const userId = extractUserIdFromToken(response.access_token);
            console.log('Extracted user ID from token:', userId);

            if (!userId) {
                console.error('Could not extract user ID from token');
                setError(true);
                setErrorCount((prev) => prev + 1);
                return;
            }

            // Mise à jour du userStore avec l'ID
            const userData = {
                id: userId,
                username: response.username,
                token: response.access_token,
                refresh_token: response.refresh_token,
                powens_token: response.powens_token,
            };
            console.log('Updating user store with:', userData);
            updateUser(userData);

            // 2. Vérifier si un PIN est déjà configuré
            const pinStatus = await getPinStatus();
            console.log('PIN status:', pinStatus);

            if (!pinStatus.isSetup) {
                console.log('PIN not configured, redirecting to PIN setup');
                navigate(APP_ROUTES_ENUM.CREATE_PIN);
                return;
            }

            // 3. Générer un deviceId
            let deviceId = localStorage.getItem('deviceId');
            console.log('Current deviceId:', deviceId);

            if (!deviceId) {
                console.log('No deviceId found, generating new one');
                deviceId = await generateDeviceId();
                console.log('Generated new deviceId:', deviceId);
                localStorage.setItem('deviceId', deviceId);
            }

            // 4. Vérifier si un PIN est requis
            const { requiresPin } = await appOpen(deviceId);
            console.log('PIN required:', requiresPin);

            if (requiresPin) {
                console.log('PIN required, moving to PIN verification step');
                setDataForStep2(email, password);
                console.log('Data set for step 3, calling onNext');
                onNext();
                return;
            }

            // Si pas de PIN requis, aller directement à la page d'accueil
            console.log('No PIN required, redirecting to home');
            navigate(APP_ROUTES_ENUM.HOME);
        } catch (error) {
            console.error('Login error:', error);
            setError(true);
            setErrorCount((prev) => prev + 1);
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

export default DrawerStep1;
