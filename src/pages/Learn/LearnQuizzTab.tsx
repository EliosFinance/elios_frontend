import { useGetPersonalizedContent } from '@/api';
import QuizzCarousel from '@/components/carousels/QuizzCarousel';
import WeekChart from '@/components/landing/WeekChart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthProvider';
import { QuizzType } from '@/temp/QuizzData';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import {
    Award,
    Calendar,
    CheckCircle,
    Clock,
    InfoIcon,
    Play,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Users,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

type LearnQuizzTabProps = {
    quizz: QuizzType[];
};

type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
    progress?: number;
    maxProgress?: number;
};

type QuizzStats = {
    totalCompleted: number;
    streakDays: number;
    averageScore: number;
    totalPoints: number;
    rank: string;
    nextRankPoints: number;
};

const LearnQuizzTab = (props: LearnQuizzTabProps) => {
    const { user } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'quizz' | 'achievements' | 'stats'>('quizz');
    const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
    const { data: recommendedQuizz, isLoading } = useGetPersonalizedContent();

    // Données simulées pour les nouvelles fonctionnalités
    const [stats] = useState<QuizzStats>({
        totalCompleted: 47,
        streakDays: 12,
        averageScore: 87,
        totalPoints: 2340,
        rank: 'Maître de la finance',
        nextRankPoints: 660,
    });

    const [achievements] = useState<Achievement[]>([
        {
            id: '1',
            title: 'Premier Quiz',
            description: 'Terminez votre premier quiz',
            icon: <Play className='w-4 h-4' />,
            unlocked: true,
        },
        {
            id: '2',
            title: 'Série de 5',
            description: 'Réussissez 5 quiz consécutifs',
            icon: <Target className='w-4 h-4' />,
            unlocked: true,
        },
        {
            id: '3',
            title: 'Perfectionniste',
            description: 'Obtenez 100% à 10 quiz',
            icon: <Star className='w-4 h-4' />,
            unlocked: false,
            progress: 7,
            maxProgress: 10,
        },
        {
            id: '4',
            title: 'Marathon',
            description: 'Complétez 100 quiz',
            icon: <Trophy className='w-4 h-4' />,
            unlocked: false,
            progress: 47,
            maxProgress: 100,
        },
    ]);

    const filteredQuizz =
        selectedDifficulty === 'all' ? props.quizz : props.quizz.filter((q) => q.difficulty === selectedDifficulty);

    const SliderSection = () => {
        return (
            <div className='w-full flex justify-center items-start flex-col mb-2 pt-6'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='text-2xl font-black'>Quizz</h2>
                </div>
                <div className='w-full overflow-x-auto scrollbar-hide mt-2 mb-3'>
                    <div className='flex space-x-4 snap-x snap-mandatory overflow-x-auto'>
                        {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
                            <Button
                                key={difficulty}
                                size='sm'
                                onClick={() => setSelectedDifficulty(difficulty as any)}
                                className={`
                                        py-2 px-6 border-none text-white rounded-full font-semibold text-lg flex-shrink-0 snap-center 
                                        ${selectedDifficulty === difficulty ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'}
                                    `}
                            >
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const StatsCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; subtitle?: string }> = ({
        icon,
        title,
        value,
        subtitle,
    }) => (
        <div className='bg-gray-800 rounded-lg p-4 flex items-center gap-3'>
            <div className='text-primary-500'>{icon}</div>
            <div>
                <p className='text-2xl font-bold'>{value}</p>
                <p className='text-sm text-gray-400'>{title}</p>
                {subtitle && <p className='text-xs text-gray-500'>{subtitle}</p>}
            </div>
        </div>
    );

    const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
        <div
            className={`bg-gray-800 rounded-lg p-4 border-2 ${achievement.unlocked ? 'border-purple-500' : 'border-gray-600'}`}
        >
            <div className='flex items-center gap-3 mb-2'>
                <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-purple-500' : 'bg-gray-600'}`}>
                    {achievement.icon}
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold'>{achievement.title}</h4>
                    <p className='text-sm text-gray-400'>{achievement.description}</p>
                </div>
                {achievement.unlocked && <CheckCircle className='w-5 h-5 text-green-500' />}
            </div>
            {achievement.progress !== undefined && (
                <div className='mt-3'>
                    <div className='flex justify-between text-sm text-gray-400 mb-1'>
                        <span>Progression</span>
                        <span>
                            {achievement.progress}/{achievement.maxProgress}
                        </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress!) * 100} className='h-2' />
                </div>
            )}
        </div>
    );

    return (
        <div className='w-full flex justify-center items-start flex-col mb-8 p-6 gap-y-6'>
            {/* Header avec rang et info */}
            <div
                className={`w-full flex justify-between items-center h-6 mb-2 cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={() => setIsDrawerOpen(true)}
            >
                <div className='h-auto flex items-center justify-center gap-2'>
                    <Trophy className='w-5 h-5 text-purple-500' />
                    <p className='font-bold text-xl text-purple-500'>{stats.rank}</p>
                    <Badge variant='default' className='bg-primary-500 text-black'>
                        {stats.totalPoints} pts
                    </Badge>
                </div>
                <InfoIcon className='h-6 w-6' />
            </div>

            {/* Statistiques rapides */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                <StatsCard icon={<Target className='w-5 h-5' />} title='Quiz terminés' value={stats.totalCompleted} />
                <StatsCard
                    icon={<TrendingUp className='w-5 h-5' />}
                    title='Série actuelle'
                    value={`${stats.streakDays} jours`}
                />
                <StatsCard icon={<Star className='w-5 h-5' />} title='Score moyen' value={`${stats.averageScore}%`} />
                <StatsCard
                    icon={<Trophy className='w-5 h-5' />}
                    title='Prochain rang'
                    value={`${stats.nextRankPoints} pts`}
                />
            </div>

            <div className='w-full flex justify-between items-start mt-4 -mb-8'>
                <WeekChart />
            </div>

            <div className='w-[100vw] flex justify-between items-start flex-wrap -ml-6'>
                <div className='flex items-center justify-between mb-4 px-6'>
                    <h2 className='text-xl font-bold'>Laissez-vous porter</h2>
                </div>
                <QuizzCarousel
                    slides={props.quizz}
                    options={{ loop: true, containScroll: false }}
                    isLoading={!props.quizz.length}
                />
            </div>
            <div className='w-[100vw] flex justify-between items-start flex-wrap -ml-6'>
                <div className='flex items-center justify-between mb-4 px-6'>
                    <h2 className='text-xl font-bold'>Nos recommandations pour vous</h2>
                </div>
                <QuizzCarousel
                    slides={recommendedQuizz?.quizz}
                    options={{ loop: true, containScroll: false }}
                    isLoading={isLoading}
                />
            </div>

            <SliderSection />
            <div className='w-full flex justify-start items-start flex-wrap gap-y-4 gap-x-4 pb-24'>
                {filteredQuizz?.map((q, index) => (
                    <div
                        key={index}
                        className={`
                            w-[50px] h-[50px] p-4 rounded-lg
                            ${
                                q?.finishers?.some(
                                    (r: any) => r.username === user.username || r.email === user.username,
                                )
                                    ? (() => {
                                          const allAttempts = q?.finishers?.filter(
                                              (r: any) => r.username === user.username || r.email === user.username,
                                          );
                                          const lastAttempt = allAttempts?.[allAttempts.length - 1];
                                          return lastAttempt?.lastScore || 0;
                                      })() > (q?.questions.length || 0 * 0.7)
                                        ? 'bg-green-800'
                                        : 'bg-red-800'
                                    : 'bg-gray-800'
                            }
                        `}
                    >
                        <a
                            className={`
                                w-full h-full text-md text-center flex items-center justify-center font-bold
                                ${q?.finishers?.some((r: any) => r.username === user.username || r.email === user.username) ? 'text-black' : 'text-gray-400'}
                            `}
                            href={APP_ROUTES_ENUM.QUIZZ + '/' + q.id}
                        >
                            {q.id}
                        </a>
                    </div>
                ))}
            </div>

            {/* Drawer enrichi */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent
                    className='bg-gray-900 text-white border-none px-6 h-[80dvh] pb-12'
                    aria-describedby={undefined}
                >
                    <DrawerHeader>
                        <div className='flex items-center justify-between'>
                            <DrawerTitle className='text-xl'>Profil & Progression</DrawerTitle>
                            <DrawerClose>
                                <Button className='p-0 bg-transparent rounded-full hover:bg-gray-800'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-6 h-6 text-white'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'
                                        />
                                    </svg>
                                </Button>
                            </DrawerClose>
                        </div>

                        {/* Onglets */}
                        <div className='flex gap-2 mt-4'>
                            {[
                                { key: 'quizz', label: 'Classements', icon: <Trophy className='w-4 h-4' /> },
                                { key: 'achievements', label: 'Succès', icon: <Award className='w-4 h-4' /> },
                                { key: 'stats', label: 'Statistiques', icon: <TrendingUp className='w-4 h-4' /> },
                            ].map((tab) => (
                                <Button
                                    key={tab.key}
                                    size='sm'
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`flex items-center gap-2 ${activeTab === tab.key ? 'bg-blue-800 focus:bg-blue-800 text-white' : 'bg-gray-700 text-gray-300'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </Button>
                            ))}
                        </div>
                    </DrawerHeader>

                    <div className='w-full h-full flex-1 overflow-y-auto pb-6'>
                        {activeTab === 'quizz' && (
                            <div className='flex items-center justify-center flex-col gap-y-4 p-4'>
                                <h4 className='text-xl font-bold text-purple-500 flex items-center gap-2'>
                                    <Trophy className='w-5 h-5' />
                                    1. Maître de la finance
                                </h4>
                                <h4 className='text-xl font-bold text-red-500 flex items-center gap-2'>
                                    <Award className='w-5 h-5' />
                                    2. Banquier
                                </h4>
                                <h4 className='text-xl font-bold text-green-500 flex items-center gap-2'>
                                    <Star className='w-5 h-5' />
                                    3. Amateur de graphiques
                                </h4>
                                <h4 className='text-xl font-bold text-amber-900 flex items-center gap-2'>
                                    <Target className='w-5 h-5' />
                                    4. Novice des écus
                                </h4>

                                <div className='mt-6 w-full max-w-md'>
                                    <h5 className='font-semibold mb-3'>Progression vers le prochain rang</h5>
                                    <Progress value={78} className='h-3 mb-2' />
                                    <p className='text-sm text-gray-400'>{stats.nextRankPoints} points restants</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className='space-y-4 p-4'>
                                <h4 className='text-lg font-semibold mb-4'>Vos Succès</h4>
                                {achievements.map((achievement) => (
                                    <AchievementCard key={achievement.id} achievement={achievement} />
                                ))}
                            </div>
                        )}

                        {activeTab === 'stats' && (
                            <div className='space-y-6 p-4'>
                                <h4 className='text-lg font-semibold mb-4'>Statistiques Détaillées</h4>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <StatsCard
                                        icon={<Calendar className='w-5 h-5' />}
                                        title='Jours actifs'
                                        value='23'
                                        subtitle='ce mois-ci'
                                    />
                                    <StatsCard
                                        icon={<Users className='w-5 h-5' />}
                                        title='Classement global'
                                        value='#847'
                                        subtitle='sur 12,453 utilisateurs'
                                    />
                                    <StatsCard
                                        icon={<Clock className='w-5 h-5' />}
                                        title='Temps total'
                                        value='8h 24m'
                                        subtitle="d'apprentissage"
                                    />
                                    <StatsCard
                                        icon={<Zap className='w-5 h-5' />}
                                        title='Meilleur score'
                                        value='100%'
                                        subtitle='Finance personnelle'
                                    />
                                </div>

                                <div className='bg-gray-800 rounded-lg p-4'>
                                    <h5 className='font-semibold mb-3'>Domaines de prédilection</h5>
                                    <div className='space-y-3'>
                                        {[
                                            { subject: 'Finance personnelle', score: 94, color: 'bg-green-500' },
                                            { subject: 'Investissement', score: 87, color: 'bg-blue-500' },
                                            { subject: 'Cryptomonnaies', score: 82, color: 'bg-orange-500' },
                                            { subject: 'Économie', score: 76, color: 'bg-purple-500' },
                                        ].map((item, index) => (
                                            <div key={index} className='flex items-center justify-between'>
                                                <span className='text-sm'>{item.subject}</span>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-20 bg-gray-700 rounded-full h-2'>
                                                        <div
                                                            className={`h-2 rounded-full ${item.color}`}
                                                            style={{ width: `${item.score}%` }}
                                                        />
                                                    </div>
                                                    <span className='text-sm font-semibold w-10'>{item.score}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default LearnQuizzTab;
