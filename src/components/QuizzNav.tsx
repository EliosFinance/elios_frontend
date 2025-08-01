import { QuizzType } from '@/types/QuizzType';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Progress } from './ui/progress';

type props = {
    currentScore: number;
    currentQuestionIndex: number;
    quizz: QuizzType;
};

const QuizzNav = (props: props) => {
    return (
        <div className='w-full h-[100px] flex justify-between items-center flex-col fixed top-0 p-6 z-[10000000] rounded-b-[var(--border-radius-3)] bg-background/95 backdrop-blur-sm border-b border-white/10'>
            <div className='w-full h-full flex justify-start items-center'>
                <XMarkIcon className='w-8 h-8 text-white flex !justify-start cursor-pointer hover:opacity-70 transition-opacity' onClick={() => window.history.back()} />

                {/* progress bar */}
                <div className='w-full h-full flex justify-end items-center'>
                    <div className='w-[90%] h-full flex justify-center items-center'>
                        <Progress
                            value={
                                props.currentQuestionIndex && props.quizz.questions.length > 0
                                    ? (props.currentQuestionIndex * 100) / props.quizz.questions.length
                                    : 0
                            }
                            className="h-2"
                        />
                    </div>
                </div>
            </div>
            <div className='w-full h-auto flex items-center justify-between text-gray-300 text-left pt-2'>
                <h1 className='font-bold text-white truncate max-w-[60%]'>{props.quizz?.title}</h1>
                <h2 className='font-bold text-center text-primary-500'>Score: {props.currentScore}</h2>
            </div>
        </div>
    );
};

export default QuizzNav;
