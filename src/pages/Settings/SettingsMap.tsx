import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import {
    AcademicCapIcon,
    BanknotesIcon,
    BellAlertIcon,
    BookOpenIcon,
    BriefcaseIcon,
    ChatBubbleLeftRightIcon,
    ComputerDesktopIcon,
    CreditCardIcon,
    EnvelopeIcon,
    GiftIcon,
    HandRaisedIcon,
    HeartIcon,
    LockClosedIcon,
    MegaphoneIcon,
    NewspaperIcon,
    NumberedListIcon,
    ShareIcon,
    ShieldExclamationIcon,
    StarIcon,
    TagIcon,
    UserGroupIcon,
    UserIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline';

export type SettingMapObject = {
    icon?: any;
    title: string;
    children?: SettingsMapItemType[];
};

export type SettingsMapItemType = {
    title: string;
    icon: any;
    route: string;
};

const globalIconStyle = 'w-6 h-6 object-cover object-center text-blue-500';
export const SETTINGS_MAP: SettingMapObject[] = [
    {
        title: 'Mon Elios',
        children: [
            {
                title: 'Mon profil',
                icon: <UserIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_PROFILE,
            },
            {
                title: 'Mes Comptes bancaires',
                icon: <BanknotesIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_BANK_ACCOUNTS,
            },
            {
                title: 'Mon abonnement',
                icon: <CreditCardIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_SUBSCRIPTIONS,
            },
            {
                title: 'Mes récompenses',
                icon: <GiftIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_REWARDS,
            },
            {
                title: 'Mes parrainages',
                icon: <BriefcaseIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_REFERRALS,
            },
            {
                title: 'Mes notifications',
                icon: <BellAlertIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_NOTIFICATIONS,
            },
        ],
    },
    {
        title: 'Sécurité',
        children: [
            {
                title: "Mes codes d'accès",
                icon: <LockClosedIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_ACCESS_CODES,
            },
            {
                title: 'Authentification à deux facteurs',
                icon: <ShieldExclamationIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_2FA,
            },
            {
                title: 'Gestion des appareils',
                icon: <ComputerDesktopIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_DEVICES_MANAGEMENT,
            },
        ],
    },
    {
        title: 'Social',
        children: [
            {
                title: 'Partager mon activité',
                icon: <ShareIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_SHARE_MY_ACTIVITY,
            },
            {
                title: 'Mes amis',
                icon: <UserGroupIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.FRIENDS,
            },
            {
                title: "Noter l'application",
                icon: <StarIcon className={globalIconStyle} />,
                route: 'TODO',
            },
            {
                title: 'Parraîner un ami',
                icon: <UserPlusIcon className={globalIconStyle} />,
                route: 'TODO',
            },
            {
                title: 'Nous suivre sur les réseaux',
                icon: <MegaphoneIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_FOLLOW_OUR_SOCIAL_NETWORKS,
            },
        ],
    },
    {
        title: 'Aide',
        children: [
            {
                title: 'FAQ',
                icon: <ChatBubbleLeftRightIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_FAQ,
            },
            {
                title: 'Nous contacter',
                icon: <EnvelopeIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_CONTACT_US,
            },
        ],
    },
    {
        title: 'Apprendre',
        children: [
            {
                title: 'EliosLearn',
                icon: <AcademicCapIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.LEARN,
            },
        ],
    },
    {
        title: 'A propos',
        children: [
            {
                title: 'Notre histoire',
                icon: <BookOpenIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_OUR_HISTORY,
            },
            {
                title: 'Notre équipe',
                icon: <UserGroupIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_OUR_TEAM,
            },
            {
                title: 'Nos partenaires',
                icon: <HeartIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_OUR_PARTNERS,
            },
            {
                title: 'Mentions légales',
                icon: <NewspaperIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_LEGAL_MENTIONS,
            },
            {
                title: 'Politique de confidentialité',
                icon: <HandRaisedIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_PRIVACY_POLICY,
            },
            {
                title: 'Change Log',
                icon: <TagIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_CHANGE_LOG,
            },
            {
                title: 'CGU',
                icon: <NumberedListIcon className={globalIconStyle} />,
                route: APP_ROUTES_ENUM.SETTINGS_TERMS_OF_USE,
            },
        ],
    },
];
