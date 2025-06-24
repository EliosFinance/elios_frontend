import { checkUserCompletionStatus, getUser } from '@/api';
import { markEmailAsVerified } from '@/api/connexion/connexionCalls';
import mailLogo from '@/assets/images/mail/mail_icon.png';
import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/context/AuthProvider';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const params = new URLSearchParams(window.location.search);
    const userEmail = decodeURIComponent(params.get('email')) || '';
    const isGoogleUser = params.get('provider') === 'google';
    const { setEmail } = useRegisterUsersStore();

    const handleNext = async () => {
        const fullUser = await getUser();
        try {
            if (isGoogleUser) {
                // Pour Google, marquer comme vérifié
                await markEmailAsVerified(userEmail);
            } else {
                // Pour les utilisateurs email existants qui cliquent "Plus tard"
                // On marque l'email comme vérifié pour éviter la boucle
                await markEmailAsVerified(userEmail);
            }

            // Vérifier le statut mis à jour et rediriger vers la prochaine étape
            if (fullUser?.id) {
                const status = await checkUserCompletionStatus(fullUser.id.toString());

                // Déterminer la prochaine étape
                if (!status.pinConfigured) {
                    navigate(APP_ROUTES_ENUM.CREATE_PIN);
                } else if (!status.termsAccepted) {
                    navigate(APP_ROUTES_ENUM.TERMS);
                } else {
                    // Inscription complète
                    navigate(APP_ROUTES_ENUM.HOME);
                }
            } else {
                // Fallback si pas d'utilisateur
                navigate(APP_ROUTES_ENUM.CREATE_USERNAME);
            }
        } catch (error) {
            console.error('Erreur lors de la vérification email:', error);
            // En cas d'erreur, continuer quand même
            navigate(APP_ROUTES_ENUM.CREATE_USERNAME);
        }
    };

    useEffect(() => {
        setEmail(userEmail);

        // Auto-redirection pour Google après 2 secondes
        if (isGoogleUser) {
            setTimeout(() => {
                handleNext();
            }, 2000);
        }
    }, [userEmail, isGoogleUser]);

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 pb-8'>
            <RegisterHeader title={isGoogleUser ? 'Email vérifié !' : 'Vérifiez votre adresse mail'} />

            <div className='flex flex-col items-center justify-center'>
                <img src={mailLogo} alt='Mail Logo' className='w-24 h-24 mb-6' />

                {isGoogleUser ? (
                    <>
                        <h1 className='mb-4 text-xl font-bold text-center text-green-600'>
                            ✅ Email vérifié avec succès !
                        </h1>
                        <p className='mb-6 text-sm text-center text-gray-300'>
                            Votre adresse <span className='font-semibold'>{userEmail}</span> a été automatiquement
                            vérifiée via Google.
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className='mb-4 text-xl font-bold text-center'>Vérifiez votre adresse mail</h1>
                        <p className='mb-6 text-sm text-center text-gray-300'>
                            Pour des raisons de sécurité, nous devons vérifier votre adresse email.
                            <br />
                            <span className='font-semibold'>{userEmail}</span>
                        </p>
                        <p className='mb-6 text-sm text-center text-gray-300'>
                            Un email de vérification sera envoyé prochainement.
                            <br />
                            En attendant, vous pouvez continuer votre inscription.
                        </p>
                    </>
                )}
            </div>

            <div className='flex flex-col items-center justify-center w-full gap-2'>
                {!isGoogleUser && (
                    <Button
                        className='w-full max-w-sm px-4 py-2 text-center text-white bg-blue-500 rounded-full hover:bg-blue-600'
                        onClick={() => {
                            // Action future : ouvrir l'app email
                            console.log('Ouverture app email - à implémenter');
                        }}
                    >
                        J'ai vérifié mon email
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    className='w-full max-w-sm px-4 py-2 font-bold text-center text-gray-200 bg-transparent rounded-full hover:bg-gray-300'
                >
                    {isGoogleUser ? 'Continuer' : 'Continuer sans vérifier'}
                </Button>
            </div>
        </div>
    );
};

export default EmailVerification;
