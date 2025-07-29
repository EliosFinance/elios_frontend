import { updateUserNotifications, useGetUserNotifications } from '@/api';
import PageLayout from '@/layout/PageLayout';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { NotificationType } from '@/types/challengeType';
import {
    BellIcon,
    CalendarIcon,
    CheckIcon,
    CreditCardIcon,
    FileTextIcon,
    GraduationCapIcon,
    MailIcon,
    SmartphoneIcon,
    TrendingUpIcon,
    TrophyIcon,
    UsersIcon,
    XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import SettingsPageFooter from '../SettingsPageFooter';
import SettingsPageHeader from '../SettingsPageHeader';

const MyNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationType>({
        id: 0,
        accountSync: false,
        budget: false,
        expenses: false,
        learn: false,
        emails: false,
        push: false,
        friends: false,
        challenges: false,
        weeklyReport: false,
        monthlyReport: false,
    });
    const [enabledNotifications, setEnabledNotifications] = useState<number>(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { data: notificationsData, isLoading: notificationsLoading } = useGetUserNotifications();

    // Fonction pour calculer le nombre de notifications activées
    const calculateEnabledNotifications = (notifs: NotificationType) => {
        return Object.entries(notifs).filter(
            ([key, value]) => key !== 'id' && typeof value === 'boolean' && value === true,
        ).length;
    };

    const handleToggle = async (key: string) => {
        const newNotif = notifications[key] !== undefined ? notifications[key] : false;
        const { id, ...rest } = notifications;

        const updatedNotifications = {
            ...notifications,
            [key]: !newNotif,
        };

        await updateUserNotifications({
            ...rest,
            [key]: !newNotif,
        } as NotificationType);

        setNotifications(updatedNotifications);
        setEnabledNotifications(calculateEnabledNotifications(updatedNotifications));
    };

    const handleSaveAll = async () => {
        const { id, ...rest } = notifications;

        await updateUserNotifications(rest as NotificationType);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const getIcon = (type: string) => {
        const iconProps = { className: 'w-5 h-5 text-primary-400' };

        switch (type) {
            case 'accountSync':
                return <CreditCardIcon {...iconProps} />;
            case 'budget':
                return <TrendingUpIcon {...iconProps} />;
            case 'expenses':
                return <CreditCardIcon {...iconProps} />;
            case 'learn':
                return <GraduationCapIcon {...iconProps} />;
            case 'emails':
                return <MailIcon {...iconProps} />;
            case 'push':
                return <SmartphoneIcon {...iconProps} />;
            case 'friends':
                return <UsersIcon {...iconProps} />;
            case 'challenges':
                return <TrophyIcon {...iconProps} />;
            case 'weeklyReport':
                return <FileTextIcon {...iconProps} />;
            case 'monthlyReport':
                return <CalendarIcon {...iconProps} />;
            default:
                return <BellIcon {...iconProps} />;
        }
    };

    const getLabel = (key: string) => {
        const labels = {
            accountSync: 'Synchronisation de compte',
            budget: 'Alertes de budget',
            expenses: 'Notifications de dépenses',
            learn: 'Conseils et apprentissage',
            emails: 'Notifications par email',
            push: 'Notifications push',
            friends: 'Activité des amis',
            challenges: 'Défis et récompenses',
            weeklyReport: 'Rapport hebdomadaire',
            monthlyReport: 'Rapport mensuel',
        };
        return labels[key] || key;
    };

    const getDescription = (key: string) => {
        const descriptions = {
            accountSync: 'Notifications lors de la synchronisation de vos comptes bancaires',
            budget: 'Alertes quand vous approchez ou dépassez votre budget',
            expenses: 'Notifications pour les grosses dépenses et transactions inhabituelles',
            learn: 'Conseils personnalisés pour améliorer votre gestion financière',
            emails: "Recevoir des notifications par email en plus des notifications dans l'app",
            push: 'Notifications push sur votre appareil mobile',
            friends: 'Être notifié des activités et défis de vos amis',
            challenges: 'Notifications sur les nouveaux défis et vos récompenses',
            weeklyReport: 'Résumé hebdomadaire de vos finances et objectifs',
            monthlyReport: 'Bilan mensuel détaillé de vos dépenses et économies',
        };
        return descriptions[key] || '';
    };

    const notificationCategories = [
        {
            title: 'Finances et comptes',
            description: 'Notifications liées à vos comptes et transactions',
            items: ['accountSync', 'budget', 'expenses'],
        },
        {
            title: 'Communication',
            description: 'Méthodes de notification et canaux de communication',
            items: ['emails', 'push'],
        },
        {
            title: 'Social et défis',
            description: 'Activités sociales et gamification',
            items: ['friends', 'challenges'],
        },
        {
            title: 'Apprentissage et rapports',
            description: 'Contenu éducatif et résumés périodiques',
            items: ['learn', 'weeklyReport', 'monthlyReport'],
        },
    ];

    const totalCount = Object.keys(notifications).filter((key) => key !== 'id').length;

    // Effet pour charger les données initiales
    useEffect(() => {
        if (notificationsData) {
            setNotifications(notificationsData);
            setEnabledNotifications(calculateEnabledNotifications(notificationsData));
        }
    }, [notificationsData]);

    return (
        <PageLayout title='Notifications'>
            <SettingsPageHeader link={APP_ROUTES_ENUM.SETTINGS} />

            {/* Chargement des notifications */}
            {notificationsLoading ? (
                <div className='flex items-center justify-center h-64'>
                    <p className='text-gray-400'>Chargement des notifications...</p>
                </div>
            ) : (
                <>
                    {/* Alert de succès */}
                    {showSuccessMessage && (
                        <div className='fixed z-50 duration-300 transform -translate-x-1/2 top-4 left-1/2 animate-in slide-in-from-top-2'>
                            <div className='flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm'>
                                <CheckIcon className='w-4 h-4 text-green-400' />
                                <span className='text-sm font-medium text-green-300'>Paramètres sauvegardés</span>
                            </div>
                        </div>
                    )}

                    {/* Header avec icône et description */}
                    <div className='w-full flex items-start gap-3 mb-6'>
                        <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg flex-shrink-0'>
                            <BellIcon className='w-6 h-6 text-white' />
                        </div>
                        <div className='flex-1'>
                            <h2 className='text-xl font-bold text-white mb-1'>Mes notifications</h2>
                            <p className='text-sm w-full text-gray-400 leading-relaxed'>
                                Personnalisez vos notifications pour rester informé selon vos préférences.
                            </p>
                        </div>
                    </div>

                    {/* Résumé des notifications actives */}
                    <div className='mb-6 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='text-lg font-bold text-white'>Résumé</h3>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 bg-primary-500 rounded-full'></div>
                                <span className='text-sm text-gray-300'>
                                    {enabledNotifications} sur {totalCount} activées
                                </span>
                            </div>
                        </div>

                        <div className='w-full bg-gray-700 rounded-full h-2 mb-3'>
                            <div
                                className='bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300'
                                style={{ width: `${totalCount > 0 ? (enabledNotifications / totalCount) * 100 : 0}%` }}
                            ></div>
                        </div>

                        <p className='text-xs text-gray-400'>
                            {enabledNotifications === 0 && 'Aucune notification activée'}
                            {enabledNotifications > 0 &&
                                enabledNotifications < totalCount &&
                                'Notifications partiellement configurées'}
                            {enabledNotifications === totalCount && 'Toutes les notifications sont activées'}
                        </p>
                    </div>

                    {/* Actions rapides */}
                    <div className='mb-6'>
                        <div className='flex items-center gap-2 mb-4'>
                            <BellIcon className='w-5 h-5 text-primary-400' />
                            <h3 className='text-lg font-bold text-white'>Actions rapides</h3>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <button
                                onClick={() => {
                                    const newState = Object.keys(notifications).reduce(
                                        (acc, key) => ({
                                            ...acc,
                                            [key]: key === 'id' ? notifications.id : true,
                                        }),
                                        {} as NotificationType,
                                    );
                                    setNotifications(newState);
                                    setEnabledNotifications(calculateEnabledNotifications(newState));
                                    handleSaveAll();
                                }}
                                className='p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors group'
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors'>
                                        <CheckIcon className='w-5 h-5 text-green-400' />
                                    </div>
                                    <div>
                                        <div className='font-medium text-white'>Tout activer</div>
                                        <div className='text-xs text-gray-400'>Activer toutes les notifications</div>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    const newState = Object.keys(notifications).reduce(
                                        (acc, key) => ({
                                            ...acc,
                                            [key]: key === 'id' ? notifications.id : false,
                                        }),
                                        {} as NotificationType,
                                    );
                                    setNotifications(newState);
                                    setEnabledNotifications(calculateEnabledNotifications(newState));
                                    handleSaveAll();
                                }}
                                className='p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors group'
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors'>
                                        <XIcon className='w-5 h-5 text-red-400' />
                                    </div>
                                    <div>
                                        <div className='font-medium text-white'>Tout désactiver</div>
                                        <div className='text-xs text-gray-400'>Désactiver toutes les notifications</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Categories de notifications */}
                    {notificationCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className='mb-6'>
                            <div className='flex items-center gap-2 mb-4'>
                                <BellIcon className='w-5 h-5 text-primary-400' />
                                <h3 className='text-lg font-bold text-white'>{category.title}</h3>
                            </div>

                            <div className='p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                                <p className='text-sm text-gray-400 mb-4'>{category.description}</p>

                                <div className='space-y-3'>
                                    {category.items.map((key) => (
                                        <div
                                            key={key}
                                            className='flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors'
                                        >
                                            <div className='flex items-center gap-3 flex-1'>
                                                {getIcon(key)}
                                                <div className='flex-1'>
                                                    <div className='font-medium text-white text-sm'>
                                                        {getLabel(key)}
                                                    </div>
                                                    <div className='text-xs text-gray-400 mt-1'>
                                                        {getDescription(key)}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleToggle(key)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    notifications[key] ? 'bg-primary-500' : 'bg-gray-600'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        notifications[key] ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bouton de sauvegarde */}
                    <div className='mb-6'>
                        <button
                            onClick={handleSaveAll}
                            className='w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2'
                        >
                            <CheckIcon className='w-5 h-5' />
                            Sauvegarder les paramètres
                        </button>
                    </div>
                </>
            )}

            {/* Footer avec informations */}
            <div className='p-4 border rounded-lg bg-white/5 border-white/10 backdrop-blur-sm mb-6'>
                <div className='text-center'>
                    <p className='mb-1 text-sm font-medium text-gray-300'>📱 Astuce</p>
                    <p className='text-xs leading-relaxed text-gray-400'>
                        Vous pouvez également gérer vos notifications directement depuis les paramètres de votre
                        appareil.
                    </p>
                </div>
            </div>

            <SettingsPageFooter />
        </PageLayout>
    );
};

export default MyNotifications;
