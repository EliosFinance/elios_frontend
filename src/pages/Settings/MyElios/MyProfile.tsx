import { getChallenges, getLikedArticles, getReadArticles, getUser } from '@/api';
import PageLayout from '@/layout/PageLayout';
import { ArticleType } from '@/types/BlogType';
import { userType } from '@/types/challengeType';
import { set } from 'date-fns';
import {
    AlertCircleIcon,
    CalendarIcon,
    CameraIcon,
    CheckCircleIcon,
    FileCheckIcon,
    KeyIcon,
    LockIcon,
    MailIcon,
    PenBoxIcon,
    ShieldCheckIcon,
    SparklesIcon,
    UserIcon,
    XCircleIcon,
} from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import SettingsPageFooter from '../SettingsPageFooter';
import SettingsPageHeader from '../SettingsPageHeader';

const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<userType>();

    const [completionStatus] = useState({
        emailVerified: true,
        pinConfigured: true,
        termsAccepted: true,
        profileComplete: false,
        nextSteps: [
            'Ajouter une photo de profil',
            'Compléter les informations de contact',
            "Activer l'authentification à 2 facteurs",
        ],
    });

    const [stats, setStats] = useState<{
        articlesLus: number;
        articlesAimes: number;
        articlesEcrits: number;
        amis: number;
        defisCompletes: number;
        transactionsTotal: number;
    }>({
        articlesLus: 0,
        articlesAimes: 0,
        articlesEcrits: 0,
        amis: profileData?.friends?.length || 0,
        defisCompletes: 0,
        transactionsTotal: profileData?.transactions?.length || 0,
    });

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const getStatusIcon = (status: boolean) => {
        return status ? (
            <CheckCircleIcon className='w-5 h-5 text-green-400' />
        ) : (
            <XCircleIcon className='w-5 h-5 text-red-400' />
        );
    };

    const getProviderBadge = (provider: string) => {
        return provider === 'google' ? (
            <span className='px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full'>Google</span>
        ) : (
            <span className='px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-300 rounded-full'>Email</span>
        );
    };

    const get2FAStatus = () => {
        return (
            <span className='px-2 py-1 text-xs font-medium bg-red-500/20 text-red-300 rounded-lg'>
                A2F pas encore activé
            </span>
        );
        // <span className='px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-lg'>A2F activé</span>
    };

    useLayoutEffect(() => {
        const fetchProfileData = async () => {
            const user = await getUser();
            if (user) {
                console.log('Profil utilisateur récupéré:', user);

                setProfileData(user);
            }
            const readArticles = await getReadArticles();
            const likedArticles = await getLikedArticles();

            setStats({
                articlesLus: readArticles?.length || 0,
                articlesAimes: likedArticles?.length || 0,
                articlesEcrits: 0,
                amis: profileData?.friends?.length || 0,
                defisCompletes: 0,
                transactionsTotal: profileData?.transactions?.length || 0,
            });
        };
        fetchProfileData();
    }, []);

    if (!profileData) {
        return (
            <PageLayout title='Mon profil'>
                <SettingsPageHeader />
                <div className='flex items-center justify-center h-screen text-gray-400'>Chargement du profil...</div>
            </PageLayout>
        );
    }
    return (
        <PageLayout title='Mon profil'>
            <SettingsPageHeader />

            <div className='w-full flex items-start gap-3 mb-6'>
                <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg flex-shrink-0'>
                    <UserIcon className='w-6 h-6 text-white' />
                </div>
                <div className='flex-1'>
                    <h2 className='text-xl font-bold text-white mb-1'>Gérez votre profil</h2>
                    <p className='text-sm w-full text-gray-400 leading-relaxed'>
                        Consultez et modifiez vos informations, suivez votre activité sur la plateforme.
                    </p>
                </div>
            </div>

            {/* User Profile Section */}
            <div className='flex items-start gap-4 mb-6 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                <div className='relative'>
                    <div className='w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg'>
                        {profileData.profilePicture ? (
                            <img
                                src={profileData.profilePicture}
                                alt='Photo de profil'
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <div className='flex items-center justify-center w-full h-full'>
                                <UserIcon className='w-10 h-10 text-white' />
                            </div>
                        )}
                    </div>
                    <button
                        className='absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors'
                        onClick={() => alert('Changer la photo de profil')}
                        aria-label='Changer la photo de profil'
                    >
                        <CameraIcon className='w-4 h-4 text-white' />
                    </button>
                </div>

                <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                        <h3 className='text-xl font-bold text-white'>{profileData.username}</h3>
                        {getProviderBadge(profileData.provider)}
                    </div>
                    <p className='text-gray-400 text-sm mb-1'>{profileData.email}</p>
                    <p className='text-gray-500 text-xs mb-6'>
                        Membre depuis le{' '}
                        {new Date(profileData.creation_date)?.toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    {get2FAStatus()}
                </div>
            </div>

            {/* Account status section */}
            <div className='mb-6'>
                <div className='flex items-center gap-2 mb-4'>
                    <ShieldCheckIcon className='w-5 h-5 text-primary-400' />
                    <h3 className='text-lg font-bold text-white'>Statut du compte</h3>
                </div>

                <div className='p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-4'>
                        <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <MailIcon className='w-4 h-4 text-gray-400' />
                                <span className='text-sm text-gray-300'>Email vérifié</span>
                            </div>
                            {getStatusIcon(completionStatus.emailVerified)}
                        </div>

                        <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <KeyIcon className='w-4 h-4 text-gray-400' />
                                <span className='text-sm text-gray-300'>PIN configuré</span>
                            </div>
                            {getStatusIcon(completionStatus.pinConfigured)}
                        </div>

                        <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <FileCheckIcon className='w-4 h-4 text-gray-400' />
                                <span className='text-sm text-gray-300'>Conditions acceptées</span>
                            </div>
                            {getStatusIcon(completionStatus.termsAccepted)}
                        </div>

                        <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <UserIcon className='w-4 h-4 text-gray-400' />
                                <span className='text-sm text-gray-300'>Profil complet</span>
                            </div>
                            {getStatusIcon(completionStatus.profileComplete)}
                        </div>

                        <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <LockIcon className='w-4 h-4 text-gray-400' />
                                <span className='text-sm text-gray-300'>Authentification à 2 facteurs (A2F)</span>
                            </div>
                            {getStatusIcon(completionStatus.profileComplete)}
                        </div>
                    </div>

                    {/* Next Steps */}
                    {completionStatus.nextSteps.length > 0 && (
                        <div className='p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg'>
                            <div className='flex items-center gap-2 mb-2'>
                                <AlertCircleIcon className='w-4 h-4 text-amber-400' />
                                <span className='text-sm font-medium text-amber-300'>Prochaines étapes</span>
                            </div>
                            <ul className='space-y-1'>
                                {completionStatus.nextSteps.map((step, index) => (
                                    <li key={index} className='text-xs text-amber-200'>
                                        • {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick actions */}
            <div className='mb-6'>
                <div className='flex items-center gap-2 mb-4'>
                    <SparklesIcon className='w-5 h-5 text-primary-400' />
                    <h3 className='text-lg font-bold text-white'>Actions rapides</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <button
                        onClick={handleEdit}
                        className='p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors group'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors'>
                                <PenBoxIcon className='w-5 h-5 text-primary-400' />
                            </div>
                            <div>
                                <div className='font-medium text-white'>Informations personnelles</div>
                                <div className='text-xs text-gray-400'>Modifier votre email / pseudo</div>
                            </div>
                        </div>
                    </button>

                    <button className='p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors group'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors'>
                                <KeyIcon className='w-5 h-5 text-primary-400' />
                            </div>
                            <div>
                                <div className='font-medium text-white'>Changer le PIN</div>
                                <div className='text-xs text-gray-400'>Modifier votre code de sécurité</div>
                            </div>
                        </div>
                    </button>

                    <button className='p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors group'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors'>
                                <ShieldCheckIcon className='w-5 h-5 text-red-400' />
                            </div>
                            <div>
                                <div className='font-medium text-white'>Sécurité</div>
                                <div className='text-xs text-gray-400'>Gérer les paramètres de sécurité</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className='mb-6 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                    <h3 className='text-lg font-bold text-white mb-4'>Modifier le profil</h3>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>Nom d'utilisateur</label>
                            <input
                                type='text'
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>Email</label>
                            <input
                                type='email'
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500'
                            />
                        </div>
                    </div>

                    <div className='flex gap-3 mt-6'>
                        <button
                            onClick={handleSave}
                            className='flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors'
                        >
                            Sauvegarder
                        </button>
                        <button
                            onClick={handleEdit}
                            className='px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 font-medium rounded-lg transition-colors'
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Activities */}
            <div className='mb-6'>
                <div className='flex items-center gap-2 mb-4'>
                    <CalendarIcon className='w-5 h-5 text-primary-400' />
                    <h3 className='text-lg font-bold text-white'>Votre activité</h3>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <div className='p-4 bg-white/5 border border-white/10 rounded-lg text-center'>
                        <div className='text-2xl font-bold text-white mb-1'>{stats.articlesLus}</div>
                        <div className='text-xs text-gray-400'>Articles lus</div>
                    </div>

                    <div className='p-4 bg-white/5 border border-white/10 rounded-lg text-center'>
                        <div className='text-2xl font-bold text-white mb-1'>{stats.articlesAimes}</div>
                        <div className='text-xs text-gray-400'>Articles aimés</div>
                    </div>

                    <div className='p-4 bg-white/5 border border-white/10 rounded-lg text-center'>
                        <div className='text-2xl font-bold text-white mb-1'>{stats.articlesEcrits}</div>
                        <div className='text-xs text-gray-400'>Articles écrits</div>
                    </div>

                    <div className='p-4 bg-white/5 border border-white/10 rounded-lg text-center'>
                        <div className='text-2xl font-bold text-white mb-1'>{stats.amis}</div>
                        <div className='text-xs text-gray-400'>Amis</div>
                    </div>

                    <div className='p-4 bg-white/5 border border-white/10 rounded-lg text-center'>
                        <div className='text-2xl font-bold text-white mb-1'>{stats.defisCompletes}</div>
                        <div className='text-xs text-gray-400'>Défis complétés</div>
                    </div>

                    <div className='p-4 bg-white/5 border border-white/10 rounded-lg text-center'>
                        <div className='text-2xl font-bold text-white mb-1'>{stats.transactionsTotal}</div>
                        <div className='text-xs text-gray-400'>Transactions</div>
                    </div>
                </div>
            </div>

            <SettingsPageFooter />
        </PageLayout>
    );
};

export default MyProfile;
