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
        <div className='flex flex-col items-center justify-between h-screen w-full bg-white px-4 pb-20 pt-6'>
            <RegisterHeader title='Vérifiez votre adresse mail' />

            <div className='flex flex-col items-center justify-center'>
                <img src={mailLogo} alt='Mail Logo' className='w-24 h-24 mb-6' />
                {/* Titre et sous-titre */}
                <h1 className='text-xl font-bold text-gray-800 mb-4 text-center'>Jetez un oeil à vos emails</h1>
                <p className='text-sm text-gray-600 text-center mb-6'>
                    Cliquez sur le lien de vérification qui vient d'être envoyé à l'adresse <br />
                    <span className='font-semibold'>{userEmail}</span>. <br />
                </p>

                {/* Lien pour renvoyer l'email */}
                <p className='text-sm text-gray-600 mb-6 text-center'>
                    Vous n'avez pas reçu d'email ? <button className='text-blue-500 font-semibold'>Renvoyer</button>
                </p>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <Button className='w-full max-w-sm mb-4 px-4 py-2 bg-blue-500 text-white text-center rounded-full hover:bg-blue-600'>
                    Ouvrir mon application d'email
                </Button>
                <Button
                    onClick={handleNext}
                    className='w-full max-w-sm px-4 py-2 bg-transparent text-gray-800 font-bold text-center rounded-full hover:bg-gray-300'
                >
                    Plus tard
                </Button>
            </div>
        </div>
    );
};

export default EmailVerification;
