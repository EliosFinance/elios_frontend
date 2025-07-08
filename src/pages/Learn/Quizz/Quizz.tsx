import { getSingleQuizz } from '@/api';
import correct_answer from '@/assets/sound_effects/correct_answer.mp3';
import wrong_answer from '@/assets/sound_effects/nope_sound_TEMP.mp3';
import ButtonApp from '@/components/ButtonApp';
import QuizzNav from '@/components/QuizzNav';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { QuestionTypesEnum, QuizzType } from '@/types/QuizzType';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Multiple from './QuestionsComponents/Multiple';
import Single from './QuestionsComponents/Single';
import QuizzResult from './QuizzResult';

const Quizz = () => {
    const { id: quizzId } = useParams<{ id: string }>();
    const [quizz, setQuizz] = useState<QuizzType | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [tickedAnswers, setTickedAnswers] = useState<number[]>();
    const [correctAnswers, setCorrectAnswers] = useState<number[]>();
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
    const [displayResult, setDisplayResult] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const verifyAnswer = () => {
        if (tickedAnswers) {
            const question = quizz?.questions[currentQuestionIndex];
            const correctAnswers = question.options
                .filter((option) => option.isCorrect === true)
                .map((option) => option.id);

            setCorrectAnswers(correctAnswers);
            const isCorrect =
                correctAnswers.length === tickedAnswers.length &&
                correctAnswers.every((answer) => tickedAnswers.includes(answer));

            if (isCorrect) {
                const audio = new Audio(correct_answer);
                audio.play();
                setScore(score + 1);
                setIsAnswerCorrect(true);
            } else {
                // display wrong answer sound
                const audio = new Audio(wrong_answer);
                audio.play();
                setIsAnswerCorrect(false);
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizz?.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setDisplayResult(true);
        }
    };

    const handleValidateQuestion = () => {
        setTickedAnswers([]);
        verifyAnswer();
        setIsDrawerOpen(true);
    };

    useEffect(() => {
        const fetchQuizz = async () => {
            const quizz = await getSingleQuizz(Number(quizzId));
            if (quizz) {
                setQuizz(quizz);
            } else {
                navigate(APP_ROUTES_ENUM.ARTICLE_CATEGORIES);
            }
        };

        fetchQuizz();
    }, [quizzId]);

    return (
        <div className='w-full flex flex-col items-center justify-start mb-20 p-6 mt-10'>
            {displayResult ? (
                <QuizzResult quizz={quizz} score={score} />
            ) : (
                <>
                    <QuizzNav quizz={quizz} currentQuestionIndex={currentQuestionIndex} currentScore={score} />
                    {/* body */}
                    <div className='w-full min-h-[70dvh] flex flex-col items-start justify-start'>
                        <div className='w-full h-auto flex flex-col items-start justify-start pt-10 pb-6'>
                            <h2 className='font-bold text-left text-xl'>
                                {quizz?.questions[currentQuestionIndex].question}
                            </h2>
                            {quizz?.questions[currentQuestionIndex].type === QuestionTypesEnum.MULTIPLE && (
                                <span className='text-gray-500 text-sm'> Plusieurs réponses possibles</span>
                            )}
                        </div>
                        {quizz?.questions[currentQuestionIndex].type === QuestionTypesEnum.BOOLEAN && (
                            <Single
                                options={quizz?.questions[currentQuestionIndex].options}
                                setTickedAnswers={setTickedAnswers}
                                tickedAnswers={tickedAnswers}
                            />
                        )}
                        {quizz?.questions[currentQuestionIndex].type === QuestionTypesEnum.MULTIPLE && (
                            <Multiple
                                options={quizz?.questions[currentQuestionIndex].options}
                                setTickedAnswers={setTickedAnswers}
                                tickedAnswers={tickedAnswers}
                            />
                        )}
                        {/* {quizz?.questions[currentQuestionIndex].type === QuestionTypesEnum.IMAGE && (
                            <Image 
                            options={quizz?.questions[currentQuestionIndex].options} 
                            setTickedAnswers={setTickedAnswers} 
                            tickedAnswers={tickedAnswers}
                            />  
                        )} */}
                    </div>
                    {/* footer */}
                    <ButtonApp
                        onClick={handleValidateQuestion}
                        color='primary'
                        disabled={!tickedAnswers || tickedAnswers.length === 0}
                        sx='!bg-green-500'
                    >
                        Valider
                    </ButtonApp>

                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerContent className='bg-gray-800 border-none' aria-describedby=''>
                            <DrawerHeader>
                                <DrawerTitle>
                                    {isAnswerCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse !'}
                                </DrawerTitle>
                                <DrawerClose className='absolute right-4 top-4'>
                                    <XMarkIcon />
                                </DrawerClose>
                            </DrawerHeader>
                            <div className='p-4 space-y-4 z-[100000] min-h-[40dvh] pb-24 flex flex-col items-start justify-between'>
                                <div className='w-full flex flex-col items-start justify-start gap-y-2'>
                                    <h3 className='text-xl font-bold'>Réponse correcte</h3>
                                    <p className='text-gray-500'>
                                        {
                                            quizz?.questions[currentQuestionIndex].options.find((option) =>
                                                correctAnswers?.includes(option.id),
                                            )?.option
                                        }
                                    </p>
                                </div>
                                <div className='w-full flex flex-col items-start justify-start gap-y-2'>
                                    <h3 className='text-xl font-bold'>Explications</h3>
                                    <p className='text-gray-500'>
                                        {quizz?.questions[currentQuestionIndex].explanation}
                                    </p>
                                </div>
                                <ButtonApp
                                    onClick={() => {
                                        setIsDrawerOpen(false);
                                        handleNextQuestion();
                                    }}
                                    color='primary'
                                    // sx='!bg-green-500'
                                >
                                    Continuer
                                </ButtonApp>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </>
            )}
        </div>
    );
};

export default Quizz;
