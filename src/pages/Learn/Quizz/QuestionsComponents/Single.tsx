import { QuestionOptionType } from '@/temp/QuizzData';
import React from 'react';

type SingleProps = {
    options: QuestionOptionType[];
    tickedAnswers: number[] | null;
    setTickedAnswers: (tickedAnswers: number[] | null) => void;
};

const Single = (props: SingleProps) => {
    return (
        <div className='w-full h-auto flex flex-col justify-center items-center gap-y-2 text-center'>
            {props.options.map((option, index) => (
                <div
                    key={index + 1}
                    className={`w-full h-7 flex justify-start items-center gap-x-2 rounded-md p-5 ${
                        props?.tickedAnswers?.includes(index + 1) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => props.setTickedAnswers([index + 1])}
                >
                    <input
                        type='radio'
                        name='single'
                        value={option.id}
                        checked={props?.tickedAnswers?.includes(index + 1) || false}
                        readOnly
                    />
                    <label>{option.option}</label>
                </div>
            ))}
        </div>
    );
};

export default Single;
