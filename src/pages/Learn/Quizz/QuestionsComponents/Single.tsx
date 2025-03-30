import { QuestionOptionType } from '@/temp/QuizzData';
import React, { useEffect } from 'react';

type SingleProps = {
    options: QuestionOptionType[];
    tickedAnswers: number[] | null;
    setTickedAnswers: (tickedAnswers: number[] | null) => void;
};

const Single = (props: SingleProps) => {
    return (
        <div className='w-full h-auto flex flex-wrap justify-between items-center gap-y-2 text-center'>
            {props.options.map((option, index) => (
                <div
                    key={index + 1}
                    className={`
                        w-[49%] h-50 flex justify-start items-start gap-x-2 rounded-2xl px-5 py-8 
                        ${
                            props?.tickedAnswers?.includes(index + 1)
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-50 text-black'
                        }
                    `}
                    onClick={() => props.setTickedAnswers([index + 1])}
                >
                    <input
                        type='radio'
                        name='single'
                        value={option.id}
                        checked={props?.tickedAnswers?.includes(index + 1) || false}
                        readOnly
                        className='w-5 h-5 !rounded-sm border-gray-300 text-blue-500 focus:ring-blue-500'
                    />
                    <label className='text-left'>{option.option}</label>
                </div>
            ))}
        </div>
    );
};

export default Single;
