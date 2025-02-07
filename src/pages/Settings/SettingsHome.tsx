import { logout_api } from '@/api';
import ButtonApp from '@/components/ButtonApp';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArrowUturnLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import alertIcon from '../../assets/images/icons/alerte.png';
import { SETTINGS_MAP } from './SettingsMap';

const SettingsHome = () => {
    const navigate = useNavigate();
    return (
        <div className='px-4 py-8 w-full gap-10 flex flex-col'>
            {/* Header */}
            <div className='w-full flex justify-between items-center flex-col gap-8'>
                {/* go back + help */}
                <div className='w-full flex justify-between items-center'>
                    <ArrowUturnLeftIcon className='w-6 h-6 object-cover object-center' onClick={() => navigate(-1)} />
                    <QuestionMarkCircleIcon
                        className='w-6 h-6 object-cover object-center'
                        onClick={() => {
                            alert('TODO: Implement help modal');
                        }}
                    />
                </div>

                {/* User Profile */}
                <div className='w-full flex items-center gap-4'>
                    <img
                        className='w-16 h-16 rounded-full object-cover object-center'
                        src='https://imgs.search.brave.com/RIa6IubsDZj0jA-9LYRnFzKA9pqt-dkDVxe9DLzJjds/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL1AyLXJl/Z2lvbmFsLWlTdG9j/ay0xNDAxOTI3Mjgx/LmpwZw'
                        alt='User profile picture'
                    />
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold'>Nom Prénom</span>
                        {/* TODO: verify if account has 2FA enabled and display a badge if so */}
                        <div
                            className='flex items-center gap-2 bg-blue-500 bg-opacity-30 p-[2px] px-2 rounded-2'
                            onClick={() => {
                                navigate(APP_ROUTES_ENUM.SETTINGS_2FA);
                            }}
                        >
                            <img src={alertIcon} alt='Alert' className='h-4 w-4 object-cover object-center' />
                            <span>Sécuriser mon compte</span>
                        </div>
                    </div>
                </div>

                {/* CTA parrainage */}
                <div className='w-full h-20 bg-red-300 rounded-2 relative'>
                    <span className='absolute bottom-4 left-4 w-[60%] text-white font-semibold'>
                        Inviter un ami, et obtenez du Premium gratuitement !
                    </span>
                    <img
                        className='w-full h-full object-cover object-center rounded-2'
                        src='https://imgs.search.brave.com/RIa6IubsDZj0jA-9LYRnFzKA9pqt-dkDVxe9DLzJjds/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL1AyLXJl/Z2lvbmFsLWlTdG9j/ay0xNDAxOTI3Mjgx/LmpwZw'
                        alt='User profile picture'
                    />
                </div>
            </div>

            {/* Body */}
            <div className='w-full flex flex-col gap-8 items-start justify-center'>
                {SETTINGS_MAP.map((settingCategory, key) => (
                    <div key={key} className='w-full flex flex-col'>
                        <h2 className='font-semibold text-4xl'>{settingCategory.title}</h2>
                        <ul className='w-full flex flex-col pl-4 pt-4'>
                            {settingCategory.children?.map((setting, index) => (
                                <li
                                    key={index}
                                    className='w-full h-12 flex items-center border-b-[1px] border-gray-100'
                                >
                                    <a href={setting.route} className='w-full h-full flex items-center justify-between'>
                                        <div className='h-full flex items-center'>
                                            <span className='h-full w-10 flex items-center justify-center'>
                                                {setting.icon}
                                            </span>{' '}
                                            &nbsp;
                                            <span className='text-xl'>{setting.title}</span>
                                        </div>
                                        <ChevronRightIcon className='w-4 h-4 object-cover object-center' />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <ButtonApp
                onClick={async () => {
                    await logout_api();
                }}
                sx='!bg-red-500 !text-white !mt-0'
                size='large'
            >
                Déconnexion
            </ButtonApp>
            <div className='mt-12 w-full h-1 opacity-0'>spacer</div>
        </div>
    );
};

export default SettingsHome;