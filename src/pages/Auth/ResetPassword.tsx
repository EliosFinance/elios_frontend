import { requestResetPassword, resetPassword, validateResetToken } from '@/api/connexion/connexionCalls';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState<string | string[] | null>(null);
    const [globalError, setGlobalError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const t = params.get('token');
        if (t) setToken(t);
    }, [location.search]);

    useEffect(() => {
        if (resetSuccess) {
            const timer = setTimeout(() => {
                navigate(APP_ROUTES_ENUM.LOGIN);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [resetSuccess, navigate]);

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    await validateResetToken(token);
                } catch (err: any) {
                    const msg = err?.response?.data?.message || err.message;
                    if (msg.includes('déjà été utilisé')) {
                        setGlobalError('Ce lien de réinitialisation a déjà été utilisé. Veuillez refaire une demande.');
                    } else {
                        setGlobalError('Ce lien a expiré ou est invalide. Veuillez refaire une demande.');
                    }
                    setToken(null);
                    setNewPassword('');
                    navigate(APP_ROUTES_ENUM.RESET_PASSWORD, { replace: true });
                }
            }
        };
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setGlobalError(null);
        setSuccess(false);
        setLoading(true);
        try {
            await requestResetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError(null);
        setResetSuccess(false);
        setLoading(true);
        try {
            await resetPassword(token!, newPassword);
            setResetSuccess(true);
        } catch (err: any) {
            // Gestion des messages d'erreur backend (array ou string)
            let msg = err?.response?.data?.message || err.message || 'Erreur lors de la réinitialisation.';
            if (Array.isArray(msg)) {
                // On prend tous les messages de validation (array de tableaux)
                msg = msg
                    .flat()
                    .map((m: any) => m.message)
                    .filter(Boolean);
            }
            if (
                typeof msg === 'string' &&
                (msg.includes('déjà été utilisé') ||
                    msg.toLowerCase().includes('expiré') ||
                    msg.toLowerCase().includes('invalide'))
            ) {
                setGlobalError(
                    msg.includes('déjà été utilisé')
                        ? 'Ce lien de réinitialisation a déjà été utilisé. Veuillez refaire une demande.'
                        : 'Ce lien a expiré ou est invalide. Veuillez refaire une demande.',
                );
                setToken(null);
                setNewPassword('');
                navigate(APP_ROUTES_ENUM.RESET_PASSWORD, { replace: true });
            } else {
                setResetError(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    if (token) {
        // Formulaire de nouveau mot de passe
        return (
            <div className='flex min-h-screen w-full items-center justify-center'>
                <div className='w-full max-w-sm py-4 mb-10'>
                    <div className='mb-6 text-center'>
                        <h2 className='text-lg font-bold text-white'>Nouveau mot de passe</h2>
                        <p className='text-gray-400 text-sm mt-2'>Choisissez un nouveau mot de passe sécurisé.</p>
                    </div>
                    <form className='space-y-4' onSubmit={handleReset}>
                        <label htmlFor='newPassword' className='sr-only'>
                            Nouveau mot de passe
                        </label>
                        <PasswordInput
                            id='newPassword'
                            placeholder='Nouveau mot de passe'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='bg-transparent w-full px-4 py-2 border-t-none border-r-none border-l-none border-b-solid border-b-[1.5px] border-gray-300 focus:outline-none focus:ring-0 text-m placeholder:text-gray-500 placeholder:font-semibold'
                            required
                        />
                        {/* Affichage des messages d'erreur sous le champ password */}
                        {resetError && Array.isArray(resetError) ? (
                            <ul className='mt-2 text-sm text-red-500 space-y-1'>
                                {resetError.map((msg, i) => (
                                    <li key={i}>{msg}</li>
                                ))}
                            </ul>
                        ) : resetError ? (
                            <p className='mt-2 text-sm text-red-500'>{resetError}</p>
                        ) : null}
                        {resetSuccess && (
                            <p className='mt-2 text-sm text-green-500'>Mot de passe réinitialisé avec succès !</p>
                        )}
                        <div className='mt-6'>
                            <Button
                                className='w-full py-2 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600'
                                type='submit'
                                disabled={loading || newPassword.length < 6}
                            >
                                {loading ? 'Réinitialisation...' : 'Réinitialiser'}
                            </Button>
                        </div>
                    </form>
                    <div className='flex flex-col items-start justify-start mt-4 text-xs text-center text-gray-500 '>
                        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(APP_ROUTES_ENUM.LOGIN)}>
                            Retour à la connexion
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Formulaire d'envoi d'email
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='w-full max-w-sm py-4 mb-10'>
                <div className='mb-6 text-center'>
                    <h2 className='text-lg font-bold text-white'>Réinitialiser le mot de passe</h2>
                    <p className='text-gray-400 text-sm mt-2'>
                        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                    </p>
                </div>
                <form className='space-y-4' onSubmit={handleRequest}>
                    <input
                        id='emailReset'
                        type='email'
                        placeholder='Votre email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                            setGlobalError(null);
                            setSuccess(false);
                        }}
                        className={`bg-transparent w-full px-4 py-2 border-t-none border-r-none border-l-none border-b-solid border-b-[1.5px] ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 text-m placeholder:text-gray-500 placeholder:font-semibold`}
                        required
                    />
                    {/* Message d'erreur sous l'input, un seul à la fois */}
                    {globalError ? (
                        <p className='mt-2 text-sm text-red-500'>{globalError}</p>
                    ) : error ? (
                        <p className='mt-2 text-sm text-red-500'>{error}</p>
                    ) : success ? (
                        <p className='mt-2 text-sm text-green-500'>Un email de réinitialisation a été envoyé !</p>
                    ) : null}
                    <div className='mt-6'>
                        <Button
                            className='w-full py-2 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Envoi...' : 'Envoyer le lien'}
                        </Button>
                    </div>
                </form>
                <div className='flex flex-col items-start justify-start mt-4 text-xs text-center text-gray-500 '>
                    <span className='text-blue-500 cursor-pointer' onClick={() => navigate(APP_ROUTES_ENUM.LOGIN)}>
                        Retour à la connexion
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
