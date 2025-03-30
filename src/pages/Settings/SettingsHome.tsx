import { logout_api } from '@/api';
import ButtonApp from '@/components/ButtonApp';
import { useAuth } from '@/context/AuthProvider';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArrowUturnLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import alertIcon from '../../assets/images/icons/alerte.png';
import { SETTINGS_MAP } from './SettingsMap';

const SettingsHome = () => {
    const navigate = useNavigate();
    const { signOut, user } = useAuth();
    return (
        <div className='flex flex-col w-full px-4 py-8 gap-10'>
            {/* Header */}
            <div className='flex flex-col items-center justify-between w-full gap-8'>
                {/* go back + help */}
                <div className='flex items-center justify-between w-full'>
                    <ArrowUturnLeftIcon className='object-cover object-center w-6 h-6' onClick={() => navigate(-1)} />
                    <QuestionMarkCircleIcon
                        className='object-cover object-center w-6 h-6'
                        onClick={() => {
                            alert('TODO: Implement help modal');
                        }}
                    />
                </div>

                {/* User Profile */}
                <div className='flex items-center w-full gap-4'>
                    <img
                        className='object-cover object-center w-16 h-16 rounded-full'
                        src='https://imgs.search.brave.com/RIa6IubsDZj0jA-9LYRnFzKA9pqt-dkDVxe9DLzJjds/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL1AyLXJl/Z2lvbmFsLWlTdG9j/ay0xNDAxOTI3Mjgx/LmpwZw'
                        alt='User profile picture'
                    />
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold'>{user.username}</span>
                        {/* TODO: verify if account has 2FA enabled and display a badge if so */}
                        <div
                            className='flex items-center gap-2 bg-blue-500 bg-opacity-30 p-[2px] px-2 rounded-2'
                            onClick={() => {
                                navigate(APP_ROUTES_ENUM.SETTINGS_2FA);
                            }}
                        >
                            <img src={alertIcon} alt='Alert' className='object-cover object-center w-4 h-4' />
                            <span>Sécuriser mon compte</span>
                        </div>
                    </div>
                </div>

                {/* CTA parrainage */}
                <div className='relative w-full h-20 bg-red-300 rounded-2'>
                    <span className='absolute bottom-4 left-4 w-[60%] text-white font-semibold'>
                        Inviter un ami, et obtenez du Premium gratuitement !
                    </span>
                    <img
                        className='object-cover object-center w-full h-full rounded-2'
                        src='https://imgs.search.brave.com/RIa6IubsDZj0jA-9LYRnFzKA9pqt-dkDVxe9DLzJjds/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL1AyLXJl/Z2lvbmFsLWlTdG9j/ay0xNDAxOTI3Mjgx/LmpwZw'
                        alt='User profile picture'
                    />
                </div>
            </div>

            {/* Body */}
            <div className='flex flex-col items-start justify-center w-full gap-8'>
                {SETTINGS_MAP.map((settingCategory, key) => (
                    <div key={key} className='flex flex-col w-full'>
                        <h2 className='text-4xl font-semibold'>{settingCategory.title}</h2>
                        <ul className='flex flex-col w-full pt-4 pl-4'>
                            {settingCategory.children?.map((setting, index) => (
                                <li
                                    key={index}
                                    className='w-full h-12 flex items-center border-b-[1px] border-gray-100'
                                >
                                    <a href={setting.route} className='flex items-center justify-between w-full h-full'>
                                        <div className='flex items-center h-full'>
                                            <span className='flex items-center justify-center w-10 h-full'>
                                                {setting.icon}
                                            </span>{' '}
                                            &nbsp;
                                            <span className='text-xl'>{setting.title}</span>
                                        </div>
                                        <ChevronRightIcon className='object-cover object-center w-4 h-4' />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <ButtonApp
                onClick={() => {
                    console.log('signOut');

                    signOut();
                }}
                sx='!bg-red-500 !text-white !mt-0'
                size='large'
            >
                Déconnexion
            </ButtonApp>
            <div className='w-full h-1 mt-12 opacity-0'>spacer</div>
        </div>
    );
};

export default SettingsHome;
