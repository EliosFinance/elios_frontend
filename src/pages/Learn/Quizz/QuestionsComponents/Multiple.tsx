import { QuestionOptionType } from '@/types/QuizzType';

type MultipleProps = {
    options: QuestionOptionType[];
    tickedAnswers: number[] | null;
    setTickedAnswers: (tickedAnswers: number[] | null) => void;
};

const Multiple = (props: MultipleProps) => {
    // ne doit pas partir de 0
    const handleOptionClick = (index: number) => {
        const currentAnswers = props.tickedAnswers || [];
        if (currentAnswers.includes(index)) {
            props.setTickedAnswers(currentAnswers.filter((answer) => answer !== index));
        } else {
            props.setTickedAnswers([...currentAnswers, index]);
        }
    };

    return (
        <div className='w-full h-auto flex flex-wrap justify-between items-center gap-y-2 text-center'>
            {props.options.map((option, index) => (
                <div
                    key={option.id}
                    className={`
                        w-[49%] h-48 flex flex-col justify-start items-start rounded-2xl px-2 py-8
                        ${
                            props?.tickedAnswers?.includes(option.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-50 text-black'
                        }
                    `}
                    onClick={() => handleOptionClick(option.id)}
                >
                    <label className='text-center text-xl leading-5'>{option.option}</label>
                </div>
            ))}
        </div>
    );
};

export default Multiple;
