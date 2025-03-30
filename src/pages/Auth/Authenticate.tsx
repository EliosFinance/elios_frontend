import { login_google } from '@/api';
import mainLogo from '@/assets/images/corp/main_logo.png';
import appleIcon from '@/assets/images/icons/apple_icon.png';
import { Button } from '@/components/ui/button.tsx';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { OsEnum, useDeviceDetection } from '@/hook/useDeviceDetection';
import { userStore } from '@/store/UserStore.ts';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArrowDownCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import DrawerStep1 from './Login/DrawerStep1';
import DrawerStep2 from './Login/DrawerStep2';
import DrawerStep3 from './Login/DrawerStep3';

const Authenticate: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null); // État pour le message d'erreur
    const [drawerStep, setDrawerStep] = useState<'step1' | 'step2' | 'step3'>('step1');
    const [dataForStep3, setDataForStep3] = useState<{ email: string; password: string } | null>(null);
    const { os } = useDeviceDetection();
    const navigate = useNavigate();
    const updateUser = userStore((state) => state.updateUser);

    const isValidEmail = (email: string): boolean => {
        // Expression régulière pour valider une adresse email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        if (!isValidEmail(email)) {
            setError('Veuillez entrer une adresse email valide.');
            return;
        }
        setError(null);
        navigate({
            pathname: APP_ROUTES_ENUM.VERIFY_EMAIL,
            search: createSearchParams({
                email: encodeURIComponent(email),
            }).toString(),
        });
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen px-4 bg-white gap-6'>
            {/* Decorations & Headings */}
            <div className='flex flex-col items-center justify-center'>
                {/* Logo */}
                <img src={mainLogo} alt='Elios Logo' className='w-20 h-20 mb-4 rounded-4' />

                {/* Titre */}
                <h1 className='text-3xl font-bold text-gray-800 mb-2 text-center w-[25ch]'>
                    Créez un compte pour sauvegarder vos réponses
                </h1>

                {/* Étoiles et score */}
                <div className='flex flex-col items-center mb-4'>
                    <div className='flex'>
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-4 h-4 text-yellow-400'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.327 4.086a1 1 0 00.95.69h4.294c.969 0 1.371 1.24.588 1.81l-3.475 2.535a1 1 0 00-.364 1.118l1.327 4.086c.3.921-.755 1.688-1.538 1.118l-3.475-2.535a1 1 0 00-1.176 0l-3.475 2.535c-.783.57-1.838-.197-1.538-1.118l1.327-4.086a1 1 0 00-.364-1.118L2.22 9.513c-.783-.57-.38-1.81.588-1.81h4.294a1 1 0 00.95-.69l1.327-4.086z' />
                            </svg>
                        ))}
                    </div>
                    <p className='mt-1 text-xs text-gray-500'>noté 4.98/5 - 4324 notes</p>
                </div>
            </div>

            {/* Email input */}
            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <div className='w-full max-w-sm'>
                    <input
                        id='email'
                        type='email'
                        placeholder='Votre email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2 border-t-none border-r-none border-l-none border-b-solid border-b-[1.5px] ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 text-m placeholder:text-gray-500 placeholder:font-semibold`}
                    />
                    {/* Message d'erreur */}
                    {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
                </div>

                {/* Bouton Suivant */}
                <Button
                    color='primary'
                    onClick={handleSubmit}
                    className='w-full max-w-sm py-2 mt-3 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'
                >
                    Suivant
                </Button>

                {/* Diviseur */}
                <div className='flex items-center w-full max-w-sm my-4'>
                    <hr className='flex-grow border-gray-300' />
                    <span className='mx-4 text-xs text-gray-500'>ou</span>
                    <hr className='flex-grow border-gray-300' />
                </div>
            </div>

            {/* Login choice buttons */}
            <div className='flex flex-col w-full max-w-sm space-y-2'>
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const loginGoogle = await login_google(credentialResponse.credential);
                        if (!loginGoogle) return;
                        updateUser({
                            username: loginGoogle.username,
                            token: loginGoogle.access_token,
                            refresh_token: loginGoogle.refresh_token,
                            powens_token: loginGoogle.powens_token,
                        });
                        navigate(APP_ROUTES_ENUM.HOME);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    size='large'
                    shape='pill'
                    text='continue_with'
                    type='standard'
                    logo_alignment='center'
                    width={window.innerWidth - 47}
                    // useOneTap
                />
                {os === OsEnum.IOS ||
                    (os === OsEnum.WEB && (
                        <Button className='flex items-center justify-center w-full border-solid border-[1.5px] border-gray-200 text-gray-800 rounded-full bg-transparent hover:bg-gray-300'>
                            <img src={appleIcon} alt='Apple' className='h-4 mr-3 w-aut' />
                            <span className='text-sm'>Continuer avec Apple</span>
                        </Button>
                    ))}

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className='w-full bg-transparent border-solid border-[1.5px] border-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300'>
                            J'ai déjà un compte
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <Button
                            className='absolute p-2 bg-transparent rounded-full top-2 left-4 focus:bg-transparent'
                            onClick={() => {
                                switch (drawerStep) {
                                    case 'step1':
                                        // TODO: Close drawer
                                        break;

                                    case 'step2':
                                        setDrawerStep('step1');
                                        setDataForStep3(null);
                                        break;

                                    case 'step3':
                                        setDrawerStep('step3');
                                        break;

                                    default:
                                        break;
                                }
                            }}
                        >
                            <ArrowLeftCircleIcon className='w-6 h-6 text-gray-800 bg-transparent fill-none' />
                        </Button>
                        <DrawerClose className='absolute top-2 right-4'>
                            <Button className='p-2 bg-transparent rounded-full' onClick={() => setDrawerStep('step1')}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-6 h-6 text-gray-800'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            </Button>
                        </DrawerClose>
                        <DrawerTitle className='display-none'>
                            <></>
                        </DrawerTitle>
                        {drawerStep === 'step1' && <DrawerStep1 onNext={() => setDrawerStep('step2')} />}
                        {drawerStep === 'step2' && (
                            <DrawerStep2
                                onNext={() => setDrawerStep('step3')}
                                setDataForStep3={(email, password) => {
                                    setDataForStep3({ email, password });
                                }}
                            />
                        )}
                        {drawerStep === 'step3' && (
                            <DrawerStep3 email={dataForStep3.email} password={dataForStep3.password} />
                        )}
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
};

export default Authenticate;
