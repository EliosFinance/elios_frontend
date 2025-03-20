import ButtonApp from '@/components/ButtonApp';
import { QUIZZ_DATA, QuestionTypesEnum, QuizzType } from '@/temp/QuizzData';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image from './QuestionsComponents/Image';
import Multiple from './QuestionsComponents/Multiple';
import Single from './QuestionsComponents/Single';
import QuizzResult from './QuizzResult';

const Quizz = () => {
    const { id: quizzId } = useParams<{ id: string }>();
    const [quizz, setQuizz] = useState<QuizzType | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [tickedAnswers, setTickedAnswers] = useState<number[] | null>(null);
    const [displayResult, setDisplayResult] = useState<boolean>(false);
    const navigate = useNavigate();

    const verifyAnswer = () => {
        if (tickedAnswers) {
            const question = quizz?.questions[currentQuestionIndex];
            const correctAnswers = question.options.filter((option) => option.isCorrect).map((option) => option.id);

            console.log('correctAnswers', correctAnswers);
            console.log('tickedAnswers', tickedAnswers);

            // Vérifie que tickedAnswers contient uniquement les réponses correctes
            const isCorrect =
                correctAnswers.length === tickedAnswers.length &&
                correctAnswers.every((answer) => tickedAnswers.includes(answer));

            console.log('isCorrect', isCorrect);

            if (isCorrect) {
                setScore(score + 1);
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizz?.questions.length - 1) {
            setTickedAnswers(null);
            verifyAnswer();
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setDisplayResult(true);
        }
    };

    useEffect(() => {
        // fetch the quizz from the server
        // const quizz = await getQuizz(quizzId);
        const q = QUIZZ_DATA.find((q) => q.id === Number(quizzId));
        if (!q) {
            navigate(APP_ROUTES_ENUM.LEARN);
        }

        setQuizz(q);
    }, [quizzId]);

    return (
        <div className='w-full flex flex-col items-center justify-start mb-20 p-6'>
            {displayResult ? (
                <QuizzResult />
            ) : (
                <>
                    {/* header */}
                    <div className='w-full h-20 flex flex-col items-center justify-between text-black text-center p-4'>
                        <h1 className='text-bold text-3xl'>{quizz?.title}</h1>
                        <p className=''>{quizz?.description}</p>
                    </div>

                    {/* body */}
                    <div className='w-full min-h-96 flex flex-col items-center justify-start gap-y-4 pt-7'>
                        <h2 className='font-bold text-center text-xl'>
                            {quizz?.questions[currentQuestionIndex].question}
                        </h2>
                        <h2 className='font-bold text-center text-xl'>Score {score}</h2>
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
                        onClick={handleNextQuestion}
                        color='primary'
                        disabled={!tickedAnswers || tickedAnswers.length === 0}
                        sx='!bg-green-500'
                    >
                        Next
                    </ButtonApp>
                </>
            )}
        </div>
    );
};

export default Quizz;
