import CardCarousel from '@/components/carousels/CardCarousel';
import QuizzCarousel from '@/components/carousels/QuizzCarousel';
import { QuizzType } from '@/temp/QuizzData';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { InboxIcon } from '@heroicons/react/24/outline';

type LearnQuizzTabProps = {
    quizz: QuizzType[];
};

const LearnQuizzTab = (props: LearnQuizzTabProps) => {
    const SliderSection = (title: string, quizz: QuizzType[], last: boolean) => {
        return (
            <div className='w-full flex justify-center items-start flex-col'>
                <h2 className='text-2xl font-black px-6'>{title}</h2>
                <div
                    className={`w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4 ${last ? 'pb-24' : 'pb-8'}`}
                >
                    <QuizzCarousel slides={quizz} options={{ loop: true, containScroll: false }} />
                </div>
            </div>
        );
    };

    return (
        <div className='w-full flex justify-center items-start flex-col mb-8 p-6 gap-y-6'>
            <div className='w-full flex justify-between items-center'>
                <div className='w-full flex justify-center items-start flex-col'>
                    <h2 className='text-2xl font-black'>Mon niveau global</h2>
                    <div className={`w-full flex justify-between items-start text-purple-500 font-bold text-xl`}>
                        <p>Maître de la finance</p>
                        <InboxIcon className='h-6 w-6' />
                    </div>
                </div>
                <a className='text-sm font-semibold text-blue-500 px-6' href={APP_ROUTES_ENUM.ARTICLE_CATEGORIES}>
                    Voir tout &gt;
                </a>
            </div>
            <div className='w-full flex justify-center items-start flex-col'>
                <h2 className='text-2xl font-black'>Mon évolution</h2>
                <div className={`w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4 'pb-8'`}>chart</div>
            </div>
            <div className='w-full flex justify-center items-start flex-col'>
                <h2 className='text-2xl font-black'>Les quizz</h2>
                <div className={`w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4 'pb-8'`}>
                    sliders
                </div>
            </div>
        </div>
    );
};

export default LearnQuizzTab;
