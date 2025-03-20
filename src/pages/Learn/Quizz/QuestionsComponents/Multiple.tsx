import { QuestionOptionType } from '@/temp/QuizzData';
import React from 'react';

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
        <div className='w-full h-auto flex flex-col justify-center items-center gap-y-4'>
            {props.options.map((option, index) => (
                <div
                    key={index + 1}
                    className='w-full h-5 flex justify-start items-center gap-x-2'
                    onClick={() => handleOptionClick(index + 1)}
                >
                    <input
                        type='checkbox'
                        name='multiple'
                        value={option.id}
                        checked={props.tickedAnswers?.includes(index + 1) || false}
                        readOnly
                    />
                    <label>{option.option}</label>
                </div>
            ))}
        </div>
    );
};

export default Multiple;
