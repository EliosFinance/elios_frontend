import mailLogo from '@/assets/images/mail/mail_icon.png';
import { Button } from '@/components/ui/button.tsx';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const userEmail = decodeURIComponent(params.get('email')) || '';
    const { setEmail } = useRegisterUsersStore();

    const handleNext = () => {
        navigate(APP_ROUTES_ENUM.CREATE_USERNAME);
    };

    useEffect(() => {
        setEmail(userEmail);
    }, [userEmail]);

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 pb-20 bg-white'>
            <RegisterHeader title='Vérifiez votre adresse mail' />

            <div className='flex flex-col items-center justify-center'>
                <img src={mailLogo} alt='Mail Logo' className='w-24 h-24 mb-6' />
                {/* Titre et sous-titre */}
                <h1 className='mb-4 text-xl font-bold text-center text-gray-800'>Jetez un oeil à vos emails</h1>
                <p className='mb-6 text-sm text-center text-gray-600'>
                    Cliquez sur le lien de vérification qui vient d'être envoyé à l'adresse <br />
                    <span className='font-semibold'>{userEmail}</span>. <br />
                </p>

                {/* Lien pour renvoyer l'email */}
                <p className='mb-6 text-sm text-center text-gray-600'>
                    Vous n'avez pas reçu d'email ? <button className='font-semibold text-blue-500'>Renvoyer</button>
                </p>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <Button className='w-full max-w-sm px-4 py-2 mb-4 text-center text-white bg-blue-500 rounded-full hover:bg-blue-600'>
                    Ouvrir mon application d'email
                </Button>
                <Button
                    onClick={handleNext}
                    className='w-full max-w-sm px-4 py-2 font-bold text-center text-gray-800 bg-transparent rounded-full hover:bg-gray-300'
                >
                    Plus tard
                </Button>
            </div>
        </div>
    );
};

export default EmailVerification;
