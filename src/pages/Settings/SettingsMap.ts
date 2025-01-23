import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';

export type SettingMapObject = {
    icon?: string;
    title: string;
    children?: SettingsMapItemType[];
};

export type SettingsMapItemType = {
    title: string;
    icon: string;
    route: string;
};

export const SETTINGS_MAP: SettingMapObject[] = [
    {
        title: 'Mon Elios',
        children: [
            {
                title: 'Mon profil',
                icon: 'user',
                route: APP_ROUTES_ENUM.SETTINGS_PROFILE,
            },
            {
                title: 'Mes Comptes bancaires',
                icon: 'credit-card',
                route: APP_ROUTES_ENUM.SETTINGS_BANK_ACCOUNTS,
            },
            {
                title: 'Mon abonnement',
                icon: 'credit-card',
                route: APP_ROUTES_ENUM.SETTINGS_SUBSCRIPTIONS,
            },
            {
                title: 'Mes récompenses',
                icon: 'gift',
                route: APP_ROUTES_ENUM.SETTINGS_REWARDS,
            },
            {
                title: 'Mes parrainages',
                icon: 'briefcase',
                route: APP_ROUTES_ENUM.SETTINGS_REFERRALS,
            },
            {
                title: 'Mes notifications',
                icon: 'cog',
                route: APP_ROUTES_ENUM.SETTINGS_NOTIFICATIONS,
            },
        ],
    },
    {
        title: 'Sécurité',
        children: [
            {
                title: "Mes codes d'accès",
                icon: 'lock',
                route: APP_ROUTES_ENUM.SETTINGS_ACCESS_CODES,
            },
            {
                title: 'Authentification à deux facteurs',
                icon: 'shield',
                route: APP_ROUTES_ENUM.SETTINGS_2FA,
            },
            {
                title: 'Gestion des appareils',
                icon: 'mobile',
                route: APP_ROUTES_ENUM.SETTINGS_DEVICES_MANAGEMENT,
            },
        ],
    },
    {
        title: 'Social',
        children: [
            {
                title: 'Partager mon activité',
                icon: 'share',
                route: APP_ROUTES_ENUM.SETTINGS_SHARE_MY_ACTIVITY,
            },
            {
                title: 'Mes amis',
                icon: 'users',
                route: APP_ROUTES_ENUM.FRIENDS,
            },
            {
                title: "Noter l'application",
                icon: 'star',
                route: 'TODO',
            },
            {
                title: 'Parraîner un ami',
                icon: 'gift',
                route: 'TODO',
            },
            {
                title: 'Nous suivre sur les réseaux',
                icon: 'twitter',
                route: APP_ROUTES_ENUM.SETTINGS_FOLLOW_OUR_SOCIAL_NETWORKS,
            },
        ],
    },
    {
        title: 'Aide',
        children: [
            {
                title: 'FAQ',
                icon: 'question',
                route: APP_ROUTES_ENUM.SETTINGS_FAQ,
            },
            {
                title: 'Nous contacter',
                icon: 'envelope',
                route: APP_ROUTES_ENUM.SETTINGS_CONTACT_US,
            },
        ],
    },
    {
        title: 'Apprendre',
        children: [
            {
                title: 'EliosLearn',
                icon: 'newspaper',
                route: APP_ROUTES_ENUM.LEARN,
            },
        ],
    },
    {
        title: 'A propos',
        children: [
            {
                title: 'Notre histoire',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS_OUR_HISTORY,
            },
            {
                title: 'Notre équipe',
                icon: 'users',
                route: APP_ROUTES_ENUM.SETTINGS_OUR_TEAM,
            },
            {
                title: 'Nos partenaires',
                icon: 'briefcase',
                route: APP_ROUTES_ENUM.SETTINGS_OUR_PARTNERS,
            },
            {
                title: 'Mentions légales',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS_LEGAL_MENTIONS,
            },
            {
                title: 'Politique de confidentialité',
                icon: 'lock',
                route: APP_ROUTES_ENUM.SETTINGS_PRIVACY_POLICY,
            },
            {
                title: 'Change Log',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS_CHANGE_LOG,
            },
            {
                title: 'CGU',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS_TERMS_OF_USE,
            },
        ],
    },
];
