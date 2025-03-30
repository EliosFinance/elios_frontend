import { useAuth } from '@/context/AuthProvider';
import { QuizzType } from '@/temp/QuizzData';
import { Progress } from './ui/progress';

type props = {
    currentScore: number;
    currentQuestionIndex: number;
    quizz: QuizzType;
};

const QuizzNav = (props: props) => {
    const { user } = useAuth();

    return (
        <div className='w-full h-[60px] flex justify-between items-center flex-col bg-gray-200 shadow-sm fixed top-0 px-4 z-[10000000] rounded-b-[var(--border-radius-3)]'>
            <div className='w-full h-full flex justify-start items-center gap-x-2'>
                <a href={'#'} onClick={() => window.history.back()}>
                    ←
                </a>

                {/* progress bar */}
                <Progress
                    value={
                        props.currentQuestionIndex && props.quizz.questions.length > 0
                            ? (props.currentQuestionIndex * 100) / props.quizz.questions.length
                            : 0
                    }
                />
            </div>
        </div>
    );
};

export default QuizzNav;
