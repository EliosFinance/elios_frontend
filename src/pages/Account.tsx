import { useNavigate } from 'react-router-dom';
import {
    ArrowLeftIcon,
    EyeIcon,
    InformationCircleIcon,
    UserIcon,
    CreditCardIcon,
    BellIcon,
    PaintBrushIcon,
    LockClosedIcon,
    ChevronRightIcon,
    KeyIcon,
    ShieldCheckIcon,
    DeviceTabletIcon,
    SquaresPlusIcon,
    ClipboardDocumentIcon,
    DocumentDuplicateIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/outline';

const Account = () => {
    const navigate = useNavigate();

    const accountSections = [
        {
            title: 'Mon Elios',
            items: [
                { name: 'Mon compte', icon: <UserIcon className="w-4 h-4" />, link: '/account/my-account' },
                { name: 'Compte bancaire liée', icon: <CreditCardIcon className="w-4 h-4" />, link: '/account/bank-account' },
                { name: 'Notifications', icon: <BellIcon className="w-4 h-4" />, link: '/account/notifications' },
                { name: 'Thèmes', icon: <PaintBrushIcon className="w-4 h-4" />, link: '/account/themes' },
            ],
        },
        {
            title: 'Sécurité',
            items: [
                { name: 'Face ID', icon: <ShieldCheckIcon className="w-4 h-4" />, link: '/account/face-id' },
                { name: 'Double authentification', icon: <KeyIcon className="w-4 h-4" />, link: '/account/two-factor-auth' },
                { name: 'Changer mes codes', icon: <LockClosedIcon className="w-4 h-4" />, link: '/account/change-password' },
                { name: 'Appareil actif', icon: <DeviceTabletIcon className="w-4 h-4" />, link: '/account/active-devices' },
            ],
        },
        {
            title: 'Aide',
            items: [
                { name: 'Avoir de l\'aide', icon: <SquaresPlusIcon className="w-4 h-4" />, link: '/account/help' },
            ],
        },
        {
            title: 'À propos',
            items: [
                { name: 'Changelog', icon: <ClipboardDocumentIcon className="w-4 h-4" />, link: '/account/changelog' },
                { name: 'Mentions légales', icon: <InformationCircleIcon className="w-4 h-4" />, link: '/account/legal-notices' },
                { name: 'Conditions d\'utilisation', icon: <DocumentDuplicateIcon className="w-4 h-4" />, link: '/account/terms-of-use' },
                { name: 'Politique de confidentialité', icon: <ShieldExclamationIcon className="w-4 h-4" />, link: '/account/privacy-policy' },
            ],
        },
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <header className="w-full h-20 bg-gray-200 flex items-center justify-between px-6 relative">
                <div className="absolute top-4 left-4 flex items-center z-10">
                    <ArrowLeftIcon className="w-8 h-8 cursor-pointer" onClick={() => navigate(-1)} />
                </div>
                <h2 className="text-xl font-bold z-10">Compte</h2>
                <div className="absolute top-4 right-4 flex items-center z-10">
                    <EyeIcon className="w-8 h-8 cursor-pointer" />
                </div>
            </header>

            <section className="w-full px-6 mt-6">
                <div className="flex items-center mb-6">
                    <img
                        src="https://images.unsplash.com/photo-1731903590770-0f6f34338185?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MHx8fGVufDB8fHx8fA%3D%3D"
                        alt="User"
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-bold">Nom d'utilisateur</h3>
                        <button className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center mt-1">
                            <InformationCircleIcon className="w-4 h-4 mr-1" />
                            SÉCURISER MON COMPTE
                        </button>
                    </div>
                </div>

                {accountSections.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                        {section.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between py-2 border-b cursor-pointer"
                                onClick={() => navigate(item.link)}
                            >
                                <div className="flex items-center">
                                    {item.icon}
                                    <span className="ml-4">{item.name}</span>
                                </div>
                                <ChevronRightIcon className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                ))}

                <button className="w-full bg-red-500 text-white py-2 rounded mt-4">
                    Déconnexion
                </button>
            </section>
        </div>
    );
};

export default Account;