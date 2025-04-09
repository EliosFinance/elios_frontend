import Subscription from '@/components/UpgradePlan';
import QuizzCarousel from '@/components/carousels/QuizzCarousel';
import WeekChart from '@/components/landing/WeekChart';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { QuizzType } from '@/temp/QuizzData';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';

type LearnQuizzTabProps = {
    quizz: QuizzType[];
};

const LearnQuizzTab = (props: LearnQuizzTabProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const SliderSection: React.FC<{ title: string; quizz: QuizzType[]; last: boolean }> = ({ title, quizz, last }) => {
        return (
            <div className='w-[100vw] flex justify-center items-start flex-col -ml-6'>
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
            <div
                className={`w-full flex justify-between items-center h-6 mb-2`}
                onClick={() => {
                    setIsDrawerOpen(true);
                }}
            >
                <p className='font-bold text-xl text-purple-500'>Maître de la finance</p>
                <InfoIcon className='h-6 w-6' />
            </div>

            <WeekChart />
            <SliderSection title='Les quizz' quizz={props.quizz} last={false}></SliderSection>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className='z-[100000]' aria-describedby={undefined}>
                    <DrawerHeader>
                        <DrawerTitle>Classements</DrawerTitle>
                        <DrawerClose className='absolute right-4 top-4'>
                            <XMarkIcon />
                        </DrawerClose>
                    </DrawerHeader>
                    <div className='w-full h-full flex items-center justify-center flex-col gap-y-4 p-4 min-h-[40dvh] pb-24'>
                        <h4 className='text-xl font-bold text-purple-500'>1. Maître de la finance</h4>
                        <h4 className='text-xl font-bold text-red-500'>2. Banquier</h4>
                        <h4 className='text-xl font-bold text-green-500'>3. Amateur de graphiques</h4>
                        <h4 className='text-xl font-bold text-amber-900'>4. Novice des écus</h4>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default LearnQuizzTab;
