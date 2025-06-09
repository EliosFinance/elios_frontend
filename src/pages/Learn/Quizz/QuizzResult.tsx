import { completeQuizz } from '@/api';
import fail_audio from '@/assets/sound_effects/fail.mp3';
import success_audio from '@/assets/sound_effects/kids_yay_TEMP.mp3';
import ButtonApp from '@/components/ButtonApp';
import CardCarousel from '@/components/carousels/CardCarousel';
import useConfettis from '@/hook/useConfettis';
import { QuizzType } from '@/temp/QuizzData';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleTypesEnum } from '@/types/BlogType';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type QuizzResultProps = {
    quizz: QuizzType;
    score: number;
};

const QuizzResult = (props: QuizzResultProps) => {
    const navigate = useNavigate();
    const { throwConfettis, throwPartyConfettis } = useConfettis();
    const scoreSuperiorTo70 = props.score >= (props.quizz?.questions?.length || 0) * 0.7;

    useEffect(() => {
        const postData = async () => {
            await completeQuizz(props.quizz.id, props.score);
        };
        postData();
    }, []);

    useEffect(() => {
        if (scoreSuperiorTo70) {
            const audio = new Audio(success_audio);
            audio.play();
            throwPartyConfettis();
        } else {
            // play fail audio
            const audio = new Audio(fail_audio);
            audio.play();
        }
    }, [scoreSuperiorTo70]);
    return (
        <div className='w-full h-auto flex flex-col justify-center items-start gap-y-10 pb-20'>
            <h1 className='text-3xl font-black text-left'>Résultat du quizz</h1>
            <h3
                className={`-mt-6 w-full text-xl font-bold p-4 rounded-2xl text-white ${scoreSuperiorTo70 ? 'bg-green-500' : 'bg-red-500'}`}
            >
                Votre score : {props.score} / {props.quizz?.questions?.length || 0}
            </h3>
            <div className='flex flex-wrap items-center justify-center w-[100dvw] gap-x-4 -ml-6'>
                <h2 className='text-2xl font-black w-[90%]'>
                    {scoreSuperiorTo70 ? 'Pour aller plus loin' : 'Pour améliorer votre score'}
                </h2>
                <CardCarousel
                    slides={props.quizz?.relatedArticles}
                    options={{ loop: false, containScroll: false }}
                    cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                    isLoading={!props.quizz?.relatedArticles?.length}
                />
            </div>
            <div className='w-full h-auto flex flex-col justify-center items-center gap-y-4'>
                <ButtonApp
                    color='primary'
                    sx='!bg-green-500'
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    Recommencer le quizz
                </ButtonApp>
                <ButtonApp
                    color='primary'
                    sx='!bg-blue-500'
                    onClick={() => {
                        navigate(APP_ROUTES_ENUM.LEARN);
                    }}
                >
                    Retour à EliosLearn
                </ButtonApp>
            </div>
        </div>
    );
};

export default QuizzResult;
