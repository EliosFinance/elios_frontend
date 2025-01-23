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
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mes Comptes bancaires',
                icon: 'credit-card',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mon abonnement',
                icon: 'credit-card',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mes récompenses',
                icon: 'gift',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mes partenaires',
                icon: 'briefcase',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mes notifications',
                icon: 'cog',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
        ],
    },
    {
        title: 'Sécurité',
        children: [
            {
                title: "Mes codes d'accès",
                icon: 'lock',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Authentification à deux facteurs',
                icon: 'shield',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Gestion des appareils',
                icon: 'mobile',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
        ],
    },
    {
        title: 'Social',
        children: [
            {
                title: 'Partager mon activité',
                icon: 'share',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mes amis',
                icon: 'users',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: "Noter l'application",
                icon: 'star',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Parraîner un ami',
                icon: 'gift',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Nous suivre sur les réseaux',
                icon: 'twitter',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
        ],
    },
    {
        title: 'Aide',
        children: [
            {
                title: 'FAQ',
                icon: 'question',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Nous contacter',
                icon: 'envelope',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Conditions générales',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
        ],
    },
    {
        title: 'Apprendre',
        children: [
            {
                title: 'EliosLearn',
                icon: 'newspaper',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
        ],
    },
    {
        title: 'A propos',
        children: [
            {
                title: 'Notre histoire',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Notre équipe',
                icon: 'users',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Nos partenaires',
                icon: 'briefcase',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Nous rejoindre',
                icon: 'briefcase',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Mentions légales',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Politique de confidentialité',
                icon: 'lock',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'Change Log',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
            {
                title: 'CGU',
                icon: 'book',
                route: APP_ROUTES_ENUM.SETTINGS,
            },
        ],
    },
];
