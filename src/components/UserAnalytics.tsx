import { useGetUserInsights } from '@/api';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonApp from './ButtonApp';
import { Skeleton } from './ui/skeleton';
import '@/css/carousels/carousel-x.css';

const UserAnalytics = () => {
    const [improvementCategory, setImprovementCategory] = useState<string>('');
    const { data, isLoading, error } = useGetUserInsights();
    const navigate = useNavigate();

    const categoryToUrl = (category: string) => {
        switch (category.toLowerCase()) {
            case 'articles':
                return APP_ROUTES_ENUM.ARTICLE;
            case 'quizz':
                return APP_ROUTES_ENUM.QUIZZ;
            case 'challenges':
                return APP_ROUTES_ENUM.CHALLENGE;
            default:
                return APP_ROUTES_ENUM.HOME;
        }
    };

    useEffect(() => {
        if (data?.insights) {
            const imp = data?.preferences.contentTypes.length
                ? data.preferences.contentTypes.sort((a, b) => b.score - a.score)[
                      data.preferences.contentTypes.length - 1
                  ]?.type
                : null;
            setImprovementCategory(imp || '');
        }
    }, [data]);

    if (error) {
        console.error('Error fetching user insights:', error || "Aucune donnée disponible pour l'instant.");
        return <>Erreur</>;
    }

    return (
        <div className='w-full px-6'>
            {isLoading ? (
                <div className='flex flex-col items-start justify-start w-full min-h-[300px] gap-4'>
                    <Skeleton
                        className='h-[35px] w-[75%] bg-gray-500 skeleton-loader !rounded-md'
                        style={{ borderRadius: 'var(--border-radius-8)' }}
                    />
                    <Skeleton
                        className='h-[250px] w-full bg-gray-500 skeleton-loader !rounded-md'
                        style={{ borderRadius: 'var(--border-radius-8)' }}
                    />
                </div>
            ) : (
                data?.insights?.recommendations && (
                    <div>
                        <h2 className='mb-4 text-xl font-bold'>Recommandations d'Elios AI</h2>
                        <div className='w-full min-h-[200px] max-h-[300px] flex flex-col items-center justify-center'>
                            <div className='flex flex-col items-start justify-center w-full h-full gap-3 p-4 border rounded-lg bg-white/5 border-white/10'>
                                <p>{data?.insights?.recommendations}</p>
                                <p>
                                    N'hésitez pas à explorer plus de&nbsp;
                                    <strong>{improvementCategory && improvementCategory}&nbsp;</strong>
                                    pour enrichir votre expérience.
                                </p>
                                <ButtonApp
                                    variant='contained'
                                    color='primary'
                                    sx='!rounded-lg mt-2'
                                    onClick={() => navigate(categoryToUrl(improvementCategory))}
                                >
                                    J'enrichis mon expérience
                                </ButtonApp>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default UserAnalytics;
