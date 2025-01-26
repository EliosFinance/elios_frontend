import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { AcademicCapIcon, CurrencyDollarIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LayoutNavBar = () => {
    const [currentRoute, setCurrentRoute] = useState<string>('');

    const LinkComponent = ({ route, icon }: { route: string; icon: React.JSX.Element }) => {
        return (
            <div className='w-[25%] flex flex-col items-center justify-around gap-2 transition-all duration-150 ease'>
                <Link
                    to={route}
                    className={`w-full flex items-center justify-center ${currentRoute === route ? 'text-blue-500' : 'text-gray-500'} transition-all duration-150 ease`}
                    onClick={() => {
                        setCurrentRoute(route.toLowerCase());
                    }}
                >
                    {icon}
                </Link>
                {currentRoute === route && (
                    <span className='w-[25%] h-1 bg-blue-500 rounded-2 transition-all duration-150 ease'></span>
                )}
            </div>
        );
    };

    useEffect(() => {
        const currentRoute = Object.values(APP_ROUTES_ENUM).find((route) => window.location.pathname.includes(route));
        setCurrentRoute(currentRoute.toLowerCase() || '');
    }, []);
    return (
        <div className='w-full h-16 flex items-center justify-between px-4 bg-gray-200 fixed bottom-0 left-0 z-[1000]'>
            {LinkComponent({
                route: APP_ROUTES_ENUM.HOME,
                icon: <HomeIcon className='w-6 h-6 object-cover object-center' />,
            })}
            {LinkComponent({
                route: '/TODO:',
                icon: <CurrencyDollarIcon className='w-6 h-6 object-cover object-center' />,
            })}
            {LinkComponent({
                route: APP_ROUTES_ENUM.LEARN,
                icon: <AcademicCapIcon className='w-6 h-6 object-cover object-center' />,
            })}
            {LinkComponent({
                route: APP_ROUTES_ENUM.SETTINGS,
                icon: <UserIcon className='w-6 h-6 object-cover object-center' />,
            })}
        </div>
    );
};

export default LayoutNavBar;
