import { QuestionOptionType } from '@/types/QuizzType';
import React, { useEffect } from 'react';

type SingleProps = {
    options: QuestionOptionType[];
    tickedAnswers: number[] | null;
    setTickedAnswers: (tickedAnswers: number[] | null) => void;
};

const Single = (props: SingleProps) => {
    return (
        <div className='w-full h-auto flex flex-wrap justify-between items-center gap-y-2 text-center'>
            {props.options.map((option, _index) => (
                <div
                    key={option.id}
                    className={`
                        w-[49%] h-60 min-h-50 flex justify-start items-start gap-x-2 rounded-2xl px-5 py-8 
                        ${
                            props?.tickedAnswers?.includes(option.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-50 text-black'
                        }
                    `}
                    onClick={() => props.setTickedAnswers([option.id])}
                >
                    <label className='text-left'>{option.option}</label>
                </div>
            ))}
        </div>
    );
};

export default Single;
