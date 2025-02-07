import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';

const NavBar = () => {
    const iconStyle = 'w-[50%] h-auto';
    return (
        <div className='absolute bottom-0 w-full bg-gray-800 text-white p-4 flex justify-around items-center'>
            <a className={iconStyle} href={APP_ROUTES_ENUM.HOME}>
                Home
            </a>
            <a className={iconStyle} href={APP_ROUTES_ENUM.CHALLENGE}>
                About
            </a>
            <a className={iconStyle} href={APP_ROUTES_ENUM.LEARN}>
                Contact
            </a>
            <a className={iconStyle} href={APP_ROUTES_ENUM.SETTINGS}>
                Settings
            </a>
        </div>
    );
};

export default NavBar;
