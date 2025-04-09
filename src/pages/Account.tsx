import PageLayout from '@/layout/PageLayout';
import {
    BellIcon,
    ChevronRightIcon,
    ClipboardDocumentIcon,
    CreditCardIcon,
    DeviceTabletIcon,
    DocumentDuplicateIcon,
    EyeIcon,
    InformationCircleIcon,
    KeyIcon,
    LockClosedIcon,
    PaintBrushIcon,
    ShieldCheckIcon,
    ShieldExclamationIcon,
    SquaresPlusIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate();

    const accountSections = [
        {
            title: 'Mon Elios',
            items: [
                { name: 'Mon compte', icon: <UserIcon className='w-4 h-4' />, link: '/account/my-account' },
                {
                    name: 'Compte bancaire liée',
                    icon: <CreditCardIcon className='w-4 h-4' />,
                    link: '/account/bank-account',
                },
                { name: 'Notifications', icon: <BellIcon className='w-4 h-4' />, link: '/account/notifications' },
                { name: 'Thèmes', icon: <PaintBrushIcon className='w-4 h-4' />, link: '/account/themes' },
            ],
        },
        {
            title: 'Sécurité',
            items: [
                { name: 'Face ID', icon: <ShieldCheckIcon className='w-4 h-4' />, link: '/account/face-id' },
                {
                    name: 'Double authentification',
                    icon: <KeyIcon className='w-4 h-4' />,
                    link: '/account/two-factor-auth',
                },
                {
                    name: 'Changer mes codes',
                    icon: <LockClosedIcon className='w-4 h-4' />,
                    link: '/account/change-password',
                },
                {
                    name: 'Appareil actif',
                    icon: <DeviceTabletIcon className='w-4 h-4' />,
                    link: '/account/active-devices',
                },
            ],
        },
        {
            title: 'Aide',
            items: [{ name: "Avoir de l'aide", icon: <SquaresPlusIcon className='w-4 h-4' />, link: '/account/help' }],
        },
        {
            title: 'À propos',
            items: [
                { name: 'Changelog', icon: <ClipboardDocumentIcon className='w-4 h-4' />, link: '/account/changelog' },
                {
                    name: 'Mentions légales',
                    icon: <InformationCircleIcon className='w-4 h-4' />,
                    link: '/account/legal-notices',
                },
                {
                    name: "Conditions d'utilisation",
                    icon: <DocumentDuplicateIcon className='w-4 h-4' />,
                    link: '/account/terms-of-use',
                },
                {
                    name: 'Politique de confidentialité',
                    icon: <ShieldExclamationIcon className='w-4 h-4' />,
                    link: '/account/privacy-policy',
                },
            ],
        },
    ];

    return (
        <PageLayout title='Compte' onBack={() => navigate(-1)}>
            <div className='absolute z-10 flex items-center top-4 right-4'>
                <EyeIcon className='w-8 h-8 cursor-pointer' />
            </div>

            <section className='w-full px-6 mt-6'>
                <div className='flex items-center mb-6'>
                    <img
                        src='https://images.unsplash.com/photo-1731903590770-0f6f34338185?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MHx8fGVufDB8fHx8fA%3D%3D'
                        alt='User'
                        className='w-16 h-16 mr-4 rounded-full'
                    />
                    <div>
                        <h3 className='text-lg font-bold'>Nom d'utilisateur</h3>
                        <button className='flex items-center px-2 py-1 mt-1 text-sm bg-gray-200 rounded-full'>
                            <InformationCircleIcon className='w-4 h-4 mr-1' />
                            SÉCURISER MON COMPTE
                        </button>
                    </div>
                </div>

                {accountSections.map((section, index) => (
                    <div key={index} className='mb-6'>
                        <h3 className='mb-2 text-lg font-bold'>{section.title}</h3>
                        {section.items.map((item, idx) => (
                            <div
                                key={idx}
                                className='flex items-center justify-between py-2 border-b cursor-pointer'
                                onClick={() => navigate(item.link)}
                            >
                                <div className='flex items-center'>
                                    {item.icon}
                                    <span className='ml-4'>{item.name}</span>
                                </div>
                                <ChevronRightIcon className='w-4 h-4' />
                            </div>
                        ))}
                    </div>
                ))}

                <button className='w-full py-2 mt-4 text-white bg-red-500 rounded'>Déconnexion</button>
            </section>
        </PageLayout>
    );
};

export default Account;
